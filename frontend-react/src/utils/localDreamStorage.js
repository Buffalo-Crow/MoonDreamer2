const STORAGE_KEY = 'dreams';

function getStoredDreams() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveStoredDreams(dreams) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
}

const generateId = () => Date.now();

export function saveDreamToLocalStorage(dream) {
  const existing = getStoredDreams();
  const newDream = { ...dream, id: generateId() };
  const updated = [...existing, newDream];
  saveStoredDreams(updated);
  return newDream;
}

export function loadDreamsFromLocalStorage() {
  return getStoredDreams();
}

export function deleteDreamFromLocalStorage(id) {
  const existing = getStoredDreams();
  const updated = existing.filter(dream => dream.id !== id);
  saveStoredDreams(updated);
}
