import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { postProductToSupabase } from "../lib/api";
import { uploadImage } from "../lib/uploadImage";

export default function Sell() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("vn");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !price || !country || !preview) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const newProduct = {
      name: productName,
      price: parseFloat(price),
      description,
      image: preview,
      country,
      contact: {
        zalo: "https://zalo.me/123456789",
        telegram: "",
        phone: "",
      },
    };

    try {
      await postProductToSupabase(newProduct);
      alert("✅ Sản phẩm đã được gửi lên Supabase!");

      // ✅ CHỈNH ĐIỂM QUAN TRỌNG: chuyển về đúng route quốc gia
      window.location.href = `/${country}`;
    } catch (err) {
      alert("❌ Gửi thất bại!");
      console.error(err);
    }
  };

  const handleExit = () => {
    window.location.href = `/${country}`;
  };

  return (
    <div className="zone-sell-page" style={{ padding: "1rem" }}>
      <h2>{t("sell_product")}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>{t("product_name")}</label>
          <input
            type="text"
            className="zone-input"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Ví dụ: Áo thun..."
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>{t("price")}</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>{t("description")}</label>
          <textarea
            className="zone-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Chi tiết sản phẩm..."
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>{t("product_image")}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
                uploadImage(file).then((url) => setPreview(url));
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
