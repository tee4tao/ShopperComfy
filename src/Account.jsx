import React, { useState, useEffect } from "react";
import placeholder from "./images/placeholder.png";

const Account = () => {
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : [];
  const loadedImg = localStorage.getItem("recent-image")
    ? localStorage.getItem("recent-image")
    : [];
  // console.log(loadedUser);
  const [imgSrc, setImgSrc] = useState(placeholder);
  const [userFirstName, setUserFirstName] = useState(loadedUser.name);
  const [userEmail, setUserEmail] = useState(loadedUser.email);
  const [userUsername, setUserUsername] = useState(loadedUser.username);
  const [userDetail, setUserDetail] = useState({});
  const [edit, setEdit] = useState(true);
  const detail = {
    name: userFirstName,
    email: userEmail,
    username: userUsername,
    password: loadedUser.password,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(true);
    setUserDetail({ ...detail });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(false);
  };
  const handleImage = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]));
    // setImgSrc(loadedImg);
    // setImgSrc(uploader(e.target.files[0]));
    // uploader();
    uploader(e.target.files[0]);
  };
  const uploader = (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      localStorage.setItem("recent-image", reader.result);
    });
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (localStorage.getItem("recent-image")) {
      setImgSrc(localStorage.getItem("recent-image"));
    }
  }, [imgSrc]);
  useEffect(() => {
    // if (!localStorage.getItem("recent-image")) {
    //   setImgSrc(placeholder);
    // }
    // if (imgSrc != placeholder) {
    //   localStorage.setItem(`userImg`, imgSrc);
    // }
    // if (loadedImg) {
    //   setImgSrc(loadedImg);
    // }
  }, [imgSrc]);
  useEffect(() => {
    if (Object.keys(userDetail).length != 0) {
      localStorage.setItem(`userDetail`, JSON.stringify(userDetail));
    }
  }, [userDetail]);
  return (
    <main className=" w-full grid place-items-center mt-8 ">
      <section className="flex flex-col items-center w-full md:max-w-4xl">
        <div className="flex flex-col justify-center items-center">
          <img
            src={imgSrc}
            alt=""
            className="h-40 w-40 rounded-full border-Dark-nude border-2 object-cover"
          />
          {!edit && <input type="file" onChange={handleImage} />}
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
            onChange={(e) => !edit && setUserEmail(e.target.value)}
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
            onChange={(e) => !edit && setUserUsername(e.target.value)}
            className="border-2 mb-4 border-black rounded-md text-xl ease-linear duration-300"
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
