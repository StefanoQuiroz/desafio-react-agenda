import axios from 'axios';
import { IUser } from '../interfaces/interface';

const API_ENDPOINT = 'http://localhost:9000/api/users';

export const userService = {
    // Función para obtener todos los usuarios
    getUsers: async () => {
        // Realiza una solicitud GET a la API para obtener los usuarios
        const response = await axios.get<IUser[]>(API_ENDPOINT);
        // Retorna la lista de usuarios obtenida de la API
        return response.data;
    },

    // Función para crear un nuevo usuario
    createUser: async (userData: IUser) => {
        // Realiza una solicitud POST a la API para crear un nuevo usuario
        const response = await axios.post<IUser>(API_ENDPOINT, userData);
        // Retorna los datos del usuario recién creado
        return response.data;
    },

    // Función para eliminar un usuario
    deleteUser: async (id: number) => {
        // Realiza una solicitud DELETE a la API para eliminar un usuario por su ID
        await axios.delete(`${API_ENDPOINT}/${id}`);
        // Retorna el ID del usuario eliminado
        return id;
    },
};
