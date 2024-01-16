import React from "react";

const Article = ({ items }) => {
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
  //   console.log(brand);
  return (
    <article
      key={id}
      className="item-container flex flex-col my-4 shadow-lg hover:bg-Dark-nude ease-linear duration-300 rounded-md hover:text-white"
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-60 object-cover rounded-t-md"
      />
      <div className="details-container p-2">
        {/* <div className="item-header flex items-center justify-between w-full mb-4"> */}
        <h3 className="item-name text-xl">{title}</h3>
        {/* </div> */}
        <p className="item-desc">{description}</p>
        <p className="item-price font-extrabold text-xl tracking-wide text-white bg-Dark-nude w-20 text-center p-1 rounded-md">
          $ {price}
        </p>
        <button className="border-2  mx-auto bg-Dark-nude text-white h-10 rounded-md p-2 text-xl flex items-center justify-center mt-12 ease-linear duration-300 hover:text-Dark-nude hover:bg-white uppercase">
          add to cart
        </button>
      </div>
    </article>
  );
};

export default Article;
