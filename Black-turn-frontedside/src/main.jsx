import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom' // ✅ Use only HashRouter
import { ThemeProvider } from './Dashboard/Pages/Context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
