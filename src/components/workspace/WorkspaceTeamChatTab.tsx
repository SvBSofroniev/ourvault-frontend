import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import {
  MessageCircle,
  Send,
} from "lucide-react";

import {
  useTranslation,
} from "react-i18next";

import {
  workspaceMessageService,
} from "../../services/workspaceMessageService";

import type {
  WorkspaceMessage,
} from "../../types/workspaceMessage";

import {
  getApiErrorKey,
} from "../../utils/apiError";

interface WorkspaceTeamChatTabProps {
  workspaceId: string;
}

const MESSAGE_POLL_INTERVAL_MS =
  3000;

const MAX_MESSAGE_LENGTH =
  2000;

export function WorkspaceTeamChatTab({
  workspaceId,
}: WorkspaceTeamChatTabProps) {
  const {
    t,
    i18n,
  } = useTranslation();

  const messagesEndRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const [
    messages,
    setMessages,
  ] = useState<WorkspaceMessage[]>([]);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isSending,
    setIsSending,
  ] = useState(false);

  const [
    errorKey,
    setErrorKey,
  ] = useState<string | null>(
    null,
  );

  const loadMessages =
    useCallback(
      async (
        showLoading = false,
      ) => {
        if (showLoading) {
          setIsLoading(
            true,
          );
        }

        try {
          const data =
            await workspaceMessageService
              .getMessages(
                workspaceId,
              );

          setMessages(
            data,
          );

          setErrorKey(
            null,
          );
        } catch (error) {
          /*
           * Avoid replacing the whole screen
           * during background polling.
           */
          setErrorKey(
            getApiErrorKey(
              error,
            ),
          );
        } finally {
          if (showLoading) {
            setIsLoading(
              false,
            );
          }
        }
      },
      [workspaceId],
    );

  /*
   * Initial load.
   */
  useEffect(() => {
    void loadMessages(
      true,
    );
  }, [
    loadMessages,
  ]);

  /*
   * Lightweight polling.
   *
   * The component only exists while the Team Chat
   * workspace tab is active, so polling stops
   * automatically when the user switches tabs.
   */
  useEffect(() => {
    const intervalId =
      window.setInterval(
        () => {
          void loadMessages(
            false,
          );
        },
        MESSAGE_POLL_INTERVAL_MS,
      );

    return () => {
      window.clearInterval(
        intervalId,
      );
    };
  }, [
    loadMessages,
  ]);

  /*
   * Keep the latest conversation visible.
   */
  useEffect(() => {
    messagesEndRef.current
      ?.scrollIntoView({
        behavior:
          isLoading
            ? "auto"
            : "smooth",
      });
  }, [
    messages.length,
  ]);

  async function handleSubmit(
    event?: FormEvent<HTMLFormElement>,
  ) {
    event?.preventDefault();

    const content =
      message.trim();

    if (
      !content ||
      isSending
    ) {
      return;
    }

    if (
      content.length >
      MAX_MESSAGE_LENGTH
    ) {
      setErrorKey(
        "workspaceChat.messageTooLong",
      );

      return;
    }

    setIsSending(
      true,
    );

    setErrorKey(
      null,
    );

    /*
     * Clear immediately for a responsive
     * chat composer.
     */
    setMessage("");

    try {
      const sentMessage =
        await workspaceMessageService
          .sendMessage(
            workspaceId,
            {
              content,
            },
          );

      setMessages(
        (current) => {
          const alreadyExists =
            current.some(
              (item) =>
                item.id ===
                sentMessage.id,
            );

          if (alreadyExists) {
            return current;
          }

          return [
            ...current,
            sentMessage,
          ];
        },
      );
    } catch (error) {
      /*
       * Restore the text if sending failed.
       */
      setMessage(
        content,
      );

      setErrorKey(
        getApiErrorKey(
          error,
        ),
      );
    } finally {
      setIsSending(
        false,
      );
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      void handleSubmit();
    }
  }

  function handleMessageChange(
    value: string,
  ) {
    setMessage(
      value,
    );

    if (errorKey) {
      setErrorKey(
        null,
      );
    }
  }

  return (
    <div className="workspace-team-chat">
      <div className="workspace-section-heading">
        <div>
          <h3>
            {t(
              "workspaceChat.title",
            )}
          </h3>

          <p>
            {t(
              "workspaceChat.description",
            )}
          </p>
        </div>

        <div className="workspace-chat-live-indicator">
          <span />

          {t(
            "workspaceChat.active",
          )}
        </div>
      </div>

      {errorKey && (
        <div
          className="page-error"
          role="alert"
        >
          <span>
            !
          </span>

          {t(
            errorKey,
          )}
        </div>
      )}

      <div className="workspace-chat-panel">
        <div className="workspace-chat-messages">
          {isLoading ? (
            <div className="workspace-chat-state">
              {t(
                "workspaceChat.loading",
              )}
            </div>
          ) : messages.length ===
            0 ? (
            <div className="workspace-chat-empty">
              <div className="workspace-chat-empty-icon">
                <MessageCircle
                  size={28}
                  strokeWidth={
                    1.7
                  }
                />
              </div>

              <h4>
                {t(
                  "workspaceChat.emptyTitle",
                )}
              </h4>

              <p>
                {t(
                  "workspaceChat.emptyDescription",
                )}
              </p>
            </div>
          ) : (
            messages.map(
              (
                chatMessage,
                index,
              ) => {
                const previousMessage =
                  index > 0
                    ? messages[
                        index - 1
                      ]
                    : null;

                const showSender =
                  !previousMessage ||
                  previousMessage.userId !==
                    chatMessage.userId;

                return (
                  <WorkspaceChatMessage
                    key={
                      chatMessage.id
                    }
                    message={
                      chatMessage
                    }
                    showSender={
                      showSender
                    }
                    language={
                      i18n.resolvedLanguage
                    }
                  />
                );
              },
            )
          )}

          <div
            ref={
              messagesEndRef
            }
          />
        </div>

        <form
          className="workspace-chat-composer"
          onSubmit={
            handleSubmit
          }
          noValidate
        >
          <textarea
            value={
              message
            }
            onChange={(
              event,
            ) =>
              handleMessageChange(
                event.target
                  .value,
              )
            }
            onKeyDown={
              handleKeyDown
            }
            placeholder={t(
              "workspaceChat.placeholder",
            )}
            maxLength={
              MAX_MESSAGE_LENGTH
            }
            rows={2}
            disabled={
              isSending
            }
          />

          <div className="workspace-chat-composer-footer">
            <span>
              {t(
                "workspaceChat.sendHint",
              )}
            </span>

            <div className="workspace-chat-composer-actions">
              <span className="workspace-chat-character-count">
                {
                  message.length
                }
                /
                {
                  MAX_MESSAGE_LENGTH
                }
              </span>

              <button
                type="submit"
                className="workspace-chat-send"
                disabled={
                  isSending ||
                  !message.trim()
                }
              >
                <Send
                  size={17}
                  strokeWidth={
                    1.9
                  }
                />

                <span>
                  {isSending
                    ? t(
                        "workspaceChat.sending",
                      )
                    : t(
                        "workspaceChat.send",
                      )}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

interface WorkspaceChatMessageProps {
  message: WorkspaceMessage;
  showSender: boolean;
  language?: string;
}

function WorkspaceChatMessage({
  message,
  showSender,
  language,
}: WorkspaceChatMessageProps) {
  const initials =
    getInitials(
      message.displayName ||
        message.username,
    );

  return (
    <div
      className={
        message.ownMessage
          ? "workspace-chat-message-row workspace-chat-message-own"
          : "workspace-chat-message-row"
      }
    >
      {!message.ownMessage && (
        <div className="workspace-chat-avatar">
          {showSender
            ? initials
            : ""}
        </div>
      )}

      <div className="workspace-chat-message-container">
        {showSender &&
          !message.ownMessage && (
            <span className="workspace-chat-sender">
              {
                message.displayName
              }
            </span>
          )}

        {showSender &&
          message.ownMessage && (
            <span className="workspace-chat-sender workspace-chat-own-sender">
              {
                message.displayName
              }
            </span>
          )}

        <div className="workspace-chat-bubble">
          <p>
            {
              message.content
            }
          </p>

          <time
            dateTime={
              message.createdAt
            }
          >
            {formatMessageTime(
              message.createdAt,
              language,
            )}
          </time>
        </div>
      </div>
    </div>
  );
}

function getInitials(
  value: string,
): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) =>
      part
        .charAt(0)
        .toUpperCase(),
    )
    .join("");
}

function formatMessageTime(
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
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(
    new Date(
      value,
    ),
  );
}