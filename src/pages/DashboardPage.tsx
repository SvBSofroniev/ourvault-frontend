const statistics = [
  {
    label: "Workspaces",
    value: 3,
    icon: "▣",
  },
  {
    label: "Documents",
    value: 12,
    icon: "□",
  },
  {
    label: "Chats",
    value: 8,
    icon: "◯",
  },
  {
    label: "AI Queries",
    value: 27,
    icon: "✦",
  },
];

export function DashboardPage() {
  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <h2>Dashboard</h2>
          <p>
            Overview of your workspaces and recent activity.
          </p>
        </div>
      </div>

      <section className="stats-grid">
        {statistics.map((stat) => (
          <article
            key={stat.label}
            className="stat-card"
          >
            <div className="stat-icon">
              {stat.icon}
            </div>

            <div>
              <strong className="stat-value">
                {stat.value}
              </strong>

              <span className="stat-label">
                {stat.label}
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <div className="card-header">
            <h3>Recent Workspaces</h3>

            <button className="link-button">
              View all
            </button>
          </div>

          <div className="workspace-row">
            <div className="workspace-icon">
              MT
            </div>

            <div className="workspace-info">
              <strong>Master Thesis</strong>
              <span>Updated recently</span>
            </div>

            <span className="badge badge-owner">
              OWNER
            </span>
          </div>

          <div className="workspace-row">
            <div className="workspace-icon">
              RP
            </div>

            <div className="workspace-info">
              <strong>Research Papers</strong>
              <span>Updated yesterday</span>
            </div>

            <span className="badge badge-member">
              MEMBER
            </span>
          </div>
        </article>

        <article className="dashboard-card">
          <div className="card-header">
            <h3>Recent Documents</h3>

            <button className="link-button">
              View all
            </button>
          </div>

          <div className="document-row">
            <span className="document-icon">
              PDF
            </span>

            <div className="document-info">
              <strong>
                attention-is-all-you-need.pdf
              </strong>
              <span>Uploaded recently</span>
            </div>

            <span className="badge badge-ready">
              READY
            </span>
          </div>

          <div className="document-row">
            <span className="document-icon">
              TXT
            </span>

            <div className="document-info">
              <strong>thesis-notes.txt</strong>
              <span>Uploaded yesterday</span>
            </div>

            <span className="badge badge-pending">
              PENDING
            </span>
          </div>
        </article>
      </section>
    </div>
  );
}