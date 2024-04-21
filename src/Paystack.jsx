import React, { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import { useGlobalContext } from "./context";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm";
// const stripePromise = loadStripe(
//   "pk_test_51OkjzaA31SZONt1uKcTrxNsz5fPeVbEDXHLlYsT8YaCy1UhaTetvrwRlPleUvQUx1HQFlWmi0t6SxDvjkP1vzkvB009kQrjkIC"
// );

const Paystack = () => {
  // const options = {
  //   // passing the client secret obtained from the server
  //   // clientSecret: "{{CLIENT_SECRET}}",
  //   mode: "payment",
  //   amount: 1099,
  //   currency: "usd",
  //   // Fully customizable with appearance API.
  //   appearance: {
  //     /*...*/
  //   },
  // };

  // return (
  //   <Elements stripe={stripePromise} options={options}>
  //     <CheckoutForm />
  //   </Elements>
  // );
  ///////////////////
  let { setShowCategory } = useGlobalContext();
  const [rate, setRate] = useState(0);
  // const navigateTo = useNavigate();
  const getRate = async () => {
    try {
      const resp = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json` //https://github.com/fawazahmed0/exchange-api?tab=readme-ov-file //the api github repo
      );
      if (!resp.ok) {
        throw new Error(`Something went wrong, ${resp.status}`);
      }
      let convert = await resp.json();
      // console.log(product);
      setRate(convert.usd.ngn);
    } catch (err) {
      console.log(err);
      //  setErrMessage(err.message);
      //  setIsError(true);
      //  setIsLoading(false);
    }
  };
  useEffect(() => {
    getRate();
  }, []);
  // console.log(rate);
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : [];
  let totalCost = localStorage.getItem(`totalcost`);
  const publicKey = "pk_test_966df8c4dafebc42e4007bdaf9453268d7e1fa29";
  let amount = 2000000 * 100; //parseFloat(totalCost * 100 * rate.toFixed(2));
  // alert(typeof amount);
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
    onSuccess: () => {
      window.location.href = `/home/${loadedUser.username}`;
      localStorage.removeItem(`productList`);
    },
    // alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
    // callback_url: `home/${loadedUser.username}`,
  };
  return (
    <div
      className="App  w-full grid place-items-center mt-8"
      onClick={() => {
        setShowCategory(false);
      }}
    >
      <div className="container flex flex-col w-full md:max-w-4xl shadow-2xl">
        <div className="item">
          <div className="item-details">
            <p className="text-xl p-3 font-bold text-Dark-nude">
              NGN 2000
              {/* NGN {(amount / 100).toLocaleString()} */}
            </p>
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
              // value={loadedUser.email}
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
