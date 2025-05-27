import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/pinMap.css";
import Header from "../components/Header.jsx";

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function MapWithPins() {
    const navigate = useNavigate();
    const location = useLocation();
    const trips = location.state?.trips || [];

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
                        style={{ height: "40vh", width: "50vw", minWidth: 320 }}
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
