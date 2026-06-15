from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import ResumeAnalysis
from app.services.parser import extract_text
from app.services.scorer import analyze_resume_mock
import json

router = APIRouter()

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")
    
    content = await file.read()
    text = extract_text(content, file.filename)
    return {"resume_text": text}

@router.post("/analyze")
async def analyze_resume(resume_text: str = Form(...), job_description: str = Form(...), db: Session = Depends(get_db)):
    if not resume_text or not job_description:
        raise HTTPException(status_code=400, detail="Missing resume text or job description")

    analysis_result = analyze_resume_mock(resume_text, job_description)
    
    # Save to db if db is available
    if db:
        try:
            db_analysis = ResumeAnalysis(
                filename="uploaded_resume",
                ats_score=analysis_result["ats_score"],
                skills_match=analysis_result["skills_match"],
                experience_match=analysis_result["experience_match"],
                education_match=analysis_result["education_match"],
                missing_skills=json.dumps(analysis_result["missing_skills"]),
                strengths=json.dumps(analysis_result["strengths"]),
                weaknesses=json.dumps(analysis_result["weaknesses"]),
                cover_letter=analysis_result["cover_letter"],
                interview_questions=json.dumps(analysis_result["interview_questions"]),
                suggestions=json.dumps(analysis_result["suggestions"])
            )
            db.add(db_analysis)
            db.commit()
            db.refresh(db_analysis)
        except Exception as e:
            print("DB error:", e)

    return analysis_result

@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
    if not db:
        return {"total_count": 0, "average_score": 0}
    try:
        total = db.query(ResumeAnalysis).count()
        return {"total_count": total}
    except Exception as e:
        return {"total_count": 0}
