import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import AddUserDrawer from '../components/AddUserDrawer';
import { useUsers } from '../hooks/useUsers';

const AddUserPage: React.FC = () => {
    const navigate = useNavigate(); // Hook para manejar la navegación
    const { addUser } = useUsers(); // Hook personalizado para usar el context de usuarios
    const [drawerOpen, setDrawerOpen] = useState(true); // Estado para controlar la visibilidad del drawer

    useEffect(() => {
        // Redirige a la página principal cuando el drawer se cierra
        if (!drawerOpen) {
            navigate('/');
        }
    }, [drawerOpen, navigate]);

    // Para guardar un usuario
    const handleSave = (values: { name: string; description: string; photo: string }) => {
        addUser(values); // Añade el usuario usando el contexto
        setDrawerOpen(false); // Cierra el drawer
    };

    // Para cerrar el drawer
    const handleClose = () => {
        setDrawerOpen(false);
    };

    return (
        <div style={{ position: 'relative', zIndex: 0 }}>
            <HomePage />
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1,
                }}
            />
            <AddUserDrawer open={drawerOpen} onClose={handleClose} onSave={handleSave} />
        </div>
    );
};

export default AddUserPage;
