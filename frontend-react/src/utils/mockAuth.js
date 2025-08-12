const mockUsersKey = "mockUsers";

function loadUsers() {
  return JSON.parse(localStorage.getItem(mockUsersKey)) || [];
}

function saveUsers(users) {
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

  if (users.find((u) => u.username === username)) {
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

  // 🔹 Automatically "sign in" the user
  const loggedInUser = mockSignIn({ username, password });

  // Return logged in user's public profile data
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

// export function mockUpdatProfile(username, avatarUrl) {
//   const users = loadUsers();
//   const userIndex = users.findIndex((u) => u.username === username);
//   if (userIndex === -1) {
//     throw new Error("User not found");
//   }

//   const updatedUser = { ...users[userIndex], avatarUrl };
//   users[userIndex] = updatedUser;
//   saveUsers(users);
// }
