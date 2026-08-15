import { apiClient } from "./apiClient";
import type { CurrentUser } from "../types/auth";

export const userService = {
  async getCurrentUser(): Promise<CurrentUser> {
    const response = await apiClient.get<CurrentUser>(
      "/users/me",
    );

    return response.data;
  },
};