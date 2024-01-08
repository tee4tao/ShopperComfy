import React, { useEffect, useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
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
      (username !== userUsername && password !== userPassword) ||
      username !== userUsername
    ) {
      setInvalid(true);
    } else if (password !== userPassword) {
      setInvalidPassword(true);
    } else {
      setInvalid(false);
      setInvalidPassword(false);
    }
    // if (
    //   username === `` ||
    //   password === `` ||
    //   username !== userUsername ||
    //   password !== userpassword
    // ) {
    //   setInvalid(true);
    // } else {
    //   setInvalid(false);
    // }
  };
  const getUser = async () => {
    try {
      const resp = await fetch("https://dummyjson.com/users/1");
      if (!resp.ok) {
        throw new Error(`Something went wrong ${resp.status}`);
      }
      let user = await resp.json();
      console.log(user);
      setUserUsername(user.username);
      setUserPassword(user.password);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  }, [username, password]);
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <section className=" w-80 login-container rounded-md flex justify-center items-center">
        <form action="" className="" onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* <label htmlFor="username">Username:</label> */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="border-2 w-72 border-black h-14 rounded-md p-2 text-xl ease-linear duration-300 md:w-96"
            />
          </div>
          <div className="mb-4 flex">
            <input
              type={type}
              name="password"
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="border-2 w-72 border-black h-14 rounded-md p-2 text-xl ease-linear duration-300 md:w-96"
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
          {/* {invalid && ( */}
          <div className="text-red-600">
            {invalid && `Invalid username or password`}
            {invalidPassword && `Invalid password`}
          </div>
          {/* )} */}
          <button
            type="submit"
            className="border-2 w-72 bg-Dark-nude text-white h-10 rounded-md p-2 text-xl flex items-center justify-center mt-12 ease-linear duration-300 hover:text-Dark-nude hover:bg-white md:w-96"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
