import { createContext, useContext, useState, useRef } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [productId, setProductId] = useState(null);
  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        productId,
        setProductId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
