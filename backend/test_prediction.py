import requests
import json

def test_prediction():
    print("🧪 Testing Plant Disease Prediction...")
    
    # Test with a healthy image
    try:
        with open("test_images/healthy_leaf.jpg", "rb") as f:
            files = {"file": ("healthy_leaf.jpg", f, "image/jpeg")}
            response = requests.post("http://localhost:8000/predict", files=files)
        
        print("✅ Prediction Response:")
        print(json.dumps(response.json(), indent=2))
        
        # Check Arduino status
        if response.json().get("arduino_connected"):
            status = response.json().get("status")
            if status == "healthy":
                print("🟢 GREEN LED should be glowing!")
            else:
                print("🔴 RED LED should be glowing!")
        else:
            print("❌ Arduino not connected")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_prediction()
    