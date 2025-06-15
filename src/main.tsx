// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import Sell from "./pages/Sell";
import "./i18n";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          {/* Quan trong: /:countryCode/* phai co dau * moi support nested route */}
          <Route path="/:countryCode/*" element={<App />} />
          <Route path="/" element={<App />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sell" element={<Sell />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
