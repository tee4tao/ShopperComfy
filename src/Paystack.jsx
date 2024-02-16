import React, { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";

const Paystack = () => {
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : [];
  let totalCost = localStorage.getItem(`totalcost`);
  const publicKey = "pk_test_966df8c4dafebc42e4007bdaf9453268d7e1fa29";
  let amount = totalCost;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  };

  return (
    <div className="App  w-full grid place-items-center mt-8">
      <div className="container flex flex-col w-full md:max-w-4xl shadow-2xl">
        <div className="item">
          <div className="item-details">
            <p>{amount}</p>
          </div>
        </div>
        <div className="checkout-form p-5">
          <form className="flex flex-col">
            <label className="text-xl mb-2">Name</label>
            <input
              className="border-2 rounded-md text-xl capitalize"
              type="text"
              id="name"
              value={loadedUser.name}
              // onChange={(e) => setName(e.target.value)}
            />
            <label className="text-xl my-2">Email</label>
            <input
              className="border-2 rounded-md text-xl"
              type="text"
              id="email"
              placeholder={loadedUser.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-xl my-2">Phone</label>
            <input
              className="border-2 rounded-md text-xl"
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </form>
          <PaystackButton
            {...componentProps}
            className=" border-4 text-white text-xl w-32 bg-Dark-nude p-2 rounded-xl ease-linear duration-300 hover:bg-white hover:text-Dark-nude mt-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Paystack;
