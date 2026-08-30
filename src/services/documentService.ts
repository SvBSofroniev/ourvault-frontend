import { apiClient } from "./apiClient";
import type { Document, GlobalDocument } from "../types/document";
import type {
    DocumentContent,
    DocumentDetails,
    DocumentInsights,
} from "../types/document";

import type {
    ChatSession,
} from "../types/chat";


export const documentService = {
    async getWorkspaceDocuments(
        workspaceId: string,
    ): Promise<Document[]> {
        const response =
            await apiClient.get<Document[]>(
                `/workspaces/${workspaceId}/documents`,
            );

        return response.data;
    },

    async getDocument(
        documentId: string,
    ): Promise<Document> {
        const response =
            await apiClient.get<Document>(
                `/documents/${documentId}`,
            );

        return response.data;
    },

    async uploadDocument(
        workspaceId: string,
        file: File,
    ): Promise<Document> {
        const formData = new FormData();

        formData.append("file", file);

        const response =
            await apiClient.post<Document>(
                `/workspaces/${workspaceId}/documents`,
                formData,
            );

        return response.data;
    },

    async deleteDocument(
        documentId: string,
    ): Promise<void> {
        await apiClient.delete(
            `/documents/${documentId}`,
        );
    },

    async getDocumentDetails(
        documentId: string,
    ): Promise<DocumentDetails> {
        const response =
            await apiClient.get<DocumentDetails>(
                `/documents/${documentId}/details`,
            );

        return response.data;
    },

    async getDocumentContent(
        documentId: string,
    ): Promise<DocumentContent> {
        const response =
            await apiClient.get<DocumentContent>(
                `/documents/${documentId}/content`,
            );

        return response.data;
    },

    async getDocumentPreview(
        documentId: string,
    ): Promise<Blob> {
        const response =
            await apiClient.get(
                `/documents/${documentId}/preview`,
                {
                    responseType: "blob",
                },
            );

        return response.data;
    },

    async downloadDocument(
        documentId: string,
    ): Promise<Blob> {
        const response =
            await apiClient.get(
                `/documents/${documentId}/download`,
                {
                    responseType: "blob",
                },
            );

        return response.data;
    },

    async generateDocumentInsights(
        documentId: string,
        language: string,
    ): Promise<DocumentInsights> {
        const response =
            await apiClient.post<DocumentInsights>(
                `/documents/${documentId}/insights`,
                {
                    language,
                },
            );

        return response.data;
    },

    async createChatForDocument(
        documentId: string,
    ): Promise<ChatSession> {
        const response =
            await apiClient.post<ChatSession>(
                `/documents/${documentId}/chat`,
            );

        return response.data;
    },

    async getAllAccessible(): Promise<
        GlobalDocument[]
    > {
        const response =
            await apiClient.get<
                GlobalDocument[]
            >("/documents");

        return response.data;
    },
};