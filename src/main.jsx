import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Nav from "./Nav";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [{ index: true, element: <Login /> }],
  },
]);
<RouterProvider router={router} />;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
