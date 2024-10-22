import React from 'react';
import { createRoot } from 'react-dom/client'; // Importe createRoot
import App from './App'; // O componente raiz da sua aplicação

// Use createRoot em vez de ReactDOM.render
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);