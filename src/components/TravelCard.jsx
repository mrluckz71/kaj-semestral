import React from "react";
import imageSrc from "../assets/image.jpg";

function TravelCard({ location, description, image }) {
    // Default image if none is provided
    const defaultImage = "./src/assets/image.jpg";
    return (
        <div className="travel-card">
            <img src={defaultImage} alt="Travel Destination" />
            <h2>Travel Destination</h2>
            <p>Location: {location}</p>
            <p>Description: {description}</p>
            <button>View Details</button>
        </div>
    );
}

export default TravelCard;