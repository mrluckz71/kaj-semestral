import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import TravelCard from '../components/TravelCard';


function TravelList() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUser] = useState(null);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

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
            setTrips([]);
            setLoading(false);
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
                                    fetch(`${API_URL}?q=${trip.location}&accept-language=en`)
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
                        // Sort the trips by createdAt in descending order
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
        }, [API_URL, userId]);


        return (
        <>
            <Header />
                <div className="travel_list_container">
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
                                            location={trip.title}
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