import { axiosInstance } from "../api/axios";

export const signup = (data) => {
  return axiosInstance.post("/auth/signup", data);
};

export const login = (data) => {
  return axiosInstance.post("/auth/login", data);
};

export const logout = () => {
  return axiosInstance.get("/auth/logout");
};

export const isAuthenticated = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data.user; 
  } catch (err) {
    return null;
  }
};