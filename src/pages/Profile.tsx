// src/pages/Profile.tsx
import { useTranslation } from "react-i18next";
import BottomNav from "../components/BottomNav";

export default function Profile() {
  const { t } = useTranslation();

  return (
    <div className="zone-profile-page">
      <h2>{t("profile")}</h2>
      <div>
        <p>{t("your_name")}: John Doe</p>
        <p>{t("wallet_address")}: GABC123456789</p>
        <p>{t("language")}: English</p>
        <p>{t("pi_won")}: 3.14 Pi</p>
      </div>

      <BottomNav />
    </div>
  );
}
