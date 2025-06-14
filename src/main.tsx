import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n"; 
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./pages/Categories";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path=":countryCode" element={<App />} />
      <Route path="/categories" element={<Categories />} />
    </Routes>
  </BrowserRouter>
);
