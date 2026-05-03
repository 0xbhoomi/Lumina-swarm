import asyncio
import httpx
import os
from dotenv import load_dotenv

# Path to the .env file in Lumina-swarm
env_path = r"c:\Users\yadav\OneDrive\Desktop\bhooomi\Lumina-swarm\.env"
load_dotenv(env_path)

async def test_new_key():
    key = "sk-2b98d8fe-3947-447b-8264-c549d6a95b82"
    url = "https://router-api.0g.ai/v1/chat/completions"
    
    headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}
    payload = {
        "model": "qwen-2.5-72b-instruct",
        "messages": [{"role": "user", "content": "hi"}],
        "max_tokens": 10
    }
    
    async with httpx.AsyncClient() as client:
        print(f"Testing key: {key}...")
        resp = await client.post(url, headers=headers, json=payload, timeout=10.0)
        print(f"Status: {resp.status_code}")
        print(f"Response: {resp.text}")
        
        if resp.status_code == 401:
            print("Trying with app-sk- prefix...")
            headers["Authorization"] = f"Bearer app-sk-{key.replace('sk-', '')}"
            resp = await client.post(url, headers=headers, json=payload, timeout=10.0)
            print(f"Status: {resp.status_code}")
            print(f"Response: {resp.text}")

if __name__ == "__main__":
    asyncio.run(test_new_key())
