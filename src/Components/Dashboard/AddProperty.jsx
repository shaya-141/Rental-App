import React from 'react'
import { useDashboardContext } from '../../Context/ActiveDashboardPage'

function AddProperty() {

    const {PropertyFormShowOrNot, setPropertyFormShowOrNot}= useDashboardContext()

    return (
        <div className='flex items-center  justify-between'>

            <h1 className='text-[18px] font-medium text-gray-900'>Properties</h1>
            <button className='text-[14px] font-medium text-white w-[100px] h-[40px] bg-[#0b1D27] rounded-3xl cursor-pointer' onClick={()=>{setPropertyFormShowOrNot(true)}} >Add New</button>



        </div>

    )
}

export default AddProperty