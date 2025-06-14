import { Home, ShoppingBag, User, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <nav className="zone-bottom-nav">
      <div className="zone-nav-item" onClick={() => navigate("/")}>
        <Home size={20} />
        <span>Home</span>
      </div>
      <div className="zone-nav-item" onClick={() => navigate("/categories")}>
        <ShoppingBag size={20} />
        <span>Categories</span>
      </div>
      <div className="zone-nav-item" onClick={() => navigate("/profile")}>
        <User size={20} />
        <span>You</span>
      </div>
      <div className="zone-nav-item">
        <ShoppingCart size={20} />
        <span>Cart</span>
      </div>
    </nav>
  );
}
