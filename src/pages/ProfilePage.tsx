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
  Eye,
  EyeOff,
} from "lucide-react";

import { useTranslation } from "react-i18next";

import { useAuth } from "../context/AuthContext";
import { userService } from "../services/userService";

import {
  getApiErrorCode,
  getApiErrorKey,
  getValidationErrorKeys,
} from "../utils/apiError";

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ProfileField =
  | "firstName"
  | "lastName"
  | "email"
  | "dateOfBirth";

type ProfileFieldErrors = Partial<
  Record<ProfileField, string>
>;

export function ProfilePage() {
  const {
    t,
    i18n,
  } = useTranslation();

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

  const [
    profileFieldErrors,
    setProfileFieldErrors,
  ] = useState<ProfileFieldErrors>(
    {},
  );

  const [
    profileErrorKey,
    setProfileErrorKey,
  ] = useState<string | null>(
    null,
  );

  const [
    profileSuccessKey,
    setProfileSuccessKey,
  ] = useState<string | null>(
    null,
  );

  const [isSaving, setIsSaving] =
    useState(false);

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmNewPassword,
    setConfirmNewPassword,
  ] = useState("");

  const [
    passwordErrorKey,
    setPasswordErrorKey,
  ] = useState<string | null>(
    null,
  );

  const [
    passwordSuccessKey,
    setPasswordSuccessKey,
  ] = useState<string | null>(
    null,
  );

  const [
    isChangingPassword,
    setIsChangingPassword,
  ] = useState(false);

  const [
    showCurrentPassword,
    setShowCurrentPassword,
  ] = useState(false);

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false);

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

  function clearProfileFieldError(
    field: ProfileField,
  ) {
    setProfileFieldErrors(
      (current) => ({
        ...current,
        [field]: undefined,
      }),
    );

    setProfileErrorKey(null);
    setProfileSuccessKey(null);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!user || isSaving) {
      return;
    }

    setProfileErrorKey(null);
    setProfileSuccessKey(null);
    setProfileFieldErrors({});

    const normalizedFirstName =
      firstName.trim();

    const normalizedLastName =
      lastName.trim();

    const normalizedEmail =
      email.trim();

    const clientErrors: ProfileFieldErrors =
      {};

    if (!normalizedFirstName) {
      clientErrors.firstName =
        "validation.firstNameRequired";
    } else if (
      normalizedFirstName.length > 100
    ) {
      clientErrors.firstName =
        "validation.firstNameLength";
    }

    if (!normalizedLastName) {
      clientErrors.lastName =
        "validation.lastNameRequired";
    } else if (
      normalizedLastName.length > 100
    ) {
      clientErrors.lastName =
        "validation.lastNameLength";
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

    if (
      Object.keys(clientErrors)
        .length > 0
    ) {
      setProfileFieldErrors(
        clientErrors,
      );

      return;
    }

    setIsSaving(true);

    try {
      const updatedUser =
        await userService.updateProfile({
          username:
            user.username,

          firstName:
            normalizedFirstName,

          lastName:
            normalizedLastName,

          email:
            normalizedEmail,

          dateOfBirth:
            dateOfBirth || null,
        });

      updateCurrentUser(
        updatedUser,
      );

      setProfileSuccessKey(
        "profile.saved",
      );
    } catch (error) {
      const validationErrors =
        getValidationErrorKeys(error);

      if (validationErrors) {
        setProfileFieldErrors(
          validationErrors as ProfileFieldErrors,
        );

        return;
      }

      const code =
        getApiErrorCode(error);

      if (
        code ===
        "EMAIL_ALREADY_EXISTS"
      ) {
        setProfileFieldErrors({
          email:
            "errors.emailAlreadyExists",
        });

        return;
      }

      /*
       * Username is currently read-only,
       * but keep this as protection in case
       * the backend returns the conflict.
       */
      if (
        code ===
        "USERNAME_ALREADY_EXISTS"
      ) {
        setProfileErrorKey(
          "errors.usernameAlreadyExists",
        );

        return;
      }

      setProfileErrorKey(
        getApiErrorKey(error),
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleChangePassword(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isChangingPassword) {
      return;
    }

    setPasswordErrorKey(null);
    setPasswordSuccessKey(null);

    if (!currentPassword) {
      setPasswordErrorKey(
        "validation.currentPasswordRequired",
      );

      return;
    }

    if (!newPassword) {
      setPasswordErrorKey(
        "validation.newPasswordRequired",
      );

      return;
    }

    if (!confirmNewPassword) {
      setPasswordErrorKey(
        "validation.passwordConfirmationRequired",
      );

      return;
    }

    if (
      newPassword.length < 8 ||
      newPassword.length > 100
    ) {
      setPasswordErrorKey(
        "validation.newPasswordLength",
      );

      return;
    }

    if (
      newPassword !==
      confirmNewPassword
    ) {
      setPasswordErrorKey(
        "profile.passwordsDoNotMatch",
      );

      return;
    }

    if (
      currentPassword ===
      newPassword
    ) {
      setPasswordErrorKey(
        "profile.passwordMustBeDifferent",
      );

      return;
    }

    setIsChangingPassword(true);

    try {
      await userService.changePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

      setShowCurrentPassword(false);
      setShowNewPassword(false);

      setPasswordSuccessKey(
        "profile.passwordChanged",
      );
    } catch (error) {
      const validationErrors =
        getValidationErrorKeys(error);

      if (validationErrors) {
        const validationErrorKey =
          validationErrors.currentPassword ??
          validationErrors.newPassword ??
          validationErrors.confirmNewPassword;

        setPasswordErrorKey(
          validationErrorKey ??
          "errors.validationFailed",
        );

        return;
      }

      setPasswordErrorKey(
        getApiErrorKey(error),
      );
    } finally {
      setIsChangingPassword(false);
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

        <div className="profile-main-column">
          {/* PERSONAL INFORMATION */}
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

            {profileErrorKey && (
              <div
                className="auth-error"
                role="alert"
              >
                <span>!</span>

                {t(
                  profileErrorKey,
                )}
              </div>
            )}

            {profileSuccessKey && (
              <div
                className="profile-success"
                role="status"
              >
                {t(
                  profileSuccessKey,
                )}
              </div>
            )}

            <form
              className="profile-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="profile-form-row">
                {/* FIRST NAME */}
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
                    onChange={(event) => {
                      setFirstName(
                        event.target.value,
                      );

                      clearProfileFieldError(
                        "firstName",
                      );
                    }}
                    maxLength={100}
                    autoComplete="given-name"
                    disabled={isSaving}
                    className={
                      profileFieldErrors
                        .firstName
                        ? "input-error"
                        : undefined
                    }
                  />

                  {profileFieldErrors
                    .firstName && (
                      <span className="form-field-error">
                        {t(
                          profileFieldErrors
                            .firstName,
                        )}
                      </span>
                    )}
                </div>

                {/* LAST NAME */}
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
                    onChange={(event) => {
                      setLastName(
                        event.target.value,
                      );

                      clearProfileFieldError(
                        "lastName",
                      );
                    }}
                    maxLength={100}
                    autoComplete="family-name"
                    disabled={isSaving}
                    className={
                      profileFieldErrors
                        .lastName
                        ? "input-error"
                        : undefined
                    }
                  />

                  {profileFieldErrors
                    .lastName && (
                      <span className="form-field-error">
                        {t(
                          profileFieldErrors
                            .lastName,
                        )}
                      </span>
                    )}
                </div>
              </div>

              {/* USERNAME */}
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

              {/* EMAIL */}
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
                    onChange={(event) => {
                      setEmail(
                        event.target.value,
                      );

                      clearProfileFieldError(
                        "email",
                      );
                    }}
                    autoComplete="email"
                    disabled={isSaving}
                    className={
                      profileFieldErrors
                        .email
                        ? "input-error"
                        : undefined
                    }
                  />
                </div>

                {profileFieldErrors
                  .email && (
                    <span className="form-field-error">
                      {t(
                        profileFieldErrors
                          .email,
                      )}
                    </span>
                  )}
              </div>

              {/* DATE OF BIRTH */}
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

                      clearProfileFieldError(
                        "dateOfBirth",
                      );
                    }}
                    disabled={isSaving}
                    className={
                      profileFieldErrors
                        .dateOfBirth
                        ? "input-error"
                        : undefined
                    }
                  />
                </div>

                {profileFieldErrors
                  .dateOfBirth && (
                    <span className="form-field-error">
                      {t(
                        profileFieldErrors
                          .dateOfBirth,
                      )}
                    </span>
                  )}
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
                    ? t(
                      "profile.saving",
                    )
                    : t(
                      "profile.save",
                    )}
                </button>
              </div>
            </form>
          </section>

          {/* SECURITY */}
          <section className="profile-security-card">
            <div className="profile-section-heading">
              <div>
                <h2>
                  {t(
                    "profile.security",
                  )}
                </h2>

                <p>
                  {t(
                    "profile.securityDescription",
                  )}
                </p>
              </div>
            </div>

            {passwordErrorKey && (
              <div
                className="auth-error"
                role="alert"
              >
                <span>!</span>

                {t(
                  passwordErrorKey,
                )}
              </div>
            )}

            {passwordSuccessKey && (
              <div
                className="profile-success"
                role="status"
              >
                {t(
                  passwordSuccessKey,
                )}
              </div>
            )}

            <form
              className="profile-form"
              onSubmit={
                handleChangePassword
              }
              noValidate
            >
              {/* CURRENT PASSWORD */}
              <div className="form-group">
                <label htmlFor="currentPassword">
                  {t(
                    "profile.currentPassword",
                  )}
                </label>

                <div className="password-input-wrapper">
                  <input
                    id="currentPassword"
                    type={
                      showCurrentPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      currentPassword
                    }
                    onChange={(event) => {
                      setCurrentPassword(
                        event.target.value,
                      );

                      setPasswordErrorKey(
                        null,
                      );

                      setPasswordSuccessKey(
                        null,
                      );
                    }}
                    autoComplete="current-password"
                    disabled={
                      isChangingPassword
                    }
                  />

                  <button
                    type="button"
                    className="password-visibility-button"
                    onClick={() =>
                      setShowCurrentPassword(
                        (current) =>
                          !current,
                      )
                    }
                    aria-label={
                      showCurrentPassword
                        ? t(
                          "profile.hidePassword",
                        )
                        : t(
                          "profile.showPassword",
                        )
                    }
                    title={
                      showCurrentPassword
                        ? t(
                          "profile.hidePassword",
                        )
                        : t(
                          "profile.showPassword",
                        )
                    }
                    disabled={
                      isChangingPassword
                    }
                  >
                    {showCurrentPassword ? (
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
              </div>

              <div className="profile-form-row">
                {/* NEW PASSWORD */}
                <div className="form-group">
                  <label htmlFor="newPassword">
                    {t(
                      "profile.newPassword",
                    )}
                  </label>

                  <div className="password-input-wrapper">
                    <input
                      id="newPassword"
                      type={
                        showNewPassword
                          ? "text"
                          : "password"
                      }
                      value={newPassword}
                      onChange={(event) => {
                        setNewPassword(
                          event.target.value,
                        );

                        setPasswordErrorKey(
                          null,
                        );

                        setPasswordSuccessKey(
                          null,
                        );
                      }}
                      minLength={8}
                      maxLength={100}
                      autoComplete="new-password"
                      disabled={
                        isChangingPassword
                      }
                    />

                    <button
                      type="button"
                      className="password-visibility-button"
                      onClick={() =>
                        setShowNewPassword(
                          (current) =>
                            !current,
                        )
                      }
                      aria-label={
                        showNewPassword
                          ? t(
                            "profile.hidePassword",
                          )
                          : t(
                            "profile.showPassword",
                          )
                      }
                      title={
                        showNewPassword
                          ? t(
                            "profile.hidePassword",
                          )
                          : t(
                            "profile.showPassword",
                          )
                      }
                      disabled={
                        isChangingPassword
                      }
                    >
                      {showNewPassword ? (
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
                </div>

                {/* CONFIRM NEW PASSWORD */}
                <div className="form-group">
                  <label htmlFor="confirmNewPassword">
                    {t(
                      "profile.confirmNewPassword",
                    )}
                  </label>

                  <input
                    id="confirmNewPassword"
                    type="password"
                    value={
                      confirmNewPassword
                    }
                    onChange={(event) => {
                      setConfirmNewPassword(
                        event.target.value,
                      );

                      setPasswordErrorKey(
                        null,
                      );

                      setPasswordSuccessKey(
                        null,
                      );
                    }}
                    minLength={8}
                    maxLength={100}
                    autoComplete="new-password"
                    disabled={
                      isChangingPassword
                    }
                  />
                </div>
              </div>

              <div className="profile-form-actions">
                <button
                  type="submit"
                  className="primary-button"
                  disabled={
                    isChangingPassword
                  }
                >
                  {isChangingPassword
                    ? t(
                      "profile.changingPassword",
                    )
                    : t(
                      "profile.changePassword",
                    )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}