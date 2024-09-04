// Save user data to localStorage
export const setUserData = (userData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(userData));
  }
};

// Get user data from localStorage
export const getUserData = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }
};

// Remove user data from localStorage
export const removeUserData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};
