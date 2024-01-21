import { React, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { PiWarningCircleFill } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useGlobalContext } from "./context";

const SignUp = () => {
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);
  const [danger, setDanger] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const navigateTo = useNavigate();
  const { username, setUsername } = useGlobalContext();
  const detail = {
    name: name,
    email: email,
    username: username,
    password: password,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name != `` && email != `` && username != `` && password != ``) {
      setUserDetail({ ...detail });
      console.log(userDetail);
      setDanger(false);
    } else {
      setDanger(true);
    }
  };
  const handleToggle = () => {
    if (type === "password") {
      setIcon(true);
      setType("text");
    } else {
      setIcon(false);
      setType("password");
    }
  };
  useEffect(() => {
    if (Object.keys(userDetail).length != 0) {
      localStorage.setItem(`userDetail`, JSON.stringify(userDetail));
      navigateTo("/"); // to redirect to the route(login page) after submission of the form
    }
  }, [detail]);
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
                  <p className="alert-message capitalize">
                    please provide value
                  </p>
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
            onSubmit={handleSubmit}
          >
            {/* <div className="mb-4"> */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="name border-2 w-3/5 mb-4 border-black h-14 rounded-md p-2 text-xl ease-linear duration-300 md:w-3/5"
            />
            {/* </div> */}
            {/* <div className="mb-4"> */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="username border-2 mb-4 w-3/5 border-black h-14 rounded-md p-2 text-xl ease-linear duration-300"
            />
            {/* </div> */}
            {/* <div className="mb-4"> */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="email border-2 mb-4 w-3/5 border-black h-14 rounded-md p-2 text-xl ease-linear duration-300"
            />
            {/* </div> */}
            <div className="password-container mb-4 flex w-3/5">
              <input
                type={type}
                name="password"
                id=""
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="password border-2 w-full border-black h-14 rounded-md p-2 text-xl ease-linear duration-300 "
              />
              <span
                className="flex justify-around items-center"
                onClick={handleToggle}
              >
                {icon ? (
                  <FaEye className="open-eye absolute mr-10" size={25} />
                ) : (
                  <FaEyeSlash className="close-eye absolute mr-10" size={25} />
                )}
              </span>
            </div>
            <button
              type="submit"
              className="border-2 w-3/5 bg-Dark-nude hover:text-Dark-nude hover:bg-white h-10 rounded-md p-2 text-xl flex items-center justify-center mt-12 ease-linear duration-300 text-white"
            >
              Register
            </button>
          </form>
          <div>
            You already have an acount? Login{" "}
            <Link
              to="/"
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

export default SignUp;
