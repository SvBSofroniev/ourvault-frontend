import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { workspaceService } from "../services/workspaceService";
import type { Workspace } from "../types/workspace";
import {
  getApiErrorKey,
} from "../utils/apiError";
import { WorkspaceDocumentsTab } from "../components/workspace/WorkspaceDocumentsTab";
import { WorkspaceMembersTab } from "../components/workspace/WorkspaceMembersTab";
import { WorkspaceChatsTab } from "../components/workspace/WorkspaceChatsTab";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { WorkspaceSettingsTab } from "../components/workspace/WorkspaceSettingsTab";
import { WorkspaceSearchTab } from "../components/workspace/WorkspaceSearchTab";
import {
  WorkspaceTeamChatTab,
} from "../components/workspace/WorkspaceTeamChatTab";

type WorkspaceTab =
  | "documents"
  | "members"
  | "teamChat"
  | "chats"
  | "search"
  | "settings";

export function WorkspaceDetailsPage() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [workspace, setWorkspace] =
    useState<Workspace | null>(null);

  const [activeTab, setActiveTab] =
    useState<WorkspaceTab>("documents");

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorKey, setErrorKey] =
    useState<string | null>(null);

  useEffect(() => {
    if (!workspaceId) {
      setErrorKey(
        "errors.workspaceNotFound",
      );

      setIsLoading(false);

      return;
    }

    void loadWorkspace(
      workspaceId,
    );
  }, [workspaceId]);

  async function loadWorkspace(
    id: string,
  ) {
    try {
      setErrorKey(null);

      const data =
        await workspaceService
          .getWorkspace(id);

      setWorkspace(data);
    } catch (error) {
      setErrorKey(
        getApiErrorKey(error),
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="content-state">
        Loading workspace...
      </div>
    );
  }

  if (errorKey || !workspace) {
    return (
      <div>
        <div
          className="page-error"
          role="alert"
        >
          <span>!</span>

          {errorKey
            ? t(errorKey)
            : t(
              "errors.workspaceNotFound",
            )}
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            navigate("/workspaces")
          }
        >
          ←{" "}
          {t(
            "workspaceDetails.backToWorkspaces",
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="workspace-details-page">
      <button
        type="button"
        className="workspace-back-button"
        onClick={() =>
          navigate("/workspaces")
        }
      >
        ← {t("workspaceDetails.backToWorkspaces")}
      </button>

      <div className="workspace-details-header">
        <div className="workspace-details-identity">
          <div className="workspace-details-icon">
            {getWorkspaceInitials(
              workspace.name,
            )}
          </div>

          <div>
            <div className="workspace-title-row">
              <h2>
                {workspace.name}
              </h2>

              <span
                className={`badge ${getRoleBadgeClass(
                  workspace.myRole,
                )}`}
              >
                {getTranslatedRole(
                  workspace.myRole,
                  t,
                )}
              </span>
            </div>

            <p>
              {workspace.description ||
                t("workspaces.noDescription")}
            </p>
          </div>
        </div>
      </div>

      <nav className="workspace-tabs">
        <WorkspaceTabButton
          label={t("workspaceDetails.documents")}
          value="documents"
          activeTab={activeTab}
          onSelect={setActiveTab}
        />

        <WorkspaceTabButton
          label={t("workspaceDetails.members")}
          value="members"
          activeTab={activeTab}
          onSelect={setActiveTab}
        />

        <WorkspaceTabButton
          label={t(
            "workspaceDetails.teamChat",
          )}
          value="teamChat"
          activeTab={activeTab}
          onSelect={setActiveTab}
        />

        <WorkspaceTabButton
          label={t(
            "workspaceDetails.aiChat",
          )}
          value="chats"
          activeTab={activeTab}
          onSelect={setActiveTab}
        />

        <WorkspaceTabButton
          label={t("workspaceDetails.search")}
          value="search"
          activeTab={activeTab}
          onSelect={setActiveTab}
        />

        {(workspace.myRole === "OWNER" ||
          workspace.myRole === "ADMIN") && (
            <WorkspaceTabButton
              label={t("workspaceDetails.settings")}
              value="settings"
              activeTab={activeTab}
              onSelect={setActiveTab}
            />
          )}
      </nav>

      <section className="workspace-tab-content">
        {activeTab === "documents" && (
          <WorkspaceDocumentsTab
            workspaceId={workspace.id}
            myRole={workspace.myRole}
          />
        )}

        {activeTab === "members" && (
          <WorkspaceMembersTab
            workspaceId={workspace.id}
            myRole={workspace.myRole}
          />
        )}

        {activeTab === "teamChat" && (
          <WorkspaceTeamChatTab
            workspaceId={
              workspace.id
            }
          />
        )}

        {activeTab === "chats" && (
          <WorkspaceChatsTab
            workspaceId={workspace.id}
          />
        )}

        {activeTab === "search" && (
          <WorkspaceSearchTab
            workspaceId={workspace.id}
          />
        )}

        {activeTab === "settings" &&
          (workspace.myRole === "OWNER" ||
            workspace.myRole === "ADMIN") && (
            <WorkspaceSettingsTab
              workspace={workspace}
              onWorkspaceUpdated={
                setWorkspace
              }
            />
          )}
      </section>
    </div>
  );
}

interface WorkspaceTabButtonProps {
  label: string;
  value: WorkspaceTab;
  activeTab: WorkspaceTab;
  onSelect: (
    tab: WorkspaceTab,
  ) => void;
}

function WorkspaceTabButton({
  label,
  value,
  activeTab,
  onSelect,
}: WorkspaceTabButtonProps) {
  return (
    <button
      type="button"
      className={
        activeTab === value
          ? "workspace-tab workspace-tab-active"
          : "workspace-tab"
      }
      onClick={() =>
        onSelect(value)
      }
    >
      {label}
    </button>
  );
}

function getWorkspaceInitials(
  name: string,
): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) =>
      part.charAt(0).toUpperCase(),
    )
    .join("");
}

function getRoleBadgeClass(
  role: Workspace["myRole"],
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

function getTranslatedRole(
  role: Workspace["myRole"],
  t: TFunction,
): string {
  switch (role) {
    case "OWNER":
      return t("common.roles.owner");

    case "ADMIN":
      return t("common.roles.admin");

    case "MEMBER":
      return t("common.roles.member");
  }
}