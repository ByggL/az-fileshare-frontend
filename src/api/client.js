import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("azfs_token");
  // "vXCTFlqWYiciV4rQEDBgVstYY65GU6Jhzp7qO2Ud0EaVTIO0yUt1txxFp60U6ruk";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
