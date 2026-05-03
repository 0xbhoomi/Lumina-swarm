import requests
import json

def test_requests():
    key = "sk-2b98d8fe-3947-447b-8264-c549d6a95b82"
    url = "https://router-api.0g.ai/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {key}", 
        "Content-Type": "application/json"
    }
    payload = {
        "model": "qwen-2.5-72b-instruct",
        "messages": [{"role": "user", "content": "hi"}],
        "max_tokens": 10
    }
    
    print(f"Testing with requests: {key}")
    resp = requests.post(url, headers=headers, json=payload, timeout=10.0)
    print(f"Status: {resp.status_code}")
    print(f"Response: {resp.text}")

if __name__ == "__main__":
    test_requests()
