import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext({
  user: null,
  setUserContext: () => {},
  logout: () => {},
  level: -1,
  setLevel: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const [level, setLevel] = useState(-1);

  const setUserContext = (userInfo) => {
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setLevel(-1);
  };

  return (
    <UserContext.Provider value={{ user, setUserContext, logout, level, setLevel }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
