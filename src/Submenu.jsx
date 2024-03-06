import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "./context";
import { Outlet, Link } from "react-router-dom";

const Submenu = () => {
  const [productsCategory, setProductsCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState(``);
  const [showCategory, setShowCategory] = useState(false);
  const {
    isSubmenuOpen,
    // page: { page, links },
    location,
  } = useGlobalContext();
  const container = useRef(null);
  const [columns, setColumns] = useState("col-2");
  useEffect(() => {
    // setColumns("col-2");
    const submenu = container.current;
    const { center, bottom } = location;
    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;
    // console.log(links);
    // if (links.length === 3) {
    //   setColumns("col-3");
    // }
    // if (links.length > 3) {
    //   setColumns("col-4");
    // }
  }, [location]);
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
  }, [isSubmenuOpen]);

  return (
    <aside
      className={`${isSubmenuOpen ? "submenu show" : "submenu"}`}
      ref={container}
    >
      <section>
        {/* <h4>{page}</h4> */}
        <div className={`submenu-center`}>
          {productsCategory.map((item, index) => {
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
        </div>
      </section>
    </aside>
  );
};

export default Submenu;
