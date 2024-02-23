import React, { useState } from "react";
import placeholder from "./images/placeholder.png";

const Account = () => {
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : [];
  const [imgSrc, setImgSrc] = useState(placeholder);
  const [userFirstName, setUserFirstName] = useState(loadedUser.name);
  const [userEmail, setUserEmail] = useState(loadedUser.email);
  const [userUsername, setUserUsername] = useState(loadedUser.username);
  const [edit, setEdit] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(true);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(false);
  };
  return (
    <main className=" w-full grid place-items-center mt-8 ">
      <section className="flex flex-col items-center w-full md:max-w-4xl">
        <div>
          <img src={imgSrc} alt="" className="h-40 w-40 rounded-full " />
        </div>
        <form
          action=""
          // onSubmit={handleSubmit}
          className="flex flex-col w-3/5 rounded-lg shadow-lg ease-linear duration-300 hover:shadow-2xl p-4"
        >
          <label htmlFor="userFirstName" className="text-xl mb-2">
            Name:
          </label>
          <input
            type="text"
            id="userFirstName"
            name="userFirstName"
            value={userFirstName}
            onChange={(e) => !edit && setUserFirstName(e.target.value)}
            className="border-2 mb-4 border-black rounded-md text-xl ease-linear duration-300 capitalize"
          />
          <label htmlFor="userEmail" className="text-xl my-2">
            Email:
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="border-2 mb-4 border-black rounded-md text-xl ease-linear duration-300 lowercase"
          />
          <label htmlFor="userUsername" className="text-xl mb-2">
            Username:
          </label>
          <input
            type="text"
            id="userUsername"
            name="userUsername"
            value={userUsername}
            onChange={(e) => setUserUsername(e.target.value)}
            className="border-2 mb-4 border-black rounded-md text-xl ease-linear duration-300 capitalize"
          />
          {edit ? (
            <button
              onClick={handleEdit}
              className="border-2 w-3/5 bg-Dark-nude text-white h-10 rounded-md p-2 text-xl flex items-center justify-center mt-12 mx-auto ease-linear duration-300 hover:text-Dark-nude hover:bg-white"
            >
              Edit
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="border-2 w-3/5 bg-Dark-nude text-white h-10 rounded-md p-2 text-xl flex items-center justify-center mt-12 mx-auto ease-linear duration-300 hover:text-Dark-nude hover:bg-white"
            >
              Save
            </button>
          )}
          {/* <button
            type="submit"
            className="border-2 w-3/5 bg-Dark-nude text-white h-10 rounded-md p-2 text-xl flex items-center justify-center mt-12 mx-auto ease-linear duration-300 hover:text-Dark-nude hover:bg-white"
          >
            Save
          </button> */}
        </form>
      </section>
    </main>
  );
};

export default Account;
