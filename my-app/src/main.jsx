import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/app.jsx'
import './index.css'
import ErrorBoundary from "./components/error-boundary/error-boundary.jsx";

createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
)
