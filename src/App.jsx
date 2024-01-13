import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Nav from "./Nav";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./Login";
// import Nav from "./Nav";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import { AppProvider } from "./context.jsx";
import { useGlobalContext } from "./context";

function App() {
  const { username, setUsername } = useGlobalContext();
  console.log(useGlobalContext().username);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        { index: true, element: <Login /> },
        {
          path: `${username ? `home/${username}` : `home`}`,
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
