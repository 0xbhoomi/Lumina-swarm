from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Any, Dict, Optional
import asyncio

class BaseAgent(ABC):
    def __init__(self, name: str, bus: Optional[Any] = None, memory: Optional[Any] = None) -> None:
        self.name = name
        self.bus = bus
        self.memory = memory

    def _build_payload(self, input_data: Dict[str, Any], output_data: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "agent": self.name,
            "timestamp": asyncio.get_event_loop().time(),
            "input": input_data,
            "output": output_data
        }

    async def publish(self, topic: str, data: Dict[str, Any]):
        if self.bus:
            await self.bus.publish(topic, data)

    @abstractmethod
    def process(self, input_data: Dict[str, Any] | None = None) -> Dict[str, Any]:
        pass

    @abstractmethod
    async def run(self):
        pass