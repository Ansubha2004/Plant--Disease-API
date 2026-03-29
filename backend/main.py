import uuid
import io
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.image_utils import preprocess_image
from app.model_handler import predict_image
from app.recommend import get_detailed_diagnosis, chat_about_disease
from PIL import Image

app = FastAPI()

origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chat_sessions: dict = {}

class ChatRequest(BaseModel):
    session_id: str
    message: str

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    if len(contents) == 0:
        return JSONResponse({"error": "Empty file received"}, status_code=400)

    # 1. Validate image
    try:
        Image.open(io.BytesIO(contents))
    except Exception as e:
        return JSONResponse({"error": f"Invalid image: {str(e)}"}, status_code=400)

    # 2. Preprocess image → array
    image_array = preprocess_image(contents)   # ← this line was missing

    # 3. Get disease name from your TensorFlow model
    result = predict_image(image_array)
    disease_name = result.get("class_name", "Unknown")
    class_index = result.get("class_index", -1)

    # 4. Get detailed diagnosis (analysis, treatment, prevention, health score) from Groq
    diagnosis = get_detailed_diagnosis(disease_name)   # returns dict with health_score

    # 5. Create chat session
    session_id = str(uuid.uuid4())
    chat_sessions[session_id] = {
        "disease": disease_name,
        "history": []
    }

    # 6. Return frontend‑ready JSON
    return JSONResponse({
        "class_name": disease_name,
        "predicted_class": class_index,
        "health_label": diagnosis["health_score"],           # Groq‑generated health score
        "disease_analysis": diagnosis["disease_analysis"],
        "immediate_treatment": diagnosis["immediate_treatment"],
        "preventive_measures": diagnosis["preventive_measures"],
        "session_id": session_id,
    })

@app.post("/chat")
async def chat(req: ChatRequest):
    session = chat_sessions.get(req.session_id)
    if not session:
        return JSONResponse({"error": "Session expired"}, status_code=404)
    reply, updated_history = chat_about_disease(
        disease_name=session["disease"],
        history=session["history"],
        user_message=req.message,
    )
    chat_sessions[req.session_id]["history"] = updated_history
    return JSONResponse({"reply": reply})