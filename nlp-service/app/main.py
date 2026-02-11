from fastapi import FastAPI
from pydantic import BaseModel
from app.services.semantic_similarity import calculate_similarity
from app.services.sentiment_service import analyze_sentiment
from app.services.evaluation_engine import evaluate_answer


app = FastAPI()


class SimilarityRequest(BaseModel):
    model_answer: str
    user_answer: str

class SentimentRequest(BaseModel):
    text: str

class EvaluationRequest(BaseModel):
    model_answer: str
    user_answer: str
 

@app.get("/")
def health():
    return {"status": "nlp-service running"}


@app.post("/nlp/similarity")
def semantic_similarity(payload: SimilarityRequest):
    score = calculate_similarity(
        payload.model_answer,
        payload.user_answer
    )

    return {
        "semantic_similarity": round(score, 3)
    }

@app.post("/nlp/sentiment")
def sentiment_analysis(payload: SentimentRequest):
    result = analyze_sentiment(payload.text)
    return result   

@app.post("/nlp/evaluate")
def evaluate(payload: EvaluationRequest):
    result = evaluate_answer(
        payload.model_answer,
        payload.user_answer
    )
    return result

