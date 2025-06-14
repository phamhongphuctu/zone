import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Nhập các file JSON theo ngôn ngữ
import en from "./i18n/en.json";
import vi from "./i18n/vi.json";
import es from "./i18n/es.json";

i18n
  .use(LanguageDetector) // 🔍 Tự phát hiện ngôn ngữ trình duyệt
  .use(initReactI18next) // Kết nối với React
  .init({
    fallbackLng: "en", // 👉 Nếu không phát hiện được thì dùng tiếng Anh
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    },
    resources: {
      en: { translation: en },
      vi: { translation: vi },
      es: { translation: es }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
