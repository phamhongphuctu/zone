import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();

  return (
    <div className="zone-profile-page">
      <h2>{t("profile")}</h2>
      <ul>
        <li>{t("your_name")}: <strong>Pham Hong Phuc Tu</strong></li>
        <li>{t("wallet_address")}: G***1234</li>
        <li>{t("language")}: 🇻🇳 Tiếng Việt</li>
        <li>{t("pi_won")}: 0.00 Pi</li>
      </ul>
    </div>
  );
}
