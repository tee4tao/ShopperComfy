import { createContext, useContext, useState, useRef } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
