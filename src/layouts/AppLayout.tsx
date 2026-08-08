import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "⌂" },
  { label: "Workspaces", path: "/workspaces", icon: "▣" },
  { label: "Documents", path: "/documents", icon: "□" },
  { label: "Chats", path: "/chats", icon: "◯" },
];

export function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">V</div>

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

        <div className="sidebar-user">
          <div className="user-avatar">SS</div>

          <div className="user-details">
            <strong>Svetlin</strong>
            <span>USER</span>
          </div>
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

            <div className="topbar-avatar">
              SS
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