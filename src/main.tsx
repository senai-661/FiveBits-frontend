import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "primereact/resources/themes/lara-light-blue/theme.css"; // Tema
import "primereact/resources/primereact.min.css";           // Core
import "primeicons/primeicons.css";                         // Ícones
import './index.css';                                      // Seu CSS com variáveis

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
