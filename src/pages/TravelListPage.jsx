import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import TravelCard from '../components/TravelCard';


function TravelList() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const loadTrips = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const tripsRef = collection(db, "trips");
            const q = query(tripsRef, where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);

            const loadedTrips = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setTrips(loadedTrips);
        };

        loadTrips()
    }, []);

    return (
        <>
            <Header />
                <h2>Travel Destinations</h2>
                    <ul className="travel_list">
                        <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                        <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                        <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                        <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                        <li><TravelCard location='Paris' description='Lovely place' image='./assets/image.jpg' /></li>
                        {trips.map(trip => (
                            <li>
                                <TravelCard location={trip.location} description={trip.description} image={trip.image} uniqueId={trip.id} />
                            </li>
                        ))}
                    </ul>
            <Footer />
        </>
    );
}
export default TravelList;