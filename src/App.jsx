import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Nav from "./Nav";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import Error from "./Error.jsx";
import { useGlobalContext } from "./context";
import Product from "./Product.jsx";
import Cart from "./Cart.jsx";
import Paystack from "./Paystack.jsx";
import Account from "./Account.jsx";
import CategoryProduct from "./CategoryProduct.jsx";

function App() {
  // const { productId, setproductId } = useGlobalContext();
  // let location = useLocation();
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : [];
  const router = createBrowserRouter([
    { index: true, element: <Login /> },
    {
      path: "register",
      element: <SignUp />,
    },
    {
      path: "/",
      element: <Nav />,
      errorElement: <Error />,
      children: [
        {
          path: `home/${loadedUser.username}`,
          element: <Home />,
        },

        {
          path: `home/${loadedUser.username}/product/:id`,
          element: <Product />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: `cart/paystack`,
          element: <Paystack />,
        },
        {
          path: `home/account`,
          element: <Account />,
        },
        {
          path: `home/:category`,
          element: <CategoryProduct />,
        },
        {
          path: `home/:category/product/:id`,
          element: <Product />,
        },
      ],
    },
  ]);
  <RouterProvider router={router} />;
  return <RouterProvider router={router} />;
}

export default App;
