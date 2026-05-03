import asyncio
from typing import Any, Dict
from .base_agent import BaseAgent
from ..services.market_data import market_data
from ..services.indicators import indicators

class AnalystAgent(BaseAgent):
    def __init__(self, bus: Any = None, memory: Any = None) -> None:
        super().__init__(name="analyst_agent", bus=bus, memory=memory)

    async def process(self, input_data: Dict[str, Any] | None = None) -> Dict[str, Any]:
        payload = input_data or {}
        output = payload.get("output", {})
        coin_id = output.get("coin_id", "ethereum")

        try:
            # Now asynchronous
            ohlc = await market_data.fetch_ohlc(coin_id)
            if not ohlc or len(ohlc) < 1:
                 return self._build_payload(payload, {"error": "No price data available"})

            close_prices = [candle[4] for candle in ohlc]
            rsi = indicators.calculate_rsi(close_prices)
            
            trend = "bullish" if rsi < 40 else "bearish" if rsi > 60 else "neutral"
            signal = "buy" if rsi < 35 else "sell" if rsi > 65 else "hold"

            output_data = {
                "coin_id": coin_id,
                "technical_summary": {"rsi": rsi, "trend": trend},
                "signal": signal
            }
            return self._build_payload(payload, output_data)
        except Exception as e:
            print(f"[Analyst] Error analyzing {coin_id}: {e}")
            return self._build_payload(payload, {"error": str(e)})

    async def handle_sentiment(self, data: Dict[str, Any]):
        try:
            # Persistent memory: read past analysis
            past_analysis = None
            if self.memory:
                past_analysis = await self.memory.retrieve("analyst_memory_latest")
            
            # process is now async
            analysis = await self.process(data)
            
            if past_analysis and "error" not in analysis["output"]:
                old_rsi = past_analysis.get("output", {}).get("technical_summary", {}).get("rsi")
                new_rsi = analysis["output"].get("technical_summary", {}).get("rsi")
                if old_rsi and new_rsi:
                    analysis["output"]["technical_summary"]["rsi_delta"] = round(new_rsi - old_rsi, 2)

            if self.memory:
                await self.memory.save("analyst_memory_latest", analysis)

            await self.publish("analysis.opportunity", analysis)
        except Exception as e:
            print(f"[Analyst] Handle Error: {e}")

    async def run(self):
        if self.bus:
            await self.bus.subscribe("sentiment.update", self.handle_sentiment)
        print(f"[Analyst] Ready for opportunities.")
        while True:
            await asyncio.sleep(3600)