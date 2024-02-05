import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
import { FaTrash, FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import StarRatings from "./Star-ratings";
import { useGlobalContext } from "./context";
const Eachproduct = ({
  eachProduct,
  setEachProduct,
  index,
  setIndex,
  addToCart,
  removeFromCart,
  cartQuantity,
  increaseQuantity,
  decreaseQuantity,
  cartItem,
}) => {
  return (
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
      {/* <div className="flex justify-between items-center w-48 mx-auto h-10">
        <button className="" onClick={decreaseQuantity}>
          <FaMinusSquare className="h-6 w-6 text-Dark-nude ease-linear duration-300 hover:bg-Dark-nude hover:text-white" />
        </button>
        <div className="text-Dark-nude text-2xl font-semibold">
          {cartQuantity}
        </div>
        <button onClick={increaseQuantity}>
          <FaPlusSquare className="h-6 w-6 text-Dark-nude ease-linear duration-300 hover:bg-Dark-nude hover:text-white" />
        </button>
      </div> */}
      {cartItem ? (
        <button
          className="border-2 w-48 mx-auto bg-Dark-nude text-white h-10 rounded-md p-2 font-bold md:text-xl flex items-center justify-around ease-linear duration-300 hover:text-Dark-nude hover:bg-white uppercase"
          onClick={addToCart}
        >
          <MdAddShoppingCart className="text-2xl" />
          add to cart
        </button>
      ) : (
        <button
          className="border-2 w-64 mx-auto bg-Dark-nude text-white h-10 rounded-md p-2 font-bold md:text-xl flex items-center justify-around ease-linear duration-300 hover:text-Dark-nude hover:bg-white uppercase"
          onClick={() => removeFromCart(eachProduct.id)}
        >
          <FaTrash className="text-2xl" />
          remove from cart
        </button>
      )}
      {/* <button
           className="border-2 w-48 mx-auto bg-Dark-nude text-white h-10 rounded-md p-2 font-bold md:text-xl flex items-center justify-around ease-linear duration-300 hover:text-Dark-nude hover:bg-white uppercase"
           onClick={addToCart}
         >
           <MdAddShoppingCart className="text-2xl" />
           add to cart
         </button> */}
    </section>
  );
};

export default Eachproduct;
