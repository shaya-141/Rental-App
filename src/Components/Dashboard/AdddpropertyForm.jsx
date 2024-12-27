import React, { useState } from 'react'
import AddPropertyFormStructure from './AddPropertyFormStructure'
import close from '../../assets/icons/close.png'
import { useDashboardContext } from '../../Context/ActiveDashboardPage'


function AdddpropertyForm() {


    const { PropertyFormShowOrNot, setPropertyFormShowOrNot } = useDashboardContext()

    return (
        <>
            <div className={`flex items-center justify-center z-50 fixed ${PropertyFormShowOrNot ? 'h-screen w-screen' : '' } ${PropertyFormShowOrNot ? 'bg-[#fafafa18]' : ''}  `}>
                <div className={`p-6 w-[550px] ${PropertyFormShowOrNot ? 'block' : 'hidden'} rounded-3xl min-h-[650px]  bg-white`}>

                    <div className='relative top-[-0px] px-4 flex items-center justify-between'>
                        <h1 className=' text-[20px] mt-2 font-semibold'>List Your Property</h1>
                        <img src={close} alt="" onClick={() => { setPropertyFormShowOrNot(false) }} className='h-5 mt-3 cursor-pointer' />

                    </div>
                    <div className='p-4'>


                        <AddPropertyFormStructure></AddPropertyFormStructure>
                    </div>


                </div>
            </div>
        </>


    )
}

export default AdddpropertyForm