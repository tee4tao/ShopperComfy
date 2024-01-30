import { createContext, useContext, useState, useRef } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [productId, setProductId] = useState(null);
  const [eachProduct, setEachProduct] = useState([]);
  const [productList, setProductList] = useState([]);
  const [cartItemsNumber, setCartItemsNumber] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);
  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        productId,
        setProductId,
        eachProduct,
        setEachProduct,
        productList,
        setProductList,
        cartItemsNumber,
        setCartItemsNumber,
        cartQuantity,
        setCartQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
