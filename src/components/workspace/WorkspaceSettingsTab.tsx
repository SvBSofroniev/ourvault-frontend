import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { workspaceService } from "../../services/workspaceService";
import type { Workspace } from "../../types/workspace";
import { getApiErrorMessage } from "../../utils/apiError";

interface WorkspaceSettingsTabProps {
  workspace: Workspace;
  onWorkspaceUpdated: (
    workspace: Workspace,
  ) => void;
}

export function WorkspaceSettingsTab({
  workspace,
  onWorkspaceUpdated,
}: WorkspaceSettingsTabProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] =
    useState(workspace.name);

  const [description, setDescription] =
    useState(workspace.description ?? "");

  const [isSaving, setIsSaving] =
    useState(false);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  useEffect(() => {
    setName(workspace.name);
    setDescription(
      workspace.description ?? "",
    );
  }, [
    workspace.name,
    workspace.description,
  ]);

  const normalizedName = name.trim();

  const normalizedDescription =
    description.trim();

  const hasChanges =
    normalizedName !== workspace.name ||
    normalizedDescription !==
      (workspace.description ?? "");

  const canDelete =
    workspace.myRole === "OWNER";

  async function handleSave(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!normalizedName || isSaving) {
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const updatedWorkspace =
        await workspaceService.updateWorkspace(
          workspace.id,
          {
            name: normalizedName,
            description:
              normalizedDescription ||
              null,
          },
        );

      onWorkspaceUpdated(
        updatedWorkspace,
      );

      setName(
        updatedWorkspace.name,
      );

      setDescription(
        updatedWorkspace.description ??
          "",
      );

      setSuccessMessage(
        t(
          "workspaceSettings.saveSuccess",
        ),
      );
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setIsSaving(false);
    }
  }

  function openDeleteDialog() {
    setError(null);
    setSuccessMessage(null);
    setIsDeleteOpen(true);
  }

  function closeDeleteDialog() {
    if (isDeleting) {
      return;
    }

    setIsDeleteOpen(false);
  }

  async function confirmDelete() {
    if (
      !canDelete ||
      isDeleting
    ) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await workspaceService.deleteWorkspace(
        workspace.id,
      );

      navigate(
        "/workspaces",
        {
          replace: true,
        },
      );
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );

      setIsDeleteOpen(false);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="workspace-settings">
      <div className="workspace-settings-heading">
        <div>
          <h3>
            {t(
              "workspaceSettings.title",
            )}
          </h3>

          <p>
            {t(
              "workspaceSettings.description",
            )}
          </p>
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

      {successMessage && (
        <div
          className="workspace-settings-success"
          role="status"
        >
          <span>✓</span>
          {successMessage}
        </div>
      )}

      <section className="workspace-settings-card">
        <div className="workspace-settings-card-header">
          <div>
            <h4>
              {t(
                "workspaceSettings.generalTitle",
              )}
            </h4>

            <p>
              {t(
                "workspaceSettings.generalDescription",
              )}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="workspace-settings-form"
        >
          <div className="form-group">
            <label htmlFor="workspace-settings-name">
              {t(
                "workspaceSettings.nameLabel",
              )}
            </label>

            <input
              id="workspace-settings-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(
                  event.target.value,
                );

                setSuccessMessage(null);
              }}
              maxLength={100}
              disabled={isSaving}
            />

            <span className="workspace-settings-field-hint">
              {t(
                "workspaceSettings.nameHint",
              )}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="workspace-settings-description">
              {t(
                "workspaceSettings.descriptionLabel",
              )}
            </label>

            <textarea
              id="workspace-settings-description"
              value={description}
              onChange={(event) => {
                setDescription(
                  event.target.value,
                );

                setSuccessMessage(null);
              }}
              rows={5}
              disabled={isSaving}
              placeholder={t(
                "workspaceSettings.descriptionPlaceholder",
              )}
            />

            <span className="workspace-settings-field-hint">
              {t(
                "workspaceSettings.descriptionHint",
              )}
            </span>
          </div>

          <div className="workspace-settings-form-actions">
            <button
              type="submit"
              className="primary-button"
              disabled={
                isSaving ||
                !normalizedName ||
                !hasChanges
              }
            >
              {isSaving
                ? t(
                    "workspaceSettings.saving",
                  )
                : t(
                    "workspaceSettings.save",
                  )}
            </button>
          </div>
        </form>
      </section>

      {canDelete && (
        <section className="workspace-danger-zone">
          <div className="workspace-danger-zone-header">
            <div>
              <h4>
                {t(
                  "workspaceSettings.dangerZone",
                )}
              </h4>

              <p>
                {t(
                  "workspaceSettings.dangerDescription",
                )}
              </p>
            </div>
          </div>

          <div className="workspace-danger-action">
            <div>
              <strong>
                {t(
                  "workspaceSettings.deleteWorkspace",
                )}
              </strong>

              <p>
                {t(
                  "workspaceSettings.deleteExplanation",
                )}
              </p>
            </div>

            <button
              type="button"
              className="danger-button"
              onClick={
                openDeleteDialog
              }
            >
              {t(
                "workspaceSettings.deleteWorkspace",
              )}
            </button>
          </div>
        </section>
      )}

      {isDeleteOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={
            closeDeleteDialog
          }
        >
          <div
            className="modal workspace-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-workspace-title"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="document-delete-dialog-header">
              <div className="document-delete-dialog-icon">
                !
              </div>

              <div>
                <h3 id="delete-workspace-title">
                  {t(
                    "workspaceSettings.deleteTitle",
                  )}
                </h3>

                <p>
                  {t(
                    "workspaceSettings.deleteDescription",
                    {
                      name:
                        workspace.name,
                    },
                  )}
                </p>
              </div>
            </div>

            <div className="workspace-delete-warning">
              {t(
                "workspaceSettings.deleteWarning",
              )}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={
                  closeDeleteDialog
                }
                disabled={isDeleting}
              >
                {t("common.cancel")}
              </button>

              <button
                type="button"
                className="danger-button"
                onClick={() =>
                  void confirmDelete()
                }
                disabled={isDeleting}
              >
                {isDeleting
                  ? t(
                      "workspaceSettings.deleting",
                    )
                  : t(
                      "workspaceSettings.confirmDelete",
                    )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}