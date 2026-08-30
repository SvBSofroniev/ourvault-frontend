import {
  useState,
  type FormEvent,
} from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useAuth } from "../context/AuthContext";

import {
  getApiErrorCode,
  getApiErrorKey,
  getValidationErrorKeys,
} from "../utils/apiError";

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RegisterField =
  | "username"
  | "firstName"
  | "lastName"
  | "email"
  | "dateOfBirth"
  | "password"
  | "confirmPassword";

type FieldErrors = Partial<
  Record<RegisterField, string>
>;

export function RegisterPage() {
  const navigate = useNavigate();

  const {
    t,
    i18n,
  } = useTranslation();

  const { register } = useAuth();

  const [username, setUsername] =
    useState("");

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [dateOfBirth, setDateOfBirth] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

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

  function clearGeneralError() {
    setErrorKey(null);
  }

  function clearFieldError(
    field: RegisterField,
  ) {
    setFieldErrors(
      (current) => ({
        ...current,
        [field]: undefined,
      }),
    );

    clearGeneralError();
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    clearGeneralError();
    setFieldErrors({});

    const normalizedUsername =
      username.trim();

    const normalizedFirstName =
      firstName.trim();

    const normalizedLastName =
      lastName.trim();

    const normalizedEmail =
      email.trim();

    const clientErrors: FieldErrors =
      {};

    /*
     * Client-side validation.
     */

    if (!normalizedUsername) {
      clientErrors.username =
        "validation.usernameRequired";
    } else if (
      normalizedUsername.length < 3 ||
      normalizedUsername.length > 50
    ) {
      clientErrors.username =
        "validation.usernameLength";
    }

    if (!normalizedFirstName) {
      clientErrors.firstName =
        "validation.firstNameRequired";
    }

    if (!normalizedLastName) {
      clientErrors.lastName =
        "validation.lastNameRequired";
    }

    if (!normalizedEmail) {
      clientErrors.email =
        "validation.emailRequired";
    } else if (
      !EMAIL_PATTERN.test(
        normalizedEmail,
      )
    ) {
      clientErrors.email =
        "validation.emailInvalid";
    }

    if (!password) {
      clientErrors.password =
        "validation.passwordRequired";
    } else if (
      password.length < 8 ||
      password.length > 100
    ) {
      clientErrors.password =
        "validation.passwordLength";
    }

    if (!confirmPassword) {
      clientErrors.confirmPassword =
        "auth.confirmPasswordRequired";
    } else if (
      password !== confirmPassword
    ) {
      clientErrors.confirmPassword =
        "auth.passwordsDoNotMatch";
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
      await register({
        username:
          normalizedUsername,

        firstName:
          normalizedFirstName,

        lastName:
          normalizedLastName,

        email:
          normalizedEmail,

        dateOfBirth:
          dateOfBirth || null,

        password,
      });

      navigate(
        "/dashboard",
        {
          replace: true,
        },
      );
    } catch (error) {
      /*
       * Bean Validation errors.
       *
       * Example:
       *
       * {
       *   "code": "VALIDATION_FAILED",
       *   "validationErrors": {
       *     "username": "..."
       *   }
       * }
       */
      const validationErrors =
        getValidationErrorKeys(error);

      if (validationErrors) {
        setFieldErrors(
          validationErrors as FieldErrors,
        );

        return;
      }

      /*
       * Business error codes.
       */

      const code =
        getApiErrorCode(error);

      if (
        code ===
        "EMAIL_ALREADY_EXISTS"
      ) {
        setFieldErrors({
          email:
            "errors.emailAlreadyExists",
        });

        return;
      }

      if (
        code ===
        "USERNAME_ALREADY_EXISTS"
      ) {
        setFieldErrors({
          username:
            "errors.usernameAlreadyExists",
        });

        return;
      }

      /*
       * Every other backend/network error
       * goes through the centralized mapper.
       */
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
            {t("auth.getStarted")}
          </span>

          <h2>
            {t(
              "auth.createAccountTitle",
            )}
          </h2>

          <p className="auth-form-description">
            {t(
              "auth.createAccountDescription",
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
            onSubmit={
              handleSubmit
            }
            noValidate
          >
            {/* USERNAME */}
            <div className="form-group">
              <label htmlFor="username">
                {t("auth.username")}
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => {
                  setUsername(
                    event.target.value,
                  );

                  clearFieldError(
                    "username",
                  );
                }}
                placeholder={t(
                  "auth.usernamePlaceholder",
                )}
                autoComplete="username"
                maxLength={50}
                disabled={
                  isSubmitting
                }
                className={
                  fieldErrors.username
                    ? "input-error"
                    : undefined
                }
              />

              {fieldErrors.username && (
                <span className="form-field-error">
                  {t(
                    fieldErrors.username,
                  )}
                </span>
              )}
            </div>

            {/* FIRST NAME */}
            <div className="form-group">
              <label htmlFor="firstName">
                {t(
                  "auth.firstName",
                )}
              </label>

              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(event) => {
                  setFirstName(
                    event.target.value,
                  );

                  clearFieldError(
                    "firstName",
                  );
                }}
                placeholder={t(
                  "auth.firstNamePlaceholder",
                )}
                autoComplete="given-name"
                maxLength={100}
                disabled={
                  isSubmitting
                }
                className={
                  fieldErrors.firstName
                    ? "input-error"
                    : undefined
                }
              />

              {fieldErrors.firstName && (
                <span className="form-field-error">
                  {t(
                    fieldErrors.firstName,
                  )}
                </span>
              )}
            </div>

            {/* LAST NAME */}
            <div className="form-group">
              <label htmlFor="lastName">
                {t(
                  "auth.lastName",
                )}
              </label>

              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(event) => {
                  setLastName(
                    event.target.value,
                  );

                  clearFieldError(
                    "lastName",
                  );
                }}
                placeholder={t(
                  "auth.lastNamePlaceholder",
                )}
                autoComplete="family-name"
                maxLength={100}
                disabled={
                  isSubmitting
                }
                className={
                  fieldErrors.lastName
                    ? "input-error"
                    : undefined
                }
              />

              {fieldErrors.lastName && (
                <span className="form-field-error">
                  {t(
                    fieldErrors.lastName,
                  )}
                </span>
              )}
            </div>

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

            {/* DATE OF BIRTH */}
            <div className="form-group">
              <label htmlFor="dateOfBirth">
                {t(
                  "auth.dateOfBirth",
                )}
              </label>

              <input
                id="dateOfBirth"
                type="date"
                lang={
                  i18n.resolvedLanguage ===
                    "bg"
                    ? "bg"
                    : "en"
                }
                value={dateOfBirth}
                onChange={(event) => {
                  setDateOfBirth(
                    event.target.value,
                  );

                  clearFieldError(
                    "dateOfBirth",
                  );
                }}
                autoComplete="bday"
                disabled={
                  isSubmitting
                }
                className={
                  fieldErrors.dateOfBirth
                    ? "input-error"
                    : undefined
                }
              />

              {fieldErrors.dateOfBirth && (
                <span className="form-field-error">
                  {t(
                    fieldErrors.dateOfBirth,
                  )}
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">
                {t(
                  "auth.createPassword",
                )}
              </label>

              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) => {
                    setPassword(
                      event.target.value,
                    );

                    clearFieldError(
                      "password",
                    );

                    /*
                     * Changing the password may
                     * also resolve a mismatch.
                     */
                    clearFieldError(
                      "confirmPassword",
                    );
                  }}
                  placeholder={t(
                    "auth.passwordPlaceholder",
                  )}
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={100}
                  disabled={
                    isSubmitting
                  }
                  className={
                    fieldErrors.password
                      ? "input-error"
                      : undefined
                  }
                />

                <button
                  type="button"
                  className="password-visibility-button"
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current,
                    )
                  }
                  aria-label={
                    showPassword
                      ? t(
                        "auth.hidePassword",
                      )
                      : t(
                        "auth.showPassword",
                      )
                  }
                  title={
                    showPassword
                      ? t(
                        "auth.hidePassword",
                      )
                      : t(
                        "auth.showPassword",
                      )
                  }
                  disabled={
                    isSubmitting
                  }
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      strokeWidth={1.8}
                    />
                  ) : (
                    <Eye
                      size={18}
                      strokeWidth={1.8}
                    />
                  )}
                </button>
              </div>

              {fieldErrors.password && (
                <span className="form-field-error">
                  {t(
                    fieldErrors.password,
                  )}
                </span>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">
              <label htmlFor="confirmPassword">
                {t(
                  "auth.confirmPassword",
                )}
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(
                    event.target.value,
                  );

                  clearFieldError(
                    "confirmPassword",
                  );
                }}
                placeholder={t(
                  "auth.confirmPasswordPlaceholder",
                )}
                autoComplete="new-password"
                minLength={8}
                maxLength={100}
                disabled={
                  isSubmitting
                }
                className={
                  fieldErrors.confirmPassword
                    ? "input-error"
                    : undefined
                }
              />

              {fieldErrors.confirmPassword && (
                <span className="form-field-error">
                  {t(
                    fieldErrors.confirmPassword,
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
                ? t(
                  "auth.creatingAccount",
                )
                : t(
                  "auth.createAccount",
                )}
            </button>
          </form>

          <div className="auth-form-footer">
            <span>
              {t(
                "auth.alreadyHaveAccount",
              )}
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