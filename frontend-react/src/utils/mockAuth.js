const mockUsersKey = "mockUsers";

export function loadUsers() {
  return JSON.parse(localStorage.getItem(mockUsersKey)) || [];
}

export function saveUsers(users) {
  localStorage.setItem(mockUsersKey, JSON.stringify(users));
}

export function mockRegister({
  username,
  password,
  email,
  avatarUrl,
}) {
  const users = loadUsers();

  console.log("Loaded users before registration:", users);

  if (
    users.find(
      (u) => u.username.trim().toLowerCase() === username.trim().toLowerCase()
    )
  ) {
    throw new Error("Username already exists");
  }

  const newUser = {
    username,
    password,
    email,
    avatarUrl,
  };

  users.push(newUser);
  saveUsers(users);

  // Automatically log in after register
  return newUser;
}

export function mockSignIn({ username, password }) {
  const users = loadUsers();
  const user = users.find(
    (u) =>
      u.username.trim().toLowerCase() === username.trim().toLowerCase() &&
      u.password === password
  );
  if (!user) {
    throw new Error("Invalid username or password");
  }
  return user;
}
