import { apiClient } from "./apiClient";
import type { Document } from "../types/document";

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
};