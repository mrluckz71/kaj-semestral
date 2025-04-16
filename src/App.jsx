import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import React from 'react';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Header />
                <AppRoutes />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
