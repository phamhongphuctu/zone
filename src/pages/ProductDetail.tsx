import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ Lỗi lấy chi tiết sản phẩm:", error.message);
        return;
      }

      if (data) setProduct(data);
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) return <p>⏳ Đang tải sản phẩm...</p>;

  const { name, image, price, country, description, contact } = product;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        style={{ width: "100%", maxWidth: "500px", borderRadius: "8px" }}
      />
      <p>💰 {price} Pi</p>
      <p>📍 Quốc gia: {country?.toUpperCase()}</p>
      <p>📝 {description}</p>

      {contact && (
        <div style={{ marginTop: "1rem" }}>
          <h4>📞 Liên hệ:</h4>
          <ul>
            {contact.zalo && (
              <li>
                Zalo: <a href={contact.zalo} target="_blank" rel="noreferrer">{contact.zalo}</a>
              </li>
            )}
            {contact.telegram && <li>Telegram: {contact.telegram}</li>}
            {contact.phone && <li>SĐT: {contact.phone}</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
