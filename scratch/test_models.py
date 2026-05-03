import asyncio
import httpx
import os
from dotenv import load_dotenv

# Path to the .env file in Lumina-swarm
env_path = r"c:\Users\yadav\OneDrive\Desktop\bhooomi\Lumina-swarm\.env"
load_dotenv(env_path)

async def test_models():
    compute_key = os.getenv("OG_COMPUTE_API_KEY")
    url = "https://router-api.0g.ai/v1/chat/completions"
    
    models = ["qwen-2.5-72b-instruct", "qwen-2.5-7b-instruct", "qwen2.5-72b-instruct", "meta-llama/llama-3-70b-instruct"]
    
    async with httpx.AsyncClient() as client:
        for model in models:
            print(f"Testing model: {model}...")
            # Try with both prefixes just in case
            for prefix in ["", "app-sk-"]:
                current_key = compute_key if not prefix else f"{prefix}{compute_key.replace('sk-', '')}"
                headers = {"Authorization": f"Bearer {current_key}", "Content-Type": "application/json"}
                payload = {
                    "model": model,
                    "messages": [{"role": "user", "content": "hi"}],
                    "max_tokens": 10
                }
                try:
                    resp = await client.post(url, headers=headers, json=payload, timeout=10.0)
                    print(f"Prefix: {prefix or 'none'}, Status: {resp.status_code}")
                    if resp.status_code == 200:
                        print(f"SUCCESS with model {model} and prefix {prefix}")
                        return
                except Exception as e:
                    print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_models())
