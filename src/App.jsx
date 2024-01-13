import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Nav from "./Nav";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import Error from "./Error.jsx";

function App() {
  // const { username, setUsername } = useGlobalContext();
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
      ],
    },
  ]);
  <RouterProvider router={router} />;
  return <RouterProvider router={router} />;
}

export default App;
