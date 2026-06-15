from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

def calculate_similarity(resume, jd):
    if not resume or not jd:
        return 0.0
    vectorizer = TfidfVectorizer()
    try:
        vectors = vectorizer.fit_transform([resume, jd])
        similarity = cosine_similarity(vectors[0], vectors[1])
        return round(similarity[0][0] * 100, 2)
    except Exception:
        return 0.0

def analyze_resume_mock(resume_text, jd):
    skills_match = calculate_similarity(resume_text, jd)
    # Using formula from prompt: ATS Score = 40% Keyword Match + 30% Skills Match + 20% Experience Match + 10% Education Match
    # We mock Keyword, Exp, Edu here for demo
    keyword_match = skills_match + 5 if skills_match < 95 else 100
    experience_match = 85.0
    education_match = 90.0
    
    ats_score = (0.4 * keyword_match) + (0.3 * skills_match) + (0.2 * experience_match) + (0.1 * education_match)

    return {
        "ats_score": round(ats_score, 2),
        "skills_match": round(skills_match, 2),
        "experience_match": experience_match,
        "education_match": education_match,
        "missing_skills": ["Docker", "Kubernetes", "AWS"] if "Docker" not in resume_text else ["Azure"],
        "strengths": ["Clear formatting", "Relevant industry background"],
        "weaknesses": ["No cloud experience" if "AWS" not in resume_text else "Limited CI/CD exposure"],
    }
