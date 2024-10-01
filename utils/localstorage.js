// Save user data to localStorage
export const setUserData = (userData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(userData));
    window.location.reload("/");
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
    window.location.reload("/");
  }
};

// Get user data from localStorage
export const getLocalStorageData = (key) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
};

// Get user data from localStorage
export const setLocalStorageData = (data, key) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
