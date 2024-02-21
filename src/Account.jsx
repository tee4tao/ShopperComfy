import React, { useState } from "react";
import placeholder from "./images/placeholder.png";

const Account = () => {
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : [];
  const [imgSrc, setImgSrc] = useState(placeholder);
  const [firstName, setFirstName] = useState(loadedUser.name);
  return (
    <main className=" w-full grid place-items-center mt-8 ">
      <section className="flex flex-col items-center w-full md:max-w-4xl">
        <div>
          <img src={imgSrc} alt="" className="h-40 w-40 rounded-full " />
        </div>
        <form
          action=""
          className="flex flex-col w-11/12 rounded-lg shadow-lg ease-linear duration-300 hover:shadow-2xl p-4"
        >
          {/* <div className=" flex flex-col"> */}
          <label htmlFor="firstName" className="text-xl mb-2">
            Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="FirstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border-2 mb-4 border-black rounded-md text-xl ease-linear duration-300 text-center"
          />
          {/* </div> */}
        </form>
      </section>
    </main>
  );
};

export default Account;
