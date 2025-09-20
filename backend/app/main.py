

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from .db import models
from .db.database import engine
from .api import resume_routes, user_routes

# models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Resume Analyzer API",
    description="An API to upload, parse, and analyze resumes.",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://nimble-figolla-f4485d.netlify.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


app.include_router(resume_routes.router, tags=["Resumes"])
app.include_router(user_routes.router, tags=["Users"])

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to the Resume Analyzer API!"}