import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddUserPage from './pages/AddUserPage';
import { Layout } from 'antd';

const App: React.FC = () => {
    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/add-user' element={<AddUserPage />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
