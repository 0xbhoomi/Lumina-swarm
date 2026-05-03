import os
import json
from typing import Any, Optional
from ..services.og_storage import og_client

class AgentMemory:
    def __init__(self):
        # We'll use a local fallback for hackathon reliability
        self.fallback_file = "backend/storage_fallback.json"
        self._init_fallback()

    def _init_fallback(self):
        if not os.path.exists(self.fallback_file):
            os.makedirs(os.path.dirname(self.fallback_file), exist_ok=True)
            with open(self.fallback_file, "w") as f:
                json.dump({}, f)

    async def save(self, key: str, data: Any):
        # Local save
        try:
            with open(self.fallback_file, "r") as f:
                db = json.load(f)
            db[key] = data
            with open(self.fallback_file, "w") as f:
                json.dump(db, f, indent=2)
            print(f"[Memory] Persisted key '{key}' to local storage")
        except Exception as e:
            print(f"[Memory] Local save error: {e}")

        # Attempt 0G Cloud save
        await og_client.write(key, data)

    async def retrieve(self, key: str) -> Optional[Any]:
        # Try local first
        try:
            with open(self.fallback_file, "r") as f:
                db = json.load(f)
            if key in db:
                return db[key]
        except Exception:
            pass
        
        # Fallback to 0G Cloud
        return await og_client.read(key)

memory_system = AgentMemory()
