import { StrictMode } from 'react'
import "./i18n"; // ✅ import hệ thống i18n trước khi render App

import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App"; // ✅ đúng chuẩn


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
