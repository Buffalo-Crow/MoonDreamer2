export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { date, time = "23:00:00", latitude, longitude } = req.body;
    console.log("📥 /moon-sign-dream request:", {
      date,
      time,
      latitude,
      longitude,
    });

    if (!date || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [hours, minutes, seconds] = time.split(":").map(Number);
    const dateObj = new Date(date);

    const payload = {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth() + 1,
      date: dateObj.getDate(),
      hours,
      minutes,
      seconds,
      latitude,
      longitude,
      timezone: -4,
      config: {
        observation_point: "topocentric",
        ayanamsha: "tropical",
        language: "en",
      },
    };

    const response = await fetch(
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

    const text = await response.text();
    if (!response.ok) {
      console.error("API error:", response.status, text);
      return res.status(500).json({ error: "External API failed" });
    }

    const data = JSON.parse(text);
    const moon = data.output?.find((obj) => obj.planet.en === "Moon");
    const moonSign = moon?.zodiac_sign?.name?.en || "Unknown";

    res.status(200).json({ moonSign });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
