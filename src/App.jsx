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

function App() {
  // const { productId, setproductId } = useGlobalContext();
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : [];
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Login /> },
        {
          path: `home/${loadedUser.username}`,
          element: <Home />,
        },
        {
          path: "register",
          element: <SignUp />,
        },
        {
          path: `home/${loadedUser.username}/product/:id`,
          element: <Product />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
  ]);
  <RouterProvider router={router} />;
  return <RouterProvider router={router} />;
}

export default App;
