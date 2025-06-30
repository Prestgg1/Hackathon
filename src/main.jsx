import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastdevProvider, Toastdev } from '@azadev/react-toastdev'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastdevProvider toastTheme='dark-ikonik' >
        <Toastdev />
        <App />
      </ToastdevProvider>
    </BrowserRouter>
  </StrictMode>,
)
