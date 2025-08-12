const DREAMS_KEY = "dreamsByUser";

export function loadAllUserDreams() {
  return JSON.parse(localStorage.getItem(DREAMS_KEY)) || {};
}

export function saveAllUserDreams(data) {
  localStorage.setItem(DREAMS_KEY, JSON.stringify(data));
}

export function loadDreamsForUser(username) {
  const allDreams = loadAllUserDreams();
  return allDreams[username] || [];
}

export function saveDreamForUser(username, dream) {
  const allDreams = loadAllUserDreams();
  const newDream = { ...dream, id: Date.now() };
  const userDreams = allDreams[username] || [];
  allDreams[username] = [...userDreams, newDream];
  saveAllUserDreams(allDreams);
  return newDream;
}

export function deleteDreamForUser(username, dreamId) {
  const allDreams = loadAllUserDreams();
  console.log("Current allDreams:", allDreams);
  console.log("Username:", username);

  if (!allDreams[username]) {
    console.warn(`No dreams found for user: ${username}`);
    return [];
  }
   console.log("Dreams for user before deletion:", allDreams[username]);
  console.log("dreamId to delete:", dreamId);

  allDreams[username] = allDreams[username].filter(
    (d) => Number(d.id) !== Number(dreamId)
  );

  saveAllUserDreams(allDreams);
  return allDreams[username];
}
