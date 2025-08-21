export async function getCoordinates(location) {
  const response =  await fetch(`/api/geocode?location=${encodeURIComponent(location)}`);

  if (!response.ok) throw new Error("Failed to get coordinates.");
  const data = await response.json();
  return {
    lat: data.latitude,
    lng: data.longitude,
  };
}