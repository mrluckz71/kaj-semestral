import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import './css/layout.css';
import './css/login.css';
import './css/travels.css';
import './css/addTrip.css';
import './css/welcome.css';
import './css/globe.css';


function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
