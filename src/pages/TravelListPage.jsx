import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import TravelCard from "../components/TravelCard";
import "../App.css";

function TravelList() {
    return (
        <div style={{ width: "100%", padding: "20px", backgroundColor: "#f0f0f0", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
            <Header />
            <h2>Travel Destinations</h2>
            <ul style={{ listStyleType: "none", display: "flex", flexWrap: "wrap", padding: 0, alignContent: "center" }}>
                <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
            </ul>
            <Footer />
        </div>
    );
}
export default TravelList;