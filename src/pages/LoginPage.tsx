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

import {
  getApiErrorKey,
} from "../utils/apiError";

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LoginField =
  | "email"
  | "password";

type FieldErrors = Partial<
  Record<LoginField, string>
>;

export function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    fieldErrors,
    setFieldErrors,
  ] = useState<FieldErrors>({});

  const [
    errorKey,
    setErrorKey,
  ] = useState<string | null>(null);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  function clearFieldError(
    field: LoginField,
  ) {
    setFieldErrors(
      (current) => ({
        ...current,
        [field]: undefined,
      }),
    );

    setErrorKey(null);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setErrorKey(null);
    setFieldErrors({});

    const normalizedEmail =
      email.trim();

    const clientErrors: FieldErrors =
      {};

    if (!normalizedEmail) {
      clientErrors.email =
        "auth.emailRequired";
    } else if (
      !EMAIL_PATTERN.test(
        normalizedEmail,
      )
    ) {
      clientErrors.email =
        "auth.invalidEmail";
    }

    if (!password) {
      clientErrors.password =
        "auth.passwordRequired";
    }

    if (
      Object.keys(clientErrors)
        .length > 0
    ) {
      setFieldErrors(
        clientErrors,
      );

      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email:
          normalizedEmail,

        password,
      });

      navigate(
        "/dashboard",
        {
          replace: true,
        },
      );
    } catch (error) {
      setErrorKey(
        getApiErrorKey(error),
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
              {t(
                "common.knowledgeBase",
              )}
            </span>
          </div>
        </div>

        <div className="auth-hero-content">
          <span className="auth-eyebrow">
            {t("auth.heroEyebrow")}
          </span>

          <h1>
            {t(
              "auth.heroTitleLine1",
            )}

            <br />

            {t(
              "auth.heroTitleLine2",
            )}
          </h1>

          <p>
            {t(
              "auth.heroDescription",
            )}
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
            {t(
              "auth.signInDescription",
            )}
          </p>

          {errorKey && (
            <div
              className="auth-error"
              role="alert"
            >
              <span>!</span>

              {t(errorKey)}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">
                {t("auth.email")}
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(
                    event.target.value,
                  );

                  clearFieldError(
                    "email",
                  );
                }}
                placeholder={t(
                  "auth.emailPlaceholder",
                )}
                autoComplete="email"
                disabled={
                  isSubmitting
                }
                className={
                  fieldErrors.email
                    ? "input-error"
                    : undefined
                }
              />

              {fieldErrors.email && (
                <span className="form-field-error">
                  {t(
                    fieldErrors.email,
                  )}
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">
                {t("auth.password")}
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(
                    event.target.value,
                  );

                  clearFieldError(
                    "password",
                  );
                }}
                placeholder={t(
                  "auth.passwordPlaceholder",
                )}
                autoComplete="current-password"
                disabled={
                  isSubmitting
                }
                className={
                  fieldErrors.password
                    ? "input-error"
                    : undefined
                }
              />

              {fieldErrors.password && (
                <span className="form-field-error">
                  {t(
                    fieldErrors.password,
                  )}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={
                isSubmitting
              }
            >
              {isSubmitting
                ? t("auth.signingIn")
                : t("auth.signIn")}
            </button>
          </form>

          <div className="auth-form-footer">
            <span>
              {t(
                "auth.newToOurVault",
              )}
            </span>

            <Link to="/register">
              {t(
                "auth.createAccount",
              )}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}