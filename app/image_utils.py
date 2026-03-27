from PIL import Image
import numpy as np

def preprocess_image(image_file):
    TARGET_SIZE = (224, 224)
    image = Image.open(image_file)
    image = image.resize(TARGET_SIZE)
    image = image.convert("RGB")
    image_array = np.array(image) / 255.0
    image_array = image_array.reshape((1,) + image_array.shape) # Add batch dimension
    return image_array
