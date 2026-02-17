from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.services.semantic_similarity import calculate_similarity
from app.services.sentiment_service import analyze_sentiment
from app.services.evaluation_engine import evaluate_answer
import logging
import traceback

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s: %(message)s'
)
logger = logging.getLogger(__name__)

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
    logger.info("Health check called")
    return {"status": "nlp-service running"}


@app.post("/nlp/similarity")
def semantic_similarity(payload: SimilarityRequest):
    try:
        logger.info(f"Processing similarity request")
        if not payload.model_answer or not payload.user_answer:
            logger.warning("Empty model_answer or user_answer received")
            raise HTTPException(status_code=400, detail="model_answer and user_answer cannot be empty")
        
        score = calculate_similarity(
            payload.model_answer,
            payload.user_answer
        )
        logger.info(f"Similarity score calculated: {score}")

        return {
            "semantic_similarity": round(score, 3)
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in similarity endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error calculating similarity: {str(e)}")

@app.post("/nlp/sentiment")
def sentiment_analysis(payload: SentimentRequest):
    try:
        logger.info(f"Processing sentiment analysis request")
        if not payload.text:
            logger.warning("Empty text received for sentiment analysis")
            raise HTTPException(status_code=400, detail="text cannot be empty")
        
        result = analyze_sentiment(payload.text)
        logger.info(f"Sentiment analysis result: {result}")
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in sentiment endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error analyzing sentiment: {str(e)}")

@app.post("/nlp/evaluate")
def evaluate(payload: EvaluationRequest):
    try:
        logger.info(f"Processing evaluation request")
        if not payload.model_answer or not payload.user_answer:
            logger.warning("Empty model_answer or user_answer received")
            raise HTTPException(status_code=400, detail="model_answer and user_answer cannot be empty")
        
        logger.info(f"Model answer length: {len(payload.model_answer)}, User answer length: {len(payload.user_answer)}")
        
        result = evaluate_answer(
            payload.model_answer,
            payload.user_answer
        )
        logger.info(f"Evaluation completed successfully")
        logger.info(f"Overall score: {result.get('overall_score', 'N/A')}")
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in evaluation endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error evaluating answer: {str(e)}")
