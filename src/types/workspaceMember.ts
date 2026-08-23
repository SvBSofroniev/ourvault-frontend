import type { WorkspaceRole } from "./workspace";

export interface WorkspaceMember {
  memberId: string;
  userId: string;
  username: string;
  email: string;
  role: WorkspaceRole;
  joinedAt: string;
}

export interface AddWorkspaceMemberRequest {
  userId: string;
}

export interface UpdateWorkspaceRoleRequest {
  role: WorkspaceRole;
}