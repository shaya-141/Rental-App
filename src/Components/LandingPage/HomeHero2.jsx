import React from 'react'
// import banner from '../assets/banner/hero2.png'
import arrow from '../../assets/icons/right-up.png'
import { Link } from 'react-router-dom'

function HomeHero2() {
  return (
    <div className='w-full  h-[700px] mt-5 '>
            <div id='homehero2' className='w-[95%] relative rounded-3xl m-auto h-[680px]  bg-[#6B9AB8]'>

                    <div className='z-20 p-12  flex flex-col gap-1'>
                      <h1 className='text-[62px] font-bold mt-5 text-white'>Let's Find Your <br />Dream Home</h1>
                      {/* <h1 className='text-[52px] font-semibold text-white'>Dream Home</h1> */}
                      <p className='text-white text-[16px] z-50'>Find your perfect space, hassle-free! Whether you are a <br /> landlord or tenant,our app makes renting simple, secure, <br /> and seamless</p>

                    <Link to={'/propertise'}>
                      <button className='bg-white text-[#0b1D27] flex justify-center gap-2  items-center w-[140px] mt-4  py-3 rounded-3xl'>Explore <img src={arrow} className='h-6' alt="" /></button>
                    </Link>


                    </div>

                    <div id='heroimg' className='w-[65%] absolute right-0 h-[600px] bottom-0 rounded-3xl  '>
                        {/* <img src={banner} className='h-[600px] rounded-3xl w-[70%]  ' alt="" /> */}
                    </div>


            </div>

    </div>
  )
}

export default HomeHero2