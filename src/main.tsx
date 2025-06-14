import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Categories from "./pages/Categories"; // 👈 THÊM DÒNG NÀY
import "./i18n";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:countryCode" element={<App />} />
        <Route path="/categories" element={<Categories />} />  {/* 👈 THÊM DÒNG NÀY */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
