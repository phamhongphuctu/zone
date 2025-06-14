import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Sell() {
  const { t } = useTranslation(); // ✅ đúng chỗ
  const [country, setCountry] = useState("vn");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Sản phẩm đã được gửi đến quốc gia: ${country.toUpperCase()}`);
    navigate(`/${country}`);
  };

  const handleExit = () => {
    navigate(`/${country}`);
  };

  return (
    <div className="zone-sell-page" style={{ padding: "1rem" }}>
      <h2>{t("sell_product")}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>{t("product_name")}</label>
          <input type="text" className="zone-input" placeholder="Ví dụ: Áo thun..." />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>{t("price")}</label>
          <input type="number" className="zone-input" placeholder="0.1 Pi" />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>{t("description")}</label>
          <textarea className="zone-input" placeholder="Chi tiết sản phẩm..." />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>{t("country")}</label>
          <select className="zone-input" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="vn">🇻🇳 Việt Nam</option>
            <option value="cr">🇨🇷 Costa Rica</option>
            <option value="us">🇺🇸 United States</option>
            <option value="ph">🇵🇭 Philippines</option>
            <option value="in">🇮🇳 India</option>
          </select>
        </div>

        <button type="submit" className="zone-btn">
          {t("submit")}
        </button>
      </form>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button className="zone-btn" onClick={handleExit}>
          ⬅️ {t("exit")}
        </button>
      </div>
    </div>
  );
}
