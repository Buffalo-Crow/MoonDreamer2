export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const location = req.query.location;
  if (!location) {
    return res.status(400).json({ error: "Missing location query" });
  }

  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        location
      )}&key=${process.env.OPENCAGE_API_KEY}`
    );

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return res
        .status(404)
        .json({ error: "No coordinates found for that location." });
    }

    const { lat, lng } = data.results[0].geometry;
    res.status(200).json({ latitude: lat, longitude: lng });
  } catch (err) {
    console.error("Geocode error:", err);
    res.status(500).json({ error: "Failed to fetch coordinates" });
  }
}
