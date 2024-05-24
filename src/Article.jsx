import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "./context";

const Article = ({ items }) => {
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
  let { productId, setProductId, setShowCategory } = useGlobalContext();
  return (
    <article
      key={id}
      className="item-container flex flex-col my-4 shadow-lg hover:shadow-2xl hover:bg-Dark-nude ease-linear duration-300 rounded-md hover:text-white cursor-pointer relative"
      onClick={() => {
        setShowCategory(false);
      }}
    >
      <Link to={`product/${id}`}>
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-60 object-cover rounded-t-md"
        />

        <div
          className="details-container p-2 flex flex-col justify-between min-h-72"
        >
          <h3 className="item-name text-xl">{title}</h3>
          <p className="item-desc">{description}</p>
          <p className="item-price font-extrabold text-xl tracking-wide text-white bg-Dark-nude w-max text-center p-1 rounded-md mb-16">
            $ {price}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default Article;
