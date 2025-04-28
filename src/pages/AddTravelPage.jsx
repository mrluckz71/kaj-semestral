import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import React from "react";

function AddTravel() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById("trip-title").value;
        const description = document.getElementById("trip-description").value;
        const location = document.getElementById("trip-location").value;
        const image = document.getElementById("preview").src;


        // Here you would typically send the data to your server or API
        console.log({ title, description, location, image });
    };
    return (
        <div className="container">
            <div className="addTrip-container">
                <form className="addTrip" id="add-travel-form">
                    <h1>🌍 Add a Trip</h1>
                    <label className="title">
                        <input type="text" id="trip-title" placeholder="Trip Title" required/>
                    </label>
                    <label className="description">
                        <textarea id="trip-description" placeholder="Describe your trip"></textarea>
                    </label>
                    <div id="dropzone" className="dropzone">
                        Drag and drop a photo here or click to upload
                    </div>
                    <img id="preview" alt="Photo preview"/>
                    <label className="location">
                        <input type="text" id="trip-location" placeholder="Enter Location"/>
                    </label>
                    <button type="submit" onClick={handleSubmit}>Add Trip</button>
                </form>
            </div>
        </div>
    );
}

export default AddTravel;