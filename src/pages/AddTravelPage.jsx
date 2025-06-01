import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate} from "react-router-dom";
import GoBackToMain from "../components/GoBackToMain.jsx";
import LocationWhisper from "../components/LocationWhisper.jsx";

// Add Travel Page
function AddTravel() {
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [location, setLocation] = useState("");
    const [locationData, setLocationData] = useState(null);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = document.getElementById("trip-title").value;
        const description = document.getElementById("trip-description").value;


        if (!title || !description || !image) {
            alert("Fill out all fields!");
            return;
        }
        // Location data
        let lat = locationData?.lat ?? null;
        let lon = locationData?.lon ?? null;
        let pendingGeolocation = false;

        if (lat === null || lon === null) {
            // If location is not provided, try to geocode it
            if (navigator.onLine) {
                const response = await fetch(`/nominatim/search?format=json&q=${location}&accept-language=en`);
                const data = await response.json();
                if (data.length > 0) {
                    lat = parseFloat(data[0].lat);
                    lon = parseFloat(data[0].lon);
                } else {
                    alert("Location not found!");
                    return;
                }
            } else {
                pendingGeolocation = true;
            }
        }
        // Save the trip to Firestore
        await addDoc(collection(db, "trips"), {
            title,
            description,
            lat,
            lng: lon,
            pendingGeolocation,
            image: image || "",
            userId: auth.currentUser?.uid || "anonymous",
            createdAt: new Date()
        });

        console.log("Trip added successfully!");
        // Navigate to the travels page after submission
        navigate("/travels");
    }

    // Handle image drop and file selection
    const handleImageDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer?.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please drop a valid image file.");
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
        } else {
            alert("Please select a valid image file.");
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    // TODO: Add a function to handle storing form data in localStorage
    // const handleStoring = (e) => {
    //     const { id, value } = e.target;
    //     if (id === "trip-title" || id === "trip-description" || id === "trip-location") {
    //         localStorage.setItem(id, value);
    //     }
    // };

    // Load stored data from localStorage when the component mounts
    // useEffect(() => {
    //     const title = localStorage.getItem("trip-title") || "";
    //     const description = localStorage.getItem("trip-description") || "";
    //
    //     document.getElementById("trip-title").value = title;
    //     document.getElementById("trip-description").value = description;
    // }, []);



    return (
        <>
            <div className="container-addTrip-container">
                <GoBackToMain />
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
                        <LocationWhisper
                            value={location}
                            onChange={val => setLocation(val)}
                            onSelect={place => {
                                setLocation(place.location);
                                setLocationData({
                                    lat: parseFloat(place.lat),
                                    lon: parseFloat(place.lon),
                                });
                            }}
                        />

                        <button type="submit">Add Trip</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddTravel;