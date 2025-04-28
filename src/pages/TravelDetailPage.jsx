import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';

function TravelDetailPage() {
    const { id } = useParams(); // ✨ get trip ID from the URL
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const tripRef = doc(db, 'trips', id);
                const tripSnap = await getDoc(tripRef);

                if (tripSnap.exists()) {
                    setTrip(tripSnap.data());
                } else {
                    console.log('No such trip!');
                }
            } catch (err) {
                console.error('Failed to fetch trip', err);
            }
        };

        fetchTrip();
    }, [id]);

    if (!trip) return <p>Loading trip details...</p>;

    return (
        <div>
            <h1>{trip.title}</h1>
            <p><strong>Location:</strong> {trip.location}</p>
            <p><strong>Description:</strong> {trip.description}</p>
            {/*{trip.image && <img src={trip.image} alt={trip.title} />}*/}
        </div>
    );
}

export default TravelDetailPage;
