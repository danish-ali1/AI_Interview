import {axiosInstance} from "../api/axios";

export const startInterview = async (payload) => {
  const res = await axiosInstance.post("/interview/start", payload);
  return res.data;
};

export const submitAnswer = async (sessionId, data) => {
  const res = await axiosInstance.post(
    `/interview/${sessionId}/answer`,
    data
  );
  return res.data;
};

export const getNextQuestion = async (sessionId) => {
  const res = await axiosInstance.get(`/interview/${sessionId}/question`);
  return res.data;
};

export const endInterview = async (sessionId) => {
  const res = await axiosInstance.post(`/interview/${sessionId}/end`);
  return res.data;
};

export const getInterviewFeedback = async (sessionId) => {
  const res = await axiosInstance.get(`/interview/${sessionId}/feedback`);
  return res.data;
}