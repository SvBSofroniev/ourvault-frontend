import {
  useEffect,
  useState,
} from "react";

import {
  useTranslation,
} from "react-i18next";

import {
  useNavigate,
} from "react-router-dom";

import { dashboardService } from "../services/dashboardService";
import type { Dashboard } from "../types/dashboard";
import type { WorkspaceRole } from "../types/workspace";
import type { DocumentStatus } from "../types/document";
import { getApiErrorMessage } from "../utils/apiError";

export function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [dashboard, setDashboard] =
    useState<Dashboard | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    void loadDashboard();
  }, []);

  async function loadDashboard() {
    setIsLoading(true);
    setError(null);

    try {
      const data =
        await dashboardService
          .getDashboard();

      setDashboard(data);
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="content-state">
        {t("dashboard.loading")}
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="page-error">
        <span>!</span>

        {error ??
          t("dashboard.loadError")}
      </div>
    );
  }

  const stats = [
    {
      label:
        t(
          "dashboard.stats.workspaces",
        ),
      value:
        dashboard.workspaceCount,
      icon: "▣",
    },
    {
      label:
        t(
          "dashboard.stats.documents",
        ),
      value:
        dashboard.documentCount,
      icon: "□",
    },
    {
      label:
        t(
          "dashboard.stats.readyDocuments",
        ),
      value:
        dashboard.readyDocumentCount,
      icon: "✓",
    },
    {
      label:
        t(
          "dashboard.stats.chats",
        ),
      value:
        dashboard.chatSessionCount,
      icon: "✦",
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <h2>
            {t("dashboard.title")}
          </h2>

          <p>
            {t(
              "dashboard.description",
            )}
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            void loadDashboard()
          }
        >
          {t("dashboard.refresh")}
        </button>
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

      <section className="stats-grid">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="stat-card"
          >
            <div className="stat-icon">
              {stat.icon}
            </div>

            <div>
              <strong className="stat-value">
                {stat.value}
              </strong>

              <span className="stat-label">
                {stat.label}
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <div className="card-header">
            <h3>
              {t(
                "dashboard.recentWorkspaces.title",
              )}
            </h3>

            <button
              type="button"
              className="link-button"
              onClick={() =>
                navigate(
                  "/workspaces",
                )
              }
            >
              {t(
                "dashboard.viewAll",
              )}{" "}
              →
            </button>
          </div>

          {dashboard.recentWorkspaces
            .length === 0 ? (
            <DashboardEmpty
              text={t(
                "dashboard.recentWorkspaces.empty",
              )}
            />
          ) : (
            dashboard.recentWorkspaces.map(
              (workspace) => (
                <button
                  key={workspace.id}
                  type="button"
                  className="workspace-row dashboard-row-button"
                  onClick={() =>
                    navigate(
                      `/workspaces/${workspace.id}`,
                    )
                  }
                >
                  <div className="workspace-icon">
                    {getInitials(
                      workspace.name,
                    )}
                  </div>

                  <div className="workspace-info">
                    <strong>
                      {workspace.name}
                    </strong>

                    <span>
                      {t(
                        "dashboard.recentWorkspaces.documentsCount",
                        {
                          count:
                            workspace.documentCount,
                        },
                      )}
                    </span>
                  </div>

                  <span
                    className={`badge ${getRoleBadgeClass(
                      workspace.myRole,
                    )}`}
                  >
                    {getRoleLabel(
                      workspace.myRole,
                      t,
                    )}
                  </span>
                </button>
              ),
            )
          )}
        </article>

        <article className="dashboard-card">
          <div className="card-header">
            <h3>
              {t(
                "dashboard.recentDocuments.title",
              )}
            </h3>

            <button
              type="button"
              className="link-button"
              onClick={() =>
                navigate(
                  "/documents",
                )
              }
            >
              {t(
                "dashboard.viewAll",
              )}{" "}
              →
            </button>
          </div>

          {dashboard.recentDocuments
            .length === 0 ? (
            <DashboardEmpty
              text={t(
                "dashboard.recentDocuments.empty",
              )}
            />
          ) : (
            dashboard.recentDocuments.map(
              (document) => (
                <button
                  key={document.id}
                  type="button"
                  className="document-row dashboard-row-button"
                  onClick={() =>
                    navigate(
                      `/workspaces/${document.workspaceId}`,
                    )
                  }
                >
                  <div className="document-icon">
                    {getFileLabel(
                      document.originalFilename,
                    )}
                  </div>

                  <div className="document-info">
                    <strong>
                      {
                        document.originalFilename
                      }
                    </strong>

                    <span>
                      {
                        document.workspaceName
                      }
                    </span>
                  </div>

                  <span
                    className={`badge ${getDocumentStatusClass(
                      document.status,
                    )}`}
                  >
                    {getDocumentStatusLabel(
                      document.status,
                      t,
                    )}
                  </span>
                </button>
              ),
            )
          )}
        </article>

        <article className="dashboard-card dashboard-card-wide">
          <div className="card-header">
            <h3>
              {t(
                "dashboard.recentChats.title",
              )}
            </h3>

            <button
              type="button"
              className="link-button"
              onClick={() =>
                navigate("/chats")
              }
            >
              {t(
                "dashboard.viewAll",
              )}{" "}
              →
            </button>
          </div>

          {dashboard.recentChats
            .length === 0 ? (
            <DashboardEmpty
              text={t(
                "dashboard.recentChats.empty",
              )}
            />
          ) : (
            dashboard.recentChats.map(
              (chat) => (
                <button
                  key={chat.id}
                  type="button"
                  className="dashboard-chat-row dashboard-row-button"
                  onClick={() =>
                    navigate(
                      `/workspaces/${chat.workspaceId}/chats/${chat.id}`,
                    )
                  }
                >
                  <div className="dashboard-chat-icon">
                    ✦
                  </div>

                  <div className="dashboard-chat-info">
                    <strong>
                      {chat.title ||
                        t(
                          "chats.untitled",
                        )}
                    </strong>

                    <span>
                      {
                        chat.workspaceName
                      }
                    </span>
                  </div>

                  <span className="dashboard-open-indicator">
                    →
                  </span>
                </button>
              ),
            )
          )}
        </article>
      </section>
    </div>
  );
}

