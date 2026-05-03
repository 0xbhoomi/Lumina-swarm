import os
import httpx
import json
from typing import Any, Optional

class OGStorageClient:
    def __init__(self):
        self.url = os.getenv("OG_STORAGE_URL", "https://api.0g.ai/storage/write")
        self.api_key = os.getenv("OG_STORAGE_API_KEY")
        self.client = httpx.AsyncClient(timeout=5.0)

    async def write(self, key: str, data: Any) -> bool:
        if not self.api_key or "api.0g.ai" not in self.url:
            return False
        
        payload = {"key": key, "data": data}
        headers = {"Authorization": f"Bearer {self.api_key}"}
        try:
            resp = await self.client.post(self.url, json=payload, headers=headers)
            return resp.status_code < 300
        except Exception:
            return False

    async def read(self, key: str) -> Optional[Any]:
        if not self.api_key or "api.0g.ai" not in self.url:
            return None

        read_url = self.url.replace("/write", "/read")
        headers = {"Authorization": f"Bearer {self.api_key}"}
        try:
            resp = await self.client.get(read_url, params={"key": key}, headers=headers)
            return resp.json() if resp.status_code == 200 else None
        except Exception:
            return None

og_client = OGStorageClient()
