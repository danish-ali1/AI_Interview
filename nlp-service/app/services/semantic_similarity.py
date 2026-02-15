from sentence_transformers import SentenceTransformer, util


model = SentenceTransformer("all-MiniLM-L6-v2")


def calculate_similarity(model_answer: str, user_answer: str) -> float:
    """
    Returns semantic similarity score between 0 and 1
    """

    if not model_answer or not user_answer:
        return 0.0

    
    embeddings = model.encode(
        [model_answer, user_answer],
        convert_to_tensor=True
    )

    
    similarity_score = util.cos_sim(embeddings[0], embeddings[1])

    return float(similarity_score.item())
