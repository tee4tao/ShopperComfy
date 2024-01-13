import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="w-screen h-screen flex flex-col space-y-4 justify-center items-center">
      <h1 className="text-4xl font-bold text-Dark-nude">Oops!</h1>
      <p className="text-Dark-nude">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Error;
