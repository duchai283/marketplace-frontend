let currentUser = null;

export const getCurrentUser = () => {
  return currentUser;
};

export const setCurrentUser = user => {
  currentUser = user;
};

export const getAccessToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const setAccessToken = token => {
  localStorage.setItem('token', token);
};
