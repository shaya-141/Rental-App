import React from 'react'
import bell from '../../assets/icons/bell.png'

function DashboardNavbar() {
  return (
    <div className='flex items-center h-[80px] p-3 justify-between '>

        <div>
          <h1 className='text-[24px] font-semibold'>Dashboard</h1>
        </div>

        <div className='flex items-center gap-3'>
          <img src={bell} alt="" className='h-6' />
          <div className='w-11 h-11 bg-black rounded-3xl'>

          </div>
        </div>

    </div>
  )
}

export default DashboardNavbar