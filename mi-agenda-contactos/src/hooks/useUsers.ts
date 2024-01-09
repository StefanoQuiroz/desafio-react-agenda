import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// Hook personalizado para consumir el context de UserContext
export const useUsers = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('Error in UserProvider');
    }
    // Retorna el context, que incluye el estado y las funciones para manejar usuarios
    return context;
};
