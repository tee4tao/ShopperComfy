import React from "react";
import { Outlet } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div>Nav</div>
      <Outlet />
    </>
  );
};

export default Nav;
