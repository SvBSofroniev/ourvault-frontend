import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

import { chatService } from "../services/chatService";
import { documentService } from "../services/documentService";

import type {
  AttachedDocument,
  ChatMessage,
  ChatSession,
} from "../types/chat";

import type { Document } from "../types/document";

import { getApiErrorMessage } from "../utils/apiError";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ChatPage() {
  const {
    workspaceId,
    sessionId,
  } = useParams();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const [session, setSession] =
    useState<ChatSession | null>(null);

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [
    attachedDocuments,
    setAttachedDocuments,
  ] = useState<AttachedDocument[]>([]);

  const [
    workspaceDocuments,
    setWorkspaceDocuments,
  ] = useState<Document[]>([]);

  const [message, setMessage] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSending, setIsSending] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [
    isDocumentsOpen,
    setIsDocumentsOpen,
  ] = useState(false);

  const [
    changingDocumentId,
    setChangingDocumentId,
  ] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    void initializeChat(
      sessionId,
    );
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isSending]);

  async function initializeChat(
    id: string,
  ) {
    setIsLoading(true);

    try {
      setError(null);

      const [
        sessionData,
        messageData,
        attachedData,
      ] = await Promise.all([
        chatService.getSession(id),
        chatService.getMessages(id),
        chatService.getAttachedDocuments(
          id,
        ),
      ]);

      setSession(sessionData);
      setMessages(messageData);
      setAttachedDocuments(
        attachedData,
      );

      const documents =
        await documentService.getWorkspaceDocuments(
          sessionData.workspaceId,
        );

      setWorkspaceDocuments(
        documents,
      );
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSend(
    event?: FormEvent<HTMLFormElement>,
  ) {
    event?.preventDefault();

    if (
      !sessionId ||
      !message.trim() ||
      isSending
    ) {
      return;
    }

    const outgoingMessage =
      message.trim();

    setMessage("");
    setIsSending(true);
    setError(null);

    try {
      const answer =
        await chatService.sendMessage(
          sessionId,
          {
            message:
              outgoingMessage,
          },
        );

      setMessages((current) => [
        ...current,
        answer.userMessage,
        answer.assistantMessage,
      ]);

    } catch (error) {
      setMessage(
        outgoingMessage,
      );

      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setIsSending(false);
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

      void handleSend();
    }
  }

  function isAttached(
    documentId: string,
  ): boolean {
    return attachedDocuments.some(
      (document) =>
        document.documentId ===
        documentId,
    );
  }

  async function toggleDocument(
    document: Document,
  ) {
    if (!sessionId) {
      return;
    }

    setChangingDocumentId(
      document.id,
    );

    setError(null);

    try {
      if (
        isAttached(document.id)
      ) {
        await chatService.detachDocument(
          sessionId,
          document.id,
        );

        setAttachedDocuments(
          (current) =>
            current.filter(
              (item) =>
                item.documentId !==
                document.id,
            ),
        );
      } else {
        const attached =
          await chatService.attachDocument(
            sessionId,
            document.id,
          );

        setAttachedDocuments(
          (current) => [
            ...current,
            attached,
          ],
        );
      }
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setChangingDocumentId(
        null,
      );
    }
  }

  if (isLoading) {
    return (
      <div className="content-state">
        {t("chats.loadingChat")}
      </div>
    );
  }

  if (!session) {
    return (
      <div className="page-error">
        <span>!</span>
        {error ??
          t("chats.notFound")}
      </div>
    );
  }

  return (
    <div className="chat-page">
      <header className="chat-page-header">
        <div>
          <button
            type="button"
            className="workspace-back-button"
            onClick={() =>
              navigate(
                `/workspaces/${workspaceId}`,
              )
            }
          >
            ← {session.workspaceName}
          </button>

          <h2>
            {session.title ||
              t("chats.untitled")}
          </h2>

          <p>
            {t(
              "chats.attachedCount",
              {
                count:
                  attachedDocuments.length,
              },
            )}
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            setIsDocumentsOpen(true)
          }
        >
          {t("chats.manageDocuments")}
        </button>
      </header>

      {error && (
        <div
          className="page-error"
          role="alert"
        >
          <span>!</span>
          {error}
        </div>
      )}

      <div className="chat-layout">
        <main className="chat-conversation">
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <div className="chat-welcome-icon">
                  ✦
                </div>

                <h3>
                  {t(
                    "chats.startConversation",
                  )}
                </h3>

                <p>
                  {t(
                    "chats.startConversationDescription",
                  )}
                </p>
              </div>
            )}

            {messages.map((chatMessage) => (
              <ChatMessageItem
                key={chatMessage.id}
                message={chatMessage}
              />
            ))}

            {isSending && (
              <div className="chat-message-row chat-message-assistant">
                <div className="chat-ai-avatar">
                  ✦
                </div>

                <div className="chat-message-body">
                  <div className="chat-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}

            <div
              ref={messagesEndRef}
            />
          </div>

          <form
            className="chat-composer"
            onSubmit={
              handleSend
            }
          >
            <textarea
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value,
                )
              }
              onKeyDown={
                handleKeyDown
              }
              placeholder={t(
                "chats.messagePlaceholder",
              )}
              maxLength={5000}
              rows={1}
              disabled={isSending}
            />

            <button
              type="submit"
              className="chat-send-button"
              disabled={
                isSending ||
                !message.trim()
              }
            >
              {isSending
                ? "..."
                : "↑"}
            </button>

            <span className="chat-composer-hint">
              {t(
                "chats.sendHint",
              )}
            </span>
          </form>
        </main>

        <aside className="chat-context-panel">
          <h3>
            {t(
              "chats.contextDocuments",
            )}
          </h3>

          <p>
            {t(
              "chats.contextDescription",
            )}
          </p>

          {attachedDocuments.length ===
            0 ? (
            <div className="chat-context-empty">
              {t(
                "chats.noAttachedDocuments",
              )}
            </div>
          ) : (
            <div className="chat-context-list">
              {attachedDocuments.map(
                (document) => (
                  <div
                    key={
                      document.contextId
                    }
                    className="chat-context-document"
                  >
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
                ),
              )}
            </div>
          )}

          <button
            type="button"
            className="secondary-button chat-context-manage"
            onClick={() =>
              setIsDocumentsOpen(
                true,
              )
            }
          >
            {t("chats.manageDocuments")}
          </button>
        </aside>
      </div>

      {isDocumentsOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={() =>
            setIsDocumentsOpen(
              false,
            )
          }
        >
          <div
            className="modal chat-documents-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <h3>
                  {t(
                    "chats.manageDocuments",
                  )}
                </h3>

                <p>
                  {t(
                    "chats.manageDocumentsDescription",
                  )}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setIsDocumentsOpen(
                    false,
                  )
                }
              >
                ×
              </button>
            </div>

            <div className="chat-document-options">
              {workspaceDocuments.map(
                (document) => {
                  const attached =
                    isAttached(
                      document.id,
                    );

                  const usable =
                    document.status ===
                    "READY";

                  return (
                    <button
                      key={
                        document.id
                      }
                      type="button"
                      className={
                        attached
                          ? "chat-document-option chat-document-option-selected"
                          : "chat-document-option"
                      }
                      disabled={
                        !usable ||
                        changingDocumentId ===
                        document.id
                      }
                      onClick={() =>
                        void toggleDocument(
                          document,
                        )
                      }
                    >
                      <div className="document-file-icon">
                        {getFileLabel(
                          document.originalFilename,
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

                      <span className="chat-document-state">
                        {!usable
                          ? document.status
                          : attached
                            ? t(
                              "chats.attached",
                            )
                            : t(
                              "chats.attach",
                            )}
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ChatMessageItemProps {
  message: ChatMessage;
}

function ChatMessageItem({
  message,
}: ChatMessageItemProps) {
  const { t } = useTranslation();

  const [showSources, setShowSources] =
    useState(false);

  const sources = message.sources ?? [];

  if (message.senderType === "SYSTEM") {
    return (
      <div className="chat-system-message">
        {message.content}
      </div>
    );
  }

  const isUser =
    message.senderType === "USER";

  return (
    <div
      className={
        isUser
          ? "chat-message-row chat-message-user"
          : "chat-message-row chat-message-assistant"
      }
    >
      {!isUser && (
        <div className="chat-ai-avatar">
          ✦
        </div>
      )}

      <div className="chat-message-body">
        <div className="chat-message-content">
          {message.senderType === "ASSISTANT" ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            message.content
          )}
        </div>

        {!isUser && sources.length > 0 && (
          <div className="chat-sources">
            <button
              type="button"
              className="chat-sources-toggle"
              onClick={() =>
                setShowSources(
                  (current) => !current,
                )
              }
              aria-expanded={showSources}
            >
              <span className="chat-sources-toggle-icon">
                ◈
              </span>

              <span>
                {showSources
                  ? t("chats.hideSources")
                  : t("chats.showSources", {
                      count: sources.length,
                    })}
              </span>

              <span
                className={
                  showSources
                    ? "chat-sources-chevron chat-sources-chevron-open"
                    : "chat-sources-chevron"
                }
              >
                ↓
              </span>
            </button>

            {showSources && (
              <div className="chat-source-list">
                {sources.map(
                  (source, sourceIndex) => (
                    <article
                      key={`${source.chunkId}-${sourceIndex}`}
                      className="chat-source-card"
                    >
                      <div className="chat-source-top">
                        <span className="chat-source-number">
                          {t("chats.source", {
                            number:
                              sourceIndex + 1,
                          })}
                        </span>

                        {source.similarity !== null ? (
                          <span className="chat-source-match">
                            {t(
                              "chats.semanticMatch",
                              {
                                percentage:
                                  Math.round(
                                    source.similarity *
                                      100,
                                  ),
                              },
                            )}
                          </span>
                        ) : (
                          <span className="chat-source-context-badge">
                            {t(
                              "chats.documentContext",
                            )}
                          </span>
                        )}
                      </div>

                      <div className="chat-source-document">
                        <div className="chat-source-document-icon">
                          DOC
                        </div>

                        <div>
                          <strong>
                            {
                              source.documentTitle
                            }
                          </strong>

                          <span>
                            {t("chats.chunk", {
                              index:
                                source.chunkIndex +
                                1,
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="chat-source-content">
                        {source.content}
                      </div>
                    </article>
                  ),
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
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