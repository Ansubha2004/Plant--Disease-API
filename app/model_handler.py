import json
import numpy as np
from app.config import MODEL_PATH, CLASS_NAMES_PATH
from app.recommend import get_recommendation
import serial
import time

# Load class names at startup (lightweight - just a JSON file)
try:
    with open(CLASS_NAMES_PATH, 'r') as f:
        class_names = json.load(f)
except Exception as e:
    raise RuntimeError(f"Could not load class names: {e}")

# Lazy load model - only loaded on first prediction request
_model = None

def get_model():
    global _model
    if _model is None:
        import tensorflow as tf
        print("Loading TensorFlow model...")
        _model = tf.keras.models.load_model(MODEL_PATH)
        print("Model loaded successfully.")
    return _model


def signal_to_arduino(health_label):
    try:
        arduino = serial.Serial('COM3', 9600)
        time.sleep(2)
        arduino.write(b'1' if health_label == 1 else b'0')
        time.sleep(0.5)
        arduino.close()
    except Exception as e:
        print(f"Error communicating with Arduino: {e}")


def predict_image(image_array):
    model = get_model()  # loads only on first call
    predictions = model.predict(image_array)
    predicted_class_idx = predictions.argmax(axis=1)[0]
    predicted_class_label = class_names[predicted_class_idx]

    health_percentage = round(float(np.max(predictions)) * 100, 2)
    recommendation = get_recommendation(predicted_class_label)
    health_label = 1 if "healthy" in predicted_class_label.lower() else 0
    signal = "HEALTHY" if health_label == 1 else "DISEASED"

    signal_to_arduino(health_label)

    print(f"DEBUG: class={predicted_class_label}, confidence={health_percentage}%, signal={signal}")

    return {
        "class_index":       int(predicted_class_idx),
        "class_name":        predicted_class_label,
        "health_percentage": health_percentage,
        "health_label":      health_label,
        "signal":            signal,
        "recommendation":    recommendation,
    }
