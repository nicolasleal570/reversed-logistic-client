import React, { useState } from 'react';

export const LayoutContext = React.createContext({
  isSidebarOpen: false,
});

export default function LayoutContextProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
