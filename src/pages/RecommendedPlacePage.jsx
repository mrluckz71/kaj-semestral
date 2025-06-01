import React, {useEffect, useRef, useState} from "react";
import Header from "../components/Header.jsx";

const places = [
    {
        name: "Paris, France",
        videoSrc: "https://res.cloudinary.com/dl0fmiofb/video/upload/v1748523330/paris_eecnuy.mp4",
    },
    {
        name: "Tokyo, Japan",
        videoSrc: "https://res.cloudinary.com/dl0fmiofb/video/upload/v1748523333/tokyo_iyvtdg.mp4",
    },
    {
        name: "New York City, USA",
        videoSrc: "https://res.cloudinary.com/dl0fmiofb/video/upload/v1748523354/newyork_alv8hy.mp4",
    },
];

function RecommendedPlacesPage() {
    // Create an array of refs, one for each place
    const videoRefs = useRef([]);
    const [volumes, setVolumes] = useState([1, 1, 1]); // default volumes
    const [isPlaying, setIsPlaying] = useState(Array(places.length).fill(false));

    const handlePlay = (idx) => {
        const video = videoRefs.current[idx];
        if (video) video.play();
    };

    const handlePause = (idx) => {
        const video = videoRefs.current[idx];
        if (video) video.pause();
    };

    // Set up event listeners for play, pause, and ended events
    useEffect(() => {
        const cleanups = places.map((_, idx) => {
            const video = videoRefs.current[idx];
            if (video) {
                const handlePlay = () => setIsPlaying(prev => {
                    const next = [...prev];
                    next[idx] = true;
                    return next;
                });
                const handlePause = () => setIsPlaying(prev => {
                    const next = [...prev];
                    next[idx] = false;
                    return next;
                });
                video.addEventListener('play', handlePlay);
                video.addEventListener('pause', handlePause);
                video.addEventListener('ended', handlePause);
                return () => {
                    video.removeEventListener('play', handlePlay);
                    video.removeEventListener('pause', handlePause);
                    video.removeEventListener('ended', handlePause);
                };
            }
            return () => {};
        });
        return () => cleanups.forEach(fn => fn());
    }, []);

    // Function to handle volume change
    const handleSetVolume = (idx, value) => {
        const newVolumes = [...volumes];
        newVolumes[idx] = parseFloat(value);
        setVolumes(newVolumes);

        if (videoRefs.current[idx]) {
            videoRefs.current[idx].volume = value;
        }
    };

    // Function to handle click on video
    const handleVideoClick = (idx) => {
        const video = videoRefs.current[idx];
        if (video) {
            if (isPlaying[idx]) {
                video.pause();
            } else {
                video.play();
            }
        }
    }

    return (
        <>
            <Header />
            <div className="recommended-place-page">
                <h1>Recommended Places</h1>
                <div className="recommended-places-list">
                    <ul>
                        {places.map((place, idx) => (
                            <li key={place.name}>
                                <h2>{place.name}</h2>
                                <video
                                    ref={el => videoRefs.current[idx] = el}
                                    className="recommended-video"
                                    style={{
                                        borderRadius: "12px",
                                        width: "90%",
                                        height: "auto",
                                        display: "block",
                                        background: "black",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {handleVideoClick(idx)}}
                                >
                                    <source src={place.videoSrc} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="video-controls" style={{ position: "relative" }}>
                                    {isPlaying[idx] ? (
                                        <button onClick={() => handlePause(idx)}>
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="black"/>
                                            </svg>
                                        </button>
                                    ) : (
                                        <button onClick={() => handlePlay(idx)}>
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                <path d="M8 5v14l11-7L8 5z" fill="black"/>
                                            </svg>
                                        </button>
                                    )}



                                    {/* Volume SVG */}
                                    <VolumeTriangle volume={volumes[idx]} idx={idx} />
                                    {/* Volume slider */}
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volumes[idx]}
                                        onChange={e => handleSetVolume(idx, e.target.value)}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

// VolumeTriangle component to display volume as a triangle
function VolumeTriangle({ volume, idx }) {
    // Clamp volume between 0 and 1
    volume = Math.max(0, Math.min(1, volume));
    const fill = volume === 0 ? "#bbb" : "#000000";
    const width = 50;
    const height = 20;
    const visibleWidth = Math.max(0, 2 + (volume * (50 - 2)));


    // Unique clipPath id for each instance
    const clipId = `clip-${idx}`;

    return (
        <svg width={width} height={height} viewBox="0 0 52 22">
            <defs>
                <clipPath id={clipId}>
                    <rect x="2" y="2" width={visibleWidth - 2} height="18" />
                </clipPath>
            </defs>
            <polygon
                points="50,2 50,20 2,20"
                fill={fill}
                clipPath={`url(#${clipId})`}
            />
        </svg>
    );
}


export default RecommendedPlacesPage;