import {
  useState,
  type FormEvent,
} from "react";

import {
  useTranslation,
} from "react-i18next";

import {
  Search,
  FileText,
} from "lucide-react";

import { searchService } from "../../services/searchService";
import type { SemanticSearchResult } from "../../types/search";
import { getApiErrorMessage } from "../../utils/apiError";

interface WorkspaceSearchTabProps {
  workspaceId: string;
}

export function WorkspaceSearchTab({
  workspaceId,
}: WorkspaceSearchTabProps) {
  const { t } = useTranslation();

  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState<SemanticSearchResult[]>([]);

  const [hasSearched, setHasSearched] =
    useState(false);

  const [isSearching, setIsSearching] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const normalizedQuery =
      query.trim();

    if (
      !normalizedQuery ||
      isSearching
    ) {
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const data =
        await searchService.searchWorkspace(
          workspaceId,
          normalizedQuery,
          10,
        );

      setResults(data);
      setHasSearched(true);
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="workspace-search">
      <div className="workspace-section-heading">
        <div>
          <h3>
            {t("workspaceSearch.title")}
          </h3>

          <p>
            {t(
              "workspaceSearch.description",
            )}
          </p>
        </div>
      </div>

      <form
        className="workspace-search-form"
        onSubmit={handleSearch}
      >
        <div className="workspace-search-input-wrapper">
          <Search
            size={18}
            strokeWidth={1.8}
          />

          <input
            value={query}
            onChange={(event) =>
              setQuery(
                event.target.value,
              )
            }
            placeholder={t(
              "workspaceSearch.placeholder",
            )}
            maxLength={5000}
          />
        </div>

        <button
          type="submit"
          className="primary-button"
          disabled={
            isSearching ||
            !query.trim()
          }
        >
          {isSearching
            ? t(
              "workspaceSearch.searching",
            )
            : t(
              "workspaceSearch.search",
            )}
        </button>
      </form>

      {error && (
        <div
          className="page-error"
          role="alert"
        >
          <span>!</span>
          {error}
        </div>
      )}

      {!hasSearched && (
        <div className="workspace-search-empty">
          <Search
            size={28}
            strokeWidth={1.5}
          />

          <strong>
            {t(
              "workspaceSearch.emptyTitle",
            )}
          </strong>

          <span>
            {t(
              "workspaceSearch.emptyDescription",
            )}
          </span>
        </div>
      )}

      {hasSearched &&
        results.length === 0 && (
          <div className="workspace-search-empty">
            {t(
              "workspaceSearch.noResults",
            )}
          </div>
        )}

      {results.length > 0 && (
        <div className="workspace-search-results">
          <div className="workspace-search-results-header">
            <strong>
              {t(
                "workspaceSearch.results",
                {
                  count:
                    results.length,
                },
              )}
            </strong>
          </div>

          {results.map(
            (
              result,
              index,
            ) => (
              <article
                key={result.chunkId}
                className="workspace-search-result"
              >
                <div className="workspace-search-result-header">
                  <div className="workspace-search-result-document">
                    <div className="workspace-search-result-icon">
                      <FileText
                        size={18}
                        strokeWidth={1.8}
                      />
                    </div>

                    <div>
                      <strong>
                        {
                          result.documentTitle
                        }
                      </strong>

                      <span>
                        {t(
                          "workspaceSearch.chunk",
                          {
                            index:
                              result.chunkIndex +
                              1,
                          },
                        )}
                      </span>
                    </div>
                  </div>

                  {result.similarity !== null && (
                    <span className="workspace-search-match">
                      {Math.round(
                        result.similarity *
                          100,
                      )}
                      %
                    </span>
                  )}
                </div>

                <div className="workspace-search-result-content">
                  {result.content}
                </div>

                <span className="workspace-search-result-number">
                  #
                  {index + 1}
                </span>
              </article>
            ),
          )}
        </div>
      )}
    </div>
  );
}