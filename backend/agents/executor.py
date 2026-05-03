import asyncio
from typing import Any, Dict, Optional
from .base_agent import BaseAgent
from ..services.keeperhub import keeper_hub_service

class ExecutorAgent(BaseAgent):
    def __init__(self, bus: Any = None, memory: Any = None, keeper_hub: Any = None) -> None:
        super().__init__(name="executor_agent", bus=bus, memory=memory)
        self.keeper_hub = keeper_hub or keeper_hub_service

    def process(self, input_data: Dict[str, Any] | None = None) -> Dict[str, Any]:
        payload = input_data or {}
        output = payload.get("output", {})
        
        technical_signal = output.get("signal", "hold")
        technical_trend = output.get("technical_summary", {}).get("trend", "neutral")
        
        listener_data = payload.get("input", {}).get("output", {})
        sentiment_score = float(listener_data.get("sentiment_score", 0.5))

        if sentiment_score >= 0.5 and technical_signal == "buy":
            decision = "buy"
            confidence = 0.85
        elif sentiment_score <= 0.4 and technical_signal == "sell":
            decision = "sell"
            confidence = 0.75
        else:
            decision = "hold"
            confidence = 0.50

        output_data = {
            "decision": decision,
            "confidence": confidence,
            "reason": f"System policy evaluated: {decision.upper()}"
        }
        return self._build_payload(payload, output_data)

    async def handle_opportunity(self, data: Dict[str, Any]):
        try:
            past_memory = None
            if self.memory:
                past_memory = await self.memory.retrieve("execution_history_latest")

            decision_payload = self.process(data)
            
            # Risk Adjustment
            if past_memory:
                last_decision = past_memory.get("output", {}).get("decision")
                if last_decision == decision_payload["output"]["decision"] and last_decision != "hold":
                    decision_payload["output"]["confidence"] = min(0.99, decision_payload["output"]["confidence"] + 0.05)
                    decision_payload["output"]["reason"] += " (Confidence boosted by history)"

            if self.memory:
                await self.memory.save("execution_history_latest", decision_payload)

            # Execution
            if decision_payload["output"]["decision"] in ["buy", "sell"]:
                intent = {
                    "action": decision_payload["output"]["decision"],
                    "asset": data.get("output", {}).get("coin_id", "ETH"),
                    "amount": 0.1,
                    "slippage": 0.5
                }
                res = await self.keeper_hub.execute_intent(intent)
                decision_payload["output"]["execution"] = res

            await self.publish("execution.decision", decision_payload)
        except Exception as e:
            print(f"[Executor] Handle Error: {e}")

    async def run(self):
        if self.bus:
            await self.bus.subscribe("analysis.opportunity", self.handle_opportunity)
        print(f"[Executor] Standing by for opportunities.")
        while True:
            await asyncio.sleep(3600)