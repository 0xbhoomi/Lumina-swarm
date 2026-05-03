import asyncio
import httpx
import os
from dotenv import load_dotenv

# Path to the .env file in Lumina-swarm
env_path = r"c:\Users\yadav\OneDrive\Desktop\bhooomi\Lumina-swarm\.env"
load_dotenv(env_path)

async def test_legacy_url():
    compute_key = os.getenv("OG_COMPUTE_API_KEY")
    url = "https://api.0g.ai/compute/infer"
    
    # Try different payload formats as we don't know what /compute/infer expects
    payloads = [
        {"payload": {"prompt": "hi", "model": "qwen-2.5-72b-instruct"}},
        {"prompt": "hi", "model": "qwen-2.5-72b-instruct"},
        {"messages": [{"role": "user", "content": "hi"}], "model": "qwen-2.5-72b-instruct"}
    ]
    
    async with httpx.AsyncClient() as client:
        for payload in payloads:
            print(f"Testing payload: {json.dumps(payload)[:30]}...")
            headers = {"Authorization": f"Bearer {compute_key}", "Content-Type": "application/json"}
            try:
                resp = await client.post(url, headers=headers, json=payload, timeout=10.0)
                print(f"Status: {resp.status_code}")
                print(f"Response: {resp.text[:100]}")
            except Exception as e:
                print(f"Error: {e}")

if __name__ == "__main__":
    import json
    asyncio.run(test_legacy_url())
