from textblob import TextBlob
import logging

logger = logging.getLogger(__name__)


def analyze_sentiment(text: str):
    """
    Returns sentiment label and confidence score
    """
    try:
        if not text:
            logger.warning("Empty text provided for sentiment analysis")
            return {
                "label": "neutral",
                "confidence": 0.0
            }

        logger.debug(f"Analyzing sentiment for text length: {len(text)}")
        analysis = TextBlob(text)
        polarity = analysis.sentiment.polarity
        logger.debug(f"TextBlob polarity: {polarity}")

        if polarity > 0.1:
            label = "positive"
        elif polarity < -0.1:
            label = "negative"
        else:
            label = "neutral"

        confidence = abs(polarity)
        logger.debug(f"Sentiment result: {label}, confidence: {confidence}")

        return {
            "label": label,
            "confidence": round(confidence, 2)
        }
    except Exception as e:
        logger.error(f"Error analyzing sentiment: {str(e)}", exc_info=True)
        # Return neutral as fallback
        return {
            "label": "neutral",
            "confidence": 0.0
        }

