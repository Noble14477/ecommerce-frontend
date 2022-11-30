import React from "react";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";

const PlaceOrder = () => {
  return (
    <div className="mt-[5rem]">
      PlaceOrder
      <div className="p-4 mt-[4rem] bg-gray-100">
        <h2 className="font-semibold text-xl md:text-2xl">
          <ProgressBar step1 step2 step3/>
        </h2>
      </div>
      <div className="mt-2">
        <div className="py-6 max-w-[80%] md:max-w-[50%] mx-auto">
          <div>
            <h4 className="text-xl py-2 font-bold">Place Order</h4>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PlaceOrder;
