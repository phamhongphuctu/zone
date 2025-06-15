import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, Routes, Route } from "react-router-dom";

import BottomNav from "./components/BottomNav";
import Categories from "./pages/Categories";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import "./App.css";

// Import dữ liệu quốc gia (chỉ dùng để gợi ý nhãn)
import vi from "./data/countries/vi.json";
import us from "./data/countries/us.json";
import es from "./data/countries/es.json";

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
  { code: "vi", label: "🇻🇳 Việt Nam" },
];

const countryMap: any = { vi, us, es };

function App() {
  const [country, setCountry] = useState("🌍 Chọn quốc gia");
  const [showSelector, setShowSelector] = useState(false);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { countryCode } = useParams();

  const handleSelectCountry = (code: string, label: string) => {
    setCountry(label);
    setShowSelector(false);
    i18n.changeLanguage(code);
    navigate(`/${code}`);
  };

  return (
    <div className="app-container">
      <header className="zone-header">
        <h1>🛒 Zone Marketplace</h1>
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="zone-country-btn"
        >
          {country === "🌍 Chọn quốc gia" ? "🌍 Choose country" : country}
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
          <option value="" disabled>
            🌍 {t("choose_country")}
          </option>
          {piCountries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      )}

<Routes>
  <Route path="/" element={<Categories />} />
</Routes>


      <BottomNav />
    </div>
  );
}

export default App;
