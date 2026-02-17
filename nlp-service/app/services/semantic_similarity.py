from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import logging

logger = logging.getLogger(__name__)


def calculate_similarity(model_answer: str, user_answer: str) -> float:
    """
    Returns semantic similarity score between 0 and 1
    using TF-IDF + cosine similarity
    """
    try:
        if not model_answer or not user_answer:
            logger.warning("Empty model_answer or user_answer provided")
            return 0.0

        logger.debug(f"Calculating similarity - model_answer length: {len(model_answer)}, user_answer length: {len(user_answer)}")
        
        vectorizer = TfidfVectorizer()
        logger.debug("TfidfVectorizer initialized")

        tfidf_matrix = vectorizer.fit_transform([model_answer, user_answer])
        logger.debug("TF-IDF matrix computed")

        similarity_matrix = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
        logger.debug("Cosine similarity computed")

        similarity_score = float(similarity_matrix[0][0])
        logger.debug(f"Similarity score: {similarity_score}")
        
        return similarity_score

    except Exception as e:
        logger.error(f"Error calculating similarity: {str(e)}", exc_info=True)
        # Return 0.0 as fallback
        return 0.0

