import React, { useState, useRef } from "react";

function LocationWhisper({ onSelect }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debounceTimeout = useRef(null);
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    // Fetch location suggestions from Nominatim
    const fetchSuggestions = (q) => {
        fetch(`${API_URL}?q=${q}&accept-language=en`)
        .then(res => res.json())
            .then(data => {
                setSuggestions(data);
                setShowSuggestions(true);
            })
            .catch(err => {
                console.error("Error fetching suggestions:", err);
                setSuggestions([]);
                setShowSuggestions(false);
            });
    };

    // Handle input with debounce
    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        clearTimeout(debounceTimeout.current);
        if (value.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        debounceTimeout.current = setTimeout(() => fetchSuggestions(value), 300);
    };

    // Handle suggestion click
    const handleSelect = (suggestion) => {
        setQuery(suggestion.display_name);
        setShowSuggestions(false);
        if (onSelect) onSelect(suggestion);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Type location..."
                style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
                onFocus={() => query.length > 1 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} // Delay to allow click
            />
            {showSuggestions && suggestions.length > 0 && (
                <div className="location-suggestions-container">
                    <ul className="location-suggestions">
                        {suggestions.slice(0, 8).map(suggestion => (
                            <li
                                key={suggestion.place_id}
                                style={{
                                    padding: "0.7rem 1rem",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #eee"
                                }}
                                onMouseDown={() => handleSelect(suggestion)}
                            >
                                {suggestion.display_name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default LocationWhisper;
