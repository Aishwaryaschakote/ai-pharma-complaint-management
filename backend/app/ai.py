from groq import Groq  # type: ignore
from app.config import GROQ_API_KEY
import json

client = Groq(api_key=GROQ_API_KEY)


def clean_json(result: str):

    result = result.strip()

    if "<think>" in result:
        result = result.split("</think>")[-1].strip()

    if result.startswith("```json"):
        result = result.replace("```json", "", 1).strip()

    if result.startswith("```"):
        result = result.replace("```", "", 1).strip()

    if result.endswith("```"):
        result = result[:-3].strip()

    return result


def analyze_complaint(text: str):

    with open(
        "app/prompts/complaint_extractor.txt",
        "r",
        encoding="utf-8",
    ) as f:
        prompt = f.read()

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": prompt,
            },
            {
                "role": "user",
                "content": text,
            },
        ],
    )

    result = clean_json(
        response.choices[0].message.content
    )

    try:
        return json.loads(result)

    except Exception:

        return {
            "raw_response": result
        }


# -----------------------------
# NEW FUNCTION
# -----------------------------
def refine_complaint(current_json, user_instruction):

    prompt = f"""
You are a pharmaceutical complaint assistant.

Below is the current complaint information.

Current JSON:

{json.dumps(current_json, indent=2)}

The user has provided a correction.

User Correction:
{user_instruction}

Instructions:

- Update ONLY the affected fields.
- Keep all other fields unchanged.
- Return ONLY valid JSON.
- Do not explain anything.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": prompt,
            }
        ],
    )

    result = clean_json(
        response.choices[0].message.content
    )

    try:
        return json.loads(result)

    except Exception:

        return current_json