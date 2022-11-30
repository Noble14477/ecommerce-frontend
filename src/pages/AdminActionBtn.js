import React, { useState } from "react";
import { MdAdd, MdListAlt } from "react-icons/md";
import { ErrMessages, SuccMessages } from "../components/Messages";
import { Loading } from "../components/Loading";
import isEmpty from "validator/lib/isEmpty";

//redux
import { createProduct } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { clear_messages } from "../redux/actions/messageActions";
import { createcategory } from "../redux/actions/categoryAction";

const AdminActionBtn = () => {
  // redux state globals
  const { success, error} = useSelector((state) => state.messages);
  const { categories} = useSelector((state) => state.categories);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch()

  // const [categories, setCategories] = useState();
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");
  const [clientSideErr, setClientSideErr] = useState("")
  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDesc: "",
    productPrice: "",
    productCategory: "",
    productQty: "",
  });

  const {
    productImage,
    productName,
    productDesc,
    productPrice,
    productCategory,
    productQty,
  } = productData;

  const handelCatChange = (e) => {
    dispatch(clear_messages())
    setCategory(e.target.value);
    setClientSideErr("")
  };
  const handelCatSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(category)) {
      setClientSideErr("Please enter a category");
    } else {
      const data = { category };
      dispatch(createcategory(data))
    }
  };
  const handelaMessage = (e) => {
    e.preventDefault()
    setShowModal(false);
    dispatch(clear_messages())
    setCategory("")
    setClientSideErr("")
  };

  const handelProductImage = (e) => {
    console.log(e.target.files[0]);
    setProductData({
      ...productData,
      [e.target.name]: e.target.files[0],
    });
  };
  const handelProductChange = (e) => {
    dispatch(clear_messages())
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };
  const handelProductSubmit = (e) => {
    e.preventDefault();

    if (productImage === null) {
      setClientSideErr("Please select an image");
    } else if (
      isEmpty(productName) ||
      isEmpty(productDesc) ||
      isEmpty(productPrice)
    ) {
      setClientSideErr("All feilds are required");
    } else if (isEmpty(productCategory)) {
      setClientSideErr("Please select a category");
    } else if (isEmpty(productQty)) {
      setClientSideErr("Please select a quantity");
    } else {
      let formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productDesc", productDesc);
      formData.append("productPrice", productPrice);
      formData.append("productCategory", productCategory);
      formData.append("productQty", productQty);

      dispatch(createProduct(formData))
      setProductData({
        productImage: null,
        productName: "",
        productDesc: "",
        productPrice: "",
        productCategory: "",
        productQty: "",
      });

    }
  };
  return (
    <div className="bg-white">
      <div className="w-full grid md:grid-cols-3 gap-3 md:gap-8 px-6 pt-2 md:px-10 text-center">
        <div>
          <button
            className="flex items-center border-2 border-blue-500 w-full p-1 text-md justify-center mt-2 md:mt-0 rounded-md hover:bg-blue-700 hover:text-white ease-in-out duration-150 hover:border-none"
            onClick={() => setShowModal(true)}
          >
            {" "}
            <MdAdd className="mr-2 text-xl" /> Add Category
          </button>
        </div>
        <div>
          <button
            className="flex items-center border-2 border-green-500 w-full p-1 text-md justify-center rounded-md hover:bg-green-500 hover:text-white ease-in-out duration-150 hover:border-none"
            onClick={() => {
              setShowFoodModal(true);
            }}
          >
            {" "}
            <MdAdd className="mr-2 text-xl" /> Add Food
          </button>
        </div>
        <div>
          <button className="flex items-center border-2 border-yellow-500 w-full p-1 text-md justify-center rounded-md hover:bg-yellow-500 hover:text-white ease-in-out duration-150 hover:border-none">
            {" "}
            <MdListAlt className="mr-2 text-xl" /> View Orders
          </button>
        </div>
      </div>

      {/* Category modal */}
      <div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-[90%] md:w-[70%] lg:w-[50%] my-6 mx-auto max-w-4xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t bg-blue-500">
                    <h3 className="text-3xl text-white font-semibold">
                      Add Category
                    </h3>
                  </div>
                  {/*body*/}

                  <div className="relative p-6 flex-auto">
                    <form className="w-full" onSubmit={handelCatSubmit}>
                      <div className="grid w-full">
                        {clientSideErr && ErrMessages(clientSideErr)}
                        {error && ErrMessages(error)}
                        {success && SuccMessages(success)}
                        {loading ? (
                          Loading()
                        ) : (
                          <>
                            <label htmlFor="category" className="text-lg p-1">
                              Category
                            </label>
                            <input
                              name="category"
                              value={category}
                              onChange={handelCatChange}
                              type="text"
                              id="category"
                              className="w-full bg-gray-100 outline-2 outline-blue-700 rounded-md p-3"
                            />
                          </>
                        )}
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={handelaMessage}
                        >
                          Close
                        </button>
                        <button
                          className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-blue-400 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
      {/* Category modal ends*/}

      {/* Product modal */}
      <div>
        {showFoodModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-[90%] md:w-[70%] lg:w-[50%] my-6 mx-auto max-w-4xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t bg-green-500">
                    <h3 className="text-3xl text-white font-semibold">
                      Add Food
                    </h3>
                  </div>
                  {/*body*/}

                  <div className="relative p-6 flex-auto">
                    <form className="w-full" onSubmit={handelProductSubmit}>
                      <div className="grid w-full">
                        {clientSideErr && ErrMessages(clientSideErr)}
                        {error && ErrMessages(error)}
                        {success && SuccMessages(success)}
                        {loading ? (
                          Loading()
                        ) : (
                          <>
                            <div>
                              <label
                                className="text-lg p-1"
                                htmlFor="useravatar"
                              >
                                Upload file
                              </label>
                              <input
                                className="w-full bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
                                id="useravatar"
                                type="file"
                                name="productImage"
                                onChange={handelProductImage}
                              />
                            </div>
                            <div>
                              <label htmlFor="name" className="text-lg p-1">
                                Name
                              </label>
                              <input
                                onChange={handelProductChange}
                                name="productName"
                                value={productName}
                                type="text"
                                id="name"
                                className="w-full bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
                              />
                            </div>
                            <div>
                              <label htmlFor="message" className="text-lg p-1">
                                Description
                              </label>
                              <textarea
                                onChange={handelProductChange}
                                name="productDesc"
                                value={productDesc}
                                id="message"
                                rows="4"
                                className="w-full bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
                                placeholder="Leave a comment..."
                              ></textarea>
                            </div>
                            <div className="mb-2">
                              <label htmlFor="price" className="text-lg p-1">
                                Price
                              </label>
                              <input
                                onChange={handelProductChange}
                                name="productPrice"
                                value={productPrice}
                                type="text"
                                id="price"
                                className="w-full bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
                              />
                            </div>

                            <div className="grid md:grid-cols-2 md:gap-6">
                              <div className="w-full mb-2">
                                <label
                                  htmlFor="categories"
                                  className="text-lg p-1"
                                >
                                  Category
                                </label>
                                <select
                                  onChange={handelProductChange}
                                  name="productCategory"
                                  id="categories"
                                  className="w-full bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
                                >
                                  <option value="">Choose one...</option>
                                  {categories &&
                                    categories.map((cat) => {
                                      return (
                                        <option key={cat._id} value={cat._id}>
                                          {cat.category}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>

                              <div className="w-full mb-2">
                                <label
                                  htmlFor="quantity"
                                  className="text-lg p-1"
                                >
                                  Quantity
                                </label>
                                <input
                                  type="number"
                                  id="quantity"
                                  min="0"
                                  max="1000"
                                  className="w-full bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
                                  name="productQty"
                                  value={productQty}
                                  onChange={handelProductChange}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setShowFoodModal(false);
                          }}
                        >
                          Close
                        </button>
                        <button
                          className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-blue-400 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
      {/* Product modal */}
    </div>
  );
};

export default AdminActionBtn;
