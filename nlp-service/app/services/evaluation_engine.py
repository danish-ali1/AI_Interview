from app.services.semantic_similarity import calculate_similarity
from app.services.sentiment_service import analyze_sentiment


def evaluate_answer(model_answer: str, user_answer: str):

    similarity_score = calculate_similarity(model_answer, user_answer)
    technical_score = round(similarity_score * 100, 2)

    
    sentiment_result = analyze_sentiment(user_answer)
    sentiment_label = sentiment_result["label"]
    confidence_score = round(sentiment_result["confidence"] * 100, 2)


    if sentiment_label == "positive":
        communication_score = 85
    elif sentiment_label == "neutral":
        communication_score = 70
    else:
        communication_score = 50

    
    length_factor = min(len(user_answer.split()) / 50, 1)  
    problem_solving_score = round((similarity_score * 0.7 + length_factor * 0.3) * 100, 2)

    
    overall_score = round(
        (technical_score * 0.4 +
         communication_score * 0.2 +
         confidence_score * 0.2 +
         problem_solving_score * 0.2),
        2
    )

    return {
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
