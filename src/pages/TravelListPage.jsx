import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import TravelCard from '../components/TravelCard';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';


// const markerIcon = new L.Icon({
//     iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
// });


function TravelList() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadTrips = async () => {
            const user = auth.currentUser;
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const tripsRef = collection(db, "trips");
                const q = query(tripsRef, where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);

                const loadedTrips = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setTrips(loadedTrips);
                console.log("Trips loaded:", loadedTrips);
            } catch (error) {
                console.error("Error loading trips:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTrips();
    }, []);

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
                    <ul className="travel_list">
                            {/*<li><TravelCard location='Paris' description='Lovely place' image='./src/assets/image.jpg' uniqueId='1'/></li>*/}
                            {/*<li><TravelCard location='Paris' description='Lovely place' image='./src/assets/image.jpg' uniqueId='2'/></li>*/}
                            {/*<li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' uniqueId='3'/></li>*/}
                            {/*<li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' uniqueId='4'/></li>*/}
                            {/*<li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' uniqueId='5'/></li>*/}

                            {trips.map(trip => (
                                <li>
                                    <TravelCard location={trip.location} description={trip.description} image={trip.image} uniqueId={trip.id} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            <Footer />
        </>
    );
}
export default TravelList;