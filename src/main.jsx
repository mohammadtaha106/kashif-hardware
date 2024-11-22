import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'
import AuthContextProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
       <NextUIProvider>
       <App />
       <Toaster richColors/>
       </NextUIProvider>
       </AuthContextProvider>
    
  </StrictMode>,
)
