import React from 'react';
import logo from '../../assets/icons/homewhite.png';

function Footer() {
  return (
    <div className='w-full min-h-[300px] flex flex-col md:flex-row items-start justify-between gap-[15%] text-white p-10 bg-[#191919] mt-20'>
      <div className='w-full md:w-[300px]'>
        <div id='logotext' className='flex items-center gap-2'>
          <img src={logo} alt="" className='h-6 mb-[2px]' />
          <h1 className='text-[28px] font-semibold '>Gharana</h1>
        </div>
        <div className='mt-4'>
          <p className='text-[14px] text-[#656e73] font-medium'>
            Your trusted partner in finding the perfect rental space. Simplifying property management and delivering seamless experiences for landlords and tenants alike.
          </p>
        </div>
      </div>

      <div className='w-full md:w-[calc(100%-300px)] flex flex-col md:flex-row gap-16 mt-8 md:mt-0'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-lg font-semibold'>Explore</h1>
          <p className='text-[#656e73]'>Buy</p>
          <p className='text-[#656e73]'>Rent</p>
          <p className='text-[#656e73]'>List Your Property</p>
          <p className='text-[#656e73]'>Find Commercial Spaces</p>
        </div>

        <div className='flex flex-col gap-3'>
          <h1 className='text-lg font-semibold'>Services</h1>
          <p className='text-[#656e73]'>Property Management</p>
          <p className='text-[#656e73]'>Rental Assistance</p>
          <p className='text-[#656e73]'>Legal Documentation</p>
          <p className='text-[#656e73]'>Maintenance Support</p>
        </div>

        <div className='flex flex-col gap-3'>
          <h1 className='text-lg font-semibold'>Quick Links</h1>
          <p className='text-[#656e73]'>Home</p>
          <p className='text-[#656e73]'>About us</p>
          <p className='text-[#656e73]'>Properties</p>
          <p className='text-[#656e73]'>Blogs</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
