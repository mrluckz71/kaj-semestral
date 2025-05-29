import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import './App.css';
import './css/layout.css';
import './css/login.css';
import './css/addTrip.css';
import './css/welcome.css';
import './css/globe.css';
import './css/recommended.css'
import './css/tripDetail.css';

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
