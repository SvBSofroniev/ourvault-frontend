import { apiClient } from "./apiClient";

import type {
  SendWorkspaceMessageRequest,
  WorkspaceMessage,
} from "../types/workspaceMessage";

export const workspaceMessageService = {
  async getMessages(
    workspaceId: string,
  ): Promise<WorkspaceMessage[]> {
    const response =
      await apiClient.get<WorkspaceMessage[]>(
        `/workspaces/${workspaceId}/messages`,
      );

    return response.data;
  },

  async sendMessage(
    workspaceId: string,
    request: SendWorkspaceMessageRequest,
  ): Promise<WorkspaceMessage> {
    const response =
      await apiClient.post<WorkspaceMessage>(
        `/workspaces/${workspaceId}/messages`,
        request,
      );

    return response.data;
  },
};