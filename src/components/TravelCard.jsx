import React from "react";
import imageSrc from "../assets/image.jpg";

function TravelCard({ location, description, image }) {
    return (
        <div className="travel-card" style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", borderRadius: "5px"}}>
            <img src={imageSrc} alt="Travel Destination" />
            <h2>Travel Destination</h2>
            <p>Location: {location}</p>
            <p>Description: {description}</p>
            <button>View Details</button>
        </div>
    );
}

export default TravelCard;