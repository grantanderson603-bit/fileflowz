import * as Linking from "expo-linking";
import * as ReactNative from "react-native";

const env = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? "",
  googleClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ?? "",
  appleClientId: process.env.EXPO_PUBLIC_APPLE_CLIENT_ID ?? "",
};

export const API_BASE_URL = env.apiBaseUrl;
export const GOOGLE_CLIENT_ID = env.googleClientId;
export const APPLE_CLIENT_ID = env.appleClientId;

/**
 * Get the API base URL for the backend server.
 */
export function getApiBaseUrl(): string {
  if (API_BASE_URL) {
    return API_BASE_URL.replace(/\/$/, "");
  }

  // On web, derive from current hostname
  if (ReactNative.Platform.OS === "web" && typeof window !== "undefined" && window.location) {
    const { protocol, hostname, port } = window.location;
    // If running on Expo dev server (8081), point to backend on 3000
    if (port === "8081") {
      return `${protocol}//${hostname}:3000`;
    }
    // In production, API is on same domain
    return `${protocol}//${hostname}`;
  }

  return "http://localhost:3000";
}

export const SESSION_TOKEN_KEY = "fileflow_session_token";
export const USER_INFO_KEY = "fileflow_user_info";
