import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { isAuthenticated, logout } from "./auth";
import {
  FaEdit,
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaSignInAlt,
} from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
import {} from "react-icons/ai";

//redux
import { useSelector } from "react-redux";

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const handelMenu = () => {
    setMenu(!menu);
  };
  const handelLogout = () => {
    logout(() => {
      navigate("/", { replace: true });
    });
  };
  return (
    <div className=" w-[100vw] header fixed top-0 z-50">
      <div className="w-full md:px-10 px-2 relative">
        <div className=" w-full flex items-center justify-between text-black px-10 py-4 ">
          <h1 className="text-2xl font-bold text-[#7c2d12]">LOGO.</h1>

          {/* navigation for md & lg screen */}

          <div className="flex-1">
            <ul className="md:flex float-right hidden text-black uppercase ">
              {!isAuthenticated() && (
                <Fragment>
                  <li className="mx-4">
                    {" "}
                    <Link to="/" className="flex items-center">
                      <FaHome className="mx-1 text-md" />
                      Home
                    </Link>
                  </li>

                  <li className="mx-4">
                    {" "}
                    <Link to="/shop" className="flex items-center">
                      <FaShoppingBag className="mx-1 text-md" />
                      Shop
                    </Link>
                  </li>
                  <li className="mx-4 relative">
                    {" "}
                    <Link to="/cart" className="flex items-center">
                      <FaShoppingCart className="mx-1 text-md" />
                      Cart{" "}
                      <span className="text-sm absolute top-[-50%] right-[-25px] bg-red-500 px-2 text-white rounded-md">
                        {cart.length}
                      </span>
                    </Link>
                  </li>
                  <li className="mx-4">
                    {" "}
                    <Link to="/signin" className="flex items-center">
                      <FaSignInAlt className="mx-1 text-md" />
                      Sign In
                    </Link>
                  </li>
                  <li className="mx-4">
                    {" "}
                    <Link to="/signup" className="flex items-center">
                      <FaEdit className="mx-1 text-md" />
                      Sign Up
                    </Link>
                  </li>
                </Fragment>
              )}
              {isAuthenticated() && isAuthenticated().role === 0 && (
                <Fragment>
                  <li className="mx-4">
                    {" "}
                    <Link to="/user/dashboard" className="flex items-center">
                      <MdDashboard className="mx-1 text-md" />
                      Dashboard
                    </Link>
                  </li>
                  <li className="mx-4">
                    {" "}
                    <Link to="/" className="flex items-center">
                      <FaHome className="mx-1 text-md" />
                      Home
                    </Link>
                  </li>

                  <li className="mx-4">
                    {" "}
                    <Link to="/shop" className="flex items-center">
                      <FaShoppingBag className="mx-1 text-md" />
                      Shop
                    </Link>
                  </li>
                  <li className="mx-4 relative">
                    {" "}
                    <Link to="/cart" className="flex items-center">
                      <FaShoppingCart className="mx-1 text-md" />
                      Cart{" "}
                      <span className="text-sm absolute top-[-50%] right-[-25px] bg-red-500 px-2 text-white rounded-md">
                        {cart.length}
                      </span>
                    </Link>
                  </li>
                </Fragment>
              )}

              {isAuthenticated() && isAuthenticated().role === 1 && (
                <Fragment>
                  <li className="mx-4">
                    {" "}
                    <Link to="/admin/dashboard" className="flex items-center">
                      <MdDashboard className="mx-1 text-md" />
                      Dashboard
                    </Link>
                  </li>
                </Fragment>
              )}

              {isAuthenticated() && (
                <Fragment>
                  <li className="mx-4">
                    {" "}
                    <button
                      onClick={handelLogout}
                      className="flex items-center"
                    >
                      <MdLogout className="mx-1 text-md" />
                      LOGOUT
                    </button>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
          {/* navigation for md & lg screen ended*/}

          {/* navigation for sm screen */}
          <div> 
            <ul
              className={
                menu
                  ? "fixed left-0 top-0 bg-white w-[60%] border-r h-screen ease-in-out duration-500"
                  : "fixed left-[-100%] top-0 ease-in-out duration-500"
              }
            >
              <h1 className="text-2xl font-bold m-6 text-[#7c2d12] ">LOGO.</h1>

              {!isAuthenticated() && (
                <Fragment>
                  <li className="m-6 border-b">
                    {" "}
                    <Link to="/" className="flex items-center">
                      <FaHome className="mx-1 text-md" />
                      Home
                    </Link>
                  </li>
                  <li className="m-6 border-b">
                    {" "}
                    <Link to="/shop" className="flex items-center">
                      <FaShoppingBag className="mx-1 text-md" />
                      Shop
                    </Link>
                  </li>
                  <li className="m-6 border-b" style={{ position: "relative" }}>
                    {" "}
                    <Link to="/cart" className="flex items-center">
                      <FaShoppingCart className="mx-1 text-md" />
                      Cart{" "}
                      <span
                        className="rounded-md ml-2 text-sm"
                        style={{
                          background: "red",
                          color: "white",
                          padding: " .01rem .5rem",
                        }}
                      >
                        {cart.length}
                      </span>
                    </Link>
                  </li>
                  <li className="m-6 border-b">
                    {" "}
                    <Link to="/signin" className="flex items-center">
                      <FaSignInAlt className="mx-1 text-md" />
                      Sign In
                    </Link>
                  </li>
                  <li className="m-6">
                    {" "}
                    <Link to="/signup" className="flex items-center">
                      <FaEdit className="mx-1 text-md" />
                      Sign Up
                    </Link>
                  </li>
                </Fragment>
              )}
              {isAuthenticated() && isAuthenticated().role === 0 && (
                <Fragment>
                  <li className="m-6 border-b">
                    {" "}
                    <Link to="/user/dashboard" className="flex items-center">
                      <MdDashboard className="mx-1 text-md" />
                      Dashboard
                    </Link>
                  </li>
                  <li className="m-6 border-b">
                    {" "}
                    <Link to="/" className="flex items-center">
                      <FaHome className="mx-1 text-md" />
                      Home
                    </Link>
                  </li>
                  <li className="m-6 border-b">
                    {" "}
                    <Link to="/shop" className="flex items-center">
                      <FaShoppingBag className="mx-1 text-md" />
                      Shop
                    </Link>
                  </li>
                  <li className="m-6 border-b" style={{ position: "relative" }}>
                    {" "}
                    <Link to="/cart" className="flex items-center">
                      <FaShoppingCart className="mx-1 text-md" />
                      Cart{" "}
                      <span
                        className="rounded-md ml-2 text-sm"
                        style={{
                          background: "red",
                          color: "white",
                          padding: " .01rem .5rem",
                        }}
                      >
                        {cart.length}
                      </span>
                    </Link>
                  </li>
                </Fragment>
              )}

              {isAuthenticated() && isAuthenticated().role === 1 && (
                <Fragment>
                  <li className="m-6 border-b">
                    {" "}
                    <Link to="/admin/dashboard" className="flex items-center">
                      <MdDashboard className="mx-1 text-md" />
                      Dashboard
                    </Link>
                  </li>
                </Fragment>
              )}

              {isAuthenticated() && (
                <Fragment>
                  <li className="m-6 border-b">
                    {" "}
                    <button
                      onClick={handelLogout}
                      className="flex items-center"
                    >
                      <MdLogout className="mx-1 text-md" />
                      Logout
                    </button>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
          {/* navigation for sm screen */}

          <div className="md:hidden">
            {!menu ? (
              <AiOutlineMenu
                size={30}
                className="cursor-pointer bg-white p-1 rounded-sm"
                onClick={handelMenu}
              />
            ) : (
              <AiOutlineClose
                size={30}
                className="cursor-pointer bg-white p-1 rounded-sm"
                onClick={handelMenu}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
