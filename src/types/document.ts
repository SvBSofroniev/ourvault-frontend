export type DocumentStatus =
  | "UPLOADED"
  | "PENDING"
  | "PROCESSING"
  | "READY"
  | "FAILED";

export interface Document {
  id: string;
  title: string;
  originalFilename: string;
  fileType: string;
  fileSize: number;
  status: DocumentStatus;
  processingError: string | null;
  uploadedById: string;
  uploadedByUsername: string;
  createdAt: string;
}

export interface DocumentDetails {
  id: string;
  workspaceId: string;
  workspaceName: string;
  title: string;
  originalFilename: string;
  fileType: string;
  fileSize: number;
  status: DocumentStatus;
  processingError: string | null;
  uploadedById: string;
  uploadedByUsername: string;
  chunkCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentContent {
  documentId: string;
  title: string;
  chunkCount: number;
  content: string;
}

export interface DocumentInsights {
  summary: string;
  keyPoints: string[];
  importantFacts: string[];
}