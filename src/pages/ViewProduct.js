import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import { MdArrowBack } from "react-icons/md";
import { addToCart } from "../redux/actions/cartActions";
import Footer from "../components/Footer";
const ViewProduct = () => {
  const { productId } = useParams();
  const { product } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);
  const handelAddToCart = ()=>{
    dispatch(addToCart(product))
  }
  return (
    <div className="mb-6 mt-[5rem]">
      <div className="mb-3 w-[100px] text-center md:ml-6">
        <button
          className=" flex items-center justify-center border-2 border-blue-400 rounded-lg px-2 "
          onClick={() => {
            navigate(-1);
          }}
        >
          <MdArrowBack /> Go Back
        </button>
      </div>
      <div>
        {product && (
          <div className="grid md:grid-cols-2 md:mx-6 my-8">
            <img
              className=" rounded-t-lg w-[70%] md:w-full "
              src={`/uploads/${product.fileName}`}
              alt=""
            />
            <div className="ml-6 w-full pr-8 mt-6">
              <h3 className="font-bold text-xl md:text-3xl lg:text-5xl mb-6">
                {product.productName}
              </h3>
              <p className="py-4 text-lg md:text-xl border-t">
                Price:{" "}
                {product.productPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p className="py-4 text-lg md:text-xl border-t text-gray-500">
                Staus: {product.productQty <= 0 ? "Out of Stock" : "In Stock"}
              </p>
              <p className="py-4 text-lg md:text-xl border-t">
                Description: {product.productDesc}
              </p>
              <div className="flex justify-center w-full">
                <button
                  className="w-full cursor-pointer bg-gray-800 text-white py-3 my-4 mb-10 text-md md:text-xl"
                  disabled={product.productQty <= 0}
                  onClick={handelAddToCart}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default ViewProduct;
