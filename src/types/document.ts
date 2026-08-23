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