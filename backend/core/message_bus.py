import asyncio
import httpx
import os
import json
from typing import Any, Dict, List, Callable, Awaitable, Optional

class MessageBus:
    def __init__(self, node_url: Optional[str] = None):
        self.node_url = node_url or os.getenv("AXL_NODE_URL", "http://localhost:9002")
        self.subscribers: Dict[str, List[Callable[[Dict[str, Any]], Awaitable[None]]]] = {}
        self.is_polling = False
        self.client = httpx.AsyncClient(timeout=5.0)

    async def subscribe(self, topic: str, callback: Callable[[Dict[str, Any]], Awaitable[None]]):
        if topic not in self.subscribers:
            self.subscribers[topic] = []
        self.subscribers[topic].append(callback)
        if not self.is_polling:
            self.is_polling = True
            asyncio.create_task(self._polling_loop())

    async def publish(self, topic: str, data: Dict[str, Any]):
        # Local dispatch
        await self._dispatch(topic, data)
        
        # AXL P2P Broadcast
        try:
            topo_resp = await self.client.get(f"{self.node_url}/topology")
            peers = topo_resp.json() if topo_resp.status_code == 200 else []
            for peer in peers:
                await self.client.post(f"{self.node_url}/send", json={
                    "destination": peer,
                    "data": {"topic": topic, "data": data}
                })
        except: pass

    async def _dispatch(self, topic: str, data: Dict[str, Any]):
        if topic in self.subscribers:
            for cb in self.subscribers[topic]:
                asyncio.create_task(cb(data))

    async def _polling_loop(self):
        while self.is_polling:
            try:
                resp = await self.client.get(f"{self.node_url}/recv")
                if resp.status_code == 200:
                    msgs = resp.json()
                    if not isinstance(msgs, list): msgs = [msgs]
                    for m in msgs:
                        raw = m.get("data", {})
                        if isinstance(raw, str): raw = json.loads(raw)
                        if "topic" in raw:
                            await self._dispatch(raw["topic"], raw.get("data", {}))
            except: pass
            await asyncio.sleep(0.5)

bus = MessageBus()
