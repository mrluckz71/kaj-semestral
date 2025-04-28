import React from "react";
import {Link} from "react-router-dom";

function TravelCard({ location, description, image, uniqueId }) {
    // Default image if none is provided
    const defaultImage = "./src/assets/image.jpg";
    return (
        <>
            <Link className="travel-card-details" to={`/travel/${uniqueId}`}>
                <div className="travel-card">
                    <img src={defaultImage} alt="Travel Destination" />
                    <p>Location: {location}</p>
                    <p>Description: {description}</p>
                </div>
            </Link>
        </>
    );
}

export default TravelCard;