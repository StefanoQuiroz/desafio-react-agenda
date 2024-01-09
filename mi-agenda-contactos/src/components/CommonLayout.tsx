import React from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

// Desestructuración de componentes específicos de Ant Design para el diseño y la tipografía
interface CommonLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ title, subtitle, children }) => {
    return (
        <Layout>
            <Content style={{ padding: '50px', background: '#fff' }}>
                <Title level={3}>{title}</Title>
                <Paragraph>{subtitle}</Paragraph>
                {children}
            </Content>
        </Layout>
    );
};

export default CommonLayout;
