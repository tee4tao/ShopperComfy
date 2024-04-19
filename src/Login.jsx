import React, { useEffect, useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { PiWarningCircleFill } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useGlobalContext } from "./context";

const Login = () => {
  // const [username, setUsername] = useState("");
  const { username, setUsername } = useGlobalContext();
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [danger, setDanger] = useState(false);
  const [dangerMessage, setDangerMessage] = useState("");
  const navigateTo = useNavigate();
  const loadedUser = localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : []; // To get the items saved in the local storage
  const [getUserDetail, setGetUserDetail] = useState(loadedUser);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(true);
      setType("text");
    } else {
      setIcon(false);
      setType("password");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (username !== getUserDetail.username &&
        password !== getUserDetail.password) ||
      username !== getUserDetail.username
    ) {
      setInvalid(true);
      setDanger(true);
      setDangerMessage(`Invalid username or password`);
    } else if (password !== getUserDetail.password) {
      setInvalid(false);
      setInvalidPassword(true);
      setDanger(true);
      setDangerMessage(`Invalid password`);
    } else {
      setInvalid(false);
      setInvalidPassword(false);
      navigateTo(`home/${loadedUser.username}`); // to redirect to the route(home page) after submission of the form
    }
  };
  const closeAlert = () => {
    setDanger(false);
    // setAddSuccess(false);
    // setDeleteSuccess(false);
  };
  useEffect(() => {
    let dangerAlertTime = setTimeout(() => {
      setDanger(false);
    }, 3000);
    return () => clearTimeout(dangerAlertTime);
  }, [danger]);
  // const getUser = async (id) => {
  //   try {
  //     const resp = await fetch(`https://dummyjson.com/users/${id}`);
  //     if (!resp.ok) {
  //       throw new Error(`Something went wrong ${resp.status}`);
  //     }
  //     let user = await resp.json();
  //     console.log(user);
  //     setUserUsername(user.username);
  //     setUserPassword(user.password);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <main className="h-screen w-screen flex justify-center items-center fixed">
      <section className="h-full w-full flex flex-col login-container rounded-md  justify-center items-center">
        <div className="w-4/5 h-3/4 flex flex-col justify-center items-center relative md:w-1/2">
          {danger && (
            <article className="alert h-16 w-64 flex justify-center items-center absolute top-12 right-12 bg-white overflow-hidden p-2 shadow-2xl">
              <div className="alert-container relative w-full h-full flex justify-between items-center">
                <div className="icon-message_wrap flex items-center gap-2 text-lg">
                  <div className="danger-icon text-red-600 text-2xl">
                    <PiWarningCircleFill />
                  </div>
                  <p className="alert-message capitalize">{dangerMessage}</p>
                </div>
                <div
                  className="close-icon absolute top-0 right-0 text-black ease-linear duration-300 cursor-pointer opacity-30 hover:opacity-100"
                  onClick={closeAlert}
                >
                  <AiOutlineClose />
                </div>
              </div>
              <div className="underline danger"></div>
            </article>
          )}
          <form
            action=""
            className="mb-6 h-3/4 w-3/4 hover:bg-Dark-nude flex flex-col items-center justify-center rounded-lg shadow-lg ease-linear duration-300 hover:shadow-2xl p-4"
          >
            {/* <div className="mb-4"> */}
            {/* <label htmlFor="username">Username:</label> */}
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="name border-2 w-3/5 mb-4 border-black h-14 rounded-md p-2 text-xl ease-linear duration-300"
            />
            {/* </div> */}
            <div className="password-container mb-4 flex w-3/5">
              <input
                type={type}
                name="password"
                id=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="password border-2 w-full border-black h-14 rounded-md p-2 text-xl ease-linear duration-300 "
              />
              <span
                className="flex justify-around items-center"
                onClick={handleToggle}
              >
                {icon ? (
                  <FaEye className="absolute mr-10" size={25} />
                ) : (
                  <FaEyeSlash className="absolute mr-10" size={25} />
                )}
              </span>
            </div>
            {/* <div className="text-red-600">
              {invalid
                ? `Invalid username or password`
                : invalidPassword
                ? `Invalid password`
                : ``}
            </div> */}
            {/* )} */}
            <button
              type="submit"
              className="border-2 w-3/5 bg-Dark-nude text-white h-10 rounded-md p-2 text-xl flex items-center justify-center mt-12 ease-linear duration-300 hover:text-Dark-nude hover:bg-white"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
          <div>
            Don't have an acount? Sign up{" "}
            <Link
              to="register"
              className="text-Dark-nude ease-linear duration-300 hover:text-black hover:underline"
            >
              here
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
