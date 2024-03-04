import { React, useRef, useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useGlobalContext } from "./context";

const Nav = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const { cartItemsNumber, setCartItemsNumber } = useGlobalContext();
  const [productsCategory, setProductsCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState(``);
  const [showCategory, setShowCategory] = useState(false);
  const categoryClick = () => {
    setShowLinks(false);
    setShowCategory(false);
  };
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : [];
  useEffect(() => {
    const loadedCart = localStorage.getItem("productList")
      ? JSON.parse(localStorage.getItem("productList"))
      : []; // To get the items saved in the local storage
    let uniqueCategory = [
      ...new Map(loadedCart.map((m) => [m.id, m])).values(),
    ];
    setCartItemsNumber(loadedCart.length);
    // if (uniqueCategory.length > 0) {
    //   setCartItemsNumber(uniqueCategory.length);
    // } else {
    //   setCartItemsNumber(0);
    // }
  }, [cartItemsNumber]);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = `0px`;
    }
  }, [showLinks]);
  const getProductsCategory = async () => {
    try {
      const resp = await fetch("https://dummyjson.com/products/categories");
      if (!resp.ok) {
        throw new Error(`Something went wrong, ${resp.status}`);
      }
      let category = await resp.json();
      // console.log(category);
      setProductsCategory(category);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setErrMessage(err.message);
      setIsError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (showCategory) {
      getProductsCategory();
    }
  }, [showCategory]);

  return (
    <main className="">
      <nav className="w-full flex justify-center items-center shadow-2xl bg-Dark-nude">
        <div className="nav-center flex flex-col justify-between items-center w-11/12 md:flex-row md:max-w-6xl md:justify-between md:p-4">
          <div className="nav-header flex justify-between items-center w-full p-2 md:p-0">
            <Link
              to={`home/${loadedUser.username}`}
              className="nav-logo"
              onClick={() => setShowLinks(false)}
            >
              ShopperComfy
            </Link>
            <div className="relative w-11" onClick={() => setShowLinks(false)}>
              <Link to={"cart"} className="md:hidden text-3xl">
                <IoCartOutline />
              </Link>
              <div className="md:hidden absolute top-0 right-0 bg-white rounded-full w-5 h-5 text-xl text-Dark-nude flex justify-center items-center">
                {cartItemsNumber}
              </div>
            </div>
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
                to={`home/${loadedUser.username}`}
                className="capitalize text-lg text-Dark-nude w-screen hover:bg-Dark-nude hover:text-white ease-linear duration-300 md:text-white md:w-auto md:hover:bg-white md:rounded-full md:hover:text-Dark-nude md:hover:px-2"
                onClick={() => setShowLinks(false)}
              >
                Home
              </Link>
              <div
                className="capitalize text-lg text-Dark-nude w-screen hover:bg-Dark-nude hover:text-white ease-linear duration-300 md:text-white md:w-auto md:hover:bg-white md:rounded-full md:hover:text-Dark-nude md:hover:px-2"
                onMouseOver={() => setShowCategory(true)}
                onMouseOut={() => setShowCategory(false)}
                onClick={categoryClick}
                // onClick={() => setShowCategory(!showCategory)}
              >
                Category
                <span className="fixed text-Dark-nude bg-white z-10 rounded-2xl shadow-2xl left-28 md:left-auto  top-28 md:top-12">
                  {showCategory &&
                    productsCategory.map((item, index) => {
                      return (
                        <div key={index} className="hover:pr-6 hover:pl-0">
                          <Link
                            to={`home/${item}`}
                            className="ease-linear duration-300 hover:bg-Dark-nude hover:text-white rounded-md capitalize"
                          >
                            {item}
                          </Link>
                        </div>
                      );
                    })}
                </span>
              </div>
              <Link
                to={`home/account`}
                className="capitalize text-lg text-Dark-nude w-screen  hover:bg-Dark-nude hover:text-white ease-linear duration-300 md:text-white md:w-auto md:hover:bg-white md:rounded-full md:hover:text-Dark-nude md:hover:px-2"
                onClick={() => setShowLinks(false)}
              >
                Account
              </Link>
              <div className="relative w-11 hidden md:block">
                <Link to={"cart"} className="text-3xl text-white">
                  <IoCartOutline />
                </Link>
                <div className="absolute top-0 right-0 bg-white rounded-full w-5 h-5 text-xl text-Dark-nude flex justify-center items-center">
                  {cartItemsNumber}
                </div>
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
