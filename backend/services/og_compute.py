import httpx
import os
import json
from typing import Dict, Any, Optional

class OGComputeService:
    def __init__(self):
        self.api_url = os.getenv("OG_COMPUTE_URL")
        if not self.api_url or "api.0g.ai/compute/infer" in self.api_url:
            self.api_url = "https://router-api.0g.ai/v1/chat/completions"
        self.api_key = os.getenv("OG_COMPUTE_API_KEY", "").strip()
        self.client = httpx.AsyncClient(timeout=60.0)

    async def infer(self, prompt: str, model: str = "qwen-2.5-72b-instruct") -> str:
        if not self.api_key:
            return "Error: OG_COMPUTE_API_KEY not configured in .env."

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        
        # Standard OpenAI-compatible payload
        payload = {
            "model": model,
            "messages": [
                {
                    "role": "system", 
                    "content": "You are Lumina AI, the core intelligence of the Lumina Swarm Network. "
                               "Provide professional, accurate, and concise answers to trading and market queries. "
                               "Do NOT repeat the user's prompt. Answer the question directly."
                },
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7
        }

        try:
            # First attempt with the provided key
            response = await self.client.post(self.api_url, headers=headers, json=payload)
            
            # If 401, try with app-sk- prefix if not already present
            if response.status_code == 401 and not self.api_key.startswith("app-sk-"):
                headers["Authorization"] = f"Bearer app-sk-{self.api_key.replace('sk-', '')}"
                response = await self.client.post(self.api_url, headers=headers, json=payload)

            if response.status_code == 200:
                data = response.json()
                # Check standard OpenAI format
                if "choices" in data and len(data["choices"]) > 0:
                    return data["choices"][0]["message"]["content"].strip()
                # Check if it's a direct 'result' field
                elif "result" in data:
                    return data["result"].strip()
                else:
                    return str(data)
            
            if response.status_code != 200:
                return await self._fallback_inference(prompt)

            return f"0G Compute Error: {response.status_code} - {response.text}"
            
        except Exception as e:
            return await self._fallback_inference(prompt)

    async def _fallback_inference(self, prompt: str) -> str:
        """Provides a non-repetitive, real-data response when the LLM API fails."""
        try:
            from .market_data import market_data
            prompt_lower = prompt.lower()
            
            # Real Market Data Fallback
            if any(word in prompt_lower for word in ["price", "eth", "ethereum", "market", "value"]):
                prices = await market_data.fetch_price(["ethereum", "usdc"])
                eth_price = prices.get("ethereum", 0)
                if eth_price > 0:
                    return f"Lumina AI: I'm currently in restricted mode due to a 0G API 401 error, but I can see that Ethereum is trading at ${eth_price:,.2f}. Please update your OG_COMPUTE_API_KEY in .env for full analysis."
            
            # General Chat Fallback
            if any(word in prompt_lower for word in ["hi", "hello", "hey", "who"]):
                return "Lumina AI: Hello! I'm the Lumina Swarm intelligence. I've successfully connected to live market data, but my 0G Compute layer is returning a 401 Unauthorized error. Please check your API key in the .env file so I can resume full operations!"

            return "Lumina AI: I'm receiving your commands, but my 0G Compute brain is currently disconnected (401 Unauthorized). Please check your .env configuration. In the meantime, I can still provide live prices if you ask!"
        except:
            return "Lumina AI: System error. Please check backend logs and API configuration."

og_compute = OGComputeService()
