from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.image_utils import preprocess_image
from app.model_handler import predict_image

app = FastAPI()
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_array = preprocess_image(file.file)
    result = predict_image(image_array)
    return JSONResponse({
    "predicted_class": result.get("class_index"),
    "class_name": result.get("class_name", "unknown"),
    "recommendation": result.get("recommendation", "")
})
