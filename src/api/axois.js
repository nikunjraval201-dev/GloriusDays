import axios from "axios";

// const api = axios.create({
//   baseURL: "https://resturant-demo.onrender.com/api/",
//   timeout: 10000,
// });

const api = axios.create({
   baseURL: "https://south-delights.onrender.com/api",
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
