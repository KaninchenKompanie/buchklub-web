import { refresh } from "@/modules/auth/api";
import {
  getAccessTokenFromStorage,
  getRefreshTokenFromStorage,
  removeTokensFromStorage,
  setAccessTokenToStorage,
  setRefreshTokenToStorage,
} from "@/modules/auth/utils";
import { PagePaths } from "@/pages/PagePaths";
import Axios from "axios";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.request.use(async (config: any) => {
  const token = getAccessTokenFromStorage();

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

    // If the error status is 403 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshTokenFromStorage();
        if (!refreshToken) {
          removeTokensFromStorage();
          window.location.href = PagePaths.login;
          return;
        }
        // TODO outsource function
        const tokenData = await refresh(refreshToken);

        setAccessTokenToStorage(tokenData.accessToken);
        setRefreshTokenToStorage(tokenData.refreshToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        console.error("Failed to refresh access token");
        removeTokensFromStorage();
        window.location.href = PagePaths.login;
        return;
      }
    }

    return Promise.reject(error);
  }
);
