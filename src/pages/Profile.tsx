import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // 👈 thêm dòng này
import BottomNav from "../components/BottomNav";

export default function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate(); // 👈 khởi tạo điều hướng

  return (
    <div className="zone-profile-page">
      <h2>{t("profile")}</h2>
      <div>
        <p>{t("your_name")}: John Doe</p>
        <p>{t("wallet_address")}: GABC123456789</p>
        <p>{t("language")}: English</p>
        <p>{t("pi_won")}: 3.14 Pi</p>
      </div>

      {/* 👇 Nút tạo bài đăng */}
      <button onClick={() => navigate("/sell")} className="zone-btn">
  {t("create_sell_post")}
</button>


      <BottomNav />
    </div>
  );
}
