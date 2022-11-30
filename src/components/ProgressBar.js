import React from "react";
import { Link } from "react-router-dom";

const ProgressBar = ({ step1, step2, step3 }) => {
  return (
    <>
      <nav className="rounded-md w-full">
        <ol className="list-reset flex">
          {step1 ? (
            <li className="text-gray-500">
              <Link to="/shipping" className="text-blue-500 hover:underline">
                Shipping
              </Link>
            </li>
          ) : (
            <li className="text-gray-500">
              <Link
                to="/3"
                onClick={(e) => e.preventDefault()}
                className="text-gray-500 cursor-not-allowed"
              >
                Shipping
              </Link>
            </li>
          )}
          {step2 ? (
            <li className="text-gray-500">
              <Link to="/payment" className="text-blue-500 hover:underline">
              <span className="text-gray-500 mx-2">/</span>
                Payment
              </Link>
            </li>
          ) : (
            <li className="text-gray-500">
              <Link
                to="/3"
                onClick={(e) => e.preventDefault()}
                className="text-gray-500 cursor-not-allowed"
              ><span className="text-gray-500 mx-2">/</span>
                Payment
              </Link>
            </li>
          )}
          {step3 ? (
            <li className="text-gray-500">
              <Link to="/placeorder" className="text-blue-500 hover:underline">
              <span className="text-gray-500 mx-2">/</span>
                Place Order
              </Link>
            </li>
          ) : (
            <li className="text-gray-500">
              <Link
                to="/3"
                onClick={(e) => e.preventDefault()}
                className="text-gray-500 cursor-not-allowed"
              ><span className="text-gray-500 mx-2">/</span>
                Place Order
              </Link>
            </li>
          )}
        </ol>
      </nav>
    </>
  );
};

export default ProgressBar;
