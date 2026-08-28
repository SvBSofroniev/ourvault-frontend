import {
    Fragment,
    useCallback,
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
} from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { documentService } from "../../services/documentService";
import type {
    Document,
    DocumentStatus,
} from "../../types/document";
import { getApiErrorMessage } from "../../utils/apiError";

interface WorkspaceDocumentsTabProps {
    workspaceId: string;
}

const POLLING_INTERVAL_MS = 2500;

export function WorkspaceDocumentsTab({
    workspaceId,
}: WorkspaceDocumentsTabProps) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

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

    const [
        documentToDelete,
        setDocumentToDelete,
    ] = useState<Document | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    const [
        expandedErrorDocumentId,
        setExpandedErrorDocumentId,
    ] = useState<string | null>(null);

    const loadDocuments = useCallback(
        async (showLoading = true) => {
            if (showLoading) {
                setIsLoading(true);
            }

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
                if (showLoading) {
                    setIsLoading(false);
                }
            }
        },
        [workspaceId],
    );

    /*
     * Initial document loading
     */
    useEffect(() => {
        void loadDocuments();
    }, [loadDocuments]);

    /*
     * Check whether at least one document
     * still needs processing.
     */
    const hasProcessingDocuments =
        documents.some((document) =>
            isProcessingStatus(
                document.status,
            ),
        );

    /*
     * Poll backend only while a document
     * is still PENDING / PROCESSING / UPLOADED.
     */
    useEffect(() => {
        if (!hasProcessingDocuments) {
            return;
        }

        const intervalId =
            window.setInterval(() => {
                void loadDocuments(false);
            }, POLLING_INTERVAL_MS);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [
        hasProcessingDocuments,
        loadDocuments,
    ]);

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
                        document.id !==
                        uploadedDocument.id,
                ),
            ]);

            /*
             * Refresh immediately after upload.
             *
             * If the backend returned PENDING or
             * PROCESSING, polling will then start
             * automatically.
             */
            await loadDocuments(false);
        } catch (error) {
            setError(
                getApiErrorMessage(error),
            );
        } finally {
            setIsUploading(false);

            event.target.value = "";
        }
    }

    function requestDelete(
        document: Document,
    ) {
        setDocumentToDelete(document);
    }

    function closeDeleteDialog() {
        if (deletingDocumentId) {
            return;
        }

        setDocumentToDelete(null);
    }

    async function confirmDelete() {
        if (!documentToDelete) {
            return;
        }

        const documentId =
            documentToDelete.id;

        setDeletingDocumentId(
            documentId,
        );

        setError(null);

        try {
            await documentService.deleteDocument(
                documentId,
            );

            setDocuments((current) =>
                current.filter(
                    (document) =>
                        document.id !== documentId,
                ),
            );

            if (
                expandedErrorDocumentId ===
                documentId
            ) {
                setExpandedErrorDocumentId(
                    null,
                );
            }

            setDocumentToDelete(null);
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
                            ? t(
                                "documents.uploading",
                            )
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
                    {t(
                        "documents.loading",
                    )}
                </div>
            ) : documents.length === 0 ? (
                <div className="document-empty-state">
                    <div className="document-empty-icon">
                        □
                    </div>

                    <h4>
                        {t(
                            "documents.emptyTitle",
                        )}
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
                        disabled={isUploading}
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
                                    {t(
                                        "documents.name",
                                    )}
                                </th>

                                <th>
                                    {t(
                                        "documents.status",
                                    )}
                                </th>

                                <th>
                                    {t(
                                        "documents.size",
                                    )}
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
                                (document) => {
                                    const isFailed =
                                        document.status ===
                                        "FAILED";

                                    const isProcessing =
                                        isProcessingStatus(
                                            document.status,
                                        );

                                    const isErrorExpanded =
                                        expandedErrorDocumentId ===
                                        document.id;

                                    return (
                                        <Fragment
                                            key={document.id}
                                        >
                                            <tr>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="document-name-cell document-name-link"
                                                        onClick={() =>
                                                            navigate(
                                                                `/workspaces/${workspaceId}/documents/${document.id}`,
                                                            )
                                                        }
                                                        title={t(
                                                            "documents.openDocument",
                                                        )}
                                                    >
                                                        <div className="document-file-icon">
                                                            {getFileLabel(
                                                                document,
                                                            )}
                                                        </div>

                                                        <div>
                                                            <strong>
                                                                {document.title}
                                                            </strong>

                                                            <span>
                                                                {
                                                                    document.originalFilename
                                                                }
                                                            </span>

                                                            {isProcessing && (
                                                                <span className="document-processing-text">
                                                                    {t(
                                                                        "documents.processingHint",
                                                                    )}
                                                                </span>
                                                            )}

                                                            {isFailed && (
                                                                <span className="document-failed-text">
                                                                    {t(
                                                                        "documents.failedHint",
                                                                    )}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </button>
                                                </td>

                                                <td>
                                                    <span
                                                        className={`badge ${getStatusBadgeClass(
                                                            document.status,
                                                        )}`}
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
                                                    <div className="document-row-actions">
                                                        {isFailed && (
                                                            <button
                                                                type="button"
                                                                className="document-error-button"
                                                                onClick={() =>
                                                                    setExpandedErrorDocumentId(
                                                                        isErrorExpanded
                                                                            ? null
                                                                            : document.id,
                                                                    )
                                                                }
                                                            >
                                                                {isErrorExpanded
                                                                    ? t(
                                                                        "documents.hideError",
                                                                    )
                                                                    : t(
                                                                        "documents.viewError",
                                                                    )}
                                                            </button>
                                                        )}

                                                        <button
                                                            type="button"
                                                            className="document-delete-button"
                                                            disabled={
                                                                deletingDocumentId ===
                                                                document.id
                                                            }
                                                            onClick={() =>
                                                                requestDelete(
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
                                                    </div>
                                                </td>
                                            </tr>

                                            {isFailed &&
                                                isErrorExpanded && (
                                                    <tr className="document-error-row">
                                                        <td colSpan={6}>
                                                            <div className="document-processing-error">
                                                                <strong>
                                                                    {t(
                                                                        "documents.failedHint",
                                                                    )}
                                                                </strong>

                                                                <p>
                                                                    {document.processingError ||
                                                                        t(
                                                                            "documents.noProcessingError",
                                                                        )}
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                        </Fragment>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* DELETE CONFIRMATION DIALOG */}
            {documentToDelete && (
                <div
                    className="modal-backdrop"
                    onMouseDown={
                        closeDeleteDialog
                    }
                >
                    <div
                        className="modal document-delete-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-document-title"
                        onMouseDown={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <div className="document-delete-dialog-header">
                            <div className="document-delete-dialog-icon">
                                !
                            </div>

                            <div>
                                <h3 id="delete-document-title">
                                    {t(
                                        "documents.deleteTitle",
                                    )}
                                </h3>

                                <p>
                                    {t(
                                        "documents.deleteDescription",
                                        {
                                            filename:
                                                documentToDelete.originalFilename,
                                        },
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button
                                type="button"
                                className="secondary-button"
                                onClick={
                                    closeDeleteDialog
                                }
                                disabled={
                                    deletingDocumentId !==
                                    null
                                }
                            >
                                {t("common.cancel")}
                            </button>

                            <button
                                type="button"
                                className="danger-button"
                                onClick={() =>
                                    void confirmDelete()
                                }
                                disabled={
                                    deletingDocumentId !==
                                    null
                                }
                            >
                                {deletingDocumentId
                                    ? t(
                                        "documents.deleting",
                                    )
                                    : t(
                                        "common.delete",
                                    )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function isProcessingStatus(
    status: DocumentStatus,
): boolean {
    return (
        status === "UPLOADED" ||
        status === "PENDING" ||
        status === "PROCESSING"
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
        return `${kilobytes.toFixed(
            1,
        )} KB`;
    }

    const megabytes =
        kilobytes / 1024;

    return `${megabytes.toFixed(
        1,
    )} MB`;
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