import React from "react";
import { MdArrowBack, MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { isAuthenticated } from "../components/auth";
import Footer from "../components/Footer";
import { deleteFromCart } from "../redux/actions/cartActions";
import { ADD_TO_CART } from "../redux/constants/cartConstants";
const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handelQtyChange = (e, product) => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    cart.forEach((cartItem) => {
      if (cartItem._id === product._id) {
        cartItem.count = e.target.value;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  };

    const handelCheckOut = ()=>{
      if (isAuthenticated()) {
        navigate("/shipping")
      }else{
        navigate("/signin?redirect=shipping")
      }
    }

  return (
    <section className="cartPage m-4 mt-1">
      {cart.length <= 0 ? (
        <div className="p-4 mt-[4rem] bg-gray-100 text-gray-700">
          <h2 className="font-semibold text-2xl md:text-4xl mb-5">
            Your cart is empty
            <button
              className=" flex items-center mt-3 text-white text-xl bg-blue-400 rounded-lg px-2 "
              onClick={() => {
                navigate(-1);
              }}
            >
              <MdArrowBack /> Go Back
            </button>
          </h2>
        </div>
      ) : (
        <>
          <div className="p-4 mt-[4rem] bg-gray-100 text-gray-700">
            <h2 className="font-semibold text-2xl md:text-4xl mb-5">Cart</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 w-full">
            <div className="col-span-2 md:mb-0 mb-5">
              <div className="table-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th ></th>
                      <th >
                        Product
                      </th>
                      <th >
                        Price
                      </th>
                      <th >
                        Quantity
                      </th>
                      <th >
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((product) => {
                      return (
                        <tr
                          key={product._id}
                          className="bg-white border-b text-gray-900 text-sm md:text-xl"
                        >
                          <th
                            scope="row"
                            className=" font-medium  whitespace-nowrap text-xl py-2"
                          >
                            <img
                              className=" rounded-lg max-w-[70px] md:max-w-[110px]"
                              src={`/uploads/${product.fileName}`}
                              alt=""
                            />
                          </th>
                          <td className="">
                            <Link
                              to={`/product/${product._id}`}
                              type="button"
                              className="cursor-pointer text-blue-600"
                            >
                              {product.productName}
                            </Link>
                          </td>
                          <td className="">
                            {product.productPrice.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </td>
                          <td className=" ">
                            <input
                              type="number"
                              className="border"
                              value={product.count}
                              max={product.productQty}
                              min="1"
                              onChange={(e) => handelQtyChange(e, product)}
                            />
                          </td>
                          <td className="">
                            <button
                              onClick={() =>
                                dispatch(deleteFromCart(product))
                              }
                              type="button"
                              className=" flex cursor-pointer items-center px-2 py-1.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            >
                              <MdDelete size={20} className="" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="pl-3 max-w-full mt-8 md:mt-0">
              <h2 className="text-xl font-bold border-b py-4">Cart Summary</h2>
              <p className=" py-4 border-b text-gray-500 text-lg">
                {cart.length === 1 ? `(1) Item` : `(${cart.length}): Items`}
              </p>
              <p className="font-bold py-4 border-b text-xl">
                Total:{" "}
                {cart
                  .reduce(
                    (currentSum, currentCartItem) =>
                      currentSum +
                      currentCartItem.count * currentCartItem.productPrice,
                    0
                  )
                  .toFixed(2)}
              </p>
              <div className="flex justify-center w-full">
                <button
                  className="w-full cursor-pointer bg-gray-800 text-white py-3 my-4 mb-10 text-md md:text-xl"
                  onClick={handelCheckOut}
                >
                  Proceed To Check
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer/>
    </section>
  );
};

export default Cart;
