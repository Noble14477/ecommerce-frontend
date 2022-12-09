import React from 'react'
import Footer from '../components/Footer'
import WTS from '../components/WTS'

const About = () => {
  return (
    <div className='mt-[4rem]'>
       <div className="p-4 mt-[4rem] bg-gray-100 text-gray-800 mx-[1rem]">
          <h2 className="font-semibold text-2xl md:text-4xl mb-5">
            About
            </h2>
        </div>
        <WTS/>
        <Footer/>
    </div>
  )
}

export default About