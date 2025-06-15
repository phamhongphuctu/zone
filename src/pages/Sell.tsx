import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Sell() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [country, setCountry] = useState("vn");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const product = {
      country,
      image: preview,
      createdAt: new Date().toISOString()
    };
  
    // Lấy danh sách hiện tại từ localStorage
    const storedData = localStorage.getItem("productsByCountry");
    const parsedData = storedData ? JSON.parse(storedData) : {};
  
    // Thêm sản phẩm vào quốc gia tương ứng
    const updated = {
      ...parsedData,
      [country]: [...(parsedData[country] || []), product]
    };
  
    localStorage.setItem("productsByCountry", JSON.stringify(updated));
  
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

        {/* ✅ Ảnh sản phẩm */}
        <div style={{ marginBottom: "1rem" }}>
          <label>{t("product_image")}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          {preview && (
            <div style={{ marginTop: "0.5rem" }}>
              <img
                src={preview}
                alt="preview"
                style={{ width: "150px", borderRadius: "0.5rem" }}
              />
            </div>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>{t("country")}</label>
          <select
            className="zone-input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
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
