import {
    useState,
    type FormEvent,
} from "react";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Languages,
    Mail,
} from "lucide-react";

import { authService } from "../../services/authService";
import { getApiErrorKey } from "../../utils/apiError";

export function ForgotPasswordPage() {
    const { t, i18n } = useTranslation();

    const [email, setEmail] =
        useState("");

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [errorKey, setErrorKey] =
        useState<string | null>(null);

    const [successKey, setSuccessKey] =
        useState<string | null>(null);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const normalizedEmail =
            email.trim();

        if (!normalizedEmail) {
            setErrorKey(
                "forgotPassword.emailRequired",
            );

            return;
        }

        setIsSubmitting(true);
        setErrorKey(null);
        setSuccessKey(null);

        try {
            await authService.forgotPassword(
                normalizedEmail,
            );

            setEmail("");

            setSuccessKey(
                "forgotPassword.success",
            );
        } catch (error) {
            setErrorKey(
                getApiErrorKey(error),
            );
        } finally {
            setIsSubmitting(false);
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
                    <Mail size={26} />
                </div>

                <div className="forgot-password-header">
                    <h1>
                        {t(
                            "forgotPassword.title",
                        )}
                    </h1>

                    <p>
                        {t(
                            "forgotPassword.description",
                        )}
                    </p>
                </div>

                {errorKey && (
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
                        <span>
                            {t(successKey)}
                        </span>
                    </div>
                )}

                {!successKey && (
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="forgot-password-form"
                    >
                        <div className="forgot-password-field">
                            <label htmlFor="email">
                                {t(
                                    "forgotPassword.email",
                                )}
                            </label>

                            <div className="forgot-password-input-wrapper">
                                <Mail
                                    size={18}
                                    className="forgot-password-input-icon"
                                />

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(
                                            event.target.value,
                                        );

                                        if (errorKey) {
                                            setErrorKey(
                                                null,
                                            );
                                        }
                                    }}
                                    placeholder={t(
                                        "forgotPassword.emailPlaceholder",
                                    )}
                                    autoComplete="email"
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
                                    "forgotPassword.sending",
                                )
                                : t(
                                    "forgotPassword.submit",
                                )}
                        </button>
                    </form>
                )}

                <div className="forgot-password-footer">
                    <Link to="/login">
                        <ArrowLeft size={16} />

                        <span>
                            {t(
                                "forgotPassword.backToLogin",
                            )}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}