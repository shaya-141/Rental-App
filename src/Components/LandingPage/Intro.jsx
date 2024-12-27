import React from 'react'
import intorimg from '../../assets/banner/introimg.jpg'
function Intro() {
  return (
    <div className='p-8 flex gap-3 '>

        <div className='bg-[#fafafa] p-4 flex gap-4  h-80   w-[55%] rounded-3xl'>
              <img src={intorimg} className='w-[45%] rounded-2xl h-full' alt="" />
              <div>
                <h1 className='text-[20px] mt-5 font-bold'>Rent Smarter, Live Better, Feel Confident!</h1>
                <p className='text-[14px] font-medium text-[#656e73] mt-3'>Welcome to Rental, your go-to platform for easy property management and rentals. Whether you're listing properties or finding your next home, we make the process simple and secure. Join us today for a smarter rental experience!</p>
              </div>
        </div>

        <div className='w-[44%] h-80 flex flex-wrap gap-4 justify-center '>

              <div className='w-[240px] p-4 rounded-xl flex flex-col gap-3 h-[130px] bg-[#fafafa]'>
                    <h1 className='font-semibold text-[36px]'>10K+</h1>
                    <h4 className='font-semibold text-[14px]'>Satisfy Clients</h4>
              </div>
              <div className='w-[240px] p-4 rounded-xl flex flex-col gap-3 h-[130px] bg-[#fafafa]'>
                    <h1 className='font-semibold text-[36px]'>500+</h1>
                    <h4 className='font-semibold text-[14px]'>Properties Listed</h4>
              </div>
              <div className='w-[240px] p-4 rounded-xl flex flex-col gap-3 h-[130px] bg-[#fafafa]'>
                    <h1 className='font-semibold text-[36px]'>99%</h1>
                    <h4 className='font-semibold text-[14px]'>Customer Satisfaction</h4>
              </div>
              <div className='w-[240px] p-4 rounded-xl flex flex-col gap-3 h-[130px] bg-[#fafafa]'>
                    <h1 className='font-semibold text-[36px]'>2+</h1>
                    <h4 className='font-semibold text-[14px]'>Years of Experince</h4>
              </div>
              

        </div>


    </div>
  )
}

export default Intro