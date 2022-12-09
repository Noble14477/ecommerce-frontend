import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-gray-800 w-full">
      <div className=' py-6 px-[5rem] flex justify-between items-center flex-col md:flex-row'>
      <h1 className="text-2xl md:text-4xl font-bold mt-6 text-white mb-[1rem]"style={{fontFamily: "cursive"}}><Link to="/"> Gina's <i className="text-yellow-500">Kitchen</i></Link></h1>
        <div className='mt-6'>
            <ul className='text-white flex py-2 pb-6'>
            <li className="mx-2">
                      {" "}
                      <Link to="/" className="flex items-center hover:text-yellow-500 ease-in-out duration-150">
                        Home
                      </Link>
                    </li>
                    <li className="mx-2">
                      {" "}
                      <Link to="/shop" className="flex items-center hover:text-yellow-500 ease-in-out duration-150">
                        Shop
                      </Link>
                    </li>
                    <li className="mx-2">
                      {" "}
                      <Link to="/cart" className="flex items-center hover:text-yellow-500 ease-in-out duration-150">
                        Cart
                      </Link>
                    </li>
                    <li className="mx-2">
                      {" "}
                      <Link to="/about" className="flex items-center hover:text-yellow-500 ease-in-out duration-150">
                        About
                      </Link>
                    </li>
                    <li className="mx-2">
                      {" "}
                      <Link to="/contact" className="flex items-center hover:text-yellow-500 ease-in-out duration-150">
                        Contact
                      </Link>
                    </li>
                    
            </ul>
        </div>
        <div className="flex justify-center items-center py-2">
          <FaFacebook  className="mx-2 mt-4 text-blue-600 md:text-2xl "/>
          <FaInstagram  className="mx-2 mt-4 text-pink-500 md:text-2xl"/>
          <FaTwitter  className="mx-2 mt-4 text-blue-400 md:text-2xl"/>
          <FaLinkedin  className="mx-2 mt-4 text-gray-200 md:text-2xl"/>
        </div>
      </div>
      <div className='bg-white'>
        <p className='text-center p-6 text-gray-800 text-md md:text-lg'>&copy;copywrite, Noble Chinonso, 2022</p>
      </div>
    </div>
  )
}

export default Footer