# backend/app/db/models.py
from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    resumes = relationship("Resume", back_populates="owner")

class Resume(Base):
    __tablename__ = "resumes"
    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String, nullable=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Add a foreign key to link to the User table
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="resumes")
    
    # ... (all other fields like name, email, skills, etc. remain the same)
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    summary = Column(String)
    links = Column(JSONB)
    skills = Column(JSONB)
    work_experience = Column(JSONB)
    education = Column(JSONB)
    projects = Column(JSONB)
    resume_rating = Column(Integer)
    improvement_areas = Column(JSONB)
    upskill_suggestions = Column(JSONB)