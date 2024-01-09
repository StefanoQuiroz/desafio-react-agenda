import React, { useState, useContext, useEffect } from 'react';
import { Button, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ContactTable from '../components/ContactTable';
import CommonLayout from '../components/CommonLayout';
import { useUsers } from '../hooks/useUsers';
import { UserContext } from '../contexts/UserContext';
import { IUser } from '../interfaces/interface';

const HomePage: React.FC = () => {
    const navigate = useNavigate(); // Hook para la navegación
    const { state } = useUsers(); // Hook personalizado para obtener el estado de los usuarios
    const userContext = useContext(UserContext); // Uso del context de usuarios
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual de la paginación
    const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]); // Estado para los usuarios filtrados
    const pageSize = 6; // Número de usuarios a mostrar por página

    // Para filtrar los usuarios según el texto de búsqueda y la paginación
    useEffect(() => {
        const filtered = state.users.filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredUsers(filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize));
    }, [searchText, state.users, currentPage, pageSize]);

    // Para la búsqueda de usuarios
    const handleSearch = (value: string) => {
        setSearchText(value);
        setCurrentPage(1);
    };

    // Para la eliminación de un usuario
    const handleDelete = (id: number) => {
        if (userContext) {
            userContext.removeUser(id);
        }
    };

    // Para cambios en el campo de búsqueda
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        setCurrentPage(1);
    };

    // Para cambios en la paginación
    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    // Para añadir un nuevo contacto
    const handleAddContactClick = () => {
        navigate('/add-user');
    };

    return (
        <CommonLayout
            title='Agenda Previred - Mi agenda de contactos laboral'
            subtitle='Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados.'
        >
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Button type='primary' icon={<PlusOutlined />} onClick={handleAddContactClick} style={{ marginRight: '16px', marginBottom: '16px' }}>
                    Agregar Contacto
                </Button>
                <SearchBar onSearch={handleSearch} onChange={handleInputChange} />
            </div>
            <ContactTable users={filteredUsers} onDelete={handleDelete} />
            <Pagination
                current={currentPage}
                onChange={handleChangePage}
                total={searchText ? filteredUsers.length : state.users.length}
                pageSize={pageSize}
                style={{ textAlign: 'right', marginTop: '32px' }}
            />
        </CommonLayout>
    );
};

export default HomePage;
