import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import zhTW from "./zh-TW.json";
import zhCN from "./zh-CN.json";
import ja from "./ja.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      "zh-TW": { translation: zhTW },
      "zh-CN": { translation: zhCN },
      ja: { translation: ja },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
