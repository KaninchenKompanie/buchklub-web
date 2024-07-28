import {
  getRefreshTokenFromStorage,
  removeTokensFromStorage,
  setAccessTokenToStorage,
} from "@/modules/auth/utils";
import Axios from "axios";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axios.interceptors.request.use(async (config: any) => {
  const token = localStorage.getItem("site");

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  config.headers.Accept = "application/json";
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshTokenFromStorage();
        // TODO outsource function
        const response = await axios.post("/refresh-token", {
          refreshToken,
        });
        const { token } = response.data;

        setAccessTokenToStorage(token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        console.error("Failed to refresh access token");
        removeTokensFromStorage();
        window.location.reload();
      }
    }

    return Promise.reject(error);
  }
);
