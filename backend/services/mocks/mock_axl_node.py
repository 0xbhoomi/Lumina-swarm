import asyncio
from fastapi import FastAPI, Request
import uvicorn
import json

app = FastAPI()

# Simple state for the mock AXL node
peers = ["analyst-peer-id", "executor-peer-id", "listener-peer-id"]
messages = []

@app.get("/topology")
async def get_topology():
    return peers

@app.post("/send")
async def send_message(request: Request):
    data = await request.json()
    # In a real node, this would route to the destination
    # Here we just put it in the queue for /recv to simulate the mesh
    messages.append({
        "source": "lumina-swarm-sender",
        "data": data.get("data")
    })
    print(f"[Mock AXL] Message sent to {data.get('destination')}")
    return {"status": "sent"}

@app.get("/recv")
async def receive_messages():
    if not messages:
        return []
    # Drain one message at a time
    return [messages.pop(0)]

def run_mock_node():
    uvicorn.run(app, host="127.0.0.1", port=9002)

if __name__ == "__main__":
    run_mock_node()
