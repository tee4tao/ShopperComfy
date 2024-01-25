import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import StarRatings from "./Star-ratings";

const Product = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState(``);
  const [eachProduct, setEachProduct] = useState([]);
  const [index, setIndex] = useState(0);
  const getEachProduct = async () => {
    try {
      const resp = await fetch(`https://dummyjson.com/products/${id}`);
      if (!resp.ok) {
        throw new Error(`Something went wrong, ${resp.status}`);
      }
      let product = await resp.json();
      console.log(product);
      setEachProduct(product);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setErrMessage(err.message);
      setIsError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (eachProduct.length != 0) {
      const lastIndex = eachProduct.images.length - 1;
      if (index < 0) {
        setIndex(lastIndex);
      }
      if (index > lastIndex) {
        setIndex(0);
      }
    }
  }, [index, eachProduct]);
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 2000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  useEffect(() => {
    getEachProduct();
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
    <main className="h-screen w-full grid place-items-center ">
      <section className="mx-1 w-5/6 max-w-4xl ease-linear duration-300 relative">
        <article className="item-container flex flex-col  my-4 shadow-lg ease-linear duration-300 rounded-md relative overflow-hidden hover:shadow-2xl">
          <div className="flex justify-center">
            {eachProduct.images.length > 1
              ? eachProduct.images.map((image, productIndex) => {
                  let position = "nextSlide";
                  if (productIndex === index) {
                    position = "activeSlide";
                  }
                  if (
                    productIndex === index - 1 ||
                    (index === 0 &&
                      productIndex === eachProduct.images.length - 1)
                  ) {
                    position = "lastSlide";
                  }
                  return (
                    <img
                      key={productIndex}
                      src={image}
                      alt={eachProduct.title}
                      className={`${position} w-96 object-cover rounded-t-md ease-linear duration-300 absolute bottom-44 opacity-0`}
                      // onClick={handleClick}
                    />
                  );
                })
              : eachProduct.images.map((image, productIndex) => {
                  return (
                    <img
                      key={productIndex}
                      src={image}
                      alt={eachProduct.title}
                      className={`w-96 object-cover rounded-t-md ease-linear duration-300 absolute bottom-44`}
                    />
                  );
                })}
          </div>

          <div className="p-2 flex flex-col justify-between absolute -bottom-0">
            {/* <div className="item-header flex items-center justify-between w-full mb-4"> */}
            <h3 className="item-name text-xl">{eachProduct.title}</h3>
            {/* </div> */}
            <p className="item-desc">{eachProduct.description}</p>
            <p className="item-price font-extrabold text-xl tracking-wide text-white bg-Dark-nude w-20 text-center p-1 rounded-md">
              $ {eachProduct.price}
            </p>
            <div className="flex items-center text-Dark-nude">
              <StarRatings
                rating={eachProduct.rating}
                isSelectable={false}
                isAggregateRating={true}
                numOfStars={5}
              />
              <span className="font-bold">({eachProduct.rating})</span>
            </div>
          </div>
        </article>
        {eachProduct.images.length > 1 && (
          <>
            <button className="prev" onClick={() => setIndex(index - 1)}>
              <FiChevronLeft />
            </button>
            <button className="next" onClick={() => setIndex(index + 1)}>
              <FiChevronRight />
            </button>
          </>
        )}
        {/* <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button> */}
      </section>
    </main>
  );
};

export default Product;
