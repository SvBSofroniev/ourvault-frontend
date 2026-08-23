import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const stats = [
    {
      label: t("dashboard.stats.workspaces"),
      value: 3,
      icon: "▣",
    },
    {
      label: t("dashboard.stats.documents"),
      value: 12,
      icon: "□",
    },
    {
      label: t("dashboard.stats.chats"),
      value: 8,
      icon: "◯",
    },
    {
      label: t("dashboard.stats.aiQueries"),
      value: 27,
      icon: "✦",
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <h2>
            {t("dashboard.title")}
          </h2>

          <p>
            {t("dashboard.description")}
          </p>
        </div>
      </div>

      <section className="stats-grid">
        {stats.map((stat) => (
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
            <div>
              <h3>
                {t(
                  "dashboard.recentWorkspaces.title",
                )}
              </h3>
            </div>

            <button
              type="button"
              className="link-button"
              onClick={() =>
                navigate("/workspaces")
              }
            >
              {t("dashboard.viewAll")} →
            </button>
          </div>

          <div className="workspace-row">
            <div className="workspace-icon">
              MT
            </div>

            <div className="workspace-info">
              <strong>
                Master Thesis
              </strong>

              <span>
                {t(
                  "dashboard.recentWorkspaces.documentsCount",
                  {
                    count: 8,
                  },
                )}
              </span>
            </div>

            <span className="badge badge-owner">
              {t("common.roles.owner")}
            </span>
          </div>

          <div className="workspace-row">
            <div className="workspace-icon">
              RP
            </div>

            <div className="workspace-info">
              <strong>
                Research Papers
              </strong>

              <span>
                {t(
                  "dashboard.recentWorkspaces.documentsCount",
                  {
                    count: 4,
                  },
                )}
              </span>
            </div>

            <span className="badge badge-member">
              {t("common.roles.member")}
            </span>
          </div>
        </article>

        <article className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>
                {t(
                  "dashboard.recentDocuments.title",
                )}
              </h3>
            </div>

            <button
              type="button"
              className="link-button"
              onClick={() =>
                navigate("/documents")
              }
            >
              {t("dashboard.viewAll")} →
            </button>
          </div>

          <div className="document-row">
            <div className="document-icon">
              PDF
            </div>

            <div className="document-info">
              <strong>
                attention-is-all-you-need.pdf
              </strong>

              <span>
                Master Thesis
              </span>
            </div>

            <span className="badge badge-ready">
              {t(
                "dashboard.documentStatus.ready",
              )}
            </span>
          </div>

          <div className="document-row">
            <div className="document-icon">
              TXT
            </div>

            <div className="document-info">
              <strong>
                thesis-notes.txt
              </strong>

              <span>
                Master Thesis
              </span>
            </div>

            <span className="badge badge-ready">
              {t(
                "dashboard.documentStatus.ready",
              )}
            </span>
          </div>
        </article>
      </section>
    </div>
  );
}