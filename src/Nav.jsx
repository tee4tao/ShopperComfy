import React from "react";
import { Outlet } from "react-router-dom";

const Nav = () => {
  return (
    <main className="fixed top-0 w-14 h-16 bg-Dark-nude">
      <div>Nav</div>
      <Outlet />
    </main>
  );
};

export default Nav;
