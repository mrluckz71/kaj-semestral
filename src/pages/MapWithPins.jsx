import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/pinMap.css";
import Header from "../components/Header.jsx";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase.js";

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function MapWithPins() {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        async function fetchTrips() {
            try {
                const snapshot = await getDocs(collection(db, "trips"));
                const trips = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
                if (navigator.onLine) {
                    trips.forEach(trip => {
                        if (trip.pendingGeolocation) {
                            // If the trip has pending geolocation, fetch it
                            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(trip.location)}`)
                                .then(response => response.json())
                                .then(data => {
                                    if (data.length > 0) {
                                        trip.lat = parseFloat(data[0].lat);
                                        trip.lng = parseFloat(data[0].lon);
                                        trip.pendingGeolocation = false;
                                    }
                                })
                                .catch(err => console.error("Error fetching geolocation:", err));
                        }
                    })
                }
                // Log the fetched trips
                console.log('Fetched trips:', trips);
                setTrips(trips);
            } catch (err) {
                console.error("Error fetching trips:", err);
            }
        }
        fetchTrips();
    }, []);

    return (
        <div className="map-page">
            <Header />
                <div className="map-page-container">
                    <div className="map-header">
                        🌍 Your Travel Map
                    </div>
                    <MapContainer
                        center={[20, 0]}
                        zoom={2}
                        style={{ height: "50vh", width: "60vw" }}
                        className="leaflet-container"
                        worldCopyJump={true}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {trips.map((trip) =>
                            trip.lat && trip.lng ? (
                                <Marker
                                    key={trip.id}
                                    position={[trip.lat, trip.lng]}
                                    icon={markerIcon}
                                    eventHandlers={{
                                        click: () => navigate(`/travel/${trip.id}`),
                                    }}
                                >
                                    <Tooltip>{trip.location}</Tooltip>
                                    <Popup className="custom-popup">
                                        <strong style={{ color: "#1976d2", fontSize: "1.1em" }}>
                                            {trip.title || trip.location}
                                        </strong>
                                        <br />
                                        <span style={{ color: "#555" }}>{trip.description}</span>
                                        <br />
                                        <button
                                            style={{
                                                marginTop: "10px",
                                                padding: "5px 15px",
                                                borderRadius: "8px",
                                                border: "none",
                                                background: "#1976d2",
                                                color: "#fff",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                                transition: "background 0.2s",
                                            }}
                                            onClick={() => navigate(`/travel/${trip.id}`)}
                                        >
                                            View Details
                                        </button>
                                    </Popup>
                                </Marker>
                            ) : null
                        )}
                    </MapContainer>
                    <div style={{ marginTop: 18, fontSize: "1.1rem", color: "#555" }}>
                        <span role="img" aria-label="hint">💡</span> Click a pin to GO to the travel details.
                    </div>
                </div>
        </div>
    );
}

export default MapWithPins;
