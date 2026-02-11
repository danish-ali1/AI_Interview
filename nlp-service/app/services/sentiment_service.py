from transformers import pipeline

_sentiment_model = None


def get_sentiment_model():
    global _sentiment_model
    if _sentiment_model is None:
        _sentiment_model = pipeline("sentiment-analysis")
    return _sentiment_model


def analyze_sentiment(text: str):
    if not text:
        return {
            "label": "neutral",
            "confidence": 0.0
        }

    model = get_sentiment_model()
    result = model(text)[0]

    return {
        "label": result["label"].lower(),
        "confidence": float(result["score"])
    }
