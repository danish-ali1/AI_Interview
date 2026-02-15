The NLP Service is responsible for evaluating candidate answers during an interview session. It compares the user’s answer with the predefined model answer and generates structured scores that reflect the quality of the response. The goal of this service is to assess meaning and clarity rather than exact word matching.

The evaluation is based on three main aspects: relevance, sentiment, and confidence. Relevance measures how closely the candidate’s answer aligns with the expected answer. This is done using a combination of keyword matching and semantic similarity techniques. Instead of checking for exact sentences, the system analyzes whether the meaning of the answer matches the intent of the model answer.

Sentiment analysis is used to determine the tone of the response. It classifies the answer as positive, neutral, or negative. While sentiment does not determine correctness, it provides additional context about how the candidate communicates their response.

Confidence scoring estimates how assured and structured the answer appears. The system looks for vague phrases, incomplete explanations, and lack of technical depth. Clear, well-structured answers with appropriate terminology generally receive higher confidence scores.

The service returns a structured object containing relevance, sentiment, and confidence values. This object is stored inside the Answer model under the scores field. The NLP logic is kept separate from controllers to maintain clean architecture and allow future improvements without affecting other parts of the application.

The current approach combines keyword coverage, semantic similarity, and simple rule-based analysis. It is designed to be modular, scalable, and easy to enhance with more advanced language models in the future.