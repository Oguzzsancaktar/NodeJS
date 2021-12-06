const users = [];

const addUser = ({ id, username, room }) => {
  // Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validate the data

  if (!username || !room) {
    return {
      error: 'Username and room is required',
    };
  }

  // Check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  // Validate username
  if (existingUser) {
    return {
      error: 'User already exists',
    };
  }

  // Store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id); ;
};
 
const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase()
  const usersInRoom = users.filter((user) => user.room === room);
  return usersInRoom || [];
};

// addUser({
//   id: 1,
//   username: 'oguzsancaktar',
//   room: '1',
// });

// addUser({
//   id: 2,
//   username: 'berat',
//   room: '1',
// });

// const removedUser = removeUser(1)

// const selectedUser = getUser(1)

// const usersInRoom = getUsersInRoom('1');

// console.log(usersInRoom);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
}