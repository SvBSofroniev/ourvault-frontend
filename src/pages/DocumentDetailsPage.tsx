import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    useTranslation,
} from "react-i18next";

import {
    ArrowLeft,
    Download,
    FileText,
    Eye,
    Sparkles,
    CircleCheck,
    MessageSquareText,
} from "lucide-react";

import {
    documentService,
} from "../services/documentService";

import type {
    DocumentContent,
    DocumentDetails,
    DocumentInsights,
} from "../types/document";

import {
    getApiErrorKey,
} from "../utils/apiError";

type DocumentDetailsTab =
    | "original"
    | "content"
    | "insights";

export function DocumentDetailsPage() {
    const {
        workspaceId,
        documentId,
    } = useParams();

    const navigate =
        useNavigate();

    const { t, i18n } =
        useTranslation();

    const [
        document,
        setDocument,
    ] = useState<DocumentDetails | null>(
        null,
    );

    const [
        extractedContent,
        setExtractedContent,
    ] = useState<DocumentContent | null>(
        null,
    );

    const [
        previewUrl,
        setPreviewUrl,
    ] = useState<string | null>(
        null,
    );

    const [
        activeTab,
        setActiveTab,
    ] = useState<DocumentDetailsTab>(
        "original",
    );

    const [
        isLoading,
        setIsLoading,
    ] = useState(true);

    const [
        isContentLoading,
        setIsContentLoading,
    ] = useState(false);

    const [
        isDownloading,
        setIsDownloading,
    ] = useState(false);

    const [
        errorKey,
        setErrorKey,
    ] = useState<string | null>(
        null,
    );

    const [
        insights,
        setInsights,
    ] = useState<DocumentInsights | null>(
        null,
    );

    const [
        isGeneratingInsights,
        setIsGeneratingInsights,
    ] = useState(false);

    const [
        isStartingChat,
        setIsStartingChat,
    ] = useState(false);

    useEffect(() => {
        if (!documentId) {
            setErrorKey(
                "errors.documentNotFound",
            );

            setIsLoading(false);

            return;
        }

        void loadDocument(
            documentId,
        );

        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(
                    previewUrl,
                );
            }
        };
    }, [documentId]);

    async function loadDocument(
        id: string,
    ) {
        setIsLoading(true);
        setErrorKey(null);
        try {
            const documentData =
                await documentService
                    .getDocumentDetails(id);

            setDocument(
                documentData,
            );

            if (
                documentData.fileType ===
                "application/pdf"
            ) {
                const previewBlob =
                    await documentService
                        .getDocumentPreview(id);

                const objectUrl =
                    URL.createObjectURL(
                        previewBlob,
                    );

                setPreviewUrl(
                    objectUrl,
                );
            }
        } catch (error) {
            setErrorKey(
                getApiErrorKey(error),
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function loadExtractedContent() {
        if (
            !documentId ||
            extractedContent ||
            isContentLoading
        ) {
            return;
        }

        setIsContentLoading(true);
        setErrorKey(null);
        try {
            const data =
                await documentService
                    .getDocumentContent(
                        documentId,
                    );

            setExtractedContent(
                data,
            );
        } catch (error) {
            setErrorKey(
                getApiErrorKey(error),
            );
        } finally {
            setIsContentLoading(false);
        }
    }

    async function handleTabChange(
        tab: DocumentDetailsTab,
    ) {
        setActiveTab(tab);

        if (tab === "content") {
            await loadExtractedContent();
        }
    }

    async function handleDownload() {
        if (
            !documentId ||
            !document ||
            isDownloading
        ) {
            return;
        }

        setIsDownloading(true);
        setErrorKey(null);
        try {
            const blob =
                await documentService
                    .downloadDocument(
                        documentId,
                    );

            const objectUrl =
                URL.createObjectURL(
                    blob,
                );

            const link =
                window.document.createElement(
                    "a",
                );

            link.href =
                objectUrl;

            link.download =
                document.originalFilename;

            window.document.body.appendChild(
                link,
            );

            link.click();

            link.remove();

            URL.revokeObjectURL(
                objectUrl,
            );
        } catch (error) {
            setErrorKey(
                getApiErrorKey(error),
            );
        } finally {
            setIsDownloading(false);
        }
    }

    async function handleGenerateInsights() {
        if (
            !documentId ||
            isGeneratingInsights
        ) {
            return;
        }

        setIsGeneratingInsights(true);
        setErrorKey(null);
        try {
            const language =
                i18n.resolvedLanguage === "bg"
                    ? "bg"
                    : "en";

            const data =
                await documentService
                    .generateDocumentInsights(
                        documentId,
                        language,
                    );

            setInsights(data);
        } catch (error) {
            setErrorKey(
                getApiErrorKey(error),
            );
        } finally {
            setIsGeneratingInsights(false);
        }
    }

    async function handleAskDocument() {
        if (
            !documentId ||
            !document ||
            isStartingChat
        ) {
            return;
        }

        setIsStartingChat(true);
        setErrorKey(null);
        try {
            const chat =
                await documentService
                    .createChatForDocument(
                        documentId,
                    );

            navigate(
                `/workspaces/${chat.workspaceId}/chats/${chat.id}`,
            );
        } catch (error) {
            setErrorKey(
                getApiErrorKey(error),
            );
        } finally {
            setIsStartingChat(false);
        }
    }

    if (isLoading) {
        return (
            <div className="content-state">
                {t(
                    "documentDetails.loading",
                )}
            </div>
        );
    }

    if (
        errorKey &&
        !document
    ) {
        return (
            <div>
                <div
                    className="page-error"
                    role="alert"
                >
                    <span>!</span>
                    {t(errorKey)}
                </div>

                <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                        navigate(
                            `/workspaces/${workspaceId}`,
                        )
                    }
                >
                    <ArrowLeft
                        size={16}
                    />

                    {t(
                        "documentDetails.back",
                    )}
                </button>
            </div>
        );
    }

    if (!document) {
        return null;
    }

    const canPreviewPdf =
        document.fileType ===
        "application/pdf" &&
        previewUrl;

    return (
        <div className="document-details-page">
            <button
                type="button"
                className="workspace-back-button"
                onClick={() =>
                    navigate(
                        `/workspaces/${document.workspaceId}`,
                    )
                }
            >
                ← {t(
                    "documentDetails.back",
                )}
            </button>

            <div className="document-details-header">
                <div className="document-details-title">
                    <div className="document-details-icon">
                        <FileText
                            size={24}
                            strokeWidth={1.8}
                        />
                    </div>

                    <div>
                        <h2>
                            {document.title}
                        </h2>

                        <p>
                            {
                                document.originalFilename
                            }
                        </p>
                    </div>
                </div>

                <div className="document-details-actions">
                    <span
                        className={`badge document-details-status ${getStatusClass(
                            document.status,
                        )}`}
                    >
                        {t(
                            `documents.statuses.${document.status.toLowerCase()}`,
                        )}
                    </span>

                    <button
                        type="button"
                        className="primary-button document-details-action-button"
                        onClick={() =>
                            void handleAskDocument()
                        }
                        disabled={
                            isStartingChat ||
                            document.status !== "READY"
                        }
                    >
                        <MessageSquareText
                            size={18}
                            strokeWidth={1.8}
                        />

                        <span>
                            {isStartingChat
                                ? t("documentDetails.startingChat")
                                : t("documentDetails.askDocument")}
                        </span>
                    </button>

                    <button
                        type="button"
                        className="secondary-button document-details-action-button"
                        onClick={() =>
                            void handleDownload()
                        }
                        disabled={isDownloading}
                    >
                        <Download
                            size={18}
                            strokeWidth={1.8}
                        />

                        <span>
                            {isDownloading
                                ? t("documentDetails.downloading")
                                : t("documentDetails.download")}
                        </span>
                    </button>
                </div>
            </div>

            {errorKey && (
                <div
                    className="page-error"
                    role="alert"
                >
                    <span>!</span>
                    {t(errorKey)}
                </div>
            )}

            <section className="document-details-info-card">
                <h3>
                    {t(
                        "documentDetails.information",
                    )}
                </h3>

                <div className="document-details-metadata">
                    <MetadataItem
                        label={t(
                            "documentDetails.fileName",
                        )}
                        value={
                            document.originalFilename
                        }
                    />

                    <MetadataItem
                        label={t(
                            "documentDetails.fileType",
                        )}
                        value={
                            document.fileType
                        }
                    />

                    <MetadataItem
                        label={t(
                            "documentDetails.fileSize",
                        )}
                        value={formatFileSize(
                            document.fileSize,
                        )}
                    />

                    <MetadataItem
                        label={t(
                            "documentDetails.uploadedBy",
                        )}
                        value={
                            document.uploadedByUsername
                        }
                    />

                    <MetadataItem
                        label={t(
                            "documentDetails.uploadedAt",
                        )}
                        value={formatDate(
                            document.createdAt,
                        )}
                    />

                    <MetadataItem
                        label={t(
                            "documentDetails.chunks",
                        )}
                        value={String(
                            document.chunkCount,
                        )}
                    />

                    <MetadataItem
                        label={t(
                            "documentDetails.workspace",
                        )}
                        value={
                            document.workspaceName
                        }
                    />

                    <MetadataItem
                        label={t(
                            "documentDetails.status",
                        )}
                        value={document.status}
                    />
                </div>
            </section>

            <nav className="document-details-tabs">
                <button
                    type="button"
                    className={
                        activeTab ===
                            "original"
                            ? "document-details-tab document-details-tab-active"
                            : "document-details-tab"
                    }
                    onClick={() =>
                        void handleTabChange(
                            "original",
                        )
                    }
                >
                    <Eye
                        size={17}
                    />

                    {t(
                        "documentDetails.original",
                    )}
                </button>

                <button
                    type="button"
                    className={
                        activeTab ===
                            "content"
                            ? "document-details-tab document-details-tab-active"
                            : "document-details-tab"
                    }
                    onClick={() =>
                        void handleTabChange(
                            "content",
                        )
                    }
                >
                    <FileText
                        size={17}
                    />

                    {t(
                        "documentDetails.extractedText",
                    )}
                </button>

                <button
                    type="button"
                    className={
                        activeTab === "insights"
                            ? "document-details-tab document-details-tab-active"
                            : "document-details-tab"
                    }
                    onClick={() =>
                        void handleTabChange(
                            "insights",
                        )
                    }
                >
                    <Sparkles
                        size={17}
                        strokeWidth={1.8}
                    />

                    {t(
                        "documentDetails.aiInsights",
                    )}
                </button>
            </nav>

            <section className="document-details-view">
                {activeTab ===
                    "original" && (
                        <>
                            {canPreviewPdf ? (
                                <iframe
                                    src={previewUrl}
                                    title={
                                        document.originalFilename
                                    }
                                    className="document-pdf-preview"
                                />
                            ) : (
                                <div className="document-preview-unavailable">
                                    <FileText
                                        size={36}
                                        strokeWidth={1.5}
                                    />

                                    <strong>
                                        {t(
                                            "documentDetails.previewUnavailable",
                                        )}
                                    </strong>

                                    <p>
                                        {t(
                                            "documentDetails.previewUnavailableDescription",
                                        )}
                                    </p>

                                    <button
                                        type="button"
                                        className="primary-button"
                                        onClick={() =>
                                            void handleDownload()
                                        }
                                    >
                                        <Download
                                            size={17}
                                        />

                                        {t(
                                            "documentDetails.download",
                                        )}
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                {activeTab ===
                    "content" && (
                        <>
                            {isContentLoading ? (
                                <div className="content-state">
                                    {t(
                                        "documentDetails.loadingContent",
                                    )}
                                </div>
                            ) : (
                                <div className="document-extracted-content">
                                    {extractedContent
                                        ?.content ||
                                        t(
                                            "documentDetails.noExtractedContent",
                                        )}
                                </div>
                            )}
                        </>
                    )}

                {activeTab === "insights" && (
                    <div className="document-insights">
                        {!insights ? (
                            <div className="document-insights-empty">
                                <div className="document-insights-icon">
                                    <Sparkles
                                        size={30}
                                        strokeWidth={1.6}
                                    />
                                </div>

                                <h3>
                                    {t(
                                        "documentDetails.insightsTitle",
                                    )}
                                </h3>

                                <p>
                                    {t(
                                        "documentDetails.insightsDescription",
                                    )}
                                </p>

                                <button
                                    type="button"
                                    className="primary-button"
                                    onClick={() =>
                                        void handleGenerateInsights()
                                    }
                                    disabled={
                                        isGeneratingInsights ||
                                        document.status !== "READY"
                                    }
                                >
                                    <Sparkles
                                        size={17}
                                        strokeWidth={1.8}
                                    />

                                    {isGeneratingInsights
                                        ? t(
                                            "documentDetails.generatingInsights",
                                        )
                                        : t(
                                            "documentDetails.generateInsights",
                                        )}
                                </button>
                            </div>
                        ) : (
                            <div className="document-insights-content">
                                <section className="document-insight-card document-insight-summary">
                                    <div className="document-insight-heading">
                                        <Sparkles
                                            size={19}
                                            strokeWidth={1.8}
                                        />

                                        <h3>
                                            {t(
                                                "documentDetails.summary",
                                            )}
                                        </h3>
                                    </div>

                                    <p>
                                        {insights.summary}
                                    </p>
                                </section>

                                <section className="document-insight-card">
                                    <div className="document-insight-heading">
                                        <CircleCheck
                                            size={19}
                                            strokeWidth={1.8}
                                        />

                                        <h3>
                                            {t(
                                                "documentDetails.keyPoints",
                                            )}
                                        </h3>
                                    </div>

                                    {insights.keyPoints.length ===
                                        0 ? (
                                        <p className="document-insight-empty-text">
                                            {t(
                                                "documentDetails.noKeyPoints",
                                            )}
                                        </p>
                                    ) : (
                                        <ul className="document-insight-list">
                                            {insights.keyPoints.map(
                                                (point, index) => (
                                                    <li
                                                        key={`${point}-${index}`}
                                                    >
                                                        <CircleCheck
                                                            size={16}
                                                            strokeWidth={1.8}
                                                        />

                                                        <span>
                                                            {point}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    )}
                                </section>

                                <section className="document-insight-card">
                                    <div className="document-insight-heading">
                                        <FileText
                                            size={19}
                                            strokeWidth={1.8}
                                        />

                                        <h3>
                                            {t(
                                                "documentDetails.importantFacts",
                                            )}
                                        </h3>
                                    </div>

                                    {insights.importantFacts.length ===
                                        0 ? (
                                        <p className="document-insight-empty-text">
                                            {t(
                                                "documentDetails.noImportantFacts",
                                            )}
                                        </p>
                                    ) : (
                                        <ul className="document-insight-facts">
                                            {insights.importantFacts.map(
                                                (fact, index) => (
                                                    <li
                                                        key={`${fact}-${index}`}
                                                    >
                                                        {fact}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    )}
                                </section>

                                <div className="document-insights-regenerate">
                                    <button
                                        type="button"
                                        className="secondary-button"
                                        onClick={() =>
                                            void handleGenerateInsights()
                                        }
                                        disabled={
                                            isGeneratingInsights
                                        }
                                    >
                                        <Sparkles
                                            size={16}
                                            strokeWidth={1.8}
                                        />

                                        {isGeneratingInsights
                                            ? t(
                                                "documentDetails.generatingInsights",
                                            )
                                            : t(
                                                "documentDetails.regenerateInsights",
                                            )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}

interface MetadataItemProps {
    label: string;
    value: string;
}

function MetadataItem({
    label,
    value,
}: MetadataItemProps) {
    return (
        <div className="document-metadata-item">
            <span>
                {label}
            </span>

            <strong>
                {value}
            </strong>
        </div>
    );
}

function formatFileSize(
    bytes: number,
): string {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (
        bytes <
        1024 * 1024
    ) {
        return `${(
            bytes / 1024
        ).toFixed(1)} KB`;
    }

    return `${(
        bytes /
        (1024 * 1024)
    ).toFixed(1)} MB`;
}

function formatDate(
    value: string,
): string {
    return new Intl.DateTimeFormat(
        undefined,
        {
            dateStyle: "medium",
            timeStyle: "short",
        },
    ).format(
        new Date(value),
    );
}

function getStatusClass(
    status: DocumentDetails["status"],
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