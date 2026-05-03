from fastapi import FastAPI, Request
import uvicorn
import json

app = FastAPI()

# Counter to simulate different behaviors for the 3 trades
trade_counter = 0

@app.post("/")
async def mcp_handler(request: Request):
    global trade_counter
    body = await request.json()
    params = body.get("params", {})
    args = params.get("arguments", {})
    
    trade_counter += 1
    
    print(f"\n[Mock KeeperHub] [SAFETY LAYER] Validating Trade Intent...")
    print(f"[Mock KeeperHub] Action: {args.get('action').upper()} | Amount: {args.get('amount')} | Slippage: {args.get('slippage_bps')} bps")

    # Trade 2: Simulate a slippage failure on first attempt
    if trade_counter == 2:
        print(f"[Mock KeeperHub] [SAFETY LAYER] REJECTED: Slippage {args.get('slippage_bps')} bps exceeds market depth.")
        return {
            "jsonrpc": "2.0",
            "error": {"code": -32000, "message": "Execution Safety Layer: Slippage Revert"},
            "id": body.get("id")
        }

    # Success case
    print(f"[Mock KeeperHub] [SAFETY LAYER] APPROVED. Routing to Solver...")
    return {
        "jsonrpc": "2.0",
        "result": {
            "status": "success",
            "tx_hash": f"0x{trade_counter}" + "f"*62,
            "msg": f"KeeperHub executed {args.get('action')} on chain {args.get('chain_id')}"
        },
        "id": body.get("id")
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=3001)
