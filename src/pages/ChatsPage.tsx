import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  MessageSquareText,
  Search,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

import {
  chatService,
} from "../services/chatService";

import {
  getApiErrorKey,
} from "../utils/apiError";

import type {
  ChatSession,
} from "../types/chat";

export function ChatsPage() {
  const navigate = useNavigate();

  const {
    t,
    i18n,
  } = useTranslation();

  const [
    chats,
    setChats,
  ] = useState<ChatSession[]>([]);

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    workspaceFilter,
    setWorkspaceFilter,
  ] = useState("ALL");

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    errorKey,
    setErrorKey,
  ] = useState<string | null>(null);

  useEffect(() => {
    void loadChats();
  }, []);

  async function loadChats() {
    setIsLoading(true);
    setErrorKey(null);

    try {
      const result =
        await chatService
          .getAllSessions();

      setChats(result);
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

    for (const chat of chats) {
      workspaceMap.set(
        chat.workspaceId,
        chat.workspaceName,
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
  }, [chats]);

  const filteredChats =
    useMemo(() => {
      const normalizedQuery =
        searchQuery
          .trim()
          .toLowerCase();

      return chats.filter(
        (chat) => {
          if (
            workspaceFilter !==
              "ALL" &&
            chat.workspaceId !==
              workspaceFilter
          ) {
            return false;
          }

          if (!normalizedQuery) {
            return true;
          }

          const title =
            chat.title
              ?.toLowerCase() ??
            "";

          const workspaceName =
            chat.workspaceName
              ?.toLowerCase() ??
            "";

          return (
            title.includes(
              normalizedQuery,
            ) ||
            workspaceName.includes(
              normalizedQuery,
            )
          );
        },
      );
    }, [
      chats,
      searchQuery,
      workspaceFilter,
    ]);

  function openChat(
    chat: ChatSession,
  ) {
    navigate(
      `/workspaces/${chat.workspaceId}/chats/${chat.id}`,
    );
  }

  function formatDateTime(
    value: string,
  ) {
    const locale =
      i18n.resolvedLanguage ===
      "bg"
        ? "bg-BG"
        : "en-US";

    return new Intl.DateTimeFormat(
      locale,
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    ).format(
      new Date(value),
    );
  }

  return (
    <div className="global-chats-page">
      {/* HEADER */}
      <div className="global-chats-header">
        <div>
          <span className="page-eyebrow">
            {t(
              "chats.global.eyebrow",
            )}
          </span>

          <h1>
            {t(
              "chats.global.title",
            )}
          </h1>

          <p>
            {t(
              "chats.global.description",
            )}
          </p>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="global-chats-toolbar">
        <div className="global-chats-search">
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
              "chats.global.searchPlaceholder",
            )}
          />
        </div>

        <select
          value={workspaceFilter}
          onChange={(event) =>
            setWorkspaceFilter(
              event.target.value,
            )
          }
          aria-label={t(
            "chats.global.allWorkspaces",
          )}
        >
          <option value="ALL">
            {t(
              "chats.global.allWorkspaces",
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

      {/* CONTENT */}
      {isLoading ? (
        <div className="global-chats-state">
          {t(
            "chats.global.loading",
          )}
        </div>
      ) : chats.length === 0 ? (
        <div className="global-chats-empty">
          <div className="global-chats-empty-icon">
            <MessageSquareText
              size={28}
              strokeWidth={1.6}
            />
          </div>

          <h2>
            {t(
              "chats.global.emptyTitle",
            )}
          </h2>

          <p>
            {t(
              "chats.global.emptyDescription",
            )}
          </p>
        </div>
      ) : filteredChats.length ===
        0 ? (
        <div className="global-chats-empty">
          <div className="global-chats-empty-icon">
            <Search
              size={28}
              strokeWidth={1.6}
            />
          </div>

          <h2>
            {t(
              "chats.global.noResultsTitle",
            )}
          </h2>

          <p>
            {t(
              "chats.global.noResultsDescription",
            )}
          </p>
        </div>
      ) : (
        <div className="global-chats-table-wrapper">
          <table className="global-chats-table">
            <thead>
              <tr>
                <th>
                  {t(
                    "chats.global.columns.chat",
                  )}
                </th>

                <th>
                  {t(
                    "chats.global.columns.workspace",
                  )}
                </th>

                <th>
                  {t(
                    "chats.global.columns.created",
                  )}
                </th>

                <th>
                  {t(
                    "chats.global.columns.updated",
                  )}
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredChats.map(
                (chat) => (
                  <tr
                    key={chat.id}
                    tabIndex={0}
                    onClick={() =>
                      openChat(chat)
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

                        openChat(
                          chat,
                        );
                      }
                    }}
                  >
                    {/* CHAT */}
                    <td>
                      <div className="global-chat-name">
                        <div className="global-chat-icon">
                          <MessageSquareText
                            size={18}
                            strokeWidth={
                              1.8
                            }
                          />
                        </div>

                        <div>
                          <strong>
                            {chat.title ||
                              t(
                                "chats.untitled",
                              )}
                          </strong>

                          <span>
                            {t(
                              "chats.global.openConversation",
                            )}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* WORKSPACE */}
                    <td>
                      <span className="global-chat-workspace">
                        {
                          chat.workspaceName
                        }
                      </span>
                    </td>

                    {/* CREATED */}
                    <td>
                      {formatDateTime(
                        chat.createdAt,
                      )}
                    </td>

                    {/* UPDATED */}
                    <td>
                      {formatDateTime(
                        chat.updatedAt,
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