import { apiClient } from "./apiClient";
import type {
  CreateWorkspaceRequest,
  Workspace,
} from "../types/workspace";

export const workspaceService = {
  async getMyWorkspaces(): Promise<Workspace[]> {
    const response =
      await apiClient.get<Workspace[]>(
        "/workspaces",
      );

    return response.data;
  },

  async getWorkspace(
    workspaceId: string,
  ): Promise<Workspace> {
    const response =
      await apiClient.get<Workspace>(
        `/workspaces/${workspaceId}`,
      );

    return response.data;
  },

  async createWorkspace(
    request: CreateWorkspaceRequest,
  ): Promise<Workspace> {
    const response =
      await apiClient.post<Workspace>(
        "/workspaces",
        request,
      );

    return response.data;
  },
};