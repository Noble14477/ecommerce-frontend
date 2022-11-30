import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { NigeriaStates } from "../data/NigeriaStates";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/actions/orderActions";
import Footer from "../components/Footer";
const Shipping = () => {
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const { shippingAddress } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    shippingAddress.address
      ? setAddress(shippingAddress.address)
      : setAddress("");

    shippingAddress.address2
      ? setAddress2(shippingAddress.address2)
      : setAddress2("");

    shippingAddress.city 
    ? setCity(shippingAddress.city) 
    : setCity("");

    shippingAddress.state 
    ? setState(shippingAddress.state) 
    : setState("");

    shippingAddress.zip 
    ? setZip(shippingAddress.zip) 
    : setZip("");
  }, [shippingAddress]);

  const handelSubmit = (e) => {
    e.preventDefault();

    const shippingData = {
      address,
      address2,
      city,
      state,
      zip,
    };

    dispatch(saveShippingAddress(shippingData));
    navigate("/payment");
  };
  return (
    <div className="mt-[5rem]">
      <div className="p-4 mt-[4rem] bg-gray-100">
        <h2 className="font-semibold text-xl md:text-2xl">
          <ProgressBar step1 />
        </h2>
      </div>
      <div className="py-6 max-w-[80%] md:max-w-[70%] mx-auto">
        <div>
          <h4 className="text-xl py-2 font-bold">Shipping Address</h4>
        </div>
        <form className="px-2" onSubmit={handelSubmit}>
          <div className="py-4">
            <label className="text-lg p-1" htmlFor="inputAddress">
              Address
            </label>

            <input
              className="w-full text-lg bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
              type="text"
              id="inputAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="py-4">
            <label className="text-lg p-1" htmlFor="inputAddress2">
              Address 2
            </label>
            <input
              className="w-full text-lg bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
              type="text"
              id="inputAddress2"
              placeholder="eg. Apartment no."
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>

          <div className="py-4 grid grid-cols-1 md:grid-cols-6 md:gap-3">
            <div className="w-full col-span-2">
              <label htmlFor="city" className="text-lg pb-2">
                City
              </label>
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                value={city}
                className="w-full text-lg bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
              />
            </div>

            <div className="w-full pt-6 md:pt-0  col-span-2">
              <label htmlFor="state" className="text-lg pb-2">
                State
              </label>
              <select
                onChange={(e) => setState(e.target.value)}
                value={state}
                id="categories"
                className="w-full text-lg bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
              >
                <option value="">Choose one...</option>
                {NigeriaStates.map((state) => {
                  return (
                    <option key={state.abbreviation} value={state.name}>
                      {state.name} ({state.abbreviation})
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="w-full pt-6 md:pt-0 col-span-2">
              <label htmlFor="zip" className="text-lg pb-2">
                Zip
              </label>
              <input
                onChange={(e) => setZip(e.target.value)}
                value={zip}
                type="text"
                id="categories"
                className="w-full text-lg bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
              />
            </div>
          </div>
          <div className="pb-6 pt-2">
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-lg mb-6"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default Shipping;
