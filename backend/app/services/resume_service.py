# backend/app/services/resume_service.py

import pdfplumber
from sqlalchemy.orm import Session
from fastapi import UploadFile
from ..db import models
from . import llm_service # Import the new LLM service

def parse_and_save_resume(db: Session, file: UploadFile, user_id: int):
    """
    Parses a PDF, sends its text to an LLM for analysis, and saves the
    structured data to the database.
    """
    # 1. Extract text from the PDF
    try:
        with pdfplumber.open(file.file) as pdf:
            full_text = "".join(page.extract_text() for page in pdf.pages)
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return None

    # 2. Analyze the text with the LLM
    if not full_text:
        return None # Can't process an empty resume
        
    analysis_result = llm_service.analyze_resume_text(full_text)
    
    if not analysis_result:
        print("LLM analysis failed.")
        return None # LLM processing failed

    # 3. Create the Resume record with the analyzed data
    new_resume = models.Resume(
        file_name=file.filename,
        owner_id=user_id,  # Set the owner_id to link to the user
        # Basic info
        name=analysis_result.get("name"),
        email=analysis_result.get("email"),
        phone=analysis_result.get("phone"),
        summary=analysis_result.get("summary"),
        # Structured JSON data
        links=analysis_result.get("links"),
        skills=analysis_result.get("skills"),
        work_experience=analysis_result.get("work_experience"),
        education=analysis_result.get("education"),
        projects=analysis_result.get("projects"),
        # AI analysis
        resume_rating=analysis_result.get("resume_rating"),
        improvement_areas=analysis_result.get("improvement_areas"),
        upskill_suggestions=analysis_result.get("upskill_suggestions")
    )

    # 4. Add to database, commit, and refresh
    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    return new_resume