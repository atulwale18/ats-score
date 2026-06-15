from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from app.database import Base
import datetime

class ResumeAnalysis(Base):
    __tablename__ = "resume_analysis"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    ats_score = Column(Float)
    skills_match = Column(Float)
    experience_match = Column(Float)
    education_match = Column(Float)
    missing_skills = Column(Text) # JSON string
    strengths = Column(Text) # JSON string
    weaknesses = Column(Text) # JSON string
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
