import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage =
    i18n.resolvedLanguage === "bg"
      ? "bg"
      : "en";

  async function changeLanguage(
    language: "en" | "bg",
  ) {
    await i18n.changeLanguage(language);
  }

  return (
    <div className="language-switcher">
      <button
        type="button"
        className={
          currentLanguage === "en"
            ? "language-button language-button-active"
            : "language-button"
        }
        onClick={() =>
          void changeLanguage("en")
        }
      >
        EN
      </button>

      <button
        type="button"
        className={
          currentLanguage === "bg"
            ? "language-button language-button-active"
            : "language-button"
        }
        onClick={() =>
          void changeLanguage("bg")
        }
      >
        BG
      </button>
    </div>
  );
}