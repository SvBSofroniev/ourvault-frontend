import axios from "axios";
import { tokenStorage } from "../utils/tokenStorage";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error(
    "VITE_API_BASE_URL is not configured",
  );
}

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30_000,

  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken =
      tokenStorage.getAccessToken();

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },
);