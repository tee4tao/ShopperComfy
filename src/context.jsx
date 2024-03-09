import { createContext, useContext, useState, useRef } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [productId, setProductId] = useState(null);
  const [eachProduct, setEachProduct] = useState([]);
  const [productList, setProductList] = useState([]);
  const [cartItemsNumber, setCartItemsNumber] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [showCategory, setShowCategory] = useState(false);
  const openSubmenu = (coordinates) => {
    // const page = sublinks.find((link) => link.page === text);
    // setPage(page);
    setLocation(coordinates);
    setIsSubmenuOpen(true);
  };
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
        showCategory,
        setShowCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
