import {
    useState,
    type FormEvent,
} from "react";

import { useTranslation } from "react-i18next";

import {
    Link,
    useSearchParams,
} from "react-router-dom";

import {
    ArrowLeft,
    KeyRound,
    Languages,
    LockKeyhole,
} from "lucide-react";

import { authService } from "../../services/authService";
import { getApiErrorKey } from "../../utils/apiError";

export function ResetPasswordPage() {
    const { t, i18n } = useTranslation();

    const [searchParams] =
        useSearchParams();

    const token =
        searchParams.get("token");

    const [
        newPassword,
        setNewPassword,
    ] = useState("");

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState("");

    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState(false);

    const [errorKey, setErrorKey] =
        useState<string | null>(null);

    const [successKey, setSuccessKey] =
        useState<string | null>(null);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setErrorKey(null);

        if (!token) {
            setErrorKey(
                "resetPassword.invalidLink",
            );

            return;
        }

        if (!newPassword) {
            setErrorKey(
                "resetPassword.passwordRequired",
            );

            return;
        }

        if (newPassword.length < 8) {
            setErrorKey(
                "resetPassword.passwordTooShort",
            );

            return;
        }

        if (!confirmPassword) {
            setErrorKey(
                "resetPassword.confirmPasswordRequired",
            );

            return;
        }

        if (
            newPassword !==
            confirmPassword
        ) {
            setErrorKey(
                "resetPassword.passwordMismatch",
            );

            return;
        }

        setIsSubmitting(true);
        setSuccessKey(null);

        try {
            await authService.resetPassword(
                token,
                newPassword,
            );

            setNewPassword("");
            setConfirmPassword("");

            setSuccessKey(
                "resetPassword.success",
            );
        } catch (error) {
            setErrorKey(
                getApiErrorKey(error),
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    function clearError() {
        if (errorKey) {
            setErrorKey(null);
        }
    }

    function toggleLanguage() {
        const nextLanguage =
            i18n.language.startsWith("bg")
                ? "en"
                : "bg";

        void i18n.changeLanguage(
            nextLanguage,
        );
    }

    const displayedLanguage =
        i18n.language.startsWith("bg")
            ? "EN"
            : "BG";

    return (
        <div className="forgot-password-page">
            <button
                type="button"
                className="forgot-password-language"
                onClick={toggleLanguage}
                aria-label="Change language"
            >
                <Languages size={17} />

                <span>
                    {displayedLanguage}
                </span>
            </button>

            <div className="forgot-password-card">
                <div className="forgot-password-icon">
                    <KeyRound size={26} />
                </div>

                <div className="forgot-password-header">
                    <h1>
                        {t(
                            "resetPassword.title",
                        )}
                    </h1>

                    <p>
                        {t(
                            "resetPassword.description",
                        )}
                    </p>
                </div>

                {!token && (
                    <div
                        className="forgot-password-error"
                        role="alert"
                    >
                        <span className="forgot-password-error-icon">
                            !
                        </span>

                        <span>
                            {t(
                                "resetPassword.invalidLink",
                            )}
                        </span>
                    </div>
                )}

                {errorKey && token && (
                    <div
                        className="forgot-password-error"
                        role="alert"
                    >
                        <span className="forgot-password-error-icon">
                            !
                        </span>

                        <span>
                            {t(errorKey)}
                        </span>
                    </div>
                )}

                {successKey && (
                    <div
                        className="forgot-password-success"
                        role="status"
                    >
                        {t(successKey)}
                    </div>
                )}

                {token &&
                    !successKey && (
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="forgot-password-form"
                    >
                        <div className="forgot-password-field">
                            <label htmlFor="newPassword">
                                {t(
                                    "resetPassword.newPassword",
                                )}
                            </label>

                            <div className="forgot-password-input-wrapper">
                                <LockKeyhole
                                    size={18}
                                    className="forgot-password-input-icon"
                                />

                                <input
                                    id="newPassword"
                                    type="password"
                                    value={
                                        newPassword
                                    }
                                    onChange={(
                                        event,
                                    ) => {
                                        setNewPassword(
                                            event.target
                                                .value,
                                        );

                                        clearError();
                                    }}
                                    placeholder={t(
                                        "resetPassword.newPasswordPlaceholder",
                                    )}
                                    autoComplete="new-password"
                                    disabled={
                                        isSubmitting
                                    }
                                />
                            </div>
                        </div>

                        <div className="forgot-password-field">
                            <label htmlFor="confirmPassword">
                                {t(
                                    "resetPassword.confirmPassword",
                                )}
                            </label>

                            <div className="forgot-password-input-wrapper">
                                <LockKeyhole
                                    size={18}
                                    className="forgot-password-input-icon"
                                />

                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={
                                        confirmPassword
                                    }
                                    onChange={(
                                        event,
                                    ) => {
                                        setConfirmPassword(
                                            event.target
                                                .value,
                                        );

                                        clearError();
                                    }}
                                    placeholder={t(
                                        "resetPassword.confirmPasswordPlaceholder",
                                    )}
                                    autoComplete="new-password"
                                    disabled={
                                        isSubmitting
                                    }
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="forgot-password-submit"
                            disabled={
                                isSubmitting
                            }
                        >
                            {isSubmitting
                                ? t(
                                    "resetPassword.resetting",
                                )
                                : t(
                                    "resetPassword.submit",
                                )}
                        </button>
                    </form>
                )}

                <div className="forgot-password-footer">
                    <Link to="/login">
                        <ArrowLeft size={16} />

                        <span>
                            {t(
                                "resetPassword.backToLogin",
                            )}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}