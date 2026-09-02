export interface WorkspaceMessage {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  content: string;
  createdAt: string;
  ownMessage: boolean;
}

export interface SendWorkspaceMessageRequest {
  content: string;
}