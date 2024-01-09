import React from 'react';
import { List, Avatar, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IUser } from '../interfaces/interface';

interface UserListProps {
    users: IUser[]; // Array de usuarios a mostrar en la listas
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <List
            itemLayout='horizontal'
            dataSource={users}
            renderItem={(user) => (
                <List.Item actions={[<Button icon={<EditOutlined />} />, <Button icon={<DeleteOutlined />} />]}>
                    <List.Item.Meta avatar={<Avatar src={user.photo || 'path_to_default_avatar.png'} />} title={user.name} description={user.description} />
                </List.Item>
            )}
        />
    );
};

export default UserList;
