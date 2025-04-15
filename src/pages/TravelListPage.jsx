import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

function TravelList() {
    return (
        <div>
            <Header />
            <h2>Travel Destinations</h2>
            <ul>
                <li>Paris</li>
                <li>New York</li>
                <li>Tokyo</li>
                <li>Sydney</li>
            </ul>
            <Footer />
        </div>
    );
}
export default TravelList;