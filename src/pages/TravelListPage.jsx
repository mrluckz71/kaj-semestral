import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import TravelCard from '../components/TravelCard';



// const markerIcon = new L.Icon({
//     iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
// });


function TravelList() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Logged in user:", user.uid);
                setUser(user.uid);
            } else {
                setUser(null);
            }
        });

        // Clean up the listener on unmount:
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!userId) {
            setTrips([]);        // Optionally clear trips when user logs out
            setLoading(false);   // Stop loading if no user
            return;
        }
            async function fetchTrips() {
                try {
                        // Try fetching all trips (no filter)
                        const snapshot = await getDocs(
                            query(collection(db, "trips"),
                            where("userId", "==", userId)
                        )
                        );
                        console.log("fetched trips for user:", userId);
                        console.log('Snapshot:', snapshot);
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
                        trips.sort((a, b) => b.createdAt - a.createdAt);
                        // Log the fetched trips
                        console.log('Fetched trips:', trips);
                        setTrips(trips);
                } catch (err) {
                    console.error("Error fetching trips:", err);
                } finally {
                    setLoading(false);
                }
            }
            fetchTrips();
        }, [userId]);


        return (
        <>
            <Header />
                <div className="travel_list_container">
                    {/*<h4>Map of travel destinations</h4>*/}
                    {/*<div className="map" style={{ height: "400px", width: "100%", marginBottom: "2rem" }}>*/}
                    {/*    {!loading && (*/}
                    {/*        <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>*/}
                    {/*            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />*/}
                    {/*            {trips.map((trip) =>*/}
                    {/*                trip.lat && trip.lng ? (*/}
                    {/*                    <Marker*/}
                    {/*                        key={trip.id}*/}
                    {/*                        position={[trip.lat, trip.lng]}*/}
                    {/*                        icon={markerIcon}*/}
                    {/*                    >*/}
                    {/*                        <Popup>*/}
                    {/*                            <strong>{trip.title || trip.location}</strong><br />*/}
                    {/*                            {trip.description}*/}
                    {/*                        </Popup>*/}
                    {/*                    </Marker>*/}
                    {/*                ) : null*/}
                    {/*            )}*/}
                    {/*        </MapContainer>*/}
                    {/*    )}*/}

                    {/*</div>*/}
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        trips.length === 0 ? (
                            <p style={{ textAlign: "center", color: "#888", marginTop: "2rem" }}>
                                No trips to show.
                            </p>
                        ) : (
                            <ul className="travel_list">
                                {trips.map(trip => (
                                    <li key={trip.id}>
                                        <TravelCard
                                            location={trip.location}
                                            description={trip.description}
                                            image={trip.image}
                                            uniqueId={trip.id}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )
                    )}
                </div>
            <Footer />
        </>
    );
}
export default TravelList;