import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext({
  user: null,
  setUserContext: () => {},
  logout: () => {},
  level: -1,
  setLevel: () => {},
  userId: null,
  setUserId: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const [level, setLevel] = useState(-1);
  const [userId, setUserId] = useState(localStorage.userId ? localStorage.userId : null);

  const setUserContext = (userInfo) => {
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
    setUserId(userInfo._id);  // Dodano za shranjevanje uporabnikovega ID-ja
    localStorage.setItem('userId', userInfo._id);
  };

  const setUserIdContext = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    setUser(null);
    setLevel(-1);
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ user, setUserContext, logout, level, setLevel, userId, setUserId: setUserIdContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
