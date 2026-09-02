import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    FileText,
    FolderKanban,
    LoaderCircle,
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
    workspaceService,
} from "../services/workspaceService";

import {
    documentService,
} from "../services/documentService";

import {
    chatService,
} from "../services/chatService";

import {
    getApiErrorKey,
} from "../utils/apiError";

import type {
    Workspace,
} from "../types/workspace";

import type {
    GlobalDocument,
} from "../types/document";

import type {
    ChatSession,
} from "../types/chat";

type SearchResult =
    | {
        type: "workspace";
        id: string;
        title: string;
        subtitle: string | null;
        path: string;
    }
    | {
        type: "document";
        id: string;
        title: string;
        subtitle: string;
        path: string;
    }
    | {
        type: "chat";
        id: string;
        title: string;
        subtitle: string;
        path: string;
    };

export function GlobalSearch() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const containerRef =
        useRef<HTMLDivElement | null>(null);

    const inputRef =
        useRef<HTMLInputElement | null>(null);

    const [
        query,
        setQuery,
    ] = useState("");

    const [
        workspaces,
        setWorkspaces,
    ] = useState<Workspace[]>([]);

    const [
        documents,
        setDocuments,
    ] = useState<GlobalDocument[]>([]);

    const [
        chats,
        setChats,
    ] = useState<ChatSession[]>([]);

    const [
        isOpen,
        setIsOpen,
    ] = useState(false);

    const [
        isLoading,
        setIsLoading,
    ] = useState(false);

    const [
        hasLoaded,
        setHasLoaded,
    ] = useState(false);

    const [
        errorKey,
        setErrorKey,
    ] = useState<string | null>(null);

    const [
        selectedIndex,
        setSelectedIndex,
    ] = useState(-1);

    async function loadSearchData(
        forceRefresh = false,
    ) {
        if (
            (!forceRefresh && hasLoaded) ||
            isLoading
        ) {
            return;
        }

        setIsLoading(true);
        setErrorKey(null);

        try {
            const [
                workspaceResults,
                documentResults,
                chatResults,
            ] = await Promise.all([
                workspaceService
                    .getMyWorkspaces(),

                documentService
                    .getAllAccessible(),

                chatService
                    .getAllSessions(),
            ]);

            setWorkspaces(
                workspaceResults,
            );

            setDocuments(
                documentResults,
            );

            setChats(
                chatResults,
            );

            setHasLoaded(true);
        } catch (error) {
            setErrorKey(
                getApiErrorKey(error),
            );
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        function handleDocumentClick(
            event: MouseEvent,
        ) {
            if (
                containerRef.current &&
                !containerRef.current.contains(
                    event.target as Node,
                )
            ) {
                setIsOpen(false);
                setSelectedIndex(-1);
            }
        }

        document.addEventListener(
            "mousedown",
            handleDocumentClick,
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleDocumentClick,
            );
        };
    }, []);

    useEffect(() => {
        function handleGlobalShortcut(
            event: KeyboardEvent,
        ) {
            if (
                event.key !== "/" ||
                event.ctrlKey ||
                event.metaKey ||
                event.altKey
            ) {
                return;
            }

            const target =
                event.target as HTMLElement;

            const isTyping =
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable;

            if (isTyping) {
                return;
            }

            event.preventDefault();

            inputRef.current?.focus();
            setIsOpen(true);

            void loadSearchData();
        }

        document.addEventListener(
            "keydown",
            handleGlobalShortcut,
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleGlobalShortcut,
            );
        };
    }, [
        hasLoaded,
        isLoading,
    ]);

    const normalizedQuery =
        query
            .trim()
            .toLowerCase();

    const workspaceResults =
        useMemo<SearchResult[]>(() => {
            if (!normalizedQuery) {
                return [];
            }

            return workspaces
                .filter((workspace) => {
                    const name =
                        workspace.name
                            .toLowerCase();

                    const description =
                        workspace.description
                            ?.toLowerCase() ?? "";

                    return (
                        name.includes(
                            normalizedQuery,
                        ) ||
                        description.includes(
                            normalizedQuery,
                        )
                    );
                })
                .slice(0, 5)
                .map((workspace) => ({
                    type:
                        "workspace" as const,

                    id:
                        workspace.id,

                    title:
                        workspace.name,

                    subtitle:
                        workspace.description,

                    path:
                        `/workspaces/${workspace.id}`,
                }));
        }, [
            normalizedQuery,
            workspaces,
        ]);

    const documentResults =
        useMemo<SearchResult[]>(() => {
            if (!normalizedQuery) {
                return [];
            }

            return documents
                .filter((document) => {
                    const title =
                        document.title
                            ?.toLowerCase() ?? "";

                    const filename =
                        document.originalFilename
                            ?.toLowerCase() ?? "";

                    const workspaceName =
                        document.workspaceName
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
                        )
                    );
                })
                .slice(0, 5)
                .map((document) => ({
                    type:
                        "document" as const,

                    id:
                        document.id,

                    title:
                        document.title,

                    subtitle:
                        document.workspaceName,

                    path:
                        `/workspaces/${document.workspaceId}/documents/${document.id}`,
                }));
        }, [
            normalizedQuery,
            documents,
        ]);

    const chatResults =
        useMemo<SearchResult[]>(() => {
            if (!normalizedQuery) {
                return [];
            }

            return chats
                .filter((chat) => {
                    const title =
                        chat.title
                            ?.toLowerCase() ?? "";

                    const workspaceName =
                        chat.workspaceName
                            ?.toLowerCase() ?? "";

                    return (
                        title.includes(
                            normalizedQuery,
                        ) ||
                        workspaceName.includes(
                            normalizedQuery,
                        )
                    );
                })
                .slice(0, 5)
                .map((chat) => ({
                    type:
                        "chat" as const,

                    id:
                        chat.id,

                    title:
                        chat.title ??
                        t("chats.untitled"),

                    subtitle:
                        chat.workspaceName,

                    path:
                        `/workspaces/${chat.workspaceId}/chats/${chat.id}`,
                }));
        }, [
            normalizedQuery,
            chats,
        ]);

    const allResults =
        useMemo(
            () => [
                ...workspaceResults,
                ...documentResults,
                ...chatResults,
            ],
            [
                workspaceResults,
                documentResults,
                chatResults,
            ],
        );

    useEffect(() => {
        setSelectedIndex(-1);
    }, [query]);

    function selectResult(
        result: SearchResult,
    ) {
        setQuery("");
        setIsOpen(false);
        setSelectedIndex(-1);

        navigate(
            result.path,
        );
    }

    function handleKeyDown(
        event: React.KeyboardEvent<HTMLInputElement>,
    ) {
        if (
            event.key === "Escape"
        ) {
            setIsOpen(false);
            setSelectedIndex(-1);
            inputRef.current?.blur();

            return;
        }

        if (
            allResults.length === 0
        ) {
            return;
        }

        if (
            event.key === "ArrowDown"
        ) {
            event.preventDefault();

            setSelectedIndex(
                (current) =>
                    current >=
                        allResults.length - 1
                        ? 0
                        : current + 1,
            );

            return;
        }

        if (
            event.key === "ArrowUp"
        ) {
            event.preventDefault();

            setSelectedIndex(
                (current) =>
                    current <= 0
                        ? allResults.length - 1
                        : current - 1,
            );

            return;
        }

        if (
            event.key === "Enter" &&
            selectedIndex >= 0
        ) {
            event.preventDefault();

            selectResult(
                allResults[
                selectedIndex
                ],
            );
        }
    }

    function renderResult(
        result: SearchResult,
        absoluteIndex: number,
    ) {
        const isSelected =
            absoluteIndex ===
            selectedIndex;

        const icon =
            result.type ===
                "workspace" ? (
                <FolderKanban
                    size={17}
                    strokeWidth={1.8}
                />
            ) : result.type ===
                "document" ? (
                <FileText
                    size={17}
                    strokeWidth={1.8}
                />
            ) : (
                <MessageSquareText
                    size={17}
                    strokeWidth={1.8}
                />
            );

        return (
            <button
                key={`${result.type}-${result.id}`}
                type="button"
                className={
                    isSelected
                        ? "global-search-result global-search-result-selected"
                        : "global-search-result"
                }
                onMouseEnter={() =>
                    setSelectedIndex(
                        absoluteIndex,
                    )
                }
                onClick={() =>
                    selectResult(result)
                }
            >
                <span className="global-search-result-icon">
                    {icon}
                </span>

                <span className="global-search-result-content">
                    <strong>
                        {result.title}
                    </strong>

                    {result.subtitle && (
                        <span>
                            {result.subtitle}
                        </span>
                    )}
                </span>
            </button>
        );
    }

    const hasResults =
        allResults.length > 0;

    const showDropdown =
        isOpen &&
        query.trim().length > 0;

    return (
        <div
            ref={containerRef}
            className="global-search"
        >
            <div className="global-search-input-wrapper">
                <Search
                    size={17}
                    strokeWidth={1.8}
                />

                <input
                    ref={inputRef}
                    className="global-search-input"
                    type="search"
                    value={query}
                    placeholder={t(
                        "navigation.search",
                    )}
                    onFocus={() => {
                        setIsOpen(true);

                        void loadSearchData();
                    }}
                    onChange={(event) => {
                        setQuery(
                            event.target.value,
                        );

                        setIsOpen(true);

                        if (!hasLoaded) {
                            void loadSearchData();
                        }
                    }}
                    onKeyDown={
                        handleKeyDown
                    }
                />

                <span className="global-search-shortcut">
                    /
                </span>
            </div>

            {showDropdown && (
                <div className="global-search-dropdown">
                    {isLoading ? (
                        <div className="global-search-state">
                            <LoaderCircle
                                className="global-search-spinner"
                                size={18}
                            />

                            {t(
                                "globalSearch.loading",
                            )}
                        </div>
                    ) : errorKey ? (
                        <div className="global-search-state global-search-error">
                            {t(errorKey)}
                        </div>
                    ) : !hasResults ? (
                        <div className="global-search-state">
                            {t(
                                "globalSearch.noResults",
                            )}
                        </div>
                    ) : (
                        <>
                            {workspaceResults.length >
                                0 && (
                                    <section className="global-search-group">
                                        <span className="global-search-group-title">
                                            {t(
                                                "globalSearch.workspaces",
                                            )}
                                        </span>

                                        {workspaceResults.map(
                                            (
                                                result,
                                                index,
                                            ) =>
                                                renderResult(
                                                    result,
                                                    index,
                                                ),
                                        )}
                                    </section>
                                )}

                            {documentResults.length >
                                0 && (
                                    <section className="global-search-group">
                                        <span className="global-search-group-title">
                                            {t(
                                                "globalSearch.documents",
                                            )}
                                        </span>

                                        {documentResults.map(
                                            (
                                                result,
                                                index,
                                            ) =>
                                                renderResult(
                                                    result,
                                                    workspaceResults.length +
                                                    index,
                                                ),
                                        )}
                                    </section>
                                )}

                            {chatResults.length >
                                0 && (
                                    <section className="global-search-group">
                                        <span className="global-search-group-title">
                                            {t(
                                                "globalSearch.chats",
                                            )}
                                        </span>

                                        {chatResults.map(
                                            (
                                                result,
                                                index,
                                            ) =>
                                                renderResult(
                                                    result,
                                                    workspaceResults.length +
                                                    documentResults.length +
                                                    index,
                                                ),
                                        )}
                                    </section>
                                )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}