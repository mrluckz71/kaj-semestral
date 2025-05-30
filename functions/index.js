const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.nominatimProxy = functions.https.onRequest(async (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing query" });

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`,
            {
                headers: {
                    "User-Agent": "YourAppName"
                }
            }
        );
        const data = await response.json();
        res.set("Access-Control-Allow-Origin", "*");
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fetch failed" });
    }
});
