import { apiClient } from "./apiClient";

import type {
  AddWorkspaceMemberRequest,
  UpdateWorkspaceRoleRequest,
  WorkspaceMember,
} from "../types/workspaceMember";

export const workspaceMemberService = {
  async getMembers(
    workspaceId: string,
  ): Promise<WorkspaceMember[]> {
    const response =
      await apiClient.get<WorkspaceMember[]>(
        `/workspaces/${workspaceId}/members`,
      );

    return response.data;
  },

  async addMember(
    workspaceId: string,
    request: AddWorkspaceMemberRequest,
  ): Promise<void> {
    await apiClient.post(
      `/workspaces/${workspaceId}/members`,
      request,
    );
  },

  async updateMemberRole(
    workspaceId: string,
    memberId: string,
    request: UpdateWorkspaceRoleRequest,
  ): Promise<void> {
    await apiClient.patch(
      `/workspaces/${workspaceId}/members/${memberId}`,
      request,
    );
  },

  async removeMember(
    workspaceId: string,
    memberId: string,
  ): Promise<void> {
    await apiClient.delete(
      `/workspaces/${workspaceId}/members/${memberId}`,
    );
  },
};