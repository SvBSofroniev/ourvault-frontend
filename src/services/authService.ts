import { apiClient } from "./apiClient";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

export const authService = {
  async login(
    request: LoginRequest,
  ): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      request,
    );

    return response.data;
  },

  async register(
    request: RegisterRequest,
  ): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      request,
    );

    return response.data;
  },

  async refresh(
    refreshToken: string,
  ): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/refresh",
      {
        refreshToken,
      },
    );

    return response.data;
  },

  async logout(
    refreshToken: string,
  ): Promise<void> {
    await apiClient.post("/auth/logout", {
      refreshToken,
    });
  },
};