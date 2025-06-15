import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCountry } from "../lib/api";

export default function Home() {
  const { countryCode } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getProductsByCountry(countryCode || "");
      setProducts(data);
      setLoading(false);
    };
    fetch();
  }, [countryCode]);

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🌍 Danh sách sản phẩm ({countryCode?.toUpperCase()})</h2>

      {products.length === 0 && <p>Không có sản phẩm nào.</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              textDecoration: "none",
              color: "#333",
              background: "#f9f9f9"
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }}
            />
            <h4 style={{ marginTop: "0.5rem" }}>{product.name}</h4>
            <p>💰 {product.price} Pi</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
