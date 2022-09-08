import React, { useState } from 'react';

export const UserContext = React.createContext({
  user: null,
  loading: false,
});

export default function UserContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
