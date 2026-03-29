<div align="center">

<img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>

# 🌱 Plant Disease Detection System

**An end-to-end AI-powered platform for real-time plant disease diagnosis, intelligent treatment recommendations, and hardware-integrated health signaling.**

[Features](#-features) · [Demo](#-api-demo) · [Quick Start](#-quick-start) · [API Reference](#-api-reference) · [Architecture](#-architecture)

</div>

---

## 📌 Overview

Plant Disease Detection System is a full-stack AI application built for real-world agricultural use. Upload a leaf image and get an instant diagnosis powered by a MobileNetV2 deep learning model trained on the PlantVillage dataset. The system then connects to **Llama 3.3 70B** via Groq to generate structured treatment recommendations and opens a disease-aware conversational chatbot for follow-up questions.

> Built as a 3rd Year Electrical Engineering project at **IEM Kolkata**.

---

## ✨ Features

- 🔬 **15-class disease classification** across pepper, potato, and tomato plants
- 📊 **Confidence scoring** — model returns health percentage for each prediction
- 🤖 **AI recommendations** — structured advice (description, treatment, prevention) via Llama 3.3 70B
- 💬 **Contextual chatbot** — disease-aware follow-up conversation with full session memory
- 🔌 **Arduino integration** — real-time healthy/diseased signal over serial (COM3)
- ⚡ **REST API** — clean 2-endpoint API consumable from any client (Postman, mobile, web)
- 🌐 **React frontend** — responsive UI with live image preview and chat interface

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│              React + Vite  (localhost:5173)                  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP POST
┌────────────────────────▼────────────────────────────────────┐
│                       API LAYER                             │
│                FastAPI  (localhost:8000)                     │
│          /predict              /chat                         │
└──────┬─────────────────────────────┬───────────────────────-┘
       │                             │
┌──────▼──────┐             ┌────────▼────────┐
│  ML LAYER   │             │   LLM LAYER     │
│ TensorFlow  │             │  Groq API       │
│ MobileNetV2 │             │  Llama 3.3 70B  │
│ .h5 model   │             │                 │
└──────┬──────┘             └─────────────────┘
       │
┌──────▼──────┐
│  HARDWARE   │
│   Arduino   │
│    COM3     │
└─────────────┘
```

---

## 📁 Project Structure

```
PLANT_DISEASE_API/
│
├── app/                          # Backend application
│   ├── __init__.py
│   ├── config.py                 # Path configuration
│   ├── image_utils.py            # Image preprocessing pipeline
│   ├── main.py                   # FastAPI routes (/predict, /chat)
│   ├── model_handler.py          # TF inference + Arduino signaling
│   └── recommend.py              # Groq LLM integration
│
├── frontend/                     # React application
│   ├── src/
│   │   ├── App.jsx               # Main UI component
│   │   ├── App.css               # Styles
│   │   └── main.jsx              # React entry point
│   ├── dist/                     # Production build output
│   ├── package.json
│   └── vite.config.js
│
├── models/                       # ML model artifacts
│   ├── plant_disease_model_mobilenetv2.h5
│   └── plantvillage_class_names.json
│
├── sketch_oct30a/                # Arduino firmware
├── test_images/                  # Sample test images
├── .env                          # Environment variables (never commit)
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version |
|---|---|
| Python | 3.10+ |
| Node.js | 18+ |
| Groq API Key | Free at [console.groq.com](https://console.groq.com) |

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/PLANT_DISEASE_API.git
cd PLANT_DISEASE_API
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 4. Install frontend dependencies

```bash
cd frontend
npm install
```

### 5. Run the application

Open two terminals:

**Terminal 1 — Backend**
```bash
uvicorn app.main:app --reload
# Running on http://localhost:8000
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm run dev
# Running on http://localhost:5173
```

---

## 📡 API Reference

### `POST /predict`

Accepts a plant leaf image and returns a full disease analysis.

**Request**

```http
POST /predict
Content-Type: multipart/form-data

file: <image file>
```

**Response `200 OK`**

```json
{
  "predicted_class": 9,
  "class_name": "Tomato_Septoria_leaf_spot",
  "health_percentage": 94.72,
  "health_label": 0,
  "signal": "DISEASED",
  "recommendation": {
    "description": "Septoria leaf spot is a fungal disease causing small circular spots with dark borders, typically appearing on lower leaves first.",
    "treatment": "Apply chlorothalonil or copper-based fungicide every 7 days. Remove and destroy all infected leaves immediately.",
    "prevention": "Avoid overhead watering, rotate crops annually, ensure adequate plant spacing for airflow."
  },
  "session_id": "905447ac-cb97-4778-9398-9c4620dd3450"
}
```

| Field | Type | Description |
|---|---|---|
| `predicted_class` | `int` | Index of predicted disease class (0–14) |
| `class_name` | `string` | Full disease class name |
| `health_percentage` | `float` | Model confidence score (0–100%) |
| `health_label` | `int` | `1` = healthy, `0` = diseased |
| `signal` | `string` | `"HEALTHY"` or `"DISEASED"` |
| `recommendation.description` | `string` | What the disease is |
| `recommendation.treatment` | `string` | How to treat it now |
| `recommendation.prevention` | `string` | How to prevent recurrence |
| `session_id` | `string` | UUID for follow-up chat session |

---

### `POST /chat`

Send a follow-up question about the diagnosed disease. Requires a valid `session_id` from `/predict`.

**Request**

```http
POST /chat
Content-Type: application/json

{
  "session_id": "905447ac-cb97-4778-9398-9c4620dd3450",
  "message": "How long does the treatment take to show results?"
}
```

**Response `200 OK`**

```json
{
  "reply": "For Septoria leaf spot, you should start seeing improvement within 2–3 weeks with consistent fungicide application. Make sure to reapply after rainfall..."
}
```

**Error Responses**

| Status | Meaning |
|---|---|
| `400` | Empty or invalid image file |
| `404` | Session expired or not found |

---

## 🌿 Supported Classes

| Index | Class | Status |
|---|---|---|
| 0 | Pepper Bell — Bacterial Spot | 🔴 Diseased |
| 1 | Pepper Bell — Healthy | 🟢 Healthy |
| 2 | Potato — Early Blight | 🔴 Diseased |
| 3 | Potato — Late Blight | 🔴 Diseased |
| 4 | Potato — Healthy | 🟢 Healthy |
| 5 | Tomato — Bacterial Spot | 🔴 Diseased |
| 6 | Tomato — Early Blight | 🔴 Diseased |
| 7 | Tomato — Late Blight | 🔴 Diseased |
| 8 | Tomato — Leaf Mold | 🔴 Diseased |
| 9 | Tomato — Septoria Leaf Spot | 🔴 Diseased |
| 10 | Tomato — Spider Mites | 🔴 Diseased |
| 11 | Tomato — Target Spot | 🔴 Diseased |
| 12 | Tomato — Yellow Leaf Curl Virus | 🔴 Diseased |
| 13 | Tomato — Mosaic Virus | 🔴 Diseased |
| 14 | Tomato — Healthy | 🟢 Healthy |

---

## 🔌 Arduino Integration

The system automatically signals an Arduino connected on **COM3** at **9600 baud** after every prediction.

| Signal Byte | Meaning | Trigger |
|---|---|---|
| `b'1'` | Healthy | Class name contains "healthy" |
| `b'0'` | Diseased | All other classes |

The Arduino sketch is located in `sketch_oct30a/`. Flash it to your Arduino before running the backend. If Arduino is not connected, the error is silently logged and the API continues normally.

---

## 📦 Dependencies

**Backend (`requirements.txt`)**

```
fastapi
uvicorn
tensorflow
pillow
numpy
groq
python-dotenv
pyserial
python-multipart
pydantic
```

**Frontend**

```
react
vite
```

---

## 🛠️ Development Notes

- Chat sessions are stored **in-memory** — they reset when the backend restarts. For production, replace `chat_sessions: dict` in `main.py` with Redis.
- The `.env` file must never be committed. It is already listed in `.gitignore`.
- `frontend/dist/` is the compiled build output — do not edit manually. Always run `npm run build` after changes to `src/`.
- Arduino connection failure is non-blocking — the API returns results even if COM3 is unavailable.

---

## 🙏 Acknowledgements

- [PlantVillage Dataset](https://www.kaggle.com/datasets/emmarex/plantdisease) — Hughes & Salathé, 2015
- [MobileNetV2](https://arxiv.org/abs/1801.04381) — Sandler et al., Google, 2018
- [Groq](https://console.groq.com) — Ultra-fast Llama 3.3 70B inference
- [FastAPI](https://fastapi.tiangolo.com) — Modern Python web framework
- [PlantVillage](https://plantvillage.psu.edu) — Penn State University

---

## 📄 License

```
MIT License — Free to use for educational and research purposes.
Copyright (c) 2025 IEM Electrical Engineering
```

---

<div align="center">
Made with ❤️ at IEM Kolkata · Powered by React, FastAPI, TensorFlow & Llama 3.3
</div>
