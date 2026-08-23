import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
} from "react";

import { useTranslation } from "react-i18next";

import { documentService } from "../../services/documentService";
import type {
    Document,
    DocumentStatus,
} from "../../types/document";
import { getApiErrorMessage } from "../../utils/apiError";

interface WorkspaceDocumentsTabProps {
    workspaceId: string;
}

export function WorkspaceDocumentsTab({
    workspaceId,
}: WorkspaceDocumentsTabProps) {
    const { t, i18n } = useTranslation();

    const fileInputRef =
        useRef<HTMLInputElement | null>(null);

    const [documents, setDocuments] =
        useState<Document[]>([]);

    const [isLoading, setIsLoading] =
        useState(true);

    const [isUploading, setIsUploading] =
        useState(false);

    const [
        deletingDocumentId,
        setDeletingDocumentId,
    ] = useState<string | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        void loadDocuments();
    }, [workspaceId]);

    async function loadDocuments() {
        setIsLoading(true);

        try {
            setError(null);

            const data =
                await documentService.getWorkspaceDocuments(
                    workspaceId,
                );

            setDocuments(data);
        } catch (error) {
            setError(
                getApiErrorMessage(error),
            );
        } finally {
            setIsLoading(false);
        }
    }

    function handleUploadClick() {
        fileInputRef.current?.click();
    }

    async function handleFileSelected(
        event: ChangeEvent<HTMLInputElement>,
    ) {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            const uploadedDocument =
                await documentService.uploadDocument(
                    workspaceId,
                    file,
                );

            setDocuments((current) => [
                uploadedDocument,
                ...current.filter(
                    (document) =>
                        document.id !== uploadedDocument.id,
                ),
            ]);
        } catch (error) {
            setError(
                getApiErrorMessage(error),
            );
        } finally {
            setIsUploading(false);

            event.target.value = "";
        }
    }

    async function handleDelete(
        document: Document,
    ) {
        const confirmed =
            window.confirm(
                t("documents.confirmDelete", {
                    filename:
                        document.originalFilename,
                }),
            );

        if (!confirmed) {
            return;
        }

        setDeletingDocumentId(document.id);
        setError(null);

        try {
            await documentService.deleteDocument(
                document.id,
            );

            setDocuments((current) =>
                current.filter(
                    (item) =>
                        item.id !== document.id,
                ),
            );
        } catch (error) {
            setError(
                getApiErrorMessage(error),
            );
        } finally {
            setDeletingDocumentId(null);
        }
    }

    return (
        <div>
            <div className="workspace-section-heading">
                <div>
                    <h3>
                        {t(
                            "workspaceDetails.documents",
                        )}
                    </h3>

                    <p>
                        {t(
                            "workspaceDetails.documentsDescription",
                        )}
                    </p>
                </div>

                <div className="document-actions">
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                            void loadDocuments()
                        }
                        disabled={
                            isLoading ||
                            isUploading
                        }
                    >
                        {t("documents.refresh")}
                    </button>

                    <button
                        type="button"
                        className="primary-button"
                        onClick={
                            handleUploadClick
                        }
                        disabled={isUploading}
                    >
                        {isUploading
                            ? t("documents.uploading")
                            : `+ ${t(
                                "workspaceDetails.uploadDocument",
                            )}`}
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        onChange={(event) =>
                            void handleFileSelected(
                                event,
                            )
                        }
                    />
                </div>
            </div>

            {error && (
                <div
                    className="page-error"
                    role="alert"
                >
                    <span>!</span>
                    {error}
                </div>
            )}

            {isLoading ? (
                <div className="content-state">
                    {t("documents.loading")}
                </div>
            ) : documents.length === 0 ? (
                <div className="document-empty-state">
                    <div className="document-empty-icon">
                        □
                    </div>

                    <h4>
                        {t("documents.emptyTitle")}
                    </h4>

                    <p>
                        {t(
                            "documents.emptyDescription",
                        )}
                    </p>

                    <button
                        type="button"
                        className="primary-button"
                        onClick={
                            handleUploadClick
                        }
                    >
                        +{" "}
                        {t(
                            "workspaceDetails.uploadDocument",
                        )}
                    </button>
                </div>
            ) : (
                <div className="documents-table-wrapper">
                    <table className="documents-table">
                        <thead>
                            <tr>
                                <th>
                                    {t("documents.name")}
                                </th>

                                <th>
                                    {t("documents.status")}
                                </th>

                                <th>
                                    {t("documents.size")}
                                </th>

                                <th>
                                    {t(
                                        "documents.uploadedBy",
                                    )}
                                </th>

                                <th>
                                    {t(
                                        "documents.createdAt",
                                    )}
                                </th>

                                <th>
                                    {t(
                                        "documents.actions",
                                    )}
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {documents.map(
                                (document) => (
                                    <tr key={document.id}>
                                        <td>
                                            <div className="document-name-cell">
                                                <div className="document-file-icon">
                                                    {getFileLabel(
                                                        document,
                                                    )}
                                                </div>

                                                <div>
                                                    <strong>
                                                        {
                                                            document.title
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            document.originalFilename
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${getStatusBadgeClass(
                                                    document.status,
                                                )}`}
                                                title={
                                                    document.processingError ??
                                                    undefined
                                                }
                                            >
                                                {getStatusLabel(
                                                    document.status,
                                                    t,
                                                )}
                                            </span>
                                        </td>

                                        <td>
                                            {formatFileSize(
                                                document.fileSize,
                                            )}
                                        </td>

                                        <td>
                                            {
                                                document.uploadedByUsername
                                            }
                                        </td>

                                        <td>
                                            {formatDate(
  document.createdAt,
  i18n.resolvedLanguage,
)}
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="document-delete-button"
                                                disabled={
                                                    deletingDocumentId ===
                                                    document.id
                                                }
                                                onClick={() =>
                                                    void handleDelete(
                                                        document,
                                                    )
                                                }
                                            >
                                                {deletingDocumentId ===
                                                    document.id
                                                    ? t(
                                                        "documents.deleting",
                                                    )
                                                    : t(
                                                        "common.delete",
                                                    )}
                                            </button>
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function getFileLabel(
    document: Document,
): string {
    const extension =
        document.originalFilename
            .split(".")
            .pop()
            ?.toUpperCase();

    if (
        extension &&
        extension.length <= 4
    ) {
        return extension;
    }

    return "FILE";
}

function formatFileSize(
    bytes: number,
): string {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    const kilobytes =
        bytes / 1024;

    if (kilobytes < 1024) {
        return `${kilobytes.toFixed(1)} KB`;
    }

    const megabytes =
        kilobytes / 1024;

    return `${megabytes.toFixed(1)} MB`;
}

function formatDate(
  value: string,
  language?: string,
): string {
  const locale =
    language === "bg"
      ? "bg-BG"
      : "en-US";

  return new Intl.DateTimeFormat(
    locale,
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(new Date(value));
}

function getStatusBadgeClass(
    status: DocumentStatus,
): string {
    switch (status) {
        case "READY":
            return "badge-ready";

        case "FAILED":
            return "badge-failed";

        case "PROCESSING":
            return "badge-processing";

        case "PENDING":
        case "UPLOADED":
            return "badge-pending";
    }
}

function getStatusLabel(
    status: DocumentStatus,
    t: (key: string) => string,
): string {
    switch (status) {
        case "UPLOADED":
            return t(
                "documents.statuses.uploaded",
            );

        case "PENDING":
            return t(
                "documents.statuses.pending",
            );

        case "PROCESSING":
            return t(
                "documents.statuses.processing",
            );

        case "READY":
            return t(
                "documents.statuses.ready",
            );

        case "FAILED":
            return t(
                "documents.statuses.failed",
            );
    }
}