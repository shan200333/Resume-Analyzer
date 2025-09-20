# backend/app/schemas/resume_schema.py

from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional, Any

# Pydantic models for nested JSON objects
class LinkSchema(BaseModel):
    label: str
    url: str

class SkillsSchema(BaseModel):
    technical: List[str]
    soft: List[str]
    tools: List[str]

class ResumeSummarySchema(BaseModel):
    id: int
    file_name: str
    uploaded_at: datetime
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None

    class Config:
        from_attributes = True

# Main Resume Schema for API responses
class ResumeSchema(BaseModel):
    id: int
    file_name: str
    uploaded_at: datetime
    
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    summary: Optional[str] = None
    
    links: Optional[List[LinkSchema]] = None
    skills: Optional[SkillsSchema] = None
    work_experience: Optional[List[Any]] = None
    education: Optional[List[Any]] = None
    projects: Optional[List[Any]] = None
    
    resume_rating: Optional[int] = None
    improvement_areas: Optional[List[str]] = None
    upskill_suggestions: Optional[List[Any]] = None

    class Config:
        from_attributes = True # Pydantic V2