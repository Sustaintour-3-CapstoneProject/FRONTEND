// mockApi.js
const dummyUsers = [
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      city: "New York",
      password: "******",
      image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      email: "janesmith@example.com",
      city: "Los Angeles",
      password: "******",
      image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    {
      id: 3,
      name: "Alice Brown",
      username: "alicebrown",
      email: "alicebrown@example.com",
      city: "Chicago",
      password: "******",
      image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  ];
  
  export const fetchUsers = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve([...dummyUsers]), 500); // Simulasi delay 500ms
    });
  
  export const fetchUserById = (id) =>
    new Promise((resolve, reject) => {
      const user = dummyUsers.find((u) => u.id === id);
      if (user) {
        setTimeout(() => resolve({ ...user }), 500);
      } else {
        setTimeout(() => reject(new Error("User not found")), 500);
      }
    });
  
  export const updateUserById = (id, updatedUser) =>
    new Promise((resolve, reject) => {
      const index = dummyUsers.findIndex((u) => u.id === id);
      if (index > -1) {
        dummyUsers[index] = { ...dummyUsers[index], ...updatedUser };
        setTimeout(() => resolve({ ...dummyUsers[index] }), 500);
      } else {
        setTimeout(() => reject(new Error("User not found")), 500);
      }
    });
  