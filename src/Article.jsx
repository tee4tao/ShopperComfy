import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "./context";

const Article = ({ items }) => {
  const navigateTo = useNavigate();
  let {
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
  const [test, setTest] = useState(false);
  let { productId, setProductId } = useGlobalContext();
  const handleClick = () => {
    setProductId(id);
    setTest(true);
    // navigateTo(`/product/${productId}`);
    console.log(id);
  };
  const handleAdd = () => {
    console.log(`add to cart`);
  };
  useEffect(() => {
    if (test) {
      navigateTo(`/product/${productId}`);
    }
  }, [productId]);
  return (
    <article
      key={id}
      className="item-container flex flex-col my-4 shadow-lg hover:bg-Dark-nude ease-linear duration-300 rounded-md hover:text-white cursor-pointer relative"
    >
      {/* <Link to={`/product/${productId}`}> */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-60 object-cover rounded-t-md"
        onClick={handleClick}
      />
      {/* </Link> */}

      <div
        onClick={handleClick}
        className="details-container p-2 flex flex-col justify-between min-h-72"
      >
        {/* <div className="item-header flex items-center justify-between w-full mb-4"> */}
        <h3 className="item-name text-xl">{title}</h3>
        {/* </div> */}
        <p className="item-desc">{description}</p>
        <p className="item-price font-extrabold text-xl tracking-wide text-white bg-Dark-nude w-20 text-center p-1 rounded-md mb-16">
          $ {price}
        </p>
      </div>
      <button
        onClick={handleAdd}
        className="border-2  mx-auto bg-Dark-nude text-white h-10 rounded-md p-2 font-bold md:text-xl flex items-center justify-center ease-linear duration-300 hover:text-Dark-nude hover:bg-white uppercase absolute bottom-0"
      >
        add to cart
      </button>
    </article>
  );
};

export default Article;
