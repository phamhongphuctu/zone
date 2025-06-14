// src/components/BottomNav.tsx
import { Home, ShoppingBag, User, ShoppingCart } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="zone-bottom-nav">
      <div className="zone-nav-item" onClick={() => (window.location.href = "/")}>
        <Home size={20} />
        <span>Home</span>
      </div>

      <div className="zone-nav-item" onClick={() => (window.location.href = "/categories")}>
        <ShoppingBag size={20} />
        <span>Categories</span>
      </div>

      <div className="zone-nav-item">
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
