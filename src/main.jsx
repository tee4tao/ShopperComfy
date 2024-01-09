import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Nav from "./Nav";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "home",
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
