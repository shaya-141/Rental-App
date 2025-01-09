import React from 'react'
import intorimg from '../../assets/banner/introimg.jpg'

function Intro() {
  return (
    <div className='p-8 flex flex-col md:flex-row gap-6'>

      {/* Left Section: Image and Text */}
      <div id='card1' className='bg-[#fafafa] p-4 flex gap-4 h-auto md:h-80 w-full md:w-[55%] rounded-3xl  items-center'>
        <img src={intorimg} className='w-full md:w-[100%] rounded-2xl h-[250px] md:h-full object-cover' alt="Intro Image" />
        <div className='md:w-[100%]'>
          <h1 className='text-[20px] md:text-[24px] mt-5 font-bold'>
            Rent Smarter, Live Better, Feel Confident!
          </h1>
          <p className='text-[14px] md:text-[16px] font-medium text-[#656e73] mt-3'>
            Welcome to Rental, your go-to platform for easy property management and rentals. Whether you're listing properties or finding your next home, we make the process simple and secure. Join us today for a smarter rental experience!
          </p>
        </div>
      </div>

      {/* Right Section: Statistics Cards */}
      <div id='card2' className='w-full md:w-[44%] min-h-[300px]  md:min-h-80 flex flex-wrap gap-6 justify-center'>
        <div className='w-full md:w-[240px] p-4 rounded-xl flex flex-col gap-3 h-[130px] bg-[#fafafa]'>
          <h1 className='font-semibold text-[36px]'>10K+</h1>
          <h4 className='font-semibold text-[14px]'>Satisfied Clients</h4>
        </div>
        <div className='w-full md:w-[240px] p-4 rounded-xl flex flex-col gap-3 h-[130px] bg-[#fafafa]'>
          <h1 className='font-semibold text-[36px]'>500+</h1>
          <h4 className='font-semibold text-[14px]'>Properties Listed</h4>
        </div>
        <div className='w-full md:w-[240px] p-4 rounded-xl flex flex-col gap-3 h-[130px] bg-[#fafafa]'>
          <h1 className='font-semibold text-[36px]'>99%</h1>
          <h4 className='font-semibold text-[14px]'>Customer Satisfaction</h4>
        </div>
        <div className='w-full md:w-[240px] p-4 rounded-xl flex flex-col gap-3 h-[130px] bg-[#fafafa]'>
          <h1 className='font-semibold text-[36px]'>2+</h1>
          <h4 className='font-semibold text-[14px]'>Years of Experience</h4>
        </div>
      </div>

    </div>
  )
}

export default Intro
