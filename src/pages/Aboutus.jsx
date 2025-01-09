import React from 'react'
import Navbar from '../Components/LandingPage/Navbar'
import Footer from '../Components/LandingPage/Footer'

function Aboutus() {
  return (
    <>
    <Navbar></Navbar>
    <div className='w-full min-h-screen  p-8'>
        
        <div id='aboutusimg' className='bg-gray-200 w-full h-[400px] rounded-2xl'>

        </div>
        
        <div className='mt-8 flex flex-col gap-5'>
            <h1 className='text-[42px] font-semibold'>About Us</h1>
            <p className='text-[16px] text-[#656e73] font-semibold p-1'>At Gharana, we are dedicated to making the rental experience as seamless and efficient as possible for both tenants and landlords. Our platform connects individuals to their ideal rental spaces, providing a trusted marketplace for buying, renting, and listing properties.</p>
            <p className='text-[16px] text-[#656e73] font-semibold p-1'>We understand that finding a home or investment property can be overwhelming. That’s why we aim to simplify the entire process with a user-friendly interface and an extensive database of rental properties that cater to every budget and preference. Whether you are looking for a cozy apartment in the heart of the city or a spacious house in a peaceful neighborhood, Gharana has something for everyone.</p>
            <p className='text-[16px] text-[#656e73] font-semibold p-1'>We pride ourselves on transparency, convenience, and reliability. Through our app, landlords can easily list their properties, manage listings, and connect with potential tenants. Tenants can search, view, and book properties with just a few clicks. Additionally, our team offers valuable services such as rental assistance, property management, and legal documentation to ensure a smooth rental journey for all.</p>
            <p className='text-[16px] text-[#656e73] font-semibold p-1'>At Gharana, our mission is to bridge the gap between landlords and tenants by creating a trusted platform that fosters a seamless rental experience. Whether you are renting or listing, we are here to help you find the perfect space. Let us simplify your property journey!</p>
        </div>

    </div>
    
    <Footer></Footer>

    </>
  )
}

export default Aboutus