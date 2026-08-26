import type {
  WorkspaceRole,
} from "./workspace";

import type {
  DocumentStatus,
} from "./document";

export interface DashboardWorkspace {
  id: string;
  name: string;
  description: string | null;
  myRole: WorkspaceRole;
  documentCount: number;
  updatedAt: string;
}

export interface DashboardDocument {
  id: string;
  workspaceId: string;
  workspaceName: string;
  title: string;
  originalFilename: string;
  status: DocumentStatus;
  createdAt: string;
}

export interface DashboardChat {
  id: string;
  workspaceId: string;
  workspaceName: string;
  title: string | null;
  updatedAt: string;
}

export interface Dashboard {
  workspaceCount: number;
  documentCount: number;
  readyDocumentCount: number;
  chatSessionCount: number;
  recentWorkspaces: DashboardWorkspace[];
  recentDocuments: DashboardDocument[];
  recentChats: DashboardChat[];
}