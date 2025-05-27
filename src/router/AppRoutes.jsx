import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import AddTravel from '../pages/AddTravelPage.jsx';
import TravelListPage from '../pages/TravelListPage';
import ForgotPassword from '../pages/ForgotPassword';
import Welcome from '../pages/Welcome.jsx';
import TravelDetailPage from '../pages/TravelDetailPage.jsx';
import MapWithPins from "../pages/MapWithPins.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-travel" element={<AddTravel />} />
            <Route path="/travels" element={<TravelListPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/travel/:id" element={<TravelDetailPage />} />
            <Route path="/map" element={<MapWithPins />} />
        </Routes>
    );
}

export default AppRoutes;

