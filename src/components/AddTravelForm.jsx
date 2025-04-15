import React from "react";

function AddTravelForm(){
    return (
        <div>
            <form>
                <h1>🌍 Add a Trip</h1>
                <label>
                    <input type="text" id="trip-title" placeholder="Trip Title" required/>
                </label>
                <label>
                    <textarea id="trip-description" placeholder="Describe your trip"></textarea>
                </label>
                <div id="dropzone" className="dropzone">
                    Drag and drop a photo here or click to upload
                </div>
                <img id="preview" alt="Photo preview"/>
                <label>
                    <input type="text" id="trip-location" placeholder="Enter Location"/>
                </label>
                <button onClick="addTrip()">Add Trip</button>
            </form>
        </div>
    )
}

export default AddTravelForm;