import os
import httpx
import json
import asyncio
from typing import Any, Dict, Optional

class KeeperHubService:
    def __init__(self):
        self.mcp_url = os.getenv("KEEPERHUB_MCP_URL", "http://localhost:3001")
        self.api_key = os.getenv("KEEPERHUB_API_KEY")
        self.client = httpx.AsyncClient(timeout=30.0)

    async def execute_intent(self, intent: Dict[str, Any], retries: int = 3) -> Dict[str, Any]:
        payload = {
            "jsonrpc": "2.0",
            "method": "tools/call",
            "params": {
                "name": "execute_trade",
                "arguments": {
                    "action": intent.get("action"),
                    "token_in": "WETH" if intent.get("action") == "sell" else "USDC",
                    "token_out": "USDC" if intent.get("action") == "sell" else "WETH",
                    "amount": str(intent.get("amount")),
                    "slippage_bps": int(float(intent.get("slippage", 0.5)) * 100),
                    "chain_id": 84532
                }
            },
            "id": 1
        }

        for attempt in range(retries):
            try:
                resp = await self.client.post(self.mcp_url, json=payload)
                if resp.status_code == 200:
                    res = resp.json()
                    if "error" not in res:
                        return {"success": True, "data": res.get("result")}
            except: pass
            await asyncio.sleep(1)
        
        return {"success": False, "error": "Max retries exceeded"}

keeper_hub_service = KeeperHubService()
