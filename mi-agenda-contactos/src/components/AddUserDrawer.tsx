import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';

interface AddUserDrawerProps {
    open: boolean;
    onClose: () => void;
    onSave: (values: { name: string; description: string; photo: string }) => void;
}

const AddUserDrawer: React.FC<AddUserDrawerProps> = ({ open, onClose, onSave }) => {
    // Hook de Ant Design para manejar formularios
    const [form] = Form.useForm();

    // Función que maneja la lógica de envío del formulario
    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                onSave(values);
                form.resetFields();
                onClose();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    // Contenido personalizado para el título del drawer incluyendo botones de acción
    const TitleWithButtons = (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Agregar nuevo Contacto</span>
            <div>
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} type='primary'>
                    Guardar
                </Button>
            </div>
        </div>
    );

    return (
        // Drawer que contiene el formulario para agregar un nuevo contacto
        <Drawer title={TitleWithButtons} placement='right' width={720} onClose={onClose} open={open}>
            <div style={{ paddingBottom: 80, paddingTop: 64 }}>
                <Form layout='vertical' form={form} onFinish={handleSubmit} requiredMark='optional'>
                    <Form.Item
                        name='photo'
                        label='URL imagen de Perfil'
                        rules={[{ required: true, message: 'Por favor ingrese la URL de la imagen de perfil' }]}
                    >
                        <Input placeholder='Ingrese la URL de la imagen de perfil' />
                    </Form.Item>
                    <Form.Item name='name' label='Nombre' rules={[{ required: true, message: 'Por favor ingrese el nombre del contacto' }]}>
                        <Input placeholder='Ingrese el nombre del contacto' />
                    </Form.Item>
                    <Form.Item name='description' label='Descripción' rules={[{ required: true, message: 'Por favor ingrese la descripción del contacto' }]}>
                        <Input.TextArea rows={4} placeholder='Ingrese la descripción del contacto' />
                    </Form.Item>
                </Form>
            </div>
        </Drawer>
    );
};

export default AddUserDrawer;
