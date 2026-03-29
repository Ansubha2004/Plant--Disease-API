import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'plant_disease_model_mobilenetv2.h5')
CLASS_NAMES_PATH = os.path.join(BASE_DIR, 'models', 'plantvillage_class_names.json')
