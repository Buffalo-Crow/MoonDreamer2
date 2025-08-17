import { getCoordinates } from "./geocodeAPI";
import { fetchDreamMoonSign } from "./astrologyAPI";


export async function getMoonSignFromLocationAndDate(location, date) {
  const { lat, lng } = await getCoordinates(location);
  console.log({ date, lat, lng });
  const moonSign = await fetchDreamMoonSign({date, lat, lng});
  return moonSign;
}
// export async function getMoonSignForUserRegistration({ dateOfBirth, timeOfBirth, locationOfBirth }) {
//  console.log("getMoonSignForUserRegistration input:", { dateOfBirth, timeOfBirth, locationOfBirth });
//   const { lat, lng } = await getCoordinates(locationOfBirth);
//   console.log({ dateOfBirth, timeOfBirth, lat, lng });
//  const moonSign = await fetchBirthMoonSign({
//     date: dateOfBirth,
//     timeOfBirth,
//     lat,
//     lng,
//   });

//   return moonSign;
 
// }



// export async function registerUserWithMoonSign(userData) {
// const moonSign = await getMoonSignForUserRegistration({
//     dateOfBirth: userData.dateOfBirth,
//     timeOfBirth: userData.timeOfBirth,
//     locationOfBirth: userData.locationOfBirth,
//   });

//  const newUser = mockRegister({ ...userData, moonSign });

//   return { ...newUser, moonSign };
// }