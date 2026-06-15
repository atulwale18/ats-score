from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import resume
from app.database import engine, Base

# Create DB tables if engine is available
if engine:
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print("Could not create tables:", e)

app = FastAPI(title="ATS Resume Scorer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "ATS API is running"}
