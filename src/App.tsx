import "./App.css";

function App() {
  return (
    <div className="zone-app">
      <header className="zone-header">
        <h1>🛒 Zone Marketplace</h1>
        <input type="text" placeholder="Tìm sản phẩm..." />
      </header>

      <section className="zone-banner">
        <img src="https://via.placeholder.com/600x200?text=Khuyen+Mai+Pi" alt="Banner" />
      </section>

      <section className="zone-categories">
        <h2>Danh mục</h2>
        <div className="zone-category-list">
          <div className="zone-category">💄 Làm đẹp</div>
          <div className="zone-category">👕 Thời trang</div>
          <div className="zone-category">📱 Công nghệ</div>
          <div className="zone-category">🍎 Thực phẩm</div>
        </div>
      </section>

      <section className="zone-products">
        <h2>Gợi ý hôm nay</h2>
        <div className="zone-product-list">
          <div className="zone-product-card">
            <img src="https://via.placeholder.com/150" />
            <p>Áo thun nam</p>
            <p>Giá: 2 Pi</p>
            <button>Mua ngay</button>
          </div>
          <div className="zone-product-card">
            <img src="https://via.placeholder.com/150" />
            <p>Điện thoại</p>
            <p>Giá: 35 Pi</p>
            <button>Mua ngay</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
