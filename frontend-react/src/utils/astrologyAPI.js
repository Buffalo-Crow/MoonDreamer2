export async function fetchDreamMoonSign({ date, lat, lng }) {
  const response = await fetch("/api/moon-sign/dream", {
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
