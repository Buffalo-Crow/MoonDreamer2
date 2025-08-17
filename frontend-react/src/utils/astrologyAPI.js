export async function fetchDreamMoonSign({ date, lat, lng }) {
  const response = await fetch("http://localhost:3001/api/moon-sign/dream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date,
      latitude: lat,
      longitude: lng,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch moon sign.");
  }
  const data = await response.json();
  return data.moonSign;
}

export async function fetchBirthMoonSign({ date, timeOfBirth, lat, lng }) {
  const response = await fetch("http://localhost:3001/api/moon-sign/birth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date,
      time: timeOfBirth,
      latitude: lat,
      longitude: lng,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch birth moon sign.");
  }

  const data = await response.json();
  return data.moonSign;
}