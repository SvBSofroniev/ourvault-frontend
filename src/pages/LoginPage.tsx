import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useAuth } from "../context/AuthContext";
import { getApiErrorMessage } from "../utils/apiError";

export function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await login({
        email: email.trim(),
        password,
      });

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      {/* LEFT SIDE */}
      <section className="auth-hero">
        <div className="auth-brand">
          <div className="auth-brand-logo">
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

        <div className="auth-hero-content">
          <span className="auth-eyebrow">
            {t("auth.heroEyebrow")}
          </span>

          <h1>
            {t("auth.heroTitleLine1")}
            <br />
            {t("auth.heroTitleLine2")}
          </h1>

          <p>
            {t("auth.heroDescription")}
          </p>
        </div>

        <div className="auth-hero-footer">
          © 2026 OurVault
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="auth-panel">
        <div className="auth-language">
          <LanguageSwitcher />
        </div>

        <div className="auth-form-container">
          <span className="auth-form-eyebrow">
            {t("auth.welcomeBack")}
          </span>

          <h2>
            {t("auth.signInTitle")}
          </h2>

          <p className="auth-form-description">
            {t("auth.signInDescription")}
          </p>

          {error && (
            <div
              className="auth-error"
              role="alert"
            >
              <span>!</span>

              {error}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="email">
                {t("auth.email")}
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value,
                  )
                }
                placeholder={t(
                  "auth.emailPlaceholder",
                )}
                autoComplete="email"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                {t("auth.password")}
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value,
                  )
                }
                placeholder={t(
                  "auth.passwordPlaceholder",
                )}
                autoComplete="current-password"
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t("auth.signingIn")
                : t("auth.signIn")}
            </button>
          </form>

          <div className="auth-form-footer">
            <span>
              {t("auth.newToOurVault")}
            </span>

            <Link to="/register">
              {t("auth.createAccount")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}