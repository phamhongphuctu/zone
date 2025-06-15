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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !price || !description || !imageFile || !country) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const imageURL = await uploadImage(imageFile);
    if (!imageURL) {
      alert("Không thể upload ảnh!");
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
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImageFile(file);
          }}
        />
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="vn">🇻🇳 Việt Nam</option>
          <option value="us">🇺🇸 United States</option>
          <option value="ph">🇵🇭 Philippines</option>
          <option value="in">🇮🇳 India</option>
        </select>

        <button type="submit">{t("submit")}</button>
      </form>
    </div>
  );
}
