import os
import httpx
import time
from typing import List, Dict, Any, Optional

class MarketDataService:
    def __init__(self):
        self.base_url = os.getenv("COINGECKO_BASE_URL", "https://api.coingecko.com/api/v3")
        self.api_key = os.getenv("COINGECKO_API_KEY")
        self.client = httpx.AsyncClient(timeout=10.0)
        
        # Simple In-Memory Cache
        self._cache = {}
        self._CACHE_TTL = 300  # 5 minutes for market data

    def _get_headers(self, use_key: bool = True):
        headers = {}
        if use_key and self.api_key:
            # Try both demo and pro headers if one fails, but start with demo as it's common for CG- keys
            headers["x-cg-demo-api-key"] = self.api_key
        return headers

    async def _safe_get(self, url: str, params: Optional[Dict] = None) -> Any:
        # Try with key first
        try:
            resp = await self.client.get(url, params=params, headers=self._get_headers())
            if resp.status_code in [401, 403]:
                # Try without key (public API)
                resp = await self.client.get(url, params=params)
            resp.raise_for_status()
            return resp.json()
        except Exception as e:
            # Final fallback without key if not already tried
            try:
                resp = await self.client.get(url, params=params)
                resp.raise_for_status()
                return resp.json()
            except:
                raise e

    async def fetch_trending_coins(self) -> List[Dict[str, Any]]:
        cache_key = "trending"
        now = time.time()
        
        if cache_key in self._cache:
            val, expiry = self._cache[cache_key]
            if now < expiry:
                return val

        url = f"{self.base_url.rstrip('/')}/search/trending"
        try:
            data = await self._safe_get(url)
            coins = data.get("coins", [])
            self._cache[cache_key] = (coins, now + self._CACHE_TTL)
            return coins
        except Exception as e:
            print(f"[MarketData] Fetch Trending Error: {e}")
            return self._cache.get(cache_key, ([], 0))[0]

    async def fetch_ohlc(self, coin_id: str, days: int = 1) -> List[List[float]]:
        cache_key = f"ohlc_{coin_id}_{days}"
        now = time.time()

        if cache_key in self._cache:
            val, expiry = self._cache[cache_key]
            if now < expiry:
                return val

        url = f"{self.base_url.rstrip('/')}/coins/{coin_id}/ohlc"
        params = {"vs_currency": "usd", "days": days}
        try:
            data = await self._safe_get(url, params=params)
            self._cache[cache_key] = (data, now + self._CACHE_TTL)
            return data
        except Exception as e:
            print(f"[MarketData] Fetch OHLC Error for {coin_id}: {e}")
            return self._cache.get(cache_key, ([], 0))[0]

    async def fetch_price(self, coin_ids: List[str] = ["ethereum", "usdc"]) -> Dict[str, float]:
        cache_key = f"price_{'_'.join(coin_ids)}"
        now = time.time()

        if cache_key in self._cache:
            val, expiry = self._cache[cache_key]
            if now < expiry:
                return val

        url = f"{self.base_url.rstrip('/')}/simple/price"
        params = {
            "ids": ",".join(coin_ids),
            "vs_currencies": "usd"
        }
        
        try:
            data = await self._safe_get(url, params=params)
            result = {}
            for coin in coin_ids:
                result[coin] = data.get(coin, {}).get("usd", 0.0)
            
            # Fallback for usdc if not found (usually 1.0)
            if "usdc" in result and result["usdc"] == 0:
                result["usdc"] = 1.0
                
            self._cache[cache_key] = (result, now + 60) # Cache price for 1 minute
            return result
        except Exception as e:
            print(f"[MarketData] Fetch Price Error: {e}")
            return {"ethereum": 2850.0, "usdc": 1.0} # Sensible fallback

market_data = MarketDataService()
