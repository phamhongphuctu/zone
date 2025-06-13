import { useState } from "react";
import "./App.css";

const piCountries = [
  "🇦🇺 Australia",
  "🇧🇩 Bangladesh",
  "🇧🇷 Brazil",
  "🇨🇴 Colombia",
  "🇩🇪 Đức",
  "🇪🇸 Tây Ban Nha",
  "🇫🇷 Pháp",
  "🇬🇧 Anh Quốc",
  "🇮🇳 Ấn Độ",
  "🇮🇩 Indonesia",
  "🇮🇹 Ý",
  "🇰🇷 Hàn Quốc",
  "🇲🇽 Mexico",
  "🇳🇬 Nigeria",
  "🇵🇭 Philippines",
  "🇹🇭 Thái Lan",
  "🇺🇸 Hoa Kỳ",
  "🇻🇳 Việt Nam"
];

function App() {
  const [country, setCountry] = useState("🌍 Chọn quốc gia");
  const [showSelector, setShowSelector] = useState(false);

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
            <button key={c} onClick={() => { setCountry(c); setShowSelector(false); }}>
              {c}
            </button>
          ))}
        </div>
      )}

      <section className="zone-banner">
        <img src="https://via.placeholder.com/600x200?text=Chao+mung+den+Zone" alt="Banner" />
      </section>

      <section className="zone-products">
        <h2>Gợi ý hôm nay</h2>
        <div className="zone-product-list">
          <div className="zone-product-card">
            <img src="https://via.placeholder.com/150" />
            <p>Áo thun nam</p>
            <p>Giá: 2 Pi</p>
            <button>Mua ngay</button>
          </div>
          <div className="zone-product-card">
            <img src="https://via.placeholder.com/150" />
            <p>Điện thoại</p>
            <p>Giá: 35 Pi</p>
            <button>Mua ngay</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
