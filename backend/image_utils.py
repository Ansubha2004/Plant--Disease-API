from PIL import Image
import numpy as np
import io


def preprocess_image(contents: bytes):
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0).astype(np.float32)
    return image_array