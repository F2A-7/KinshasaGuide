import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/tokens.css'
import './styles/global.css'
import './styles/components.css'
import './styles/layout.css'
import './styles/home.css'
import './styles/explore.css'
import './styles/detail.css'
import './styles/forms.css'
import './styles/pages.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)