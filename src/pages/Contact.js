import React, { useState } from 'react'
import Footer from '../components/Footer'
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { ErrMessages } from '../components/Messages';

const Contact = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    // const
    const handelSubmit = (e)=>{
        e.preventDefault();
        
        if (isEmpty(message) && isEmpty(email) ) {
            setError("All feilds are required")
            
        } else if (!isEmail(email) ){
            setError("Invalid Email")
        } else{
            console.log(email, message);
            setEmail("");
            setMessage("")
        }
    }
  return (
    <div className='mt-[4rem]'>
        <div className="p-4 mt-[4rem] bg-gray-100 text-gray-700 mx-[1rem]">
          <h2 className="font-semibold text-2xl md:text-4xl mb-5">
            Contact
            </h2>
        </div>
        <div className='flex justify-center'>

        {error && (<div className="w-full md:w-[60%] lg:w-[42%]">{ErrMessages(error)}</div>)}
        </div>
        <div className='flex flex-col items-center justify-center w-full py-6'>
            <form
                className="flex flex-col items-center justify-center w-full px-6 md:w-[60%] lg:w-[45%]"
                onSubmit={handelSubmit}
            >
                <div className="flex items-center w-full mt-6">
                <input
                    // onChange={handelChange}
                    name="email"
                    value={email}
                    onChange={e => {setEmail(e.target.value)
                                    setError("")
                                }}
                    type="email"
                    formNoValidate
                    placeholder="Email"
                    className="w-[100%] bg-gray-200 outline-none rounded-sm p-3"
                />
                </div>
                <div className="flex items-center w-full mt-6">
                <textarea
                    name='message'
                    value={message}
                    onChange={e => {setMessage(e.target.value)
                                    setError("")
                    }}
                    placeholder="Enter Message"
                    className="w-[100%] h-[200px] bg-gray-200 outline-none rounded-sm p-3"
                >

                </textarea>
                </div>
                <div className="flex items-center w-full mt-6">
                <button
                    className="w-[100%] bg-gray-800 outline-none rounded-sm p-3 text-xl text-white mb-[5rem] hover:bg-gray-600 ease-in-out duration-150"
                >
                    Send Message
                </button>
                </div>
            </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Contact