import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { en } from "./locales/en";
import { bg } from "./locales/bg";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },

      bg: {
        translation: bg,
      },
    },

    supportedLngs: ["en", "bg"],

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: [
        "localStorage",
        "navigator",
      ],

      caches: [
        "localStorage",
      ],
    },
  });

export default i18n;