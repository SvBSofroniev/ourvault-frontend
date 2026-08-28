import { apiClient } from "./apiClient";

import type {
  CurrentUser,
} from "../types/auth";

export interface UpdateProfileRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string | null;
}

export const userService = {
  async getCurrentUser(): Promise<CurrentUser> {
    const response =
      await apiClient.get<CurrentUser>(
        "/users/me",
      );

    return response.data;
  },

  async updateProfile(
    request: UpdateProfileRequest,
  ): Promise<CurrentUser> {
    const response =
      await apiClient.patch<CurrentUser>(
        "/users/me",
        request,
      );

    return response.data;
  },
};