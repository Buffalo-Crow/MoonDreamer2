export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1️⃣ Default location
    const location = "New York, NY";
    const date = new Date().toISOString().split("T")[0]; // today

    console.log("Fetching moon sign for:", location, "on date:", date);

    // 2️⃣ Geocode to lat/lon
    const geoRes = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        location
      )}&key=${process.env.OPENCAGE_API_KEY}`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return res.status(400).json({ error: "Could not resolve location" });
    }

    const { lat, lng } = geoData.results[0].geometry;
    console.log("Resolved coordinates:", lat, lng);

    // 3️⃣ Build payload like the working /western/planets endpoint
    const [year, month, day] = date.split("-").map(Number);
    const payload = {
      year,
      month,
      date: day,
      hours: 12, // noon default
      minutes: 0,
      seconds: 0,
      latitude: lat,
      longitude: lng,
      timezone: -4, // Eastern Time
      config: {
        observation_point: "topocentric",
        ayanamsha: "tropical",
        language: "en",
      },
    };

    // 4️⃣ Call astrology API
    const astroRes = await fetch(
      "https://json.freeastrologyapi.com/western/planets",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY,
        },
        body: JSON.stringify(payload),
      }
    );

    const text = await astroRes.text();

    if (!text) {
      console.error("Astrology API response is empty");
      return res.status(502).json({ error: "Astrology API response is empty" });
    }

    const data = JSON.parse(text);

    // 5️⃣ Extract Moon sign
    const moon = data.output?.find((obj) => obj.planet.en === "Moon");
    const moonSign = moon?.zodiac_sign?.name?.en || "Unknown";

    console.log("Moon sign:", moonSign);

    res.status(200).json({ moonSign });
  } catch (err) {
    console.error("Moon sign route error:", err);
    res.status(500).json({ error: "Failed to fetch moon sign" });
  }
}
