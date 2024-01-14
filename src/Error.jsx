import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : [];
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-Dark-nude mb-4">Oops!</h1>
      <p className="text-Dark-nude md:text-2xl mb-4">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-Dark-nude md:text-2xl mb-4">
        <i>{error.statusText || error.message}</i>
      </p>
      <button className=" border-4 text-white text-xl w-32 bg-Dark-nude p-2 rounded-xl ease-linear duration-300 hover:bg-white hover:text-Dark-nude mt-8">
        <Link to={`home/${loadedUser.username}`}>Home Page</Link>
      </button>
    </div>
  );
};

export default Error;
