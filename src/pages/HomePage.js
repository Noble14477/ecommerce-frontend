import React, { useEffect } from "react";
import Card from "../pages/Card"
import {Spinner} from "../components/Loading"
import { useDispatch, useSelector } from "react-redux";
import { getNewArrivals } from "../redux/actions/filtterActions";
import { getProductsByCount } from "../redux/actions/productActions";
import Footer from "../components/Footer";
import WTS from "../components/WTS";
// import Jollof from "../images/jollof1.webp";
// import swalo from "../images/swalo.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const HomePage = () => {
  const dispatch = useDispatch()
  const {newArrivals} = useSelector(state => state.filtters)
  const {loading} = useSelector(state => state.loading)
  const {products} = useSelector(state => state.products)
  useEffect(()=>{
    dispatch(getNewArrivals())
  },[dispatch])
  useEffect(()=>{
    dispatch(getProductsByCount())
  },[dispatch])
  return (
    <section className="heroSection mt-[4rem]">
    <div className=" hero flex justify-center items-center text-center px-[3rem]">
      <div className=" w-full flex items-center justify-center">
      <div className="">
        <div>
        <p className="text-lg md:text-xl text-yellow-500 uppercase">Quality</p>
        <h1 className="text-[2rem] md:text-[4rem] text-white font-bold">Resturant & Dishes</h1>
        </div>
        <div className="flex justify-center items-center">
          <FaFacebook  className="mx-2 mt-4 text-gray-200 md:text-2xl"/>
          <FaInstagram  className="mx-2 mt-4 text-gray-200 md:text-2xl"/>
          <FaTwitter  className="mx-2 mt-4 text-gray-200 md:text-2xl"/>
          <FaLinkedin  className="mx-2 mt-4 text-gray-200 md:text-2xl"/>
        </div>
      </div>
        {/* <img src={Jollof} alt="/" className="w-[20%] absolute top-[0%] left-[-5%] rounded-[5rem]"/> */}
        {/* <img src={swalo} alt="/" className="w-[30%] rounded-4xl"/> */}

      </div>
    </div>
    {loading ? Spinner()
     : (
      <>
        <div>
          <h3 className="text-xl md:text-2xl text-center py-4 font-bold">New Arrivals</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-10 my-4 px-6 pb-6">
            {newArrivals && newArrivals.map(newArrival =>{
              return(
                <Card key={newArrival._id} product={newArrival} homePage={true}/>
              )
            })}
          </div>

          <h3 className="text-xl md:text-2xl text-center py-4 font-bold">Menu</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-10 my-4 px-6">
            {products && products.map(product =>{
              return(
                <Card key={product._id} product={product} homePage={true}/>
              )
            })}
          </div>
        </div>
      </>
    )}
    <WTS/>
    <Footer/>
      </section>
  );
};

export default HomePage;
