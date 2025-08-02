import { getCoordinates } from "./geocodeAPI";
import { fetchMoonSign } from "./astrologyAPI";

export async function getMoonSignFromLocationAndDate(location, date) {
  const { lat, lng } = await getCoordinates(location);
  const moonSign = await fetchMoonSign({date, lat, lng});
  return moonSign;
}
