import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchBarProps {
    onSearch: (value: string) => void; // Función que se ejecuta al realizar una búsqueda
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Función que se ejecuta al cambiar el texto de búsqueda
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onChange }) => {
    return (
        <Input.Search
            placeholder='Buscar contactos...'
            onSearch={onSearch}
            onChange={onChange}
            enterButton={<SearchOutlined />}
            size='large'
            style={{ width: '100%', maxWidth: '100%' }}
        />
    );
};

export default SearchBar;
