import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { ErrMessages, SuccMessages } from "../components/Messages";
import { Loading } from "../components/Loading";
import { signup } from "../api/auth";
import { isAuthenticated } from "../components/auth";

const SignUp = () => {
  const navigate = useNavigate()
  const [signinBtn, setSigninBtn] = useState(false)
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    error: false,
    success: false,
    loading: false,
  });
  const { username, email, password, password2, error, success, loading } =
    inputData;

    useEffect(()=>{
      if (isAuthenticated() && isAuthenticated().role === 1) {
        navigate("/admin/dashboard")
      } 
      else if(isAuthenticated() && isAuthenticated().role === 0){
        navigate("/user/dashboard")
      }
    },[navigate])

  const handelChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
      error: "",
      success: "",
    });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setInputData({
        ...inputData,
        error: "All Fields are required",
      });
    } else if (!isEmail(email)) {
      setInputData({
        ...inputData,
        error: "Invalid Email",
      });
    } else if (!equals(password, password2)) {
      setInputData({
        ...inputData,
        error: "Passwords dose not match",
      });
    } else {
      const { username, email, password } = inputData;
      const data = { username, email, password };
      setInputData({ ...inputData, loading: true });

      signup(data)
        .then((resopnse) => {
          console.log("Axios Signup success:", resopnse);
          setInputData({
            username: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            success: resopnse.data.successMessage,
          });
          setSigninBtn(true)

        })
        .catch((err) => {
          console.log("Axios Error: ", err);
          setInputData({
            ...inputData,
            error: err.response.data.errorMessage,
          });
        });
    }

  };
  return (
    <section>

    <div className="flex flex-col justify-center items-center mt-[6rem]">
      {loading && <div className="w-full">{Loading()}</div>}
      <div className="text-center mt-10 ">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl uppercase text-gray-800">
          Create Account To Begin
        </h1>
        <p className="text-lg text-gray-500 pb-3 md:text-xl lg:text-xl ">
          Ensure to fill the inputs corretly
        </p>
      </div>
      {success && <div className="w-full md:w-[60%] lg:w-[42%]">{SuccMessages(success)}</div>}
      {error && <div className="w-full md:w-[60%] lg:w-[42%]">{ErrMessages(error)}</div>}
      <form
        className="flex flex-col items-center w-full px-6 md:w-[60%] lg:w-[45%]"
        onSubmit={handelSubmit}
      >
        <div className="flex items-center w-full mt-6">
          <input
            onChange={handelChange}
            name="username"
            value={username}
            type="text"
            placeholder="Username"
            className="w-[100%] bg-gray-200 outline-none rounded-sm p-3 text-lg"
          />
        </div>
        <div className="flex items-center w-full mt-4">
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
        <div className="flex items-center w-full mt-3">
          <input
            onChange={handelChange}
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            className="w-[100%] bg-gray-200 outline-none rounded-sm p-3"
          />
        </div>
        <div className="flex items-center w-full mt-3">
          <input
            onChange={handelChange}
            name="password2"
            value={password2}
            type="password"
            placeholder="Re-typ Password"
            className="w-[100%] bg-gray-200 outline-none rounded-sm p-3"
          />
        </div>
        <button className="mt-3 w-full text-lg uppercase p-2 text-white rounded-sm bg-gray-800 hover:bg-gray-600">
          Submit
        </button>
        <p className="mt-3 text-lg font-bold text-gray-800">Already had an account?</p>
        {signinBtn ? (<button className="w-full text-lg uppercase p-2 text-white bg-yellow-500">
          <Link to="/signin">Sign In</Link>{" "}
        </button>) : (<button className="w-full text-lg uppercase p-2 text-gray-800 hover:bg-yellow-500 ease-in-out duration-150 hover:text-white mt-2">
          <Link to="/signin">Sign In</Link>{" "}
        </button>)}
        
      </form>
    </div>
      <div className="mt-[1rem]">
      <p className='text-center p-3 text-gray-800 text-md md:text-lg'>&copy;copywrite, Gina's Kitchen, 2022</p>
      </div>
    </section>
  );
};

export default SignUp;
