import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import "./App.css";

const piCountries = [
  { code: "au", label: "🇦🇺 Australia" },
  { code: "bn", label: "🇧🇩 Bangladesh" },
  { code: "br", label: "🇧🇷 Brazil" },
  { code: "co", label: "🇨🇴 Colombia" },
  { code: "de", label: "🇩🇪 Đức" },
  { code: "es", label: "🇪🇸 Tây Ban Nha" },
  { code: "fr", label: "🇫🇷 Pháp" },
  { code: "gb", label: "🇬🇧 Anh Quốc" },
  { code: "hi", label: "🇮🇳 Ấn Độ" },
  { code: "id", label: "🇮🇩 Indonesia" },
  { code: "it", label: "🇮🇹 Ý" },
  { code: "kr", label: "🇰🇷 Hàn Quốc" },
  { code: "mx", label: "🇲🇽 Mexico" },
  { code: "ng", label: "🇳🇬 Nigeria" },
  { code: "ph", label: "🇵🇭 Philippines" },
  { code: "th", label: "🇹🇭 Thái Lan" },
  { code: "us", label: "🇺🇸 Hoa Kỳ" },
  { code: "vi", label: "🇻🇳 Việt Nam" }
];

function App() {
  const [country, setCountry] = useState("🌍 Chọn quốc gia");
  const [showSelector, setShowSelector] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { countryCode } = useParams();


  // 👉 Khi chọn quốc gia
  const handleSelectCountry = (code: string, label: string) => {
    setCountry(label);
    setShowSelector(false);
    i18n.changeLanguage(code);
    localStorage.setItem("zone_country", code);
    navigate(`/${code}`); // 👉 Điều hướng sang trang /vi, /us,...
  };


  // 👉 Load lại ngôn ngữ khi mở lại app
  useEffect(() => {
    const savedLang = localStorage.getItem("zone_language");
  
    if (!savedLang) {
      const browserLang = navigator.language.slice(0, 2); // "vi", "en"...
      i18n.changeLanguage(browserLang); // 👉 chỉ đổi ngôn ngữ
      localStorage.setItem("zone_language", browserLang);
    } else {
      i18n.changeLanguage(savedLang);
    }
  
    // Nếu có quốc gia trong URL → lấy label ra
    if (countryCode) {
      const found = piCountries.find((c) => c.code === countryCode);
      if (found) {
        setCountry(found.label);
      }
    }
  }, [countryCode]);
  
  

  

  return (
   
      <div className="app-container">
    
      <header className="zone-header">
        <h1>🛒 Zone Marketplace</h1>
        <button onClick={() => setShowSelector(!showSelector)} className="zone-country-btn">
          {country}
        </button>
      </header>

      {showSelector && (
  <select
    className="zone-country-select"
    onChange={(e) => {
      const selected = piCountries.find((c) => c.code === e.target.value);
      if (selected) handleSelectCountry(selected.code, selected.label);
    }}
    defaultValue=""
  >
    <option value="" disabled>🌍 Chọn quốc gia...</option>
    {piCountries.map((c) => (
      <option key={c.code} value={c.code}>{c.label}</option>
    ))}
  </select>
)}


      <section className="zone-banner">
        <img src="https://via.placeholder.com/600x200?text=Zone+Banner" alt="Banner" />
      </section>

      <section className="zone-products">
        <h2>{t("suggestion_today")}</h2>
        <div className="zone-product-list">
          <div className="zone-product-card">
            <img src="https://via.placeholder.com/150" alt="Áo thun" />
            <p>{t("shirt")}</p>
            <p>{t("price")}: 2 Pi</p>
            <button>{t("buy_now")}</button>
          </div>
          <div className="zone-product-card">
            <img src="https://via.placeholder.com/150" alt="Điện thoại" />
            <p>{t("phone")}</p>
            <p>{t("price")}: 35 Pi</p>
            <button>{t("buy_now")}</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
