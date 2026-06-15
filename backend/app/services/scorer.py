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
    keyword_match = skills_match + 5 if skills_match < 95 else 100
    experience_match = 85.0
    education_match = 90.0
    
    ats_score = (0.4 * keyword_match) + (0.3 * skills_match) + (0.2 * experience_match) + (0.1 * education_match)

    cover_letter = f"""Dear Hiring Manager,

I am writing to express my strong interest in the open position as described in your recent job posting. With my technical background and relevant experience, I believe I am well-positioned to bring value to your team. 

My resume demonstrates a solid foundation in the core skills required, and I am highly adaptable when it comes to learning new technologies or frameworks necessary for the project's success. I am particularly drawn to your company's mission and look forward to the possibility of contributing my technical expertise to help achieve your goals.

Thank you for your time and consideration. I would welcome the opportunity to discuss my application further in an interview.

Sincerely,
[Your Name]"""

    interview_questions = [
        {
            "question": "Can you discuss a time when you had to learn a new technology quickly to complete a project?", 
            "tip": "Focus on the STAR method. Describe the situation, how you approached learning the new tool, and the successful outcome."
        },
        {
            "question": "How would you handle a situation where a critical skill (like Docker or AWS) is required, but you have limited experience with it?", 
            "tip": "Be honest about your current skill level, but emphasize your problem-solving skills, fundamental knowledge, and eagerness to upskill."
        },
        {
            "question": "Describe a project where your formatting and organizational skills directly contributed to its success.", 
            "tip": "Since 'Clear formatting' is a strength, highlight how your attention to detail improves code readability, documentation, or team collaboration."
        },
        {
            "question": "How do you ensure your code is reliable and scalable without extensive CI/CD exposure?", 
            "tip": "Talk about local testing, writing modular code, and your willingness to adopt modern CI/CD pipelines."
        },
        {
            "question": "Where do you see yourself technically in the next 2 years?", 
            "tip": "Mention closing any skill gaps (like cloud infrastructure) and taking on more complex architectural responsibilities."
        }
    ]

    suggestions = [
        "Add quantifiable metrics to your experience section (e.g., 'Reduced load time by 20%').",
        "Create a dedicated 'Projects' section to showcase practical applications of your skills.",
        "Include a brief Professional Summary at the top to highlight your core competencies instantly.",
        "Consider gaining introductory certifications in Cloud (AWS/Azure) to close the missing skills gap.",
        "Incorporate more keywords directly from the Job Description into your bullet points."
    ]

    return {
        "ats_score": round(ats_score, 2),
        "skills_match": round(skills_match, 2),
        "experience_match": experience_match,
        "education_match": education_match,
        "missing_skills": ["Docker", "Kubernetes", "AWS"] if "Docker" not in resume_text else ["Azure", "GCP"],
        "strengths": ["Clear formatting", "Relevant industry background", "Strong educational foundation"],
        "weaknesses": ["No cloud experience" if "AWS" not in resume_text else "Limited CI/CD exposure", "Missing quantifiable achievements"],
        "cover_letter": cover_letter,
        "interview_questions": interview_questions,
        "suggestions": suggestions
    }
