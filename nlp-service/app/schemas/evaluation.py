from pydantic import BaseModel
from typing import List, Dict

class EvaluationRequest(BaseModel):
    user_answer: str
    model_answer: str
    keywords: List[str]
    role: str
    difficulty: str

class EvaluationResponse(BaseModel):
    answer_quality: Dict[str, float]
    sentiment: Dict[str, float | str]
    confidence: float
    skills: Dict[str, float]
    overall_score: float
