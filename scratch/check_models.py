import requests
import json

def get_models():
    url = "https://openrouter.ai/api/v1/models"
    response = requests.get(url)
    if response.status_code == 200:
        models = response.json().get('data', [])
        # Simplify the list for ranking
        simple_models = []
        for m in models:
            simple_models.append({
                "id": m['id'],
                "name": m['name'],
                "pricing": m.get('pricing', {}),
                "context_length": m.get('context_length')
            })
        
        # Sort by popularity or just take a sample of "Free" and "Top" models
        # For now, let's just print the first 50 to see the format
        print(json.dumps(simple_models[:100], indent=2))
    else:
        print(f"Error: {response.status_code}")

if __name__ == "__main__":
    get_models()
