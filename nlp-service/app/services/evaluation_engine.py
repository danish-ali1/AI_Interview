from app.services.semantic_similarity import calculate_similarity
from app.services.sentiment_service import analyze_sentiment
import logging

logger = logging.getLogger(__name__)


def evaluate_answer(model_answer: str, user_answer: str):
    try:
        logger.info("Starting answer evaluation")
        
        # Calculate similarity
        logger.info("Calculating similarity score...")
        similarity_score = calculate_similarity(model_answer, user_answer)
        technical_score = round(similarity_score * 100, 2)
        logger.info(f"Similarity score: {similarity_score}, Technical score: {technical_score}")

        # Analyze sentiment
        logger.info("Analyzing sentiment...")
        sentiment_result = analyze_sentiment(user_answer)
        sentiment_label = sentiment_result["label"]
        confidence_score = round(sentiment_result["confidence"] * 100, 2)
        logger.info(f"Sentiment: {sentiment_label}, Confidence: {confidence_score}")

        # Calculate communication score based on sentiment
        if sentiment_label == "positive":
            communication_score = 85
        elif sentiment_label == "neutral":
            communication_score = 70
        else:
            communication_score = 50

        logger.info(f"Communication score: {communication_score}")

        # Calculate problem solving score
        word_count = len(user_answer.split())
        logger.info(f"User answer word count: {word_count}")
        length_factor = min(word_count / 50, 1)  
        problem_solving_score = round((similarity_score * 0.7 + length_factor * 0.3) * 100, 2)
        logger.info(f"Problem solving score: {problem_solving_score}")

        # Calculate overall score
        overall_score = round(
            (technical_score * 0.4 +
             communication_score * 0.2 +
             confidence_score * 0.2 +
             problem_solving_score * 0.2),
            2
        )
        logger.info(f"Overall score: {overall_score}")

        result = {
            "semantic_similarity": technical_score,
            "sentiment": sentiment_label,
            "confidence": confidence_score,
            "skills": {
                "technical_knowledge": technical_score,
                "communication": communication_score,
                "confidence": confidence_score,
                "problem_solving": problem_solving_score
            },
            "overall_score": overall_score
        }
        
        logger.info("Evaluation completed successfully")
        return result
        
    except Exception as e:
        logger.error(f"Error during evaluation: {str(e)}", exc_info=True)
        raise

