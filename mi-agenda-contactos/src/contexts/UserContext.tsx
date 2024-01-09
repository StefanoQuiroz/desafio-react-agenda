import React, { createContext, useReducer, useEffect } from 'react';
import { userService } from '../services/userService';
import { IUser } from '../interfaces/interface';

//Se define los tipos de acciones que se pueden ejecutar en el context
type Action = { type: 'SET_USERS'; payload: IUser[] } | { type: 'ADD_USER'; payload: IUser } | { type: 'REMOVE_USER'; payload: number };

interface State {
    users: IUser[];
}

interface UserContextType {
    state: State;
    dispatch: React.Dispatch<Action>;
    addUser: (user: IUser) => void;
    removeUser: (id: number) => void;
}

interface UserProviderProps {
    children: React.ReactNode;
}

const initialState: State = {
    users: [],
};

// Creación del context para los usuarios
export const UserContext = createContext<UserContextType | null>(null);

// Reducer para manejar las acciones del context
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.payload };
        case 'ADD_USER':
            return { ...state, users: [action.payload, ...state.users] };
        case 'REMOVE_USER':
            return { ...state, users: state.users.filter((user) => user.id !== action.payload) };
        default:
            return state;
    }
};

// Componente proveedor para el context de usuarios
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Carga inicial de usuarios desde el servicio
    useEffect(() => {
        userService.getUsers().then((users) => {
            dispatch({ type: 'SET_USERS', payload: users });
        });
    }, []);

    // Función para agregar un nuevo usuario
    const addUser = (user: IUser) => {
        userService.createUser(user).then((newUser) => {
            dispatch({ type: 'ADD_USER', payload: newUser });
        });
    };

    // Función para eliminar un usuario
    const removeUser = (id: number) => {
        userService.deleteUser(id).then(() => {
            dispatch({ type: 'REMOVE_USER', payload: id });
        });
    };

    // Proporciona el context a los componentes hijos
    return <UserContext.Provider value={{ state, dispatch, addUser, removeUser }}>{children}</UserContext.Provider>;
};
