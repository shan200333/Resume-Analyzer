# backend/app/api/resume_routes.py
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..db.database import get_db
from ..db import models
from ..schemas.resume_schema import ResumeSchema, ResumeSummarySchema
from ..schemas import user_schema 
from ..services import resume_service, auth 

router = APIRouter()

@router.post("/resumes", response_model=ResumeSchema, status_code=status.HTTP_201_CREATED)
def upload_resume(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db),
    current_user: user_schema.UserResponse = Depends(auth.get_current_user)
):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")
    

    new_resume = resume_service.parse_and_save_resume(db=db, file=file, user_id=current_user.id)

    if not new_resume:
        raise HTTPException(status_code=500, detail="Failed to parse or save the resume.")
    return new_resume

@router.get("/resumes", response_model=List[ResumeSummarySchema])
def get_all_resumes(
    db: Session = Depends(get_db),
    current_user: user_schema.UserResponse = Depends(auth.get_current_user)
):

    resumes = db.query(models.Resume).filter(models.Resume.owner_id == current_user.id).order_by(models.Resume.uploaded_at.desc()).all()
    return resumes

@router.get("/resumes/{resume_id}", response_model=ResumeSchema)
def get_resume_details(
    resume_id: int, 
    db: Session = Depends(get_db),
    current_user: user_schema.UserResponse = Depends(auth.get_current_user)
):
    resume = db.query(models.Resume).filter(models.Resume.id == resume_id).first()
    if resume is None or resume.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Resume not found.")
    return resume