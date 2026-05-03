import asyncio
import httpx
import json
import os
from dotenv import load_dotenv

# Path to the .env file in Lumina-swarm
env_path = r"c:\Users\yadav\OneDrive\Desktop\bhooomi\Lumina-swarm\.env"
load_dotenv(env_path)

async def test_og_compute():
    from backend.services.og_compute import og_compute
    
    print("Testing 0G Compute Inference...")
    prompt = "Explain why Ethereum is a good long-term investment in 2 sentences."
    result = await og_compute.infer(prompt)
    print(f"Result:\n{result}\n")
    
    if "Error" in result or "Connection" in result:
        print("FAILED: Inference returned an error.")
    elif prompt in result:
        print("FAILED: Response repeats the prompt.")
    else:
        print("SUCCESS: Inference looks legitimate.")

async def test_market_data():
    from backend.services.market_data import market_data
    
    print("Testing Market Data Price...")
    prices = await market_data.fetch_price(["ethereum", "usdc"])
    print(f"Prices: {prices}\n")
    
    if prices.get("ethereum") == 2850.42:
        print("WARNING: ETH price is exactly the old mock value. Check if Coingecko is working.")
    elif prices.get("ethereum") > 0:
        print("SUCCESS: Received real market price.")
    else:
        print("FAILED: Price is 0 or missing.")

if __name__ == "__main__":
    # Add Lumina-swarm to sys.path
    import sys
    sys.path.append(r"c:\Users\yadav\OneDrive\Desktop\bhooomi\Lumina-swarm")
    
    asyncio.run(test_og_compute())
    asyncio.run(test_market_data())
