import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function AddTravel() {
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = document.getElementById("trip-title").value;
        const description = document.getElementById("trip-description").value;
        const location = document.getElementById("trip-location").value;

        if (!title || !location) {
            alert("Vyplňte název a místo!");
            return;
        }

        try {
            // Získání souřadnic z OSM
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
            const data = await response.json();

            if (data.length === 0) {
                alert("Location not found!");
                return;
            }
            console.log(data);
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);

            await addDoc(collection(db, "trips"), {
                title,
                description,
                location,
                lat,
                lng: lon,
                image: image || "",
                userId: auth.currentUser?.uid || "anonymous",
                createdAt: new Date()
            });

            navigate("/travels");
        } catch (error) {
            console.error("Error adding trip:", error);
            alert("Failed to add trip.");
        }
    };

    const handleImageDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer?.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    return (
        <>
            <div className="container-addTrip-container">
                <div className="addTrip-container">
                    <form className="addTrip" id="add-travel-form" onSubmit={handleSubmit}>
                        <h1>🌍 Add a Trip</h1>
                        <label className="title">
                            <input type="text" id="trip-title" placeholder="Trip Title" required />
                        </label>
                        <label className="description">
                            <textarea id="trip-description" placeholder="Describe your trip"></textarea>
                        </label>
                        <div
                            id="dropzone"
                            className="dropzone"
                            onDrop={handleImageDrop}
                            onDragOver={handleDragOver}
                            onClick={() => document.getElementById("file-input").click()}
                        >
                            Drag and drop a photo here or click to upload
                            <input
                                type="file"
                                id="file-input"
                                accept="image/*"
                                hidden
                                onChange={handleFileSelect}
                            />
                        </div>
                        {image && (
                            <div className="image-preview">
                                <div className="image-wrapper">
                                    <img id="preview" src={image} alt="Photo preview" />
                                    <button
                                        type="button"
                                        className="remove-image"
                                        onClick={() => {
                                            setImage("");
                                            document.getElementById("file-input").value = null;
                                        }}
                                        aria-label="Remove image"
                                    >
                                        ✖
                                    </button>
                                </div>
                            </div>
                        )}
                        <label className="location">
                            <input type="text" id="trip-location" placeholder="Enter Location" required />
                        </label>
                        <button type="submit">Add Trip</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddTravel;