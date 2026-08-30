import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

import { chatService } from "../../services/chatService";
import type { ChatSession } from "../../types/chat";
import {
  getApiErrorKey,
} from "../../utils/apiError";

interface WorkspaceChatsTabProps {
  workspaceId: string;
}

export function WorkspaceChatsTab({
  workspaceId,
}: WorkspaceChatsTabProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [sessions, setSessions] =
    useState<ChatSession[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorKey, setErrorKey] =
    useState<string | null>(null);

  const [isCreateOpen, setIsCreateOpen] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [isCreating, setIsCreating] =
    useState(false);

  const [sessionToRename, setSessionToRename] =
    useState<ChatSession | null>(null);

  const [renameTitle, setRenameTitle] =
    useState("");

  const [isRenaming, setIsRenaming] =
    useState(false);

  const [sessionToDelete, setSessionToDelete] =
    useState<ChatSession | null>(null);

  const [isDeleting, setIsDeleting] =
    useState(false);

  useEffect(() => {
    void loadSessions();
  }, [workspaceId]);

  async function loadSessions() {
    setIsLoading(true);

    try {
      setErrorKey(null);

      const data =
        await chatService.getWorkspaceSessions(
          workspaceId,
        );

      setSessions(data);
    } catch (error) {
      setErrorKey(
        getApiErrorKey(error),
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setIsCreating(true);
    setErrorKey(null);

    try {
      const created =
        await chatService.createSession(
          workspaceId,
          {
            title:
              title.trim() || undefined,
          },
        );

      setIsCreateOpen(false);
      setTitle("");

      navigate(
        `/workspaces/${workspaceId}/chats/${created.id}`,
      );
    } catch (error) {
      setErrorKey(
        getApiErrorKey(error),
      );
    } finally {
      setIsCreating(false);
    }
  }

  function openRename(
    session: ChatSession,
  ) {
    setSessionToRename(session);

    setRenameTitle(
      session.title ?? "",
    );
  }

  async function handleRename(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      !sessionToRename ||
      !renameTitle.trim()
    ) {
      return;
    }

    setIsRenaming(true);
    setErrorKey(null);

    try {
      const updated =
        await chatService.updateSession(
          sessionToRename.id,
          {
            title: renameTitle.trim(),
          },
        );

      setSessions((current) =>
        current.map((session) =>
          session.id === updated.id
            ? updated
            : session,
        ),
      );

      setSessionToRename(null);
      setRenameTitle("");
    } catch (error) {
      setErrorKey(
        getApiErrorKey(error),
      );
    } finally {
      setIsRenaming(false);
    }
  }

  async function confirmDelete() {
    if (!sessionToDelete) {
      return;
    }

    const sessionId =
      sessionToDelete.id;

    setIsDeleting(true);
    setErrorKey(null);

    try {
      await chatService.deleteSession(
        sessionId,
      );

      setSessions((current) =>
        current.filter(
          (session) =>
            session.id !== sessionId,
        ),
      );

      setSessionToDelete(null);
    } catch (error) {
      setErrorKey(
        getApiErrorKey(error),
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <div className="workspace-section-heading">
        <div>
          <h3>
            {t(
              "workspaceDetails.chats",
            )}
          </h3>

          <p>
            {t(
              "workspaceDetails.chatsDescription",
            )}
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() =>
            setIsCreateOpen(true)
          }
        >
          + {t("chats.newChat")}
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
          {t("chats.loading")}
        </div>
      ) : sessions.length === 0 ? (
        <div className="chat-empty-state">
          <div className="chat-empty-icon">
            ✦
          </div>

          <h4>
            {t("chats.emptyTitle")}
          </h4>

          <p>
            {t(
              "chats.emptyDescription",
            )}
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              setIsCreateOpen(true)
            }
          >
            + {t("chats.newChat")}
          </button>
        </div>
      ) : (
        <div className="chat-session-grid">
          {sessions.map(
            (session) => (
              <article
                key={session.id}
                className="chat-session-card"
              >
                <button
                  type="button"
                  className="chat-session-main"
                  onClick={() =>
                    navigate(
                      `/workspaces/${workspaceId}/chats/${session.id}`,
                    )
                  }
                >
                  <div className="chat-session-icon">
                    ✦
                  </div>

                  <div className="chat-session-info">
                    <strong>
                      {session.title ||
                        t(
                          "chats.untitled",
                        )}
                    </strong>

                    <span>
                      {formatDate(
                        session.updatedAt,
                        i18n.resolvedLanguage,
                      )}
                    </span>
                  </div>
                </button>

                <div className="chat-session-actions">
                  <button
                    type="button"
                    onClick={() =>
                      openRename(
                        session,
                      )
                    }
                  >
                    {t("chats.rename")}
                  </button>

                  <button
                    type="button"
                    className="chat-session-delete"
                    onClick={() =>
                      setSessionToDelete(
                        session,
                      )
                    }
                  >
                    {t("common.delete")}
                  </button>
                </div>
              </article>
            ),
          )}
        </div>
      )}

      {/* CREATE */}
      {isCreateOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={() => {
            if (!isCreating) {
              setIsCreateOpen(false);
            }
          }}
        >
          <div
            className="modal chat-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <h3>
                  {t(
                    "chats.createTitle",
                  )}
                </h3>

                <p>
                  {t(
                    "chats.createDescription",
                  )}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                disabled={isCreating}
                onClick={() =>
                  setIsCreateOpen(false)
                }
              >
                ×
              </button>
            </div>

            <form
              onSubmit={
                handleCreate
              }
            >
              <div className="form-group">
                <label htmlFor="chatTitle">
                  {t(
                    "chats.titleLabel",
                  )}
                </label>

                <input
                  id="chatTitle"
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value,
                    )
                  }
                  maxLength={255}
                  placeholder={t(
                    "chats.titlePlaceholder",
                  )}
                  disabled={isCreating}
                  autoFocus
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  disabled={isCreating}
                  onClick={() =>
                    setIsCreateOpen(false)
                  }
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
                      "chats.creating",
                    )
                    : t(
                      "chats.create",
                    )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RENAME */}
      {sessionToRename && (
        <div
          className="modal-backdrop"
          onMouseDown={() => {
            if (!isRenaming) {
              setSessionToRename(
                null,
              );
            }
          }}
        >
          <div
            className="modal chat-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <h3>
                  {t(
                    "chats.renameTitle",
                  )}
                </h3>
              </div>
            </div>

            <form
              onSubmit={
                handleRename
              }
            >
              <div className="form-group">
                <label htmlFor="renameChat">
                  {t(
                    "chats.titleLabel",
                  )}
                </label>

                <input
                  id="renameChat"
                  value={renameTitle}
                  onChange={(event) =>
                    setRenameTitle(
                      event.target.value,
                    )
                  }
                  maxLength={255}
                  disabled={isRenaming}
                  autoFocus
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  disabled={isRenaming}
                  onClick={() =>
                    setSessionToRename(
                      null,
                    )
                  }
                >
                  {t("common.cancel")}
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={
                    isRenaming ||
                    !renameTitle.trim()
                  }
                >
                  {isRenaming
                    ? t(
                      "chats.saving",
                    )
                    : t(
                      "common.save",
                    )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE */}
      {sessionToDelete && (
        <div
          className="modal-backdrop"
          onMouseDown={() => {
            if (!isDeleting) {
              setSessionToDelete(
                null,
              );
            }
          }}
        >
          <div
            className="modal chat-delete-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="document-delete-dialog-header">
              <div className="document-delete-dialog-icon">
                !
              </div>

              <div>
                <h3>
                  {t(
                    "chats.deleteTitle",
                  )}
                </h3>

                <p>
                  {t(
                    "chats.deleteDescription",
                    {
                      title:
                        sessionToDelete.title ||
                        t(
                          "chats.untitled",
                        ),
                    },
                  )}
                </p>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                disabled={isDeleting}
                onClick={() =>
                  setSessionToDelete(
                    null,
                  )
                }
              >
                {t("common.cancel")}
              </button>

              <button
                type="button"
                className="danger-button"
                disabled={isDeleting}
                onClick={() =>
                  void confirmDelete()
                }
              >
                {isDeleting
                  ? t(
                    "chats.deleting",
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

function formatDate(
  value: string,
  language?: string,
): string {
  return new Intl.DateTimeFormat(
    language === "bg"
      ? "bg-BG"
      : "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(new Date(value));
}