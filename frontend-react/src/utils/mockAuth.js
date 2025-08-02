const mockUsersKey = "mockUsers";

function loadUsers() {
  return JSON.parse(localStorage.getItem(mockUsersKey)) || [];
}

function saveUsers(users) {
  localStorage.setItem(mockUsersKey, JSON.stringify(users));
}

export function mockRegister({ username, password }) {
  const users = loadUsers();
  if (users.find(u => u.username === username)) {
    throw new Error("Username already exists");
  }
  users.push({ username, password });
  saveUsers(users);
  return { username };
}

export function mockSignIn({ username, password }) {
  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    throw new Error("Invalid username or password");
  }
  return { username };
}