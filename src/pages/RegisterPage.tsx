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

export function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { register } = useAuth();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
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

    if (password !== confirmPassword) {
      setError(
        t("auth.passwordsDoNotMatch"),
      );

      return;
    }

    if (password.length < 6) {
      setError(
        t("auth.passwordTooShort"),
      );

      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        username: username.trim(),
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
            {t("auth.getStarted")}
          </span>

          <h2>
            {t("auth.createAccountTitle")}
          </h2>

          <p className="auth-form-description">
            {t(
              "auth.createAccountDescription",
            )}
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
              <label htmlFor="username">
                {t("auth.username")}
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) =>
                  setUsername(
                    event.target.value,
                  )
                }
                placeholder={t(
                  "auth.usernamePlaceholder",
                )}
                autoComplete="username"
                required
                disabled={isSubmitting}
              />
            </div>

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
                {t("auth.createPassword")}
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
                autoComplete="new-password"
                minLength={6}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                {t("auth.confirmPassword")}
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value,
                  )
                }
                placeholder={t(
                  "auth.confirmPasswordPlaceholder",
                )}
                autoComplete="new-password"
                minLength={6}
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
                ? t("auth.creatingAccount")
                : t("auth.createAccount")}
            </button>
          </form>

          <div className="auth-form-footer">
            <span>
              {t("auth.alreadyHaveAccount")}
            </span>

            <Link to="/login">
              {t("auth.signIn")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}