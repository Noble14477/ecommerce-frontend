import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { MdFilter } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import Card from "./Card";
import { getCategories } from "../redux/actions/categoryAction";
import { getProductsByFilter } from "../redux/actions/filtterActions";
import Footer from "../components/Footer";
const Shop = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [text, setText] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handelSearch = (e) => {
    resetState()

    setText(e.target.value);
    dispatch(getProductsByFilter({ type: "text", query: e.target.value }));
  };
  const handelCategory = (e) => {
    resetState()
    const currentCatChecked = e.target.value;
    const allCatChecked = [...categoryIds]
    const indexFound = allCatChecked.indexOf(currentCatChecked);
    
    let updatedCatIds;
    if (indexFound === -1) {
        updatedCatIds = [...categoryIds, currentCatChecked];
        setCategoryIds(updatedCatIds);
        console.log(updatedCatIds)
    } else {
        updatedCatIds = [...categoryIds];
        updatedCatIds.splice(indexFound, 1);
        setCategoryIds(updatedCatIds);
    }
    dispatch(getProductsByFilter({ type: "category", query: updatedCatIds }));

  };

  const resetState = ()=>{
    setText("")
    setCategoryIds([])
  }
  return (
    <section>

    <div className="m-3">
      <div className="p-4 mt-[4rem] bg-gray-100 text-gray-800">
        <h2 className="font-semibold text-2xl md:text-4xl mb-5">Shop</h2>
      </div>
      <div className="grid lg:grid-cols-4 my-4">
        <div className="border-r">
          <div className="flex items-center">
            <h4 className=" font-semibold text-lg mr-2 text-gray-800">
              {" "}
              Filters{" "}
            </h4>
            <MdFilter size={20} />
          </div>
          <div className="flex justify-center">
            <div className=" mb-6 mt-3 w-full">
              <div className="input-group relative flex  w-full">
                <input
                  type="search"
                  className="form-control relative flex-auto block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                  name="search"
                  value={text}
                  onChange={handelSearch}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-200 py-3 px-2 mb-4">
            {categories &&
              categories.map((cat) => {
                return (
                  <div className="flex py-1 " key={cat._id}>
                    <div>
                      <div className="form-check">
                        <input
                          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="checkbox"
                          id="flexCheckChecked"
                          name="category"
                          value={cat._id}
                          checked={categoryIds.includes(cat._id)}
                          onChange={handelCategory}
                        />
                        <label
                          className="form-check-label inline-block text-gray-800"
                          htmlFor="flexCheckChecked"
                        >
                          {cat.category}
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ml-3">
            {products && products.map((products) => {
              return (
                <Card key={products._id} product={products} homePage={true} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
      <Footer/>
    </section>
  );
};

export default Shop;
