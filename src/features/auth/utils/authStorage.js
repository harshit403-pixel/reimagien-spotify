const REGISTERED_USERS_KEY = "spotify-registered-users";
const LOGGED_IN_USER_KEY = "spotify-logged-in-user";

const isBrowser = typeof window !== "undefined";

const normalizeEmail = (email) => email.trim().toLowerCase();

const readStorageArray = (storageKey) => {
  if (!isBrowser) {
    return [];
  }

  const rawValue = window.localStorage.getItem(storageKey);

  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
};

const writeStorageValue = (storageKey, value) => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(value));
};

export const getRegisteredUsers = () => readStorageArray(REGISTERED_USERS_KEY);

export const hasRegisteredUsers = () => getRegisteredUsers().length > 0;

export const getLoggedInUser = () => {
  if (!isBrowser) {
    return null;
  }

  const rawValue = window.localStorage.getItem(LOGGED_IN_USER_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
};

export const getUserDisplayName = (user) => {
  if (!user?.email) {
    return "Guest";
  }

  return user.email.split("@")[0] || user.email;
};

export const getUserInitial = (user) =>
  getUserDisplayName(user).charAt(0).toUpperCase();

export const registerUser = (email) => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return {
      success: false,
      code: "EMPTY_EMAIL",
      message: "Please enter an email address.",
    };
  }

  const registeredUsers = getRegisteredUsers();
  const existingUser = registeredUsers.find(
    (user) => user.email === normalizedEmail,
  );

  if (existingUser) {
    return {
      success: false,
      code: "ALREADY_EXISTS",
      message: "Account already exists. Please log in.",
    };
  }

  const newUser = {
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  };

  writeStorageValue(REGISTERED_USERS_KEY, [...registeredUsers, newUser]);

  return {
    success: true,
    user: newUser,
  };
};

export const loginUser = (email) => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return {
      success: false,
      code: "EMPTY_EMAIL",
      message: "Please enter your email address.",
    };
  }

  const registeredUsers = getRegisteredUsers();

  if (registeredUsers.length === 0) {
    return {
      success: false,
      code: "NO_USERS",
      message: "No account found. Please sign up first.",
    };
  }

  const matchedUser = registeredUsers.find(
    (user) => user.email === normalizedEmail,
  );

  if (!matchedUser) {
    return {
      success: false,
      code: "NOT_FOUND",
      message: "This account is not registered. Please sign up first.",
    };
  }

  writeStorageValue(LOGGED_IN_USER_KEY, matchedUser);

  return {
    success: true,
    user: matchedUser,
  };
};

export const logoutUser = () => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.removeItem(LOGGED_IN_USER_KEY);
};
