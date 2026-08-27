import { apiClient } from "./apiClient";
import type { SemanticSearchResult } from "../types/search";

export const searchService = {
  async searchWorkspace(
    workspaceId: string,
    query: string,
    limit = 10,
  ): Promise<SemanticSearchResult[]> {
    const response =
      await apiClient.get<SemanticSearchResult[]>(
        `/workspaces/${workspaceId}/search`,
        {
          params: {
            query,
            limit,
          },
        },
      );

    return response.data;
  },
};