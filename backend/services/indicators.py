from typing import List

class IndicatorService:
    def calculate_rsi(self, prices: List[float], periods: int = 14) -> float:
        if len(prices) < periods + 1:
            return 50.0 # Default/Neutral

        gains = []
        losses = []
        for i in range(1, len(prices)):
            diff = prices[i] - prices[i-1]
            if diff >= 0:
                gains.append(diff)
                losses.append(0)
            else:
                gains.append(0)
                losses.append(abs(diff))

        avg_gain = sum(gains[:periods]) / periods
        avg_loss = sum(losses[:periods]) / periods

        if avg_loss == 0:
            return 100.0

        rs = avg_gain / avg_loss
        rsi = 100 - (100 / (1 + rs))
        return round(rsi, 2)

indicators = IndicatorService()
