import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import AddTravel from '../pages/AddTravelPage.jsx';
import TravelListPage from '../pages/TravelListPage';
import ForgotPassword from '../pages/ForgotPassword';
import Welcome from '../pages/Welcome.jsx';
import TravelDetailPage from '../pages/TravelDetailPage.jsx';
import MapWithPins from "../pages/MapWithPins.jsx";
import PrivacyPage from "../pages/PrivacyPage.jsx";
import TermsPage from "../pages/TermsPage.jsx";
import RecommendedPlacePage from "../pages/RecommendedPlacePage.jsx";

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
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/recommended" element={<RecommendedPlacePage />} />
        </Routes>
    );
}

export default AppRoutes;

