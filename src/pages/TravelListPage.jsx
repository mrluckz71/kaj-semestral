import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import TravelCard from "../components/TravelCard";
import "../css/travels.css";


function TravelList() {
    return (
        <>
        <Header />
            <h2>Travel Destinations</h2>
                <ul className="travel_list">
                    <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                    <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                    <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                    <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                    <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                </ul>
        <Footer />
        </>
    );
}
export default TravelList;