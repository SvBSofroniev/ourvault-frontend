import { apiClient } from "./apiClient";

import type {
  AttachedDocument,
  ChatAnswer,
  ChatMessage,
  ChatSession,
  CreateChatSessionRequest,
  SendChatMessageRequest,
  UpdateChatSessionRequest,
} from "../types/chat";

export const chatService = {
  async createSession(
    workspaceId: string,
    request: CreateChatSessionRequest,
  ): Promise<ChatSession> {
    const response =
      await apiClient.post<ChatSession>(
        `/workspaces/${workspaceId}/chat-sessions`,
        request,
      );

    return response.data;
  },

  async getWorkspaceSessions(
    workspaceId: string,
  ): Promise<ChatSession[]> {
    const response =
      await apiClient.get<ChatSession[]>(
        `/workspaces/${workspaceId}/chat-sessions`,
      );

    return response.data;
  },

  async getSession(
    sessionId: string,
  ): Promise<ChatSession> {
    const response =
      await apiClient.get<ChatSession>(
        `/chat-sessions/${sessionId}`,
      );

    return response.data;
  },

  async getMessages(
    sessionId: string,
  ): Promise<ChatMessage[]> {
    const response =
      await apiClient.get<ChatMessage[]>(
        `/chat-sessions/${sessionId}/messages`,
      );

    return response.data;
  },

  async sendMessage(
    sessionId: string,
    request: SendChatMessageRequest,
  ): Promise<ChatAnswer> {
    const response =
      await apiClient.post<ChatAnswer>(
        `/chat-sessions/${sessionId}/messages`,
        request,
      );

    return response.data;
  },

  async getAttachedDocuments(
    sessionId: string,
  ): Promise<AttachedDocument[]> {
    const response =
      await apiClient.get<AttachedDocument[]>(
        `/chat-sessions/${sessionId}/documents`,
      );

    return response.data;
  },

  async attachDocument(
    sessionId: string,
    documentId: string,
  ): Promise<AttachedDocument> {
    const response =
      await apiClient.post<AttachedDocument>(
        `/chat-sessions/${sessionId}/documents/${documentId}`,
      );

    return response.data;
  },

  async detachDocument(
    sessionId: string,
    documentId: string,
  ): Promise<void> {
    await apiClient.delete(
      `/chat-sessions/${sessionId}/documents/${documentId}`,
    );
  },

  async updateSession(
    sessionId: string,
    request: UpdateChatSessionRequest,
  ): Promise<ChatSession> {
    const response =
      await apiClient.patch<ChatSession>(
        `/chat-sessions/${sessionId}`,
        request,
      );

    return response.data;
  },

  async deleteSession(
    sessionId: string,
  ): Promise<void> {
    await apiClient.delete(
      `/chat-sessions/${sessionId}`,
    );
  },

  async getAllSessions(): Promise<ChatSession[]> {
    const response =
      await apiClient.get<ChatSession[]>(
        "/chat-sessions",
      );

    return response.data;
  },
};