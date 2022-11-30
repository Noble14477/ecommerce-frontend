import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

//redx
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
const Card = ({ product, adminPage = false, homePage = false }) => {
  const dispatch = useDispatch();

  const handelAddToCart = ()=>{
    dispatch(addToCart(product))
  }
  return (
    <div className="w-full ">
      <div className="">
        <div className="rounded-lg border mt-3 shadow-lg bg-white max-w-[320px] mx-auto sm:mx-1 md:mx-1">
          <Link to="/">
            <img
              className="rounded-t-lg w-full h-[200px]"
              src={`/uploads/${product.fileName}`}
              alt=""
            />
          </Link>
          <div className="py-6 px-3">
            <h4 className="text-gray-900 text-xl font-medium mb-2">
              {" "}
              {product.productName}
            </h4>
            <h6 className="text-gray-900 text-lg font-medium mb-2">
              {product.productPrice.toLocaleString('en-US', {
                style: 'currency',
                currency: "USD",
              })}
            </h6>
            <p className="py-4 text-lg md:text-xl text-gray-500">
              Staus: {product.productQty <= 0 ? "Out of Stock" : "In Stock"}
            </p>
            <p>
              {" "}
              {product.productDesc.length > 60
                ? product.productDesc.substring(0, 60) + "..."
                : product.productDesc.substring(0, 60)}
            </p>

            {adminPage && (
              <div className="flex justify-between items-center mt-3">
                <Link
                  to={`/admin/edit/product/${product._id}`}
                  type="button"
                  className=" flex  items-center px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  <MdEdit size={20} className="ml-2" />
                  Edit
                </Link>
                <button
                  onClick={() => dispatch(deleteProduct(product._id))}
                  type="button"
                  className=" flex  items-center px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  <MdDelete size={20} className="ml-2" />
                  Delete
                </button>
              </div>
            )}

            {homePage && (
              <div className="flex justify-between items-center mt-3">
                <Link
                  to={`/product/${product._id}`}
                  type="button"
                  className=" flex  items-center px-2 py-2.5 bg-blue-500 text-white font-medium text-xs uppercase rounded cursor-pointer"
                >
                  View Product
                </Link>
                <button
                  disabled={product.productQty <= 0 }
                  type="button"
                  className=" flex  items-center px-2 py-2.5 bg-yellow-500 text-white font-medium text-xs  uppercase rounded cursor-pointer"
                  onClick={handelAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
