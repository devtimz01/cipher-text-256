import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Registration } from './pages/registration.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Registration/>
  </StrictMode>,
)
