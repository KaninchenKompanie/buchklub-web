import { jwtDecode } from "jwt-decode";
import { localStorageTokenKeys } from "../constants";
import { TokenContent, User } from "../types";

export function getUserDataFromAcessToken(): User | null {
  const token = getAccessTokenFromStorage();
  if (!token) return null;

  const decoded = jwtDecode(token) as TokenContent;

  return { id: decoded.id, name: decoded.name };
}

export function getAccessTokenFromStorage(): string | null {
  return localStorage.getItem(localStorageTokenKeys.accessToken);
}

export function setAccessTokenToStorage(token: string): void {
  localStorage.setItem(localStorageTokenKeys.accessToken, token);
}

export function getRefreshTokenFromStorage(): string | null {
  return localStorage.getItem(localStorageTokenKeys.refreshToken);
}

export function setRefreshTokenToStorage(token: string): void {
  localStorage.setItem(localStorageTokenKeys.refreshToken, token);
}

export function removeTokensFromStorage(): void {
  localStorage.removeItem(localStorageTokenKeys.accessToken);
  localStorage.removeItem(localStorageTokenKeys.refreshToken);
}

export function isAuthenticated(): boolean {
  return !!getAccessTokenFromStorage();
}
