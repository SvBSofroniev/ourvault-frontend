import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FileText,
  Search,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { documentService } from "../services/documentService";
import { getApiErrorKey } from "../utils/apiError";

import type {
  GlobalDocument,
} from "../types/document";

type StatusFilter =
  | "ALL"
  | GlobalDocument["status"];

export function DocumentsPage() {
  const navigate = useNavigate();

  const {
    t,
    i18n,
  } = useTranslation();

  const [
    documents,
    setDocuments,
  ] = useState<GlobalDocument[]>([]);

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    workspaceFilter,
    setWorkspaceFilter,
  ] = useState("ALL");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<StatusFilter>("ALL");

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    errorKey,
    setErrorKey,
  ] = useState<string | null>(null);

  useEffect(() => {
    void loadDocuments();
  }, []);

  async function loadDocuments() {
    setIsLoading(true);
    setErrorKey(null);

    try {
      const result =
        await documentService
          .getAllAccessible();

      setDocuments(result);
    } catch (error) {
      setErrorKey(
        getApiErrorKey(error),
      );
    } finally {
      setIsLoading(false);
    }
  }

  const workspaces = useMemo(() => {
    const workspaceMap =
      new Map<string, string>();

    for (const document of documents) {
      workspaceMap.set(
        document.workspaceId,
        document.workspaceName,
      );
    }

    return Array.from(
      workspaceMap.entries(),
    )
      .map(
        ([id, name]) => ({
          id,
          name,
        }),
      )
      .sort((a, b) =>
        a.name.localeCompare(
          b.name,
        ),
      );
  }, [documents]);

  const filteredDocuments =
    useMemo(() => {
      const normalizedQuery =
        searchQuery
          .trim()
          .toLowerCase();

      return documents.filter(
        (document) => {
          if (
            workspaceFilter !== "ALL" &&
            document.workspaceId !==
              workspaceFilter
          ) {
            return false;
          }

          if (
            statusFilter !== "ALL" &&
            document.status !==
              statusFilter
          ) {
            return false;
          }

          if (!normalizedQuery) {
            return true;
          }

          const title =
            document.title
              ?.toLowerCase() ?? "";

          const filename =
            document.originalFilename
              ?.toLowerCase() ?? "";

          const workspaceName =
            document.workspaceName
              ?.toLowerCase() ?? "";

          const uploader =
            document.uploadedByUsername
              ?.toLowerCase() ?? "";

          return (
            title.includes(
              normalizedQuery,
            ) ||
            filename.includes(
              normalizedQuery,
            ) ||
            workspaceName.includes(
              normalizedQuery,
            ) ||
            uploader.includes(
              normalizedQuery,
            )
          );
        },
      );
    }, [
      documents,
      searchQuery,
      workspaceFilter,
      statusFilter,
    ]);

  function openDocument(
    document: GlobalDocument,
  ) {
    navigate(
      `/workspaces/${document.workspaceId}/documents/${document.id}`,
    );
  }

  function formatFileSize(
    bytes: number | null,
  ) {
    if (
      bytes === null ||
      bytes === undefined
    ) {
      return "—";
    }

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
  ) {
    const locale =
      i18n.resolvedLanguage === "bg"
        ? "bg-BG"
        : "en-US";

    return new Intl.DateTimeFormat(
      locale,
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    ).format(
      new Date(value),
    );
  }

  function getStatusLabel(
    status: GlobalDocument["status"],
  ) {
    return t(
      `documents.statuses.${status.toLowerCase()}`,
    );
  }

  return (
    <div className="global-documents-page">
      {/* HEADER */}
      <div className="global-documents-header">
        <div>
          <span className="page-eyebrow">
            {t(
              "documents.global.eyebrow",
            )}
          </span>

          <h1>
            {t(
              "documents.global.title",
            )}
          </h1>

          <p>
            {t(
              "documents.global.description",
            )}
          </p>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="global-documents-toolbar">
        {/* SEARCH */}
        <div className="global-documents-search">
          <Search
            size={18}
            strokeWidth={1.8}
          />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(
                event.target.value,
              )
            }
            placeholder={t(
              "documents.global.searchPlaceholder",
            )}
          />
        </div>

        {/* WORKSPACE FILTER */}
        <select
          value={workspaceFilter}
          onChange={(event) =>
            setWorkspaceFilter(
              event.target.value,
            )
          }
          aria-label={t(
            "documents.global.allWorkspaces",
          )}
        >
          <option value="ALL">
            {t(
              "documents.global.allWorkspaces",
            )}
          </option>

          {workspaces.map(
            (workspace) => (
              <option
                key={workspace.id}
                value={workspace.id}
              >
                {workspace.name}
              </option>
            ),
          )}
        </select>

        {/* STATUS FILTER */}
        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target
                .value as StatusFilter,
            )
          }
          aria-label={t(
            "documents.global.allStatuses",
          )}
        >
          <option value="ALL">
            {t(
              "documents.global.allStatuses",
            )}
          </option>

          <option value="READY">
            {t(
              "documents.statuses.ready",
            )}
          </option>

          <option value="PROCESSING">
            {t(
              "documents.statuses.processing",
            )}
          </option>

          <option value="PENDING">
            {t(
              "documents.statuses.pending",
            )}
          </option>

          <option value="UPLOADED">
            {t(
              "documents.statuses.uploaded",
            )}
          </option>

          <option value="FAILED">
            {t(
              "documents.statuses.failed",
            )}
          </option>
        </select>
      </div>

      {/* ERROR */}
      {errorKey && (
        <div
          className="auth-error"
          role="alert"
        >
          <span>!</span>

          {t(errorKey)}
        </div>
      )}

      {/* LOADING */}
      {isLoading ? (
        <div className="global-documents-state">
          {t(
            "documents.loading",
          )}
        </div>
      ) : documents.length === 0 ? (
        /* EMPTY */
        <div className="global-documents-empty">
          <div className="global-documents-empty-icon">
            <FileText
              size={28}
              strokeWidth={1.6}
            />
          </div>

          <h2>
            {t(
              "documents.global.emptyTitle",
            )}
          </h2>

          <p>
            {t(
              "documents.global.emptyDescription",
            )}
          </p>
        </div>
      ) : filteredDocuments.length ===
        0 ? (
        /* NO SEARCH RESULTS */
        <div className="global-documents-empty">
          <div className="global-documents-empty-icon">
            <Search
              size={28}
              strokeWidth={1.6}
            />
          </div>

          <h2>
            {t(
              "documents.global.noResultsTitle",
            )}
          </h2>

          <p>
            {t(
              "documents.global.noResultsDescription",
            )}
          </p>
        </div>
      ) : (
        /* DOCUMENTS TABLE */
        <div className="global-documents-table-wrapper">
          <table className="global-documents-table">
            <thead>
              <tr>
                <th>
                  {t(
                    "documents.global.columns.document",
                  )}
                </th>

                <th>
                  {t(
                    "documents.global.columns.workspace",
                  )}
                </th>

                <th>
                  {t(
                    "documents.global.columns.status",
                  )}
                </th>

                <th>
                  {t(
                    "documents.global.columns.size",
                  )}
                </th>

                <th>
                  {t(
                    "documents.global.columns.uploadedBy",
                  )}
                </th>

                <th>
                  {t(
                    "documents.global.columns.uploaded",
                  )}
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredDocuments.map(
                (document) => (
                  <tr
                    key={document.id}
                    tabIndex={0}
                    onClick={() =>
                      openDocument(
                        document,
                      )
                    }
                    onKeyDown={(
                      event,
                    ) => {
                      if (
                        event.key ===
                          "Enter" ||
                        event.key ===
                          " "
                      ) {
                        event.preventDefault();

                        openDocument(
                          document,
                        );
                      }
                    }}
                  >
                    {/* DOCUMENT */}
                    <td>
                      <div className="global-document-name">
                        <div className="global-document-icon">
                          <FileText
                            size={18}
                            strokeWidth={
                              1.8
                            }
                          />
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

                    {/* WORKSPACE */}
                    <td>
                      {
                        document.workspaceName
                      }
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`document-status-badge document-status-${document.status.toLowerCase()}`}
                      >
                        {getStatusLabel(
                          document.status,
                        )}
                      </span>
                    </td>

                    {/* SIZE */}
                    <td>
                      {formatFileSize(
                        document.fileSize,
                      )}
                    </td>

                    {/* UPLOADED BY */}
                    <td>
                      {document.uploadedByUsername ??
                        "—"}
                    </td>

                    {/* DATE */}
                    <td>
                      {formatDate(
                        document.createdAt,
                      )}
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