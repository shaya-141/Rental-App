import React from 'react'

import homelogo from '../../assets/icons/homelogo.png'
import arrow from '../../assets/icons/arrow.png'
import { Link } from 'react-router-dom'

import { getAuth, signOut } from "firebase/auth";
import { useAuthContext } from '../../Context/Auth';

function Navbar() {
 
  const {isLoggedin} = useAuthContext()

  console.log("isLoggedin",isLoggedin);
  
  

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Sign-out successful');
      
    }).catch((error) => {
      // An error happened.
      console.log('An error happened',error);
      
    });

  }

  return (
    <div id='navbar' className='w-full  h-[80px]  p-9 flex items-center justify-between '>
      <Link to={'/ '}>
        <div id='logotext' className='flex items-center  gap-2'>
          <img src={homelogo} alt="" className='h-6 mb-[2px]' />
          <h1 className='text-[28px] font-semibold '>Rental</h1>
        </div>
      </Link>

      <div id='links' className='flex gap-8 items-center'>
        <span className='text-[16px] cursor-pointer font-semibold '>Home</span>
        <span className='text-[16px] cursor-pointer font-semibold text-[#656e73] '>About us</span>
        <span className='text-[16px] cursor-pointer font-semibold text-[#656e73] '>Properties</span>
        <span className='text-[16px] cursor-pointer font-semibold text-[#656e73] '>Blogs</span>


      </div>

      {/* <div className='bg-red-500 text-white p-4' onClick={logout}>logout</div> */}

      <div>
          {
            isLoggedin ?
            <div className='w-[45px] h-[45px] rounded-3xl bg-red-400'>

            </div>
          
            :
            <button className='text-[14px] font-medium  h-[40px] gap-1 bg-[#0b1D27] text-white rounded-[24px] w-[90px] '><Link className='flex items-center justify-center gap-1' to={'/login'}> Login  <img src={arrow} className='h-3' alt="" /></Link></button>

          }

      

           
        
      </div>

    </div>
  )
}

export default Navbar