import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryArticle from "./CategoryArticle";
import { useGlobalContext } from "./context";

const CategoryProduct = () => {
  const { setShowCategory } = useGlobalContext();
  let { category } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState(``);
  const [products, setProducts] = useState([]);
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : [];
  const getProducts = async () => {
    try {
      const resp = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      if (!resp.ok) {
        throw new Error(`Something went wrong, ${resp.status}`);
      }
      let product = await resp.json();
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
    setIsLoading(true);
  }, [category]); // added category as a dependency so that anytime the category in the route changes, the useEffect will call the getProduct functiom and reload the page to display the result for the new category.
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
      <section className="mx-1 container grid md:grid-cols-2 lg:grid-cols-3 p-4 gap-2 ease-linear duration-300">
        {products.products.map((items) => {
          return <CategoryArticle items={items} key={items.id} />;
        })}
      </section>
    </main>
  );
};

export default CategoryProduct;
