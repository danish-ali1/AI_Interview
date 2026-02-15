from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calculate_similarity(model_answer: str, user_answer: str) -> float:
    """
    Returns semantic similarity score between 0 and 1
    using TF-IDF + cosine similarity
    """

    if not model_answer or not user_answer:
        return 0.0

    try:
        vectorizer = TfidfVectorizer()

        tfidf_matrix = vectorizer.fit_transform([model_answer, user_answer])

        similarity_matrix = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])

        return float(similarity_matrix[0][0])

    except Exception:
        return 0.0
