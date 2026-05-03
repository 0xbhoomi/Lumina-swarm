import asyncio
import os
import time
from fastapi import FastAPI, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load ENV before imports
load_dotenv()

from .orchestrator import orchestrator
from .core.message_bus import bus
from .core.memory import memory_system
from .services.market_data import market_data
from .services.keeperhub import keeper_hub_service
from .services.og_compute import og_compute

app = FastAPI(title="Lumina Swarm API")

_price_cache = {"value": {"ethereum": 2850.42, "usdc": 1.0}, "updated_at": 0.0}
_PRICE_CACHE_TTL = 30

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    print(f"[Startup] Loading ENV: OG_COMPUTE_API_KEY length={len(os.getenv('OG_COMPUTE_API_KEY', ''))}")
    print(f"[Startup] Loading ENV: OG_STORAGE_API_KEY length={len(os.getenv('OG_STORAGE_API_KEY', ''))}")
    # Start the swarm in the background
    asyncio.create_task(orchestrator.start())

@app.get("/status")
async def get_status():
    return {"status": "running", "ok": True}

@app.get("/price")
async def get_price():
    prices = await market_data.fetch_price(["ethereum", "usdc"])
    return prices

@app.get("/quote")
async def get_quote(sellToken: str, buyToken: str, sellAmount: str):
    # Mock quote for demo
    return {
        "buyAmount": str(int(sellAmount) * 2850),
        "estimatedGas": "150000",
        "guaranteedPrice": "2850.42"
    }

@app.post("/api/ai-decision")
async def get_ai_decision(body: Request):
    # This endpoint should trigger the agent flow and return the result from memory
    # For a reactive UI, we can return the latest stored analysis
    analysis = await memory_system.retrieve("analyst_memory_latest")
    decision = await memory_system.retrieve("execution_history_latest")
    
    if decision:
        output = decision.get("output", {})
        return {
            "action": output.get("decision", "HOLD").upper(),
            "asset": "ETH",
            "confidence": output.get("confidence", 0.5),
            "reasoning": output.get("reason", "Awaiting market signal")
        }
    return {"action": "HOLD", "asset": "ETH", "confidence": 0.5, "reasoning": "Analyzing market..."}

@app.post("/api/swap-tx")
async def get_swap_tx(body: Request):
    # This would normally build a Uniswap call, but we are using KeeperHub
    return {
        "to": "0xE592427A0AEce92De3Edee1F18E0157C05861564", # Uniswap Router or KeeperHub
        "data": "0x",
        "value": "0"
    }

@app.post("/0g/storage/write")
async def og_storage_write(request: Request):
    body = await request.json()
    payload = body.get("payload", {})
    key = payload.get("key", "ui_event")
    await memory_system.save(key, payload)
    return {"status": "success", "key": key}

@app.post("/0g/compute/infer")
async def og_compute_infer(request: Request):
    body = await request.json()
    payload = body.get("payload", {})
    prompt = payload.get("prompt", "")
    model = payload.get("model", "qwen-2.5-72b-instruct")
    
    if not prompt:
        return {"result": "No prompt provided."}
        
    result = await og_compute.infer(prompt, model=model)
    return {"result": result}

@app.get("/history")
async def get_history():
    # Return recent memory slices
    mem = await memory_system.retrieve("execution_history_latest")
    return [mem] if mem else []

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
