from typing import List, Dict, Any

class SentimentService:
    def analyze_trending_coins(self, coins: List[Dict[str, Any]]) -> float:
        if not coins:
            return 0.5

        ranks: List[int] = []
        for item in coins:
            coin = item.get("item", {})
            rank = coin.get("market_cap_rank")
            if isinstance(rank, int):
                ranks.append(rank)

        if not ranks:
            return 0.5

        avg_rank = sum(ranks) / len(ranks)
        sentiment = max(0.05, min(0.95, 1.0 - (avg_rank / 100.0)))
        return round(sentiment, 2)

    def get_label(self, score: float) -> str:
        if score >= 0.6: return "bullish"
        if score <= 0.4: return "bearish"
        return "neutral"

sentiment_analyzer = SentimentService()
