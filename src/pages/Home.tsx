import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCountry } from "../lib/api";

export default function Home() {
  const { countryCode } = useParams();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (countryCode) {
        const res = await getProductsByCountry(countryCode);
        setProducts(res);
      }
    };

    fetchData();
  }, [countryCode]);

  if (!countryCode) {
    return <p>Chưa chọn quốc gia</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🛍️ Sản phẩm tại quốc gia: {countryCode.toUpperCase()}</h2>

      {products.length === 0 ? (
        <p>Chưa có sản phẩm nào</p>
      ) : (
        <div>
          {products.map((p) => (
            <div key={p.id} style={{ marginBottom: "1.5rem" }}>
              <Link to={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={p.image} alt={p.name} style={{ width: "150px", borderRadius: "0.5rem" }} />
                <h3>{p.name}</h3>
                <p>💰 {p.price} Pi</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
