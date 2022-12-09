import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Loading } from "../components/Loading";
import { ErrMessages } from "../components/Messages";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { signin } from "../api/auth";
import { isAuthenticated, setAuthentication } from "../components/auth";

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
  });
  const { email, password, error, loading } = inputData;

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      navigate("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      navigate("/user/dashboard");
    }
  }, [navigate]);
  const handelChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(email) || isEmpty(password)) {
      setInputData({
        ...inputData,
        error: "All Fields are required",
      });
    } else if (!isEmail(email)) {
      setInputData({
        ...inputData,
        error: "Invalid Email",
      });
    } else {
      const { email, password } = inputData;
      const data = { email, password };
      setInputData({ ...inputData, loading: true });
      signin(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);
          const redirect = location.search.split("=")[1];

          if (isAuthenticated() && isAuthenticated().role === 1) {
            console.log("redirect to admin dash");
            navigate("/admin/dashboard");
          } else if (
            isAuthenticated() &&
            isAuthenticated().role === 0 &&
            !redirect
          ) {
            console.log("redirect to user dash");
            navigate("/user/dashboard");
          } else {
            navigate("/shipping");
          }
        })
        .catch((err) => {
          console.log("Signin api error:", err);
          setInputData({
            ...inputData,
            loading: false,
            error: err.response.data.errorMessage,
          });
        });
    }
  };

  return (
    <section className="h-[100vh]">

    <div className="flex flex-col justify-center items-center mt-[7rem]">
      {loading && <div className="w-full">{Loading()}</div>}
      <div className="text-center mt-10 ">
        <h1 className="font-bold text-gray-800 text-2xl md:text-3xl lg:text-4xl uppercase">
          Login
        </h1>
        <p className="text-lg text-gray-500 pb-3 md:text-xl lg:text-xl ">
          Ensure to fill the inputs corretly
        </p>
      </div>
      {error && (
        <div className="w-full md:w-[60%] lg:w-[42%]">{ErrMessages(error)}</div>
      )}
      <form
        className="flex flex-col items-center w-full px-6 md:w-[60%] lg:w-[45%]"
        onSubmit={handelSubmit}
      >
        <div className="flex items-center w-full mt-6">
          <input
            onChange={handelChange}
            name="email"
            value={email}
            type="email"
            formNoValidate
            placeholder="Email"
            className="w-[100%] bg-gray-200 outline-none rounded-sm p-3"
          />
        </div>
        <div className="flex items-center w-full mt-4">
          <input
            onChange={handelChange}
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            className="w-[100%] bg-gray-200 outline-none rounded-sm p-3"
          />
        </div>
        <button className="mt-4 w-full text-lg uppercase p-2 text-white rounded-sm bg-gray-800 hover:bg-gray-600">
          Submit
        </button>
        <p className="mt-3 text-lg font-bold text-gray-800">Don't have an account?</p>
        <button className="w-full text-lg uppercase p-2 text-gray-800 hover:bg-yellow-500 ease-in-out duration-150 hover:text-white mt-2">
          <Link to="/signup">Sign Up</Link>{" "}
        </button>
      </form>
      <div className=""></div>
    </div>
    <div className="mt-[1rem]">
      <p className='text-center p-3 text-gray-800 text-md md:text-lg'>&copy;copywrite, Gina's Kitchen, 2022</p>
      </div>
    </section>
  );
};

export default SignIn;
