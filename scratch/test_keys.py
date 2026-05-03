import asyncio
import httpx
import os
from dotenv import load_dotenv

# Path to the .env file in Lumina-swarm
env_path = r"c:\Users\yadav\OneDrive\Desktop\bhooomi\Lumina-swarm\.env"
load_dotenv(env_path)

async def test_keys():
    compute_key = os.getenv("OG_COMPUTE_API_KEY")
    storage_key = os.getenv("OG_STORAGE_API_KEY")
    
    url = "https://router-api.0g.ai/v1/chat/completions"
    payload = {
        "model": "qwen-2.5-72b-instruct",
        "messages": [{"role": "user", "content": "hi"}],
        "max_tokens": 10
    }
    
    keys_to_test = [compute_key, storage_key]
    if compute_key:
        if not compute_key.startswith("app-sk-"):
            keys_to_test.append(f"app-sk-{compute_key.replace('sk-', '')}")
    if storage_key:
        if not storage_key.startswith("app-sk-"):
            keys_to_test.append(f"app-sk-{storage_key.replace('sk-', '')}")

    async with httpx.AsyncClient() as client:
        for key in set(keys_to_test):
            if not key: continue
            print(f"Testing key: {key[:10]}...")
            headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}
            try:
                resp = await client.post(url, headers=headers, json=payload, timeout=10.0)
                print(f"Status: {resp.status_code}")
                if resp.status_code == 200:
                    print(f"SUCCESS with key {key[:10]}...")
                    return
                else:
                    print(f"Response: {resp.text}")
            except Exception as e:
                print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_keys())
