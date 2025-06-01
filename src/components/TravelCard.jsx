import React from "react";
import { Link } from "react-router-dom";

function TravelCard({ location, description, image, uniqueId }) {

    // Slice the description to a maximum of 20 characters
    const shortDescription = description.length > 20 ? description.slice(0, 20) + "..." : description;

    return (
        <Link to={`/travel/${uniqueId}`} className="flip-card-link">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={image} alt={location} />
                        <h3>{location}</h3>
                    </div>
                    <div className="flip-card-back">
                        <h3>About {location}</h3>
                        <p>{shortDescription}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default TravelCard;
