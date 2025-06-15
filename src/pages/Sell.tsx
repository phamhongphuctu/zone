import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { postProductToSupabase } from "../lib/api";
import { uploadImage } from "../lib/uploadImage";

export default function Sell() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("vn");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !price || !description || !imageFile || !country) {
      alert("❗ Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const imageURL = await uploadImage(imageFile);
    if (!imageURL) {
      alert("❌ Không thể upload ảnh!");
      return;
    }

    const newProduct = {
      name: productName,
      price: parseFloat(price),
      description,
      image: imageURL,
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
      navigate(`/${country}`);
    } catch (err) {
      alert("❌ Gửi thất bại!");
      console.error(err);
    }
  };

  return (
    <div className="zone-sell-page" style={{ padding: "1rem" }}>
      <h2>{t("sell_product")}</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>{t("product_name")}</label>
          <input
            type="text"
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
            placeholder="Ví dụ: 5.5"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>{t("description")}</label>
          <textarea
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
                setImageFile(file);
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
                style={{ width: "150px", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>{t("country")}</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="vn">🇻🇳 Việt Nam</option>
            <option value="us">🇺🇸 United States</option>
            <option value="ph">🇵🇭 Philippines</option>
            <option value="in">🇮🇳 India</option>
          </select>
        </div>

        <button type="submit" className="zone-btn">
          {t("submit")}
        </button>
      </form>
    </div>
  );
}
