import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import './lib/console-logger'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
