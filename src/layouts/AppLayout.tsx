import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "⌂",
  },
  {
    label: "Workspaces",
    path: "/workspaces",
    icon: "▣",
  },
  {
    label: "Documents",
    path: "/documents",
    icon: "□",
  },
  {
    label: "Chats",
    path: "/chats",
    icon: "◯",
  },
];

export function AppLayout() {
  const navigate = useNavigate();
  const {
    user,
    logout,
  } = useAuth();
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

  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

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
            <strong>OurVault</strong>
            <span>Knowledge Base</span>
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
              ? "Logging out..."
              : "Log out"}
          </button>
        </div>
      </aside>

      <div className="app-content">
        <header className="topbar">
          <div>
            <h1>OurVault</h1>
          </div>

          <div className="topbar-actions">
            <input
              className="topbar-search"
              placeholder="Search..."
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