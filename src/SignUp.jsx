import { React, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const detail = {
    name: name,
    email: email,
    username: username,
    password: password,
  };
  const handleSubmit = (e) => {
    // if (Object.keys(detail).length != 0) {
    //   console.log(`empty`);
    // }
    e.preventDefault();
    if (
      name != `` &&
      email != `` &&
      username != `` &&
      password != ``
      // Object.keys(userDetail).length != 0
    ) {
      setUserDetail({ ...detail });
      console.log(userDetail);
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
      // console.log(`weere`);
      // console.log(userDetail);
    }
    // if (name != `` && email != `` && username != `` && password != ``) {
    //   console.log(`not empty`);
    //   const userDetail = {
    //     name: name,
    //     email: email,
    //     username: username,
    //     password: password,
    //   };
    //   console.log(userDetail);
    //   setDetail({ ...userDetail });
    // }
    // fetch("https://dummyjson.com/users/add", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     firstName: firstName,
    //     lastName: lastName,
    //     username: username,
    //     email: email,
    //     password: password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then(console.log);
    localStorage.setItem;
  }, [detail]);
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <section className=" w-80 login-container rounded-md flex-col justify-center items-center">
        <form action="" className="mb-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="border-2 w-72 border-black h-14 rounded-md p-2 text-xl ease-linear duration-300 md:w-96"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="border-2 w-72 border-black h-14 rounded-md p-2 text-xl ease-linear duration-300 md:w-96"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="border-2 w-72 border-black h-14 rounded-md p-2 text-xl ease-linear duration-300 md:w-96"
            />
          </div>
          <div className="mb-4 flex w-96">
            <input
              type={type}
              name="password"
              id=""
              value={password}
              minLength={8}
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

          {/* <div className="text-red-600">
            {invalid && `Invalid username or password`}
            {invalidPassword && `Invalid password`}
          </div> */}

          <button
            type="submit"
            className="border-2 w-72 bg-Dark-nude text-white h-10 rounded-md p-2 text-xl flex items-center justify-center mt-12 ease-linear duration-300 hover:text-Dark-nude hover:bg-white md:w-96"
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
      </section>
    </main>
  );
};

export default SignUp;
