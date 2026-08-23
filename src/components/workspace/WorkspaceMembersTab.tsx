import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { useTranslation } from "react-i18next";

import { workspaceMemberService } from "../../services/workspaceMemberService";
import { userService } from "../../services/userService";

import type {
  WorkspaceMember,
} from "../../types/workspaceMember";

import type {
  WorkspaceRole,
} from "../../types/workspace";

import type {
  UserSearchResult,
} from "../../types/user";

import { getApiErrorMessage } from "../../utils/apiError";

interface WorkspaceMembersTabProps {
  workspaceId: string;
  myRole: WorkspaceRole;
}

export function WorkspaceMembersTab({
  workspaceId,
  myRole,
}: WorkspaceMembersTabProps) {
  const { t, i18n } = useTranslation();

  const [members, setMembers] =
    useState<WorkspaceMember[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [searchResults, setSearchResults] =
    useState<UserSearchResult[]>([]);

  const [isSearching, setIsSearching] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState<UserSearchResult | null>(null);

  const [isAdding, setIsAdding] =
    useState(false);

  const [
    updatingMemberId,
    setUpdatingMemberId,
  ] = useState<string | null>(null);

  const [
    memberToRemove,
    setMemberToRemove,
  ] = useState<WorkspaceMember | null>(
    null,
  );

  const [
    removingMemberId,
    setRemovingMemberId,
  ] = useState<string | null>(null);

  const canManageMembers =
    myRole === "OWNER" ||
    myRole === "ADMIN";

  useEffect(() => {
    void loadMembers();
  }, [workspaceId]);

  async function loadMembers() {
    setIsLoading(true);

    try {
      setError(null);

      const data =
        await workspaceMemberService.getMembers(
          workspaceId,
        );

      setMembers(data);
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setIsLoading(false);
    }
  }

  function openAddMemberModal() {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedUser(null);
    setIsAddModalOpen(true);
  }

  function closeAddMemberModal() {
    if (isAdding) {
      return;
    }

    setIsAddModalOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedUser(null);
  }

  async function handleSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const normalizedQuery =
      searchQuery.trim();

    if (normalizedQuery.length < 2) {
      setError(
        t(
          "members.searchMinimum",
        ),
      );

      return;
    }

    setIsSearching(true);
    setError(null);
    setSelectedUser(null);

    try {
      const results =
        await userService.searchUsers(
          normalizedQuery,
        );

      setSearchResults(results);
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setIsSearching(false);
    }
  }

  async function handleAddMember() {
    if (!selectedUser) {
      return;
    }

    setIsAdding(true);
    setError(null);

    try {
      await workspaceMemberService.addMember(
        workspaceId,
        {
          userId: selectedUser.id,
        },
      );

      await loadMembers();

      setIsAddModalOpen(false);
      setSearchQuery("");
      setSearchResults([]);
      setSelectedUser(null);
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setIsAdding(false);
    }
  }

  async function handleRoleChange(
    member: WorkspaceMember,
    role: WorkspaceRole,
  ) {
    if (
      role === member.role ||
      member.role === "OWNER"
    ) {
      return;
    }

    setUpdatingMemberId(
      member.memberId,
    );

    setError(null);

    try {
      await workspaceMemberService.updateMemberRole(
        workspaceId,
        member.memberId,
        {
          role,
        },
      );

      setMembers((current) =>
        current.map((item) =>
          item.memberId ===
          member.memberId
            ? {
                ...item,
                role,
              }
            : item,
        ),
      );
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setUpdatingMemberId(null);
    }
  }

  function requestRemoveMember(
    member: WorkspaceMember,
  ) {
    setMemberToRemove(member);
  }

  function closeRemoveDialog() {
    if (removingMemberId) {
      return;
    }

    setMemberToRemove(null);
  }

  async function confirmRemoveMember() {
    if (!memberToRemove) {
      return;
    }

    const memberId =
      memberToRemove.memberId;

    setRemovingMemberId(
      memberId,
    );

    setError(null);

    try {
      await workspaceMemberService.removeMember(
        workspaceId,
        memberId,
      );

      setMembers((current) =>
        current.filter(
          (member) =>
            member.memberId !==
            memberId,
        ),
      );

      setMemberToRemove(null);
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setRemovingMemberId(null);
    }
  }

  function isAlreadyMember(
    userId: string,
  ): boolean {
    return members.some(
      (member) =>
        member.userId === userId,
    );
  }

  return (
    <div>
      <div className="workspace-section-heading">
        <div>
          <h3>
            {t(
              "workspaceDetails.members",
            )}
          </h3>

          <p>
            {t(
              "workspaceDetails.membersDescription",
            )}
          </p>
        </div>

        {canManageMembers && (
          <button
            type="button"
            className="primary-button"
            onClick={
              openAddMemberModal
            }
          >
            + {t("members.addMember")}
          </button>
        )}
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

      {isLoading ? (
        <div className="content-state">
          {t("members.loading")}
        </div>
      ) : members.length === 0 ? (
        <div className="workspace-placeholder">
          {t("members.empty")}
        </div>
      ) : (
        <div className="members-table-wrapper">
          <table className="members-table">
            <thead>
              <tr>
                <th>
                  {t("members.member")}
                </th>

                <th>
                  {t("members.role")}
                </th>

                <th>
                  {t("members.joined")}
                </th>

                {canManageMembers && (
                  <th>
                    {t(
                      "members.actions",
                    )}
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {members.map(
                (member) => {
                  const isOwner =
                    member.role ===
                    "OWNER";

                  return (
                    <tr
                      key={
                        member.memberId
                      }
                    >
                      <td>
                        <div className="member-identity">
                          <div className="member-avatar">
                            {getInitials(
                              member.username,
                            )}
                          </div>

                          <div className="member-info">
                            <strong>
                              {
                                member.username
                              }
                            </strong>

                            <span>
                              {
                                member.email
                              }
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        {canManageMembers &&
                        !isOwner ? (
                          <select
                            className="member-role-select"
                            value={
                              member.role
                            }
                            disabled={
                              updatingMemberId ===
                              member.memberId
                            }
                            onChange={(
                              event,
                            ) =>
                              void handleRoleChange(
                                member,
                                event
                                  .target
                                  .value as WorkspaceRole,
                              )
                            }
                          >
                            <option value="ADMIN">
                              {t(
                                "common.roles.admin",
                              )}
                            </option>

                            <option value="MEMBER">
                              {t(
                                "common.roles.member",
                              )}
                            </option>
                          </select>
                        ) : (
                          <span
                            className={`badge ${getRoleBadgeClass(
                              member.role,
                            )}`}
                          >
                            {getRoleLabel(
                              member.role,
                              t,
                            )}
                          </span>
                        )}
                      </td>

                      <td>
                        {formatDate(
                          member.joinedAt,
                          i18n.resolvedLanguage,
                        )}
                      </td>

                      {canManageMembers && (
                        <td>
                          {isOwner ? (
                            <span className="member-owner-note">
                              {t(
                                "members.ownerProtected",
                              )}
                            </span>
                          ) : (
                            <button
                              type="button"
                              className="member-remove-button"
                              disabled={
                                removingMemberId ===
                                member.memberId
                              }
                              onClick={() =>
                                requestRemoveMember(
                                  member,
                                )
                              }
                            >
                              {t(
                                "members.remove",
                              )}
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD MEMBER MODAL */}
      {isAddModalOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={
            closeAddMemberModal
          }
        >
          <div
            className="modal member-modal"
            role="dialog"
            aria-modal="true"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <h3>
                  {t(
                    "members.addMemberTitle",
                  )}
                </h3>

                <p>
                  {t(
                    "members.addMemberDescription",
                  )}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={
                  closeAddMemberModal
                }
                disabled={isAdding}
              >
                ×
              </button>
            </div>

            <form
              className="member-search-form"
              onSubmit={
                handleSearch
              }
            >
              <div className="form-group">
                <label htmlFor="memberSearch">
                  {t(
                    "members.searchLabel",
                  )}
                </label>

                <div className="member-search-row">
                  <input
                    id="memberSearch"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(
                        event.target
                          .value,
                      )
                    }
                    placeholder={t(
                      "members.searchPlaceholder",
                    )}
                    disabled={
                      isSearching ||
                      isAdding
                    }
                    autoFocus
                  />

                  <button
                    type="submit"
                    className="secondary-button"
                    disabled={
                      isSearching ||
                      isAdding
                    }
                  >
                    {isSearching
                      ? t(
                          "members.searching",
                        )
                      : t(
                          "members.search",
                        )}
                  </button>
                </div>
              </div>
            </form>

            {searchResults.length >
              0 && (
              <div className="member-search-results">
                {searchResults.map(
                  (user) => {
                    const alreadyMember =
                      isAlreadyMember(
                        user.id,
                      );

                    const selected =
                      selectedUser?.id ===
                      user.id;

                    return (
                      <button
                        key={user.id}
                        type="button"
                        className={
                          selected
                            ? "member-search-result member-search-result-selected"
                            : "member-search-result"
                        }
                        disabled={
                          alreadyMember ||
                          isAdding
                        }
                        onClick={() =>
                          setSelectedUser(
                            user,
                          )
                        }
                      >
                        <div className="member-avatar">
                          {getInitials(
                            user.username,
                          )}
                        </div>

                        <div className="member-info">
                          <strong>
                            {
                              user.username
                            }
                          </strong>

                          <span>
                            {user.email}
                          </span>
                        </div>

                        {alreadyMember && (
                          <span className="member-existing-label">
                            {t(
                              "members.alreadyMember",
                            )}
                          </span>
                        )}
                      </button>
                    );
                  },
                )}
              </div>
            )}

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={
                  closeAddMemberModal
                }
                disabled={isAdding}
              >
                {t("common.cancel")}
              </button>

              <button
                type="button"
                className="primary-button"
                disabled={
                  !selectedUser ||
                  isAdding
                }
                onClick={() =>
                  void handleAddMember()
                }
              >
                {isAdding
                  ? t(
                      "members.adding",
                    )
                  : t(
                      "members.addMember",
                    )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REMOVE MEMBER MODAL */}
      {memberToRemove && (
        <div
          className="modal-backdrop"
          onMouseDown={
            closeRemoveDialog
          }
        >
          <div
            className="modal member-remove-modal"
            role="dialog"
            aria-modal="true"
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
                    "members.removeTitle",
                  )}
                </h3>

                <p>
                  {t(
                    "members.removeDescription",
                    {
                      username:
                        memberToRemove.username,
                    },
                  )}
                </p>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={
                  closeRemoveDialog
                }
                disabled={
                  removingMemberId !==
                  null
                }
              >
                {t("common.cancel")}
              </button>

              <button
                type="button"
                className="danger-button"
                onClick={() =>
                  void confirmRemoveMember()
                }
                disabled={
                  removingMemberId !==
                  null
                }
              >
                {removingMemberId
                  ? t(
                      "members.removing",
                    )
                  : t(
                      "members.remove",
                    )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getInitials(
  username: string,
): string {
  return username
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) =>
      part
        .charAt(0)
        .toUpperCase(),
    )
    .join("");
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
  t: (key: string) => string,
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

function formatDate(
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
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(
    new Date(value),
  );
}