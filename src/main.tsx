import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "primereact/resources/themes/lara-light-blue/theme.css"; // Tema Tech-Blue
import "primereact/resources/primereact.min.css";           // Core
import "primeicons/primeicons.css";                         // Ícones

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
