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

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UserSearchResult {
  id: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
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

  async changePassword(
    request: ChangePasswordRequest,
  ): Promise<void> {
    await apiClient.patch(
      "/users/me/password",
      request,
    );
  },

  async searchUsers(
    query: string,
  ): Promise<UserSearchResult[]> {
    const response =
      await apiClient.get<
        UserSearchResult[]
      >("/users/search", {
        params: {
          query,
        },
      });

    return response.data;
  },
};