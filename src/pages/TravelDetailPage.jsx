import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import GoBackToMain from "../components/GoBackToMain.jsx";

function TravelDetailPage() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [error, setError] = useState('Loading trip details...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const tripRef = doc(db, 'trips', id);
                const tripSnap = await getDoc(tripRef);

                if (tripSnap.exists()) {
                    setLoading(false);
                    setTrip(tripSnap.data());
                } else {
                    setError('No such trip found');

                }
            } catch (err) {
                setError(`Error fetching trip: ${err.message}`);
            }
        };

        fetchTrip();
    }, [id]);

    if (loading) {
        return (
            <div className="travel-detail-container">
                <p>{error || "Loading..."}</p>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="travel-detail-container">
                <p>{error || "Trip not found."}</p>
            </div>
        );
    }

    return (
        <div className="travel-detail-container">
            <GoBackToMain />
            <div className="travel-detail-card">
                <h1>{trip.title}</h1>
                <p>{trip.description}</p>
                {trip.image && (
                    <img
                        className="travel-detail-image"
                        src={trip.image}
                        alt={trip.title}
                    />
                )}
                <p>Location: {trip.lat}, {trip.lng}</p>
                <p>
                    Created at:{" "}
                    {trip.createdAt
                        ? new Date(
                            typeof trip.createdAt.toDate === "function"
                                ? trip.createdAt.toDate()
                                : trip.createdAt
                        ).toLocaleDateString()
                        : "Unknown"}
                </p>
            </div>
        </div>
    );

}

export default TravelDetailPage;
