import React, { useState, useEffect } from "react";
import WifiIcon from "./WifiIcon.jsx";

function OnlineStatus() {
    // State to track online status
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const goOnline = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);
        window.addEventListener("online", goOnline);
        window.addEventListener("offline", goOffline);
        return () => {
            window.removeEventListener("online", goOnline);
            window.removeEventListener("offline", goOffline);
        };
    }, []);

    return (
        <div className={`online-status ${isOnline ? "online" : "offline"}`}>
            <WifiIcon color={isOnline ? "#84ff6d" : "#ff0000"} />
            <span className="hover-text">
                {isOnline ? "Online" : "Offline"}
            </span>
        </div>
    );
}

export default OnlineStatus;
