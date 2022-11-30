import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/actions/orderActions";
import Footer from "../components/Footer";
const Payment = () => {
    const dispatch  = useDispatch()
    const { paymentMethod} = useSelector(state=>state.order)
    const [paymentType, setPaymentType] = useState("strip")
    const navigate = useNavigate()

    useEffect(()=>{
        if (paymentMethod) {
            
            setPaymentType(paymentMethod)
        }
    },[paymentMethod])
    const handelChange = (e) =>{
        setPaymentType(e.target.value)
        dispatch(savePaymentMethod(e.target.value));
    }

    const handelSubmit = (e) =>{
        e.preventDefault();

        dispatch(savePaymentMethod(paymentType))
        navigate("/placeOrder")
    }
  return (
    <div className="mt-[5rem]">
      <div className="p-4 mt-[4rem] bg-gray-100">
        <h2 className="font-semibold text-xl md:text-2xl">
          <ProgressBar step1 step2 />
        </h2>
      </div>
      <div className="mt-2">
        <div className="py-6 max-w-[80%] md:max-w-[50%] mx-auto">
        <div>
          <h4 className="text-xl py-2 font-bold">Select Payment Type</h4>
        </div>
          <form onSubmit={handelSubmit}>
            <div className="flex items-center pl-4 rounded">
              <input
              onChange={handelChange}
                id="bordered-radio-1"
                type="radio"
                value="paypal"
                name="bordered-radio"
                checked={paymentType === 'paypal'}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="bordered-radio-1"
                className="py-4 ml-2 w-full text-xl font-medium text-black"
              >
                Paypal
              </label>
            </div>
            <div className="flex items-center pl-4 rounded">
              <input
              onChange={handelChange}
                id="bordered-radio-2"
                type="radio"
                value="strip"
                name="bordered-radio"
                checked={paymentType === 'strip'}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="bordered-radio-2"
                className="py-2 ml-2 w-full text-xl font-medium text-dark"
              >
                Strip
              </label>
            </div>
            <div className="pb-6 pt-2">
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-sm mb-6 mt-2"
              type="submit"
            >
              Continue
            </button>
          </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Payment;
