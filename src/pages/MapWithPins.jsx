import React from "react";
import {MapContainer, TileLayer, Marker, Popup, Tooltip} from "react-leaflet";
import {useLocation, useNavigate} from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function MapWithPins() {
    const navigate = useNavigate();
    const location = useLocation();
    const trips = location.state?.trips || [];

    if (trips){
        console.log("Trips data:", trips);
    }

    return (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {trips.map((trip) =>
                trip.lat && trip.lng ? (
                    <Marker
                        key={trip.id}
                        position={[trip.lat, trip.lng]}
                        icon={markerIcon}
                        eventHandlers={{
                            click: () => navigate(`/travel/${trip.id}`)
                        }}
                    >
                        {/* Shows the trips location on hover*/}
                        <Tooltip>{trip.location}</Tooltip>

                        {/* Redirects to trip detail page on click*/}
                        <Popup>
                            <strong>{trip.title || trip.location}</strong>
                            <br />
                            {trip.description}
                            <br />
                            <button
                                style={{
                                    marginTop: "8px",
                                    padding: "4px 12px",
                                    borderRadius: "6px",
                                    border: "none",
                                    background: "#3498db",
                                    color: "#fff",
                                    cursor: "pointer"
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
    );
}

export default MapWithPins;