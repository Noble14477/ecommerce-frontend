import React from 'react'
import { FaEdit, FaHome, FaShoppingBag, FaShoppingCart, FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-gray-800 w-full">
      <div className=' py-6 px-4 flex justify-around'>
        <div>
          <h5 className='text-lg text-white font-bold'>Quik Menu</h5>
            <ul className='text-white block'>
            <li className="my-3">
                      {" "}
                      <Link to="/" className="flex items-center">
                        <FaHome className="mx-1 text-md" />
                        Home
                      </Link>
                    </li>
                    <li className="my-3">
                      {" "}
                      <Link to="/shop" className="flex items-center">
                        <FaShoppingBag className="mx-1 text-md" />
                        Shop
                      </Link>
                    </li>
                    <li className="my-3">
                      {" "}
                      <Link to="/cart" className="flex items-center">
                        <FaShoppingCart className="mx-1 text-md" />
                        Cart
                      </Link>
                    </li>
                    <li className="my-3">
                      {" "}
                      <Link to="/signin" className="flex items-center">
                        <FaSignInAlt className="mx-1 text-md" />
                        Sigin
                      </Link>
                    </li>
                    <li className="my-3">
                      {" "}
                      <Link to="/signup" className="flex items-center">
                        <FaEdit className="mx-1 text-md" />
                        Sigup
                      </Link>
                    </li>
            </ul>
        </div>
        <div>
          <h5 className='text-lg text-white font-bold'>Quik Menu</h5>
            <ul className='text-white block'>
            <li className="my-3">
                      {" "}
                      <Link to="/" className="flex items-center">
                        <FaHome className="mx-1 text-md" />
                        Home
                      </Link>
                    </li>
                    <li className="my-3">
                      {" "}
                      <Link to="/shop" className="flex items-center">
                        <FaShoppingBag className="mx-1 text-md" />
                        Shop
                      </Link>
                    </li>
                    <li className="my-3">
                      {" "}
                      <Link to="/cart" className="flex items-center">
                        <FaShoppingCart className="mx-1 text-md" />
                        Cart
                      </Link>
                    </li>
                    <li className="my-3">
                      {" "}
                      <Link to="/signin" className="flex items-center">
                        <FaSignInAlt className="mx-1 text-md" />
                        Sigin
                      </Link>
                    </li>
                    <li className="my-3">
                      {" "}
                      <Link to="/signup" className="flex items-center">
                        <FaEdit className="mx-1 text-md" />
                        Sigup
                      </Link>
                    </li>
            </ul>
        </div>
      </div>
      <div>
        <p className='text-center pb-6 text-white text-lg'>&copy;copywrite, Noble Chinonso, 2022</p>
      </div>
    </div>
  )
}

export default Footer