import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useGlobalContext } from "./context";
import CartItem from "./CartItem";

const Cart = () => {
  const {
    eachProduct,
    setEachProduct,
    productList,
    setProductList,
    cartItemsNumber,
    setCartItemsNumber,
  } = useGlobalContext();
  const [test, setTest] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(1);
  const loadedCart = localStorage.getItem("productList")
    ? JSON.parse(localStorage.getItem("productList"))
    : []; // To get the items saved in the local storage
  useEffect(() => {
    // const loadedCart = localStorage.getItem("productList")
    //   ? JSON.parse(localStorage.getItem("productList"))
    //   : []; // To get the items saved in the local storage
    let uniqueCategory = [
      ...new Map(loadedCart.map((m) => [m.id, m])).values(),
    ];
    setTest(uniqueCategory);
  }, []);
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : [];
  // console.log(uniqueCategory);
  // console.log(loadedCart);
  const removeFromCart = (id) => {
    const loadedCart = localStorage.getItem("productList")
      ? JSON.parse(localStorage.getItem("productList"))
      : [];
    const index = loadedCart.findIndex((product) => product.id === id);
    if (index > -1) {
      loadedCart.splice(index, 1);
    }
    localStorage.setItem(`productList`, JSON.stringify(loadedCart));
    setTest(loadedCart);
    // let newGoods = loadedCart.filter((item) => {
    //   return item.id !== id;
    // });
    // console.log(newGoods);
    // useEffect(() => {
    // localStorage.setItem(`productList`, JSON.stringify(newGoods));
    // }, []);
    // setProductList((products) => {
    //   return products.filter((items) => {
    //     return items.id !== id;
    //   });
    // });
  };
  if (loadedCart.length === 0) {
    return (
      <main className="h-screen w-full flex flex-col items-center justify-center fixed">
        <div className="text-5xl font-bold text-Dark-nude">Cart is empty</div>
        <button className=" border-4 text-white text-xl w-32 bg-Dark-nude p-2 rounded-xl ease-linear duration-300 hover:bg-white hover:text-Dark-nude mt-8">
          <Link to={`/home/${loadedUser.username}`}>Home Page</Link>
        </button>
      </main>
    );
  }
  return (
    <main className=" w-full grid place-items-center mt-8 ">
      <section className="flex flex-col items-center w-full md:max-w-4xl">
        {test.map((product) => {
          return (
            <CartItem
              key={product.id}
              {...product}
              removeFromCart={removeFromCart}
              setItemQuantity={setItemQuantity}
              itemQuantity={itemQuantity}
              test={test}
              setTest={setTest}
            />
            // <article
            //   key={product.id}
            //   className="flex justify-between items-center mb-8 w-11/12"
            // >
            //   <div className="item-header flex items-center gap-4">
            //     <img
            //       src={product.thumbnail}
            //       alt={product.title}
            //       className="h-20 w-20 object-cover"
            //     />
            //     <div className="item-details">
            //       <h4 className="item-name text-xl">{product.title}</h4>
            //       <p className="item-price font-semibold">${product.price}</p>
            //       <button
            //         className="remove-btn border-4 text-sm rounded-xl text-white bg-Dark-nude hover:bg-white hover:text-Dark-nude duration-300 ease-linear mt-2"
            //         onClick={() => removeFromCart(product.id)}
            //       >
            //         Remove
            //       </button>
            //     </div>
            //   </div>
            //   <div className="flex flex-col justify-center items-center">
            //     <button
            //       className="amount-btn text-Dark-nude duration-300 ease-linear text-xl hover:text-black"
            //       onClick={() => setItemQuantity(itemQuantity + 1)}
            //     >
            //       <FaAngleUp />
            //     </button>
            //     <div className="amount">{itemQuantity}</div>
            //     <button className="amount-btn text-Dark-nude duration-300 ease-linear text-xl hover:text-black">
            //       <FaAngleDown />
            //     </button>
            //   </div>
            // </article>
          );
        })}
      </section>
    </main>
  );
};

export default Cart;
