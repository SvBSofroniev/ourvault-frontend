import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../context/AuthContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  LogOut,
  UserRound,
} from "lucide-react";
import { GlobalSearch } from "../components/GlobalSearch";

export function AppLayout() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const {
    user,
    logout,
  } = useAuth();

  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  const navItems = [
    {
      label: t("navigation.dashboard"),
      path: "/dashboard",
      icon: (
        <LayoutDashboard
          size={18}
          strokeWidth={1.8}
        />
      ),
    },
    {
      label: t("navigation.workspaces"),
      path: "/workspaces",
      icon: (
        <FolderKanban
          size={18}
          strokeWidth={1.8}
        />
      ),
    },
    {
      label: t("navigation.documents"),
      path: "/documents",
      icon: (
        <FileText
          size={18}
          strokeWidth={1.8}
        />
      ),
    },
    {
      label: t("navigation.chats"),
      path: "/chats",
      icon: (
        <MessageSquare
          size={18}
          strokeWidth={1.8}
        />
      ),
    },
  ];

  const displayName =
    user?.firstName &&
      user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username ?? "User";

  const userInitials =
    user?.firstName || user?.lastName
      ? [
        user?.firstName,
        user?.lastName,
      ]
        .filter(Boolean)
        .slice(0, 2)
        .map((part) =>
          part!
            .charAt(0)
            .toUpperCase(),
        )
        .join("")
      : user?.username
        ?.charAt(0)
        .toUpperCase() ?? "?";

  async function handleLogout() {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">
            V
          </div>

          <div>
            <strong>
              {t("common.appName")}
            </strong>

            <span>
              {t("common.knowledgeBase")}
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link sidebar-link-active"
                  : "sidebar-link"
              }
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            type="button"
            className="sidebar-user sidebar-user-button"
            onClick={() =>
              navigate("/profile")
            }
          >
            <div className="user-avatar">
              {userInitials}
            </div>

            <div className="user-details">
              <strong>
                {displayName}
              </strong>

              <span>
                {user?.role ?? ""}
              </span>
            </div>

            <UserRound
              className="sidebar-profile-icon"
              size={17}
              strokeWidth={1.8}
            />
          </button>

          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <span className="sidebar-icon">
              <LogOut
                size={18}
                strokeWidth={1.8}
              />
            </span>

            {isLoggingOut
              ? t("navigation.loggingOut")
              : t("navigation.logout")}
          </button>
        </div>
      </aside>

      <div className="app-content">
        <header className="topbar">
          <h1>
            {t("common.appName")}
          </h1>

          <div className="topbar-actions">
            <LanguageSwitcher />

            <GlobalSearch />
            
            <button
              type="button"
              className="topbar-avatar topbar-avatar-button"
              title={user?.email}
              onClick={() =>
                navigate("/profile")
              }
            >
              {userInitials}
            </button>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}