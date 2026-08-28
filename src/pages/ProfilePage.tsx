import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  CalendarDays,
  Mail,
  Save,
  UserRound,
} from "lucide-react";

import { useTranslation } from "react-i18next";

import { useAuth } from "../context/AuthContext";
import { userService } from "../services/userService";
import { getApiErrorMessage } from "../utils/apiError";

export function ProfilePage() {
  const { t } = useTranslation();

  const {
    user,
    updateCurrentUser,
  } = useAuth();

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [dateOfBirth, setDateOfBirth] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  const [isSaving, setIsSaving] =
    useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(
      user.firstName ?? "",
    );

    setLastName(
      user.lastName ?? "",
    );

    setEmail(
      user.email ?? "",
    );

    setDateOfBirth(
      user.dateOfBirth ?? "",
    );
  }, [user]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!user || isSaving) {
      return;
    }

    setError(null);
    setSuccess(null);

    if (!firstName.trim()) {
      setError(
        t("profile.firstNameRequired"),
      );

      return;
    }

    if (!lastName.trim()) {
      setError(
        t("profile.lastNameRequired"),
      );

      return;
    }

    if (!email.trim()) {
      setError(
        t("profile.emailRequired"),
      );

      return;
    }

    setIsSaving(true);

    try {
      const updatedUser =
        await userService.updateProfile({
          username: user.username,
          firstName:
            firstName.trim(),
          lastName:
            lastName.trim(),
          email:
            email.trim(),
          dateOfBirth:
            dateOfBirth || null,
        });

      updateCurrentUser(
        updatedUser,
      );

      setSuccess(
        t("profile.saved"),
      );
    } catch (error) {
      setError(
        getApiErrorMessage(error),
      );
    } finally {
      setIsSaving(false);
    }
  }

  const fullName = [
    user?.firstName,
    user?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const initials =
    fullName
      ? fullName
          .split(" ")
          .slice(0, 2)
          .map((part) =>
            part
              .charAt(0)
              .toUpperCase(),
          )
          .join("")
      : user?.username
          ?.charAt(0)
          .toUpperCase() ?? "?";

  return (
    <div className="profile-page">
      <div className="profile-page-header">
        <div>
          <span className="page-eyebrow">
            {t("profile.eyebrow")}
          </span>

          <h1>
            {t("profile.title")}
          </h1>

          <p>
            {t(
              "profile.description",
            )}
          </p>
        </div>
      </div>

      <div className="profile-grid">
        <aside className="profile-summary-card">
          <div className="profile-avatar-large">
            {initials}
          </div>

          <div className="profile-summary-content">
            <h2>
              {fullName ||
                user?.username}
            </h2>

            <span>
              @{user?.username}
            </span>

            <p>
              {user?.email}
            </p>
          </div>

          <div className="profile-role">
            {user?.role}
          </div>
        </aside>

        <section className="profile-form-card">
          <div className="profile-section-heading">
            <div className="profile-section-icon">
              <UserRound
                size={20}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h2>
                {t(
                  "profile.personalInformation",
                )}
              </h2>

              <p>
                {t(
                  "profile.personalInformationDescription",
                )}
              </p>
            </div>
          </div>

          {error && (
            <div
              className="auth-error"
              role="alert"
            >
              <span>!</span>

              {error}
            </div>
          )}

          {success && (
            <div
              className="profile-success"
              role="status"
            >
              {success}
            </div>
          )}

          <form
            className="profile-form"
            onSubmit={handleSubmit}
          >
            <div className="profile-form-row">
              <div className="form-group">
                <label htmlFor="firstName">
                  {t(
                    "profile.firstName",
                  )}
                </label>

                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(event) =>
                    setFirstName(
                      event.target.value,
                    )
                  }
                  maxLength={100}
                  autoComplete="given-name"
                  disabled={isSaving}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">
                  {t(
                    "profile.lastName",
                  )}
                </label>

                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(event) =>
                    setLastName(
                      event.target.value,
                    )
                  }
                  maxLength={100}
                  autoComplete="family-name"
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">
                {t(
                  "profile.username",
                )}
              </label>

              <input
                id="username"
                type="text"
                value={
                  user?.username ?? ""
                }
                disabled
              />

              <span className="profile-field-hint">
                {t(
                  "profile.usernameHint",
                )}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="profileEmail">
                {t(
                  "profile.email",
                )}
              </label>

              <div className="profile-input-with-icon">
                <Mail
                  size={17}
                  strokeWidth={1.8}
                />

                <input
                  id="profileEmail"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value,
                    )
                  }
                  autoComplete="email"
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">
                {t(
                  "profile.dateOfBirth",
                )}
              </label>

              <div className="profile-input-with-icon">
                <CalendarDays
                  size={17}
                  strokeWidth={1.8}
                />

                <input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(event) =>
                    setDateOfBirth(
                      event.target.value,
                    )
                  }
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="profile-form-actions">
              <button
                type="submit"
                className="primary-button profile-save-button"
                disabled={isSaving}
              >
                <Save
                  size={17}
                  strokeWidth={1.8}
                />

                {isSaving
                  ? t("profile.saving")
                  : t("profile.save")}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}