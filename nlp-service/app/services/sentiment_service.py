from textblob import TextBlob


def analyze_sentiment(text: str):
    """
    Returns sentiment label and confidence score
    """

    if not text:
        return {
            "label": "neutral",
            "confidence": 0.0
        }

    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity

    if polarity > 0.1:
        label = "positive"
    elif polarity < -0.1:
        label = "negative"
    else:
        label = "neutral"

    confidence = abs(polarity)

    return {
        "label": label,
        "confidence": round(confidence, 2)
    }
