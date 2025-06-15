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
      if (data) setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Đang tải...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: "100%", maxWidth: "500px" }} />
      <p>💰 {product.price} Pi</p>
      <p>📍 Quốc gia: {product.country}</p>
      <p>📝 {product.description}</p>
      <div style={{ marginTop: "1rem" }}>
        <h4>Liên hệ:</h4>
        <pre>{JSON.stringify(product.contact, null, 2)}</pre>
      </div>
    </div>
  );
}
