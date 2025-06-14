// src/pages/Categories.tsx
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


const categories = [
  { id: "electronics", icon: "📱", nameKey: "electronics" },
  { id: "fashion", icon: "👗", nameKey: "fashion" },
  { id: "food", icon: "🍔", nameKey: "food" },
  { id: "furniture", icon: "🛋️", nameKey: "furniture" },
  { id: "books", icon: "📚", nameKey: "books" },
];

export default function Categories() {
  const { t } = useTranslation();

  return (
    <div className="zone-categories-page">
      <h2>{t("categories")}</h2>
      <div className="zone-categories-list">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/category/${cat.id}`} className="zone-category-item">
            <div className="zone-category-icon">{cat.icon}</div>
            <div className="zone-category-name">{t(cat.nameKey)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
