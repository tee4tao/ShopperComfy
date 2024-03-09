import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Article from "./Article";
import { useGlobalContext } from "./context";
const Home = () => {
  const { setShowCategory } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState(``);
  const [products, setProducts] = useState([]);
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : [];
  const getProducts = async () => {
    try {
      const resp = await fetch(`https://dummyjson.com/products`);
      if (!resp.ok) {
        throw new Error(`Something went wrong, ${resp.status}`);
      }
      let product = await resp.json();
      // console.log(product);
      setProducts(product);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setErrMessage(err.message);
      setIsError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  if (isLoading) {
    return <div className="loader"></div>;
  }
  if (isError) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-Dark-nude mb-4">Oops!</h1>
        <p className="text-Dark-nude md:text-2xl mb-4">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-Dark-nude md:text-2xl mb-4">
          <i>{errMessage}</i>
        </p>

        <a href="javascript: location.reload();">
          <button className=" border-4 text-white text-xl w-48 bg-Dark-nude p-2 rounded-xl ease-linear duration-300 hover:bg-white hover:text-Dark-nude mt-8">
            Reload this page
          </button>
        </a>
      </div>
    );
  }
  return (
    <main
      className="min-h-screen grid place-items-center"
      onClick={() => {
        setShowCategory(false);
      }}
    >
      <section className="mx-1 md:w-3/5 max-w-7xl grid grid-cols-2 lg:grid-cols-3 gap-4 ease-linear duration-300">
        {products.products.map((items) => {
          return <Article items={items} key={items.id} />;
        })}
      </section>
    </main>
  );
};

export default Home;
