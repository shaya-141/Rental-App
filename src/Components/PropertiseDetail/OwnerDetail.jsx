import React from 'react'
import avatar from '../../assets/icons/avatar.png'
import key from '../../assets/icons/key.png'
function OwnerDetail() {
    return (
        <div className='w-[35%] h-[400px] bg-[#fafafa] rounded p-4 px-6'>
            <h1 className='text-[22px] font-semibold'> Owner </h1>
            <img src={avatar} className='h-[100px] mt-4' alt="" />
            <div className='flex flex-col gap-3 mt-3'>

            <div className='flex items-center gap-3'>
                <h2 className='text-[20px] font-semibold'>Name</h2>
                <h2 className='text-[#656e73] font-semibold'>Shayan</h2>
            </div>
            <div className='flex items-center gap-3'>
                <h2 className='text-[20px] font-semibold'>Email</h2>
                <h2 className='text-[#656e73] font-semibold'>Shayan@gmail.com</h2>
            </div>
            <div className='flex items-center gap-3'>
                <h2 className='text-[20px] font-semibold'>Contact</h2>
                <h2 className='text-[#656e73] font-semibold'>+923131444</h2>
            </div>

            </div>


            <button className='w-full h-11 flex items-center gap-5 justify-center bg-[#0b1D27] text-white mt-5 rounded text-[18px]'>
                <span>
                Rent It

                </span>
                <img src={key} className='h-4' alt="" />

            </button>


        </div>
    )
}

export default OwnerDetail