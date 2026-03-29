import os
import json
import re
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """For follow-up questions about this disease, treatment, or plant care: give detailed, helpful answers.
- If the user asks something completely unrelated to plants or farming, respond with this exact format:
  "I'm specialized in plant diseases, so I can't give a detailed answer on that"
- Be conversational and friendly like a knowledgeable agronomist."""

def get_recommendation(disease_name: str) -> str:
    # legacy, unchanged
    if "healthy" in disease_name.lower():
        prompt = f"The plant has been scanned and is healthy: {disease_name}. Give brief tips on maintaining plant health and what symptoms to watch for."
    else:
        prompt = f"A plant has been diagnosed with: {disease_name}. Provide treatment and recovery recommendations for a farmer."
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "system", "content": SYSTEM_PROMPT}, {"role": "user", "content": prompt}],
        max_tokens=250,
        temperature=0.4,
    )
    return response.choices[0].message.content

def chat_about_disease(disease_name: str, history: list, user_message: str):
    # unchanged
    system = f"""{SYSTEM_PROMPT}

IMPORTANT CONTEXT: This conversation is about a plant diagnosed with '{disease_name}'.
Answer all follow-up questions about this disease, treatment, and plant care.
If the user asks something unrelated to plants or farming, politely redirect them.
Be conversational and friendly like a knowledgeable agronomist."""
    messages = [{"role": "system", "content": system}] + history + [{"role": "user", "content": user_message}]
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        max_tokens=350,
        temperature=0.5,
    )
    reply = response.choices[0].message.content
    history.append({"role": "user", "content": user_message})
    history.append({"role": "assistant", "content": reply})
    return reply, history

def get_detailed_diagnosis(disease_name: str) -> dict:
    """
    Send disease name to Groq and get structured JSON with analysis, treatment, prevention, health score.
    """
    if "healthy" in disease_name.lower():
        return {
            "disease_analysis": "Your plant appears healthy. No disease symptoms detected.",
            "immediate_treatment": "Continue regular care. Monitor for any changes.",
            "preventive_measures": "Maintain proper watering, sunlight, and soil nutrition.",
            "health_score": 95
        }

    prompt = f"""You are an expert agricultural pathologist. For the plant disease "{disease_name}", generate a JSON object with exactly the following keys:

- "disease_analysis": A detailed description (2-4 sentences) of the disease, its cause, how it spreads, and typical symptoms.
- "immediate_treatment": A numbered list (as a single string, using newlines) of 3-5 actionable steps the farmer should take right now.
- "preventive_measures": A numbered list (as a single string, using newlines) of 3-4 long-term practices to prevent recurrence.
- "health_score": An integer between 0 and 100 indicating the typical remaining health of a plant with this disease (0 = very severe, 100 = healthy).

Output ONLY valid JSON, no other text. Example:
{{
  "disease_analysis": "Powdery mildew is a fungal disease caused by high humidity...",
  "immediate_treatment": "1. Remove infected leaves.\\n2. Apply milk spray...",
  "preventive_measures": "1. Improve air circulation.\\n2. Water at base...",
  "health_score": 45
}}

Now generate for "{disease_name}":
"""
    try:
        print(f"[Groq] Requesting diagnosis for: {disease_name}")
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a JSON generator for plant disease information. Output only valid JSON."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=800,
            temperature=0.3,
        )
        raw = response.choices[0].message.content
        print(f"[Groq] Raw JSON response: {raw[:200]}...")
        # Clean possible markdown
        raw = raw.strip()
        if raw.startswith("```json"):
            raw = raw[7:]
        if raw.startswith("```"):
            raw = raw[3:]
        if raw.endswith("```"):
            raw = raw[:-3]
        data = json.loads(raw)
        # Ensure all keys present
        return {
            "disease_analysis": data.get("disease_analysis", "No analysis available."),
            "immediate_treatment": data.get("immediate_treatment", "No treatment steps provided."),
            "preventive_measures": data.get("preventive_measures", "No preventive measures provided."),
            "health_score": data.get("health_score", 50)
        }
    except Exception as e:
        print(f"[Groq] Error: {e}")
        return {
            "disease_analysis": f"Unable to retrieve analysis for {disease_name}. Please consult a local agronomist.",
            "immediate_treatment": "1. Remove affected parts.\n2. Improve air circulation.\n3. Apply appropriate treatment.",
            "preventive_measures": "1. Rotate crops.\n2. Water at base.\n3. Use resistant varieties.",
            "health_score": 45
        }