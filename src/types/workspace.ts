export type WorkspaceRole =
  | "OWNER"
  | "ADMIN"
  | "MEMBER";

export interface Workspace {
  id: string;
  name: string;
  description: string | null;
  myRole: WorkspaceRole;
}

export interface CreateWorkspaceRequest {
  name: string;
  description?: string;
}

export interface UpdateWorkspaceRequest {
  name: string;
  description?: string | null;
}