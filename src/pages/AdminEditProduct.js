import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
//redux
import { getCategories } from "../redux/actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
const AdminEditProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQty, setProductQty] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!product) {
      dispatch(getProduct(productId));
      dispatch(getCategories());
    } else {
      setProductImage(product.fileName);
      setProductName(product.productName);
      setProductDesc(product.productDesc);
      setProductPrice(product.productPrice);
      setProductCategory(product.productCategory);
      setProductQty(product.productQty);
    }
  }, [dispatch, productId, product]);

  const handleImageUploads = (e) => {
    const image = e.target.files[0];
    setProductImage(image);
  };
  const handelProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("productName", productName);
    formData.append("productDesc", productDesc);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productQty", productQty);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios
      .put(`/api/product/${productId}`, formData, config)
      .then((res) => {
        console.log("updated", res);
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <AdminHeader />
      <div className="">
        <div className="relative w-[90%] md:w-[70%] lg:w-[50%] my-6 mx-auto max-w-4xl">
          <div className="mb-3 w-[100px] text-center">
            <Link
              className=" flex items-center justify-center border-2 border-blue-400 rounded-lg"
              to="/admin/dashboard"
            >
              <MdArrowBack /> Go Back
            </Link>
          </div>
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t bg-yellow-500">
              <h3 className="text-3xl text-white font-semibold">Edit</h3>
            </div>
            {/*body*/}

            <div className="relative p-6 flex-auto">
              <form className="w-full" onSubmit={handelProductSubmit}>
                <div className="grid w-full">
                  <div className="flex items-center">
                    <label
                      className="mr-2 text-lg  bg-blue-500 rounded-lg p-2 text-white"
                      htmlFor="useravatar"
                    >
                      Upload file
                    </label>
                    <input
                      id="useravatar"
                      accept="images/*"
                      hidden
                      type="file"
                      name="productImage"
                      onChange={handleImageUploads}
                    />
                    {productImage && productImage.name ? (
                      <span>{productImage.name}</span>
                    ) : productImage ? (
                      <img
                        className=""
                        style={{ width: "120px", height: "80px" }}
                        src={`/uploads/${productImage}`}
                        alt="/"
                      />
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="name" className="text-lg p-1">
                      Name
                    </label>
                    <input
                      onChange={(e) => setProductName(e.target.value)}
                      name="productName"
                      value={productName}
                      type="text"
                      id="name"
                      className="w-full text-lg bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-lg p-1">
                      Description
                    </label>
                    <textarea
                      onChange={(e) => setProductDesc(e.target.value)}
                      name="productDesc"
                      value={productDesc}
                      id="message"
                      rows="4"
                      className="w-full text-lg bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
                      placeholder="Leave a comment..."
                    ></textarea>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="price" className="text-lg p-1">
                      Price
                    </label>
                    <input
                      onChange={(e) => setProductPrice(e.target.value)}
                      name="productPrice"
                      value={productPrice}
                      type="text"
                      id="price"
                      className="w-full text-lg bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="w-full mb-2">
                      <label htmlFor="categories" className="text-lg p-1">
                        Category
                      </label>
                      <select
                        onChange={(e) => setProductCategory(e.target.value)}
                        value={productCategory}
                        name="productCategory"
                        id="categories"
                        className="w-full text-lg bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
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
                      <label htmlFor="quantity" className="text-lg p-1">
                        Quantity
                      </label>
                      <input
                        onChange={(e) => setProductQty(e.target.value)}
                        type="number"
                        id="quantity"
                        min="0"
                        max="1000"
                        className="w-full bg-gray-100 outline-2 outline-green-500 rounded-md p-2 md-2"
                        name="productQty"
                        value={productQty}
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-yellow-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-blue-400 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
    </div>
  );
};

export default AdminEditProduct;
