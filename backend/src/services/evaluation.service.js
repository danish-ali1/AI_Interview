const POSITIVE_WORDS = [
  "good", "great", "efficient", "scalable", "secure",
  "optimized", "clean", "maintainable", "robust"
];

const NEGATIVE_WORDS = [
  "bad", "slow", "confusing", "inefficient", "buggy"
];


const normalize = (text) =>
  text.toLowerCase().replace(/[^a-z0-9\s]/g, "");

const getKeywords = (modelAnswer = "") =>
  normalize(modelAnswer).split(" ").filter(w => w.length > 3);

const countMatches = (keywords, answerWords) =>
  keywords.filter(k => answerWords.includes(k)).length;

// ---------- scores ----------

const calculateRelevance = (answer, modelAnswer) => {
  const keywords = getKeywords(modelAnswer);
  if (!keywords.length) return 0;

  const answerWords = normalize(answer).split(" ");
  const matches = countMatches(keywords, answerWords);

  return Math.min(Math.round((matches / keywords.length) * 100), 100);
};

const calculateCompleteness = (answer) => {
  const wordCount = answer.trim().split(" ").length;

  if (wordCount >= 120) return 100;
  if (wordCount >= 80) return 80;
  if (wordCount >= 40) return 60;
  return 40;
};

const calculateSentiment = (answer) => {
  const words = normalize(answer).split(" ");

  let score = 0;
  words.forEach(word => {
    if (POSITIVE_WORDS.includes(word)) score++;
    if (NEGATIVE_WORDS.includes(word)) score--;
  });

  if (score > 1) return { label: "positive", score: 70 };
  if (score < -1) return { label: "negative", score: 30 };
  return { label: "neutral", score: 50 };
};

// ---------- final evaluator ----------

export const evaluateAnswer = ({ answer, modelAnswer }) => {
  const relevance = calculateRelevance(answer, modelAnswer);
  const completeness = calculateCompleteness(answer);
  const sentiment = calculateSentiment(answer);

  const finalScore = Math.round(
    relevance * 0.5 +
    completeness * 0.3 +
    sentiment.score * 0.2
  );

  return {
    relevance,
    completeness,
    sentiment: sentiment.label,
    finalScore
  };
};


