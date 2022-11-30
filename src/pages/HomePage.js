import React, { useEffect } from "react";
import Card from "../pages/Card"
import {Spinner} from "../components/Loading"
import { useDispatch, useSelector } from "react-redux";
import { getNewArrivals } from "../redux/actions/filtterActions";
import { getProductsByCount } from "../redux/actions/productActions";
import Footer from "../components/Footer";
import WTS from "../components/WTS";

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
    <section className="heroSection mt-[5rem]">

    <div className="hero flex justify-center items-center flex-col text-center">
      <p className="text-lg md:text-3xl text-yellow-500 uppercase">Quality</p>
      <h1 className="text-[2rem] md:text-[5rem] text-white font-bold">Resturant & Dishes</h1>
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
