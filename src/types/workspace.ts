export interface Workspace {
  id: string;
  name: string;
  description: string | null;
  myRole: "OWNER" | "ADMIN" | "MEMBER";
}

export interface CreateWorkspaceRequest {
  name: string;
  description?: string;
}