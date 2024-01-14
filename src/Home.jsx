import React, { useEffect, useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const getProduct = async (id) => {
    try {
      const resp = await fetch(`https://dummyjson.com/products`);
      if (!resp.ok) {
        throw new Error(`Something went wrong ${resp.status}`);
      }
      let product = await resp.json();
      console.log(product);
      setProducts(product);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <main className="min-h-screen  w-screen">
      {products.products.map((items) => console.log(items))}
    </main>
  );
};

export default Home;
