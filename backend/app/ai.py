from groq import Groq  # type: ignore
from app.config import GROQ_API_KEY
import json

client = Groq(api_key=GROQ_API_KEY)


def analyze_complaint(text: str):

    # Load Prompt
    with open(
        "app/prompts/complaint_extractor.txt",
        "r",
        encoding="utf-8",
    ) as f:
        prompt = f.read()

    # Call Groq
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
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
        temperature=0,
    )

    result = response.choices[0].message.content.strip()

    # Remove reasoning tags
    if "<think>" in result:
        result = result.split("</think>")[-1].strip()

    # Remove markdown code fences
    if result.startswith("```json"):
        result = result.replace("```json", "", 1).strip()

    if result.startswith("```"):
        result = result.replace("```", "", 1).strip()

    if result.endswith("```"):
        result = result[:-3].strip()

    # Parse JSON
    try:
        return json.loads(result)

    except json.JSONDecodeError as e:
        print("\n========== JSON ERROR ==========")
        print(e)
        print("Returned by LLM:")
        print(result)
        print("================================\n")

        return {
            "raw_response": result
        }