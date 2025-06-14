import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n"; // giữ nguyên dòng này
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:countryCode" element={<App />} />
    </Routes>
  </BrowserRouter>
);
