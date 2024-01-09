import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import 'antd/dist/reset.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

root.render(
    <React.StrictMode>
        {/* Envuelve la aplicación con el UserProvider para proporcionar un context de usuarios en toda la aplicación */}
        <UserProvider>
            {/* Componente principal de la aplicación */}
            <App />
        </UserProvider>
    </React.StrictMode>
);
