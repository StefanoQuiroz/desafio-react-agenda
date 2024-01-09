import React from 'react';
import { Table, Avatar, Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { IUser } from '../interfaces/interface';

interface ContactTableProps {
    users: IUser[];
    onDelete: (id: number) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({ users, onDelete }) => {
    // Define las columnas para la tabla de Ant Design
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            // Renderiza cada nombre de usuario con un avatar y el nombre como un enlace
            render: (text: string, user: IUser) => (
                <Space>
                    <Avatar src={user.photo || 'path_to_default_avatar.png'} />
                    <a style={{ color: '#1890ff' }}>{text}</a>
                </Space>
            ),
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Acciones',
            key: 'actions',
            align: 'center' as const,
            // Renderiza botones de acción Borrar
            render: (_: any, user: IUser) => (
                <Button
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        if (typeof user.id === 'number') {
                            onDelete(user.id);
                        }
                    }}
                />
            ),
        },
    ];
    // Renderiza la tabla con los datos de los usuarios y las columnas definidas
    return <Table dataSource={users} columns={columns} pagination={false} />;
};

export default ContactTable;
