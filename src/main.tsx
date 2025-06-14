import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Categories from "./pages/Categories"; // 👈 THÊM DÒNG NÀY
import "./i18n";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile"; // 👈 Thêm dòng này
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:countryCode" element={<App />} />
        <Route path="/categories" element={<Categories />} />  {/* 👈 THÊM DÒNG NÀY */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
