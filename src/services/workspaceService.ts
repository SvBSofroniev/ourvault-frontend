import { apiClient } from "./apiClient";
import type {
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
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

  async updateWorkspace(
    workspaceId: string,
    request: UpdateWorkspaceRequest,
  ): Promise<Workspace> {
    const response =
      await apiClient.patch<Workspace>(
        `/workspaces/${workspaceId}`,
        request,
      );

    return response.data;
  },

  async deleteWorkspace(
    workspaceId: string,
  ): Promise<void> {
    await apiClient.delete(
      `/workspaces/${workspaceId}`,
    );
  },
};