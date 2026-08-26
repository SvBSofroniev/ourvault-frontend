import { apiClient } from "./apiClient";
import type { Dashboard } from "../types/dashboard";

export const dashboardService = {
  async getDashboard(): Promise<Dashboard> {
    const response =
      await apiClient.get<Dashboard>(
        "/dashboard",
      );

    return response.data;
  },
};