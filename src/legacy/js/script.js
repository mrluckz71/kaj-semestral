// Initialize map
var map = L.map("map").setView([20, 0], 2); // Default world view

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Load existing trips from LocalStorage
document.addEventListener("DOMContentLoaded", loadTrips);

// Add a trip
function addTrip() {
    const title = document.getElementById("trip-title").value;
    const description = document.getElementById("trip-description").value;
    const location = document.getElementById("trip-location").value;
    const photoInput = document.getElementById("trip-photo");
    const photoFile = photoInput.files[0];

    if (!title || !location) {
        alert("Please enter a title and location!");
        return;
    }

    // Read photo file
    const reader = new FileReader();
    reader.onload = function(event) {
        const photoURL = event.target.result;

        // Fetch coordinates using OpenStreetMap's API
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    alert("Location not found!");
                    return;
                }

                const lat = data[0].lat;
                const lon = data[0].lon;

                // Save trip to LocalStorage
                const trip = { title, description, photoURL, lat, lon };
                let trips = JSON.parse(localStorage.getItem("trips")) || [];
                trips.push(trip);
                localStorage.setItem("trips", JSON.stringify(trips));

                // Update UI
                displayTrip(trip);
                addMarker(trip);
            });
    };

    if (photoFile) {
        reader.readAsDataURL(photoFile);
    } else {
        reader.onload({ target: { result: "" } });
    }

    // Clear inputs
    document.getElementById("trip-title").value = "";
    document.getElementById("trip-description").value = "";
    document.getElementById("trip-location").value = "";
    photoInput.value = "";
}

// Load trips from LocalStorage
function loadTrips() {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.forEach(trip => {
        displayTrip(trip);
        addMarker(trip);
    });
}

// Display a trip in the list
function displayTrip(trip) {
    const tripList = document.getElementById("trip-list");
    const li = document.createElement("li");
    li.classList.add("trip-item");

    li.innerHTML = `
        <h3>${trip.title}</h3>
        <p>${trip.description}</p>
        ${trip.photoURL ? `<img src="${trip.photoURL}" alt="${trip.title}">` : ""}
        <p><strong>Location:</strong> ${trip.lat}, ${trip.lon}</p>
    `;

    tripList.appendChild(li);
}

// Add marker to map
function addMarker(trip) {
    L.marker([trip.lat, trip.lon])
        .addTo(map)
        .bindPopup(`<b>${trip.title}</b><br>${trip.description}`)
        .openPopup();
}
