import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import StartPage from './components/start.jsx'; //start.jsx をインポート



ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <StartPage />
    </BrowserRouter>
);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <StartPage />
//   </StrictMode>,
// )
