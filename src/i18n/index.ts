import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import tất cả file dịch
import vi from "./vi.json";
import en from "./en.json";
import ph from "./ph.json";
import fr from "./fr.json";
import es from "./es.json";
import bn from "./bn.json";
import hi from "./hi.json";
import id from "./id.json";
import kr from "./kr.json";
import th from "./th.json";
import de from "./de.json";
import it from "./it.json";
import pt from "./pt.json";
import co from "./co.json";
import mx from "./mx.json";
import ng from "./ng.json";
import gb from "./gb.json";
import au from "./au.json";

i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: vi },
    en: { translation: en },
    ph: { translation: ph },
    fr: { translation: fr },
    es: { translation: es },
    bn: { translation: bn },
    hi: { translation: hi },
    id: { translation: id },
    kr: { translation: kr },
    th: { translation: th },
    de: { translation: de },
    it: { translation: it },
    pt: { translation: pt },
    co: { translation: co },
    mx: { translation: mx },
    ng: { translation: ng },
    gb: { translation: gb },
    au: { translation: au }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
