import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  console.log(
    `🚀 API Calling => ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
  );
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(
      `✅ API Response => ${response.config.method?.toUpperCase()} ${response.config.url}`,
      response.data,
    );
    return response;
  },
  (error) => Promise.reject(error),
);

export default api;
