const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/moon-sign", async (req, res) => {
  try {
    const now = new Date();
    const payload = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate(),
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      latitude: 40.7,
      longitude: -74.0,
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

    // Log the status and response text for debugging
    const text = await response.text();
    console.log("API status:", response.status);
    console.log("API response:", text);

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = JSON.parse(text);
    const moon = data.output?.find((obj) => obj.planet.en === "Moon");
    res.json({ moonSign: moon?.zodiac_sign?.name?.en || "Unknown" });
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: "Failed to fetch moon sign" });
  }
});

module.exports = router;
