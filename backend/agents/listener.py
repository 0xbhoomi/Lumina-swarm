import asyncio
from typing import Any, Dict, List
from .base_agent import BaseAgent
from ..services.market_data import market_data
from ..services.sentiment import sentiment_analyzer

class ListenerAgent(BaseAgent):
    def __init__(self, bus: Any = None, memory: Any = None) -> None:
        super().__init__(name="listener_agent", bus=bus, memory=memory)

    async def process(self, input_data: Dict[str, Any] | None = None) -> Dict[str, Any]:
        payload = input_data or {}
        try:
            # Now asynchronous
            trending_coins = await market_data.fetch_trending_coins()
            score = sentiment_analyzer.analyze_trending_coins(trending_coins)
            label = sentiment_analyzer.get_label(score)

            top_coin = trending_coins[0].get("item", {}) if trending_coins else {}
            
            output_data = {
                "sentiment_score": score,
                "sentiment_label": label,
                "coin_id": top_coin.get("id"),
                "coin_name": top_coin.get("name"),
                "coin_symbol": top_coin.get("symbol"),
                "source": "coingecko_trending"
            }
            return self._build_payload(payload, output_data)
        except Exception as e:
            print(f"[Listener] Error: {e}")
            return self._build_payload(payload, {"error": str(e)})

    async def run(self):
        print(f"[Listener] Monitoring trends...")
        while True:
            try:
                # process is now async
                result = await self.process()
                await self.publish("sentiment.update", result)
                if self.memory:
                    # memory.save is already async
                    await self.memory.save("sentiment_history_latest", result)
            except Exception as e:
                print(f"[Listener] Loop Error: {e}")
            await asyncio.sleep(60)