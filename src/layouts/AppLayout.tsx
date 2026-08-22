import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../context/AuthContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

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
      icon: "⌂",
    },
    {
      label: t("navigation.workspaces"),
      path: "/workspaces",
      icon: "▣",
    },
    {
      label: t("navigation.documents"),
      path: "/documents",
      icon: "□",
    },
    {
      label: t("navigation.chats"),
      path: "/chats",
      icon: "◯",
    },
  ];

  const userInitials = user?.username
    ? user.username
        .split(/[\s._-]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) =>
          part.charAt(0).toUpperCase(),
        )
        .join("")
    : "?";

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
          <div className="sidebar-user">
            <div className="user-avatar">
              {userInitials}
            </div>

            <div className="user-details">
              <strong>
                {user?.username ?? "User"}
              </strong>

              <span>
                {user?.role ?? ""}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <span className="sidebar-icon">
              ↪
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

            <input
              className="topbar-search"
              placeholder={t(
                "navigation.search",
              )}
            />

            <div
              className="topbar-avatar"
              title={user?.email}
            >
              {userInitials}
            </div>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}