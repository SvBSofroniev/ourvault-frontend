import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

import { workspaceService } from "../services/workspaceService";
import type {
  CreateWorkspaceRequest,
  Workspace,
} from "../types/workspace";
import {
  getApiErrorKey,
} from "../utils/apiError";

export function WorkspacesPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [workspaces, setWorkspaces] =
    useState<Workspace[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorKey, setErrorKey] =
    useState<string | null>(null);

  const [isCreateOpen, setIsCreateOpen] =
    useState(false);

  const [isCreating, setIsCreating] =
    useState(false);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  useEffect(() => {
    void loadWorkspaces();
  }, []);

  async function loadWorkspaces() {
    try {
      setErrorKey(null);

      const data =
        await workspaceService
          .getMyWorkspaces();

      setWorkspaces(data);
    } catch (error) {
      setErrorKey(
        getApiErrorKey(error),
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateWorkspace(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!name.trim()) {
      setErrorKey(
        "workspaces.emptyNameError",
      );

      return;
    }

    setIsCreating(true);
    setErrorKey(null);

    const request: CreateWorkspaceRequest = {
      name: name.trim(),
      description:
        description.trim() || undefined,
    };

    try {
      const createdWorkspace =
        await workspaceService.createWorkspace(
          request,
        );

      setWorkspaces((current) => [
        createdWorkspace,
        ...current,
      ]);

      setName("");
      setDescription("");
      setIsCreateOpen(false);
    } catch (error) {
      setErrorKey(
        getApiErrorKey(error),
      );
    } finally {
      setIsCreating(false);
    }
  }

  function handleCloseModal() {
    if (isCreating) {
      return;
    }

    setIsCreateOpen(false);
    setName("");
    setDescription("");
  }

  return (
    <div className="workspaces-page">
      <div className="page-heading">
        <div>
          <h2>
            {t("workspaces.title")}
          </h2>

          <p>
            {t("workspaces.description")}
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() =>
            setIsCreateOpen(true)
          }
        >
          + {t("workspaces.newWorkspace")}
        </button>
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

      {isLoading ? (
        <div className="content-state">
          {t("workspaces.loading")}
        </div>
      ) : workspaces.length === 0 ? (
        <section className="empty-state">
          <div className="empty-state-icon">
            ▣
          </div>

          <h3>
            {t("workspaces.noWorkspaces")}
          </h3>

          <p>
            {t(
              "workspaces.noWorkspacesDescription",
            )}
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              setIsCreateOpen(true)
            }
          >
            {t(
              "workspaces.createWorkspace",
            )}
          </button>
        </section>
      ) : (
        <section className="workspace-grid">
          {workspaces.map((workspace) => {
            const translatedRole =
              getTranslatedRole(
                workspace.myRole,
                t,
              );

            return (
              <article
                key={workspace.id}
                className="workspace-card"
              >
                <div className="workspace-card-top">
                  <div className="workspace-card-icon">
                    {getWorkspaceInitials(
                      workspace.name,
                    )}
                  </div>

                  <span
                    className={`badge ${getRoleBadgeClass(
                      workspace.myRole,
                    )}`}
                  >
                    {translatedRole}
                  </span>
                </div>

                <div className="workspace-card-content">
                  <h3>
                    {workspace.name}
                  </h3>

                  <p>
                    {workspace.description ||
                      t(
                        "workspaces.noDescription",
                      )}
                  </p>
                </div>

                <div className="workspace-card-footer">
                  <span>
                    {t(
                      "workspaces.access",
                      {
                        role: translatedRole,
                      },
                    )}
                  </span>

                  <button
                    type="button"
                    className="workspace-open-button"
                    onClick={() =>
                      navigate(
                        `/workspaces/${workspace.id}`,
                      )
                    }
                  >
                    {t("workspaces.open")} →
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {isCreateOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={
            handleCloseModal
          }
        >
          <div
            className="modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <h3>
                  {t(
                    "workspaces.createTitle",
                  )}
                </h3>

                <p>
                  {t(
                    "workspaces.createDescription",
                  )}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={
                  handleCloseModal
                }
                disabled={isCreating}
                aria-label={t(
                  "common.cancel",
                )}
              >
                ×
              </button>
            </div>

            <form
              className="workspace-form"
              onSubmit={
                handleCreateWorkspace
              }
            >
              <div className="form-group">
                <label htmlFor="workspaceName">
                  {t("workspaces.name")}
                </label>

                <input
                  id="workspaceName"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value,
                    )
                  }
                  placeholder={t(
                    "workspaces.namePlaceholder",
                  )}
                  maxLength={255}
                  autoFocus
                  disabled={isCreating}
                />
              </div>

              <div className="form-group">
                <label htmlFor="workspaceDescription">
                  {t(
                    "workspaces.descriptionLabel",
                  )}
                </label>

                <textarea
                  id="workspaceDescription"
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value,
                    )
                  }
                  placeholder={t(
                    "workspaces.descriptionPlaceholder",
                  )}
                  rows={4}
                  disabled={isCreating}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={
                    handleCloseModal
                  }
                  disabled={isCreating}
                >
                  {t("common.cancel")}
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={isCreating}
                >
                  {isCreating
                    ? t(
                      "workspaces.creating",
                    )
                    : t(
                      "workspaces.createWorkspace",
                    )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
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