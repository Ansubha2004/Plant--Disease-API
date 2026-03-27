import tensorflow as tf
import json
from app.config import MODEL_PATH, CLASS_NAMES_PATH
from app.recommend import recommendations
import serial
import time

def signal_to_arduino(health_label):
    # Only signals 1 (healthy) or 0 (unhealthy) sent
    try:
        arduino = serial.Serial('COM3', 9600)
        time.sleep(2)
        arduino.write(b'1' if health_label == 1 else b'0')
        time.sleep(0.5)
        arduino.close()
    except Exception as e:
        print(f"Error communicating with Arduino: {e}")

try:
    with open(CLASS_NAMES_PATH, 'r') as f:
        class_names = json.load(f)
except Exception as e:
    raise RuntimeError(f"Could not load class names: {e}")

model = tf.keras.models.load_model(MODEL_PATH)
def predict_image(image_array):
    predictions = model.predict(image_array)
    predicted_class_idx = predictions.argmax(axis=1)[0]
    predicted_class_label = class_names[predicted_class_idx]
    recommended_cure = recommendations[predicted_class_idx]

    # Debug print AFTER all variables are defined
    print("DEBUG predict_image output:", recommended_cure, predicted_class_label)

    health_label = 1 if recommended_cure.startswith("Healthy") else 0
    signal_to_arduino(health_label)

    return {
        "class_index": int(predicted_class_idx),
        "class_name": predicted_class_label,
        "recommendation": recommended_cure,
        "health_label": health_label
    }

