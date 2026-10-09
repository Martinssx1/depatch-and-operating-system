import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { DispatchProvider } from './state/DispatchContext'
import "./styles.css"

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><DispatchProvider><App /></DispatchProvider></BrowserRouter></React.StrictMode>)
