import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Importa tu componente principal
import './index.css'; // Importa tus estilos CSS (donde está Tailwind)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <App /> {/* Renderiza tu componente App */}
    </React.StrictMode>,
);
