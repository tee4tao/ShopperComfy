import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Nav = () => {
  return (
    <main className="fixed top-0 w-screen bg-Dark-nude">
      <nav className="w-full flex justify-center items-center">
        <div className="nav-center flex flex-col justify-between items-center w-11/12">
          <div className="nav-header flex justify-between items-center w-full p-2">
            <Link to={"home"} className="nav-logo">
              ShopperComfy
            </Link>
            <button className="toggle-btn md:hidden">
              <FaBars />
            </button>
          </div>
          <div className="links-container h-0 overflow-hidden ease-linear duration-300">
            <div className="links">
              <Link to={"home"}>Home</Link>
            </div>
            <div>Category</div>
            <div>Account</div>
          </div>
        </div>
      </nav>
      <Outlet />
    </main>
  );
};

export default Nav;
