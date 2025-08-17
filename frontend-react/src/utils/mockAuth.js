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
  dateOfBirth,
  timeOfBirth,
  locationOfBirth,
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
    dateOfBirth,
    timeOfBirth,
    locationOfBirth,
    avatarUrl,
  };

  users.push(newUser);
  saveUsers(users);

  const loggedInUser = mockSignIn({ username, password });

  return {
    username: loggedInUser.username,
    avatarUrl: loggedInUser.avatarUrl,
  };
}

export function mockSignIn({ username, password }) {
  const users = loadUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    throw new Error("Invalid username or password");
  }
  return user;
}
