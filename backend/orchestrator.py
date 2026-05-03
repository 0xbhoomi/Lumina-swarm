import asyncio
from .core.message_bus import bus
from .core.memory import memory_system
from .agents.listener import ListenerAgent
from .agents.analyst import AnalystAgent
from .agents.executor import ExecutorAgent
from .services.keeperhub import keeper_hub_service

class SwarmOrchestrator:
    def __init__(self):
        self.listener = ListenerAgent(bus=bus, memory=memory_system)
        self.analyst = AnalystAgent(bus=bus, memory=memory_system)
        self.executor = ExecutorAgent(bus=bus, memory=memory_system, keeper_hub=keeper_hub_service)

    async def start(self):
        print("[Orchestrator] Starting Lumina Swarm Agents...")
        asyncio.create_task(self.analyst.run())
        asyncio.create_task(self.executor.run())
        asyncio.create_task(self.listener.run())
        
        # Keep alive
        while True:
            await asyncio.sleep(3600)

orchestrator = SwarmOrchestrator()