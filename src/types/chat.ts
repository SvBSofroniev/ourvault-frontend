import type { DocumentStatus } from "./document";

export type SenderType =
  | "USER"
  | "ASSISTANT"
  | "SYSTEM";

export interface ChatSession {
  id: string;
  workspaceId: string;
  workspaceName: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  senderType: SenderType;
  content: string;
  createdAt: string;
  sources: SemanticSearchSource[];
}

export interface SemanticSearchSource {
  chunkId: string;
  documentId: string;
  documentTitle: string;
  chunkIndex: number;
  content: string;
  distance: number | null;
  similarity: number | null;
}

export interface ChatAnswer {
  sessionId: string;
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
  sources: SemanticSearchSource[];
}

export interface AttachedDocument {
  contextId: string;
  documentId: string;
  title: string;
  originalFilename: string;
  status: DocumentStatus;
  attachedAt: string;
}

export interface CreateChatSessionRequest {
  title?: string;
}

export interface SendChatMessageRequest {
  message: string;
}

export interface UpdateChatSessionRequest {
  title: string;
}