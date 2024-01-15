import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState(``);
  const [products, setProducts] = useState([]);
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : [];
  const getProduct = async (id) => {
    try {
      const resp = await fetch(`https://dummyjson.com/products`);
      if (!resp.ok) {
        throw new Error(`Something went wrong, ${resp.status}`);
      }
      let product = await resp.json();
      console.log(product);
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
    getProduct();
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
        <button className=" border-4 text-white text-xl w-48 bg-Dark-nude p-2 rounded-xl ease-linear duration-300 hover:bg-white hover:text-Dark-nude mt-8">
          <a href="javascript: location.reload();">Reload this page</a>
        </button>
      </div>
    );
  }
  return (
    <main className="min-h-screen w-screen grid place-items-center">
      <section className="goods-container w-3/5 max-w-7xl grid gap-4">
        {products.products.map((items) => {
          const {
            id,
            brand,
            category,
            description,
            discountPercentage,
            images,
            price,
            rating,
            stock,
            thumbnail,
            title,
          } = items;
          return (
            <article
              key={id}
              className="grid place-items-center my-4 shadow-lg"
            >
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-60 object-cover rounded-t-md"
              />
              <div className="details-container">
                <div className="item-header flex items-center justify-between w-full mb-4">
                  <h3 className="item-name text-xl">{title}</h3>
                  <p className="item-price bg-Dark-nude text-white p-1 rounded-md">
                    ${price}
                  </p>
                </div>
                <p className="item-desc">{description}</p>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default Home;
