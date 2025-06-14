import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import "./i18n";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

// 👇 Import để khai báo window.Pi nếu đã tạo src/types/global.d.ts
import "./types/global";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:countryCode" element={<App />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
