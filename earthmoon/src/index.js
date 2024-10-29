import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Importe BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolva App com BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
