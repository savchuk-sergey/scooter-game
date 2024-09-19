import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationRU from "./locales/ru/translation.json";

// Определите доступные языки и их переводы
const resources = {
    en: {
        translation: translationEN,
    },
    ru: {
        translation: translationRU,
    },
};

i18n.use(initReactI18next) // передаем i18n в react-i18next
    .init({
        resources,
        lng: "en", // язык по умолчанию
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // для React это не требуется
        },
    });

export default i18n;
