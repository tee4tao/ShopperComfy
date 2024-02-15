import React, { useState } from "react";
import { PaystackButton } from "react-paystack";

const Paystack = () => {
  const publicKey = "pk_your_public_key_here";
  const amount = 1000000;
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
      <div className="container flex flex-col w-full md:max-w-4xl">
        <div className="item">
          <div className="item-details">
            <p>{amount}</p>
          </div>
        </div>
        <div className="checkout-form p-5">
          <form className="flex flex-col">
            <label>Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Phone</label>
            <input
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </form>
          <PaystackButton {...componentProps} />
        </div>
      </div>
    </div>
  );
};

export default Paystack;
