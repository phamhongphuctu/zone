import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCountry } from "../lib/api";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  country: string;
}

export default function Home() {
  const { countryCode } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      if (!countryCode) return;
      const result = await getProductsByCountry(countryCode);
      setProducts(result);
    };
    fetch();
  }, [countryCode]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🛒 Sản phẩm tại quốc gia: {countryCode?.toUpperCase()}</h2>
      {products.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }}
              />
              <h3>{product.name}</h3>
              <p>{product.price} Pi</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
