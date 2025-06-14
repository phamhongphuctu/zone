import { useTranslation } from "react-i18next";

export default function Sell() {
  const { t } = useTranslation();

  return (
    <div className="zone-sell-page" style={{ padding: "1rem" }}>
      <h2>{t("sell_product")}</h2>
      <form>
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
        <button type="submit" className="zone-btn">{t("submit")}</button>
      </form>
    </div>
  );
}
