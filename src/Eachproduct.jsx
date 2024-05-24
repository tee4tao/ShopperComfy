import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
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
  danger,
  setDanger,
  dangerMessage,
  dangerRemove,
  dangerRemoveMessage,
  setDangerRemove,
  success,
  setSuccess,
}) => {
  const closeAlert = () => {
    setDanger(false);
    setSuccess(false);
  };
  const closeRemoveAlert = () => {
    setDangerRemove(false);
  };
  return (
    <section className="mx-1 w-5/6 max-w-4xl ease-linear duration-300 relative">
      <article className="item-container flex flex-col  my-4 shadow-lg ease-linear duration-300 rounded-md relative overflow-hidden hover:shadow-2xl">
        {danger && (
          <article className="alert h-16 w-64 flex justify-center items-center absolute top-0 right-0 bg-white overflow-hidden p-2 shadow-2xl z-10">
            <div className="alert-container relative w-full h-full flex justify-between items-center">
              <div className="icon-message_wrap flex items-center gap-2 text-lg">
                <div className="danger-icon text-red-600 text-2xl">
                  <PiWarningCircleFill />
                </div>
                <p className="alert-message capitalize">{dangerMessage}</p>
              </div>
              <div
                className="close-icon absolute top-0 right-0 text-black ease-linear duration-300 cursor-pointer opacity-30 hover:opacity-100"
                onClick={closeAlert}
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="underline danger"></div>
          </article>
        )}
        {success && (
          <article className="alert h-16 w-64 flex justify-center items-center absolute top-0 right-0 bg-white overflow-hidden p-2 shadow-2xl z-10">
            <div className="alert-container relative w-full h-full flex justify-between items-center">
              <div className="icon-message_wrap flex items-center gap-2 text-lg">
                <div className="success-icon text-green-600 text-2xl">
                  <IoIosCheckmarkCircle />
                </div>
                <p className="alert-message capitalize">{dangerMessage}</p>
              </div>
              <div
                className="close-icon absolute top-0 right-0 text-black ease-linear duration-300 cursor-pointer opacity-30 hover:opacity-100"
                onClick={closeAlert}
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="underline success"></div>
          </article>
        )}
        {dangerRemove && (
          <article className="alert h-16 w-64 flex justify-center items-center absolute top-0 right-0 bg-white overflow-hidden p-2 shadow-2xl z-10">
            <div className="alert-container relative w-full h-full flex justify-between items-center">
              <div className="icon-message_wrap flex items-center gap-2 text-lg">
                <div className="danger-icon text-red-600 text-2xl">
                  <PiWarningCircleFill />
                </div>
                <p className="alert-message capitalize">
                  {dangerRemoveMessage}
                </p>
              </div>
              <div
                className="close-icon absolute top-0 right-0 text-black ease-linear duration-300 cursor-pointer opacity-30 hover:opacity-100"
                onClick={closeRemoveAlert}
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="underline danger"></div>
          </article>
        )}
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
          <h3 className="item-name text-xl">{eachProduct.title}</h3>
          <p className="item-desc">{eachProduct.description}</p>
          <p className="item-price font-extrabold text-xl tracking-wide text-white bg-Dark-nude w-max text-center p-1 rounded-md">
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
    </section>
  );
};

export default Eachproduct;
