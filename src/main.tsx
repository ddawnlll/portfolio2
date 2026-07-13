import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/fraunces/latin-400.css'
import '@fontsource/fraunces/latin-ext-400.css'
import '@fontsource/fraunces/latin-400-italic.css'
import '@fontsource/fraunces/latin-ext-400-italic.css'
import '@fontsource/fraunces/latin-500.css'
import '@fontsource/fraunces/latin-ext-500.css'
import '@fontsource/fraunces/latin-600.css'
import '@fontsource/fraunces/latin-ext-600.css'
import '@fontsource/nunito-sans/latin-400.css'
import '@fontsource/nunito-sans/latin-ext-400.css'
import '@fontsource/nunito-sans/latin-600.css'
import '@fontsource/nunito-sans/latin-ext-600.css'
import '@fontsource/nunito-sans/latin-700.css'
import '@fontsource/nunito-sans/latin-ext-700.css'
import App from './App'
import Guide from './Guide'
import './styles.css'

const isGuide = window.location.pathname.replace(/\/+$/, '').endsWith('/rehber')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>{isGuide ? <Guide /> : <App />}</React.StrictMode>,
)
