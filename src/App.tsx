import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "./components/BottomNav";



import "./App.css";

// Import dữ liệu quốc gia
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
  { code: "vi", label: "🇻🇳 Việt Nam" }
];

const countryMap: any = { vi, us, es };

function App() {
  const [country, setCountry] = useState("🌍 Chọn quốc gia");
  const [showSelector, setShowSelector] = useState(false);
  const [countryData, setCountryData] = useState<any>(null);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { countryCode } = useParams();

  const handleSelectCountry = (code: string, label: string) => {
    setCountry(label);
    setShowSelector(false);
    i18n.changeLanguage(code);
    localStorage.setItem("zone_country", code);
    navigate(`/${code}`);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("zone_language");
    if (!savedLang) {
      const browserLang = navigator.language.slice(0, 2);
      i18n.changeLanguage(browserLang);
      localStorage.setItem("zone_language", browserLang);
    } else {
      i18n.changeLanguage(savedLang);
    }

    if (countryCode) {
      const found = piCountries.find((c) => c.code === countryCode);
      if (found) {
        setCountry(found.label);
        setCountryData(countryMap[countryCode] || null);
      }
    }
  }, [countryCode]);

  const renderContactButtons = (contact: any) => {
    
    return (
      <div style={{ marginTop: "0.5rem" }}>
        {contact?.zalo && (
          <a href={contact.zalo} target="_blank" rel="noopener noreferrer">
            <button>💬 Zalo</button>
          </a>
        )}
        {contact?.telegram && (
          <a href={contact.telegram} target="_blank" rel="noopener noreferrer">
            <button>📲 Telegram</button>
          </a>
        )}
        {contact?.whatsapp && (
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
            <button>📱 WhatsApp</button>
          </a>
        )}
        {contact?.phone && (
          <a href={`tel:${contact.phone}`}>
            <button>📞 Gọi</button>
          </a>
        )}
        {contact?.email && (
          <a href={`mailto:${contact.email}`}>
            <button>✉️ Email</button>
          </a>
        )}
      </div>
    );
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  


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

{["vi", "us", "es"].includes(countryCode || "") && (
    <div className="zone-search-wrapper">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("search_placeholder")}
        className="zone-search-input"
      />
      <button
  type="button"
  onClick={() => {
    if (!countryData?.products) return;

    if (!searchTerm.trim()) {
      alert("Vui lòng nhập từ khóa tìm kiếm");
      return;
    }

    const results = countryData.products.filter((product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (results.length === 0) {
      alert("Không tìm thấy sản phẩm phù hợp");
    }

    setFilteredProducts(results);
  }}
  className="zone-search-icon"
>
  🔍
</button>

    </div>
  )}



<section className="zone-banner">

        <img
          src={
            countryData?.banner ||
            "https://via.placeholder.com/600x200?text=Zone+Banner"
          }
          alt="Banner"
        />
      </section>

      <section className="zone-products">
  <h2>{t("suggestion_today")}</h2>
  {countryData?.categories && (
  <div className="zone-category-list">
    {countryData.categories.map((cat: string, idx: number) => (
      <div key={idx} className="zone-category-item">
        {cat}
      </div>
    ))}
  </div>
)}

  <div className="zone-product-list">
    {filteredProducts?.map((product: any, idx: number) => (
      <div key={idx} className="zone-product-card">
        <img src={product.image} alt={product.name} />
        <p>{product.name}</p>
        <p>
          {t("price")}: {product.price} Pi
        </p>
        <button>{t("buy_now")}</button>
        {renderContactButtons(product.contact)}
      </div>
    ))}
  </div>
</section>

<BottomNav />
    </div>
  );
}

export default App;
