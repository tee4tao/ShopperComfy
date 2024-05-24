import React, { useState, useEffect } from "react";
import { FaCartPlus, FaAngleUp, FaAngleDown } from "react-icons/fa";

const CartItem = ({
  id,
  thumbnail,
  title,
  price,
  removeFromCart,
  test,
  setTest,
  totalCost,
  setTotalCost,
}) => {
  let [itemQuantity, setItemQuantity] = useState(1);
  let handleIncrease = (id) => {
    let increase = test.find((item) => {
      return item.id == id;
    });
    if (increase.id === id) {
      setItemQuantity((itemQuantity += 1));
    }
  };
  let handleDecrease = (id) => {
    let decrease = test.find((item) => {
      return item.id == id;
    });
    if (decrease.id === id) {
      setItemQuantity((itemQuantity -= 1));
    }
    if (itemQuantity < 1) {
      const loadedCart = localStorage.getItem("productList")
        ? JSON.parse(localStorage.getItem("productList"))
        : [];
      const index = loadedCart.findIndex((product) => product.id === id);
      if (index > -1) {
        loadedCart.splice(index, 1);
      }
      localStorage.setItem(`productList`, JSON.stringify(loadedCart));
      setTest(loadedCart);
    }
  };
  totalCost = test.reduce((acc, curr) => {
    acc += curr.price * itemQuantity;
    return acc;
    // return Math.round((acc + Number.EPSILON) * 100) / 100; // Math.round((num + Number.EPSILON) * 100) / 100 will round-off my value to 2dp
  }, 0);
  useEffect(() => {
    localStorage.setItem(`totalcost`, totalCost);
  }, [totalCost]);

  useEffect(() => {
    setTotalCost(totalCost);
  }, [totalCost]); //To resolve the warning(Cannot update a component while rendering a different component), I wrap the logic that updates the state(totalCost) in the useEffect hook.
  return (
    <article className="flex justify-between items-center mb-8 w-11/12">
      <div className="item-header flex items-center gap-4">
        <img src={thumbnail} alt={title} className="h-20 w-20 object-cover" />
        <div className="item-details">
          <h4 className="item-name text-xl">{title}</h4>
          <p className="item-price font-semibold">${price * itemQuantity}</p>
          <button
            className="remove-btn border-4 text-sm rounded-xl text-white bg-Dark-nude hover:bg-white hover:text-Dark-nude duration-300 ease-linear mt-2"
            onClick={() => removeFromCart(id)}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          className="amount-btn text-Dark-nude duration-300 ease-linear text-xl hover:text-black"
          onClick={() => handleIncrease(id)}
        >
          <FaAngleUp />
        </button>
        <div className="amount">{itemQuantity}</div>
        <button
          className="amount-btn text-Dark-nude duration-300 ease-linear text-xl hover:text-black"
          onClick={() => handleDecrease(id)}
        >
          <FaAngleDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
