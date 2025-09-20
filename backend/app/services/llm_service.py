# backend/app/services/llm_service.py

import json
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.schema import HumanMessage
from ..core.config import settings

def get_llm():
    """Initializes and returns the Gemini Pro LLM model."""
    return ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=settings.GEMINI_API_KEY,
        convert_system_message_to_human=True
    )

def analyze_resume_text(resume_text: str) -> dict:
    """
    Analyzes the resume text using Gemini AI to extract structured data.
    """
    llm = get_llm()

    # This is the prompt template. It's a blueprint for the instructions we send to the AI.
    # We are asking it to act as an expert and return a specific JSON structure.
    prompt = PromptTemplate(
        template="""
        You are an expert technical recruiter and career coach. Your task is to analyze the provided resume text and extract key information in a structured JSON format.

        Here is the resume text:
        ---------------------
        {resume_text}
        ---------------------

        Based on the text, provide the following information:
        1.  **name**: The full name of the candidate.
        2.  **email**: The primary email address.
        3.  **phone**: The primary phone number.
        4.  **summary**: A 2-3 sentence professional summary. If not present, create one based on the experience.
        5.  **links**: A list of professional links (e.g., LinkedIn, GitHub, Portfolio). Each link should be an object with "label" and "url".
        6.  **skills**: An object with three lists: "technical" (programming languages, frameworks, databases), "soft" (communication, teamwork), and "tools" (software, platforms like Git, Jira).
        7.  **work_experience**: A list of jobs. Each job should be an object with "company", "role", "dates", and "responsibilities" (a list of strings).
        8.  **education**: A list of educational qualifications. Each should be an object with "institution", "degree", and "year".
        9.  **projects**: A list of personal or academic projects. Each should be an object with "name", "description", and "technologies" (a list of strings).
        10. **resume_rating**: Your overall rating of the resume on a scale of 1 to 10, considering clarity, impact, and completeness.
        11. **improvement_areas**: A list of 3-5 specific, actionable suggestions for improving the resume.
        12. **upskill_suggestions**: A list of 3 relevant skills or technologies the candidate could learn to advance their career, based on their current profile.

        Please return ONLY a valid JSON object with the specified keys. Do not include any explanatory text before or after the JSON.
        The JSON output should look like this:
        {{
            "name": "...",
            "email": "...",
            "phone": "...",
            "summary": "...",
            "links": [{{ "label": "LinkedIn", "url": "..." }}],
            "skills": {{ "technical": [], "soft": [], "tools": [] }},
            "work_experience": [{{ "company": "...", "role": "...", "dates": "...", "responsibilities": [] }}],
            "education": [{{ "institution": "...", "degree": "...", "year": "..." }}],
            "projects": [{{ "name": "...", "description": "...", "technologies": [] }}],
            "resume_rating": 8,
            "improvement_areas": [],
            "upskill_suggestions": []
        }}
        """,
        input_variables=["resume_text"],
    )

    # Format the prompt with the actual resume text
    formatted_prompt = prompt.format(resume_text=resume_text)
    
    # Send the request to the LLM
    message = HumanMessage(content=formatted_prompt)
    response = llm([message])

    try:
        # The response content should be a JSON string, so we parse it
        # Sometimes the LLM might wrap the JSON in ```json ... ```, so we strip that.
        json_string = response.content.strip().replace("```json", "").replace("```", "")
        parsed_json = json.loads(json_string)
        return parsed_json
    except (json.JSONDecodeError, AttributeError) as e:
        print(f"Error parsing JSON from LLM response: {e}")
        print(f"Raw response: {response.content}")
        return None