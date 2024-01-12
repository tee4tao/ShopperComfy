import { React, useRef, useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Nav = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = `0px`;
    }
  }, [showLinks]);

  return (
    <main className="fixed top-0 w-screen ">
      <nav className="w-full flex justify-center items-center shadow-2xl bg-Dark-nude">
        <div className="nav-center flex flex-col justify-between items-center w-11/12 md:flex-row md:max-w-6xl md:justify-between md:p-4">
          <div className="nav-header flex justify-between items-center w-full p-2 md:p-0">
            <Link to={"home"} className="nav-logo">
              ShopperComfy
            </Link>
            <button
              className="toggle-btn md:hidden"
              onClick={() => setShowLinks(!showLinks)}
            >
              <FaBars />
            </button>
          </div>
          <div
            className="links-container w-screen h-0 overflow-hidden ease-linear duration-300 bg-white md:bg-transparent"
            ref={linksContainerRef}
          >
            <div
              className="links flex flex-col justify-around items-start w-11/12 space-y-2 p-2 md:flex-row md:items-center"
              ref={linksRef}
            >
              <Link
                to={"home"}
                className="capitalize text-lg text-Dark-nude w-screen hover:bg-Dark-nude hover:text-white ease-linear duration-300 md:text-white md:w-auto md:hover:bg-white md:rounded-full md:hover:text-Dark-nude md:hover:px-2"
              >
                Home
              </Link>
              <div className="capitalize text-lg text-Dark-nude w-screen hover:bg-Dark-nude hover:text-white ease-linear duration-300 md:text-white md:w-auto md:hover:bg-white md:rounded-full md:hover:text-Dark-nude md:hover:px-2">
                Category
              </div>
              <div className="capitalize text-lg text-Dark-nude w-screen  hover:bg-Dark-nude hover:text-white ease-linear duration-300 md:text-white md:w-auto md:hover:bg-white md:rounded-full md:hover:text-Dark-nude md:hover:px-2">
                Account
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </main>
  );
};

export default Nav;
