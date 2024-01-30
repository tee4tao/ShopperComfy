import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
import { FaTrash, FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import StarRatings from "./Star-ratings";
import { useGlobalContext } from "./context";
import Eachproduct from "./Eachproduct";

const Product = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState(``);
  // const [eachProduct, setEachProduct] = useState([]);
  const [index, setIndex] = useState(0);
  const [cartItem, setCartItem] = useState(true);
  const [cartQuantity, setCartQuantity] = useState(0);
  // const [productList, setProductList] = useState([]);
  const {
    eachProduct,
    setEachProduct,
    productList,
    setProductList,
    cartItemsNumber,
    setCartItemsNumber,
    // cartQuantity,
    // setCartQuantity,
  } = useGlobalContext();
  const increaseQuantity = () => {
    setCartQuantity(cartQuantity + 1);
    console.log(cartQuantity);
  };
  const decreaseQuantity = () => {
    if (cartQuantity > 0) {
      setCartQuantity(cartQuantity - 1);
    } else {
      setCartQuantity(0);
    }
    console.log(cartQuantity);
  };
  useEffect(() => {
    if (cartQuantity != 0) {
      localStorage.setItem(`cartQuantity`, cartQuantity);
    }
  }, [cartQuantity]);
  useEffect(() => {
    const loadedQuantity = parseInt(localStorage.getItem(`cartQuantity`));
    // console.log(typeof parseInt(loadedQuantity));
    setCartQuantity(loadedQuantity);
  }, []);
  const addToCart = () => {
    setProductList([...productList, eachProduct]);
    // console.log(productList);
    setCartItem(!cartItem);
  };
  const removeFromCart = (id) => {
    // const loadedCart = localStorage.getItem("productList")
    //   ? JSON.parse(localStorage.getItem("productList"))
    //   : []; // To get the items saved in the local storage
    // let newProductList = productList.filter((product) => product.id !== id);
    // setProductList(newProductList);
    setProductList((products) => {
      return products.filter((items) => {
        return items.id !== id;
      });
    });
    setCartItem(!cartItem);
  };
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
  // useEffect(() => {
  //   window.localStorage.setItem(`cartItem`, cartItem);
  // }, [cartItem]);
  // useEffect(() => {
  //   const value = window.localStorage.getItem(`cartItem`);
  //   const valueParse = JSON.parse(value) ? JSON.parse(value) : false;
  //   setCartItem(valueParse);
  // }, []);
  useEffect(() => {
    const loadedCart = localStorage.getItem("productList")
      ? JSON.parse(localStorage.getItem("productList"))
      : []; // To get the items saved in the local storage
    setProductList(loadedCart); //to update the productList with the items in the localStorage after reloading the page
  }, []);
  useEffect(() => {
    if (productList.length != 0) {
      localStorage.setItem(`productList`, JSON.stringify(productList));
      // navigateTo("/"); // to redirect to the route(login page) after submission of the form
    }
    const loadedCart = localStorage.getItem("productList")
      ? JSON.parse(localStorage.getItem("productList"))
      : []; // To get the items saved in the local storage
    if (loadedCart.length > 0) {
      setCartItemsNumber(loadedCart.length); //update the cart number using the length of the items in the localstorage
    } else {
      setCartItemsNumber(0); //if there's no item in the localstorage, then we make our cart number 0
    }
    // console.log(loadedCart);
  }, [productList]);
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
  // useEffect(() => {
  //   if (eachProduct.length != 0) {
  //     console.log(eachProduct);
  //   }
  // }, []);
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
      <Eachproduct
        eachProduct={eachProduct}
        setEachProduct={setEachProduct}
        index={index}
        setIndex={setIndex}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        cartQuantity={cartQuantity}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cartItem={cartItem}
      />
    </main>
  );
};

export default Product;
