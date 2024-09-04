// Save user data to localStorage
export const setUserData = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

// Get user data from localStorage
export const getUserData = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

// Remove user data from localStorage
export const removeUserData = () => {
  localStorage.removeItem("user");
};