interface DashboardEmptyProps {
  text: string;
}

function DashboardEmpty({
  text,
}: DashboardEmptyProps) {
  return (
    <div className="dashboard-empty">
      {text}
    </div>
  );
}

function getInitials(
  name: string,
): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "W";
  }

  if (words.length === 1) {
    return words[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    words[0][0] +
    words[1][0]
  ).toUpperCase();
}

function getFileLabel(
  filename: string,
): string {
  const extension =
    filename
      .split(".")
      .pop()
      ?.toUpperCase();

  return extension &&
    extension.length <= 4
    ? extension
    : "FILE";
}

function getRoleBadgeClass(
  role: WorkspaceRole,
): string {
  switch (role) {
    case "OWNER":
      return "badge-owner";

    case "ADMIN":
      return "badge-admin";

    case "MEMBER":
      return "badge-member";
  }
}

function getRoleLabel(
  role: WorkspaceRole,
  t: ReturnType<
    typeof useTranslation
  >["t"],
): string {
  switch (role) {
    case "OWNER":
      return t(
        "common.roles.owner",
      );

    case "ADMIN":
      return t(
        "common.roles.admin",
      );

    case "MEMBER":
      return t(
        "common.roles.member",
      );
  }
}

function getDocumentStatusClass(
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

function getDocumentStatusLabel(
  status: DocumentStatus,
  t: ReturnType<
    typeof useTranslation
  >["t"],
): string {
  switch (status) {
    case "READY":
      return t(
        "documents.statuses.ready",
      );

    case "FAILED":
      return t(
        "documents.statuses.failed",
      );

    case "PROCESSING":
      return t(
        "documents.statuses.processing",
      );

    case "PENDING":
      return t(
        "documents.statuses.pending",
      );

    case "UPLOADED":
      return t(
        "documents.statuses.uploaded",
      );
  }
}