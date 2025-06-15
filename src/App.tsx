import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Categories from "./pages/Categories";


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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

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
        const storedData = localStorage.getItem("productsByCountry");
        const parsedData = storedData ? JSON.parse(storedData) : {};
        const products = parsedData[countryCode] || [];
    
        if (searchTerm.trim()) {
          const results = products.filter((product: any) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredProducts(results);
        } else {
          setFilteredProducts(products);
        }
      }
    }, [countryCode, searchTerm]);
    
  

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
  onChange={(e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);

    // Gợi ý tìm kiếm theo tên sản phẩm
    if (keyword.trim()) {
      const storedData = localStorage.getItem("productsByCountry");
      const parsed = storedData ? JSON.parse(storedData) : {};
      const products = parsed[countryCode || ""] || [];

      const matched = products
        .map((p: any) => p.name)
        .filter((name: string) =>
          name.toLowerCase().includes(keyword.toLowerCase())
        )
        .slice(0, 10);

        setSuggestions([...new Set(matched)] as string[]);

    } else {
      setSuggestions([]);
    }
  }}
  placeholder={t("search_placeholder")}
  className="zone-search-input"
/>
{suggestions.length > 0 && (
  <ul className="zone-suggestions">
    {suggestions.map((sug, idx) => (
      <li
        key={idx}
        onClick={() => {
          setSearchTerm(sug);
          setSuggestions([]);
        }}
      >
        🔍 {sug}
      </li>
    ))}
  </ul>
)}

<button
  type="button"
  className="zone-search-icon"
  onClick={() => {
    // Không cần làm gì ở đây – dữ liệu đã tự lọc theo searchTerm
    // Có thể dùng để đóng suggestions nếu muốn
    setSuggestions([]);
  }}
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
