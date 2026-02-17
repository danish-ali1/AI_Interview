import axios from "axios";

export const evaluateAnswer = async (modelAnswer, userAnswer) => {
  try {
    const response = await axios.post(
      `${process.env.NLP_SERVICE_URL}/nlp/evaluate`,
      {
        model_answer: modelAnswer,
        user_answer: userAnswer,
      }
    );

    return response.data;

  } catch (error) {
    console.error("NLP Service Error:", error.message);
    throw new Error("Failed to evaluate answer");
  }
};