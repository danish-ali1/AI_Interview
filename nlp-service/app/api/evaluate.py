from fastapi import APIRouter
from app.schemas.evaluation import EvaluationRequest, EvaluationResponse
from app.services.similarity import relevance_score
from app.services.completeness import completeness_score
from app.services.clarity import clarity_score
from app.services.sentiment import sentiment_score
from app.services.confidence import confidence_score
from app.services.skills import calculate_skills

router = APIRouter()

@router.post("/evaluate", response_model=EvaluationResponse)
def evaluate_answer(payload: EvaluationRequest):
    relevance = relevance_score(payload.user_answer, payload.model_answer)
    completeness = completeness_score(payload.user_answer, payload.keywords)
    clarity = clarity_score(payload.user_answer)

    sentiment = sentiment_score(payload.user_answer)
    confidence = confidence_score(payload.user_answer)

    skills = calculate_skills(
        relevance, completeness, clarity, sentiment["score"], confidence
    )

    overall = sum(skills.values()) / len(skills)

    return {
        "answer_quality": {
            "relevance": relevance,
            "completeness": completeness,
            "clarity": clarity
        },
        "sentiment": sentiment,
        "confidence": confidence,
        "skills": skills,
        "overall_score": round(overall, 2)
    }
