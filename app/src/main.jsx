import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.scss'
import './index.css'
import App from './App.jsx'
import GlobalContextProvider from './context/GlobalContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </StrictMode>,
)
