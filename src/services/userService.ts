import { apiClient } from "./apiClient";

import type { CurrentUser } from "../types/auth";
import type { UserSearchResult } from "../types/user";

export const userService = {
  async getCurrentUser(): Promise<CurrentUser> {
    const response =
      await apiClient.get<CurrentUser>(
        "/users/me",
      );

    return response.data;
  },

  async searchUsers(
    query: string,
  ): Promise<UserSearchResult[]> {
    const response =
      await apiClient.get<UserSearchResult[]>(
        "/users/search",
        {
          params: {
            query,
          },
        },
      );

    return response.data;
  },
};