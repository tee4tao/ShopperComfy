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
  const [auth, setAuth] = useState(false);
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
    console.log(auth);
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
      setAuth(true);
    }
    // if (username === userUsername && password === userPassword) {
    //   setAuth(true);
    //   console.log(`core`);
    // }
  };
  const getUser = async (id) => {
    try {
      const resp = await fetch(`https://dummyjson.com/users/${id}`);
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
    getUser(1);
  }, [username, password]);
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <section className=" w-80 login-container rounded-md flex-col justify-center items-center">
        <form action="" className="mb-6" onSubmit={handleSubmit}>
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
          <div className="mb-4 flex w-96">
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

          {username === userUsername && password === userPassword && (
            <Link to={"home"}>
              <button
                type="submit"
                className="border-2 w-72 bg-Dark-nude text-white h-10 rounded-md p-2 text-xl flex items-center justify-center mt-12 ease-linear duration-300 hover:text-Dark-nude hover:bg-white md:w-96"
              >
                Login
              </button>
            </Link>
          )}
          {(username === userUsername && password === userPassword) || (
            <button
              type="submit"
              className="border-2 w-72 bg-Dark-nude text-white h-10 rounded-md p-2 text-xl flex items-center justify-center mt-12 ease-linear duration-300 hover:text-Dark-nude hover:bg-white md:w-96"
            >
              Login
            </button>
          )}
          {/* {auth || (
            <button
              type="submit"
              className="border-2 w-72 bg-Dark-nude text-white h-10 rounded-md p-2 text-xl flex items-center justify-center mt-12 ease-linear duration-300 hover:text-Dark-nude hover:bg-white md:w-96"
            >
              Loin
            </button>
          )} */}
          {/* <button
            type="submit"
            className="border-2 w-72 bg-Dark-nude text-white h-10 rounded-md p-2 text-xl flex items-center justify-center mt-12 ease-linear duration-300 hover:text-Dark-nude hover:bg-white md:w-96"
          >
            {auth && <Link to={`home`}>Login</Link>}
            {!auth && `Login`}
          </button> */}
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
      </section>
    </main>
  );
};

export default Login;
