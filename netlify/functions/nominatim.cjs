const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const q = event.queryStringParameters.q;
    if (!q) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing query" })
        };
    }

    try {
        const response = await fetch (
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`,
            { headers: { "User-Agent": "YourAppName" } }
        );
        const data = await response.json();
        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(data)
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Fetch failed" })
        };
    }
};