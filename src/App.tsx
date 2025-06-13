import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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

  // 👉 Khi chọn quốc gia
  const handleSelectCountry = (code: string, label: string) => {
    setCountry(label);
    setShowSelector(false);
    i18n.changeLanguage(code);
    localStorage.setItem("zone_country", code);
  };

  // 👉 Load lại ngôn ngữ khi mở lại app
  useEffect(() => {
    const saved = localStorage.getItem("zone_country");
    if (saved) {
      const found = piCountries.find((c) => c.code === saved);
      if (found) {
        setCountry(found.label);
        i18n.changeLanguage(saved);
      }
    }
  }, []);

  return (
    <div className="zone-app">
      <header className="zone-header">
        <h1>🛒 Zone Marketplace</h1>
        <button onClick={() => setShowSelector(!showSelector)} className="zone-country-btn">
          {country}
        </button>
      </header>

      {showSelector && (
        <div className="zone-country-list">
          {piCountries.map((c) => (
            <button key={c.code} onClick={() => handleSelectCountry(c.code, c.label)}>
              {c.label}
            </button>
          ))}
        </div>
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
