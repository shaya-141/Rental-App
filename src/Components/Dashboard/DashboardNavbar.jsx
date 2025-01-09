import React from 'react'
import bell from '../../assets/icons/bell.png'
import avatar from '../../assets/icons/avatar.png'
import { useAuthContext } from '../../Context/Auth'

function DashboardNavbar() {
  const {User} = useAuthContext()

  return (
    <div className='flex items-center h-[80px] p-3 justify-between '>

        <div>
          <h1 className='text-[24px] font-semibold'>Dashboard</h1>
        </div>

        <div className='flex items-center gap-3'>
          {/* <img src={bell} alt="" className='h-6' /> */}
          <div className='w-[45px] h-[45px] bg-black rounded-3xl'>
              <img src={User?.img !='' ? User?.img : avatar } className='w-full h-full rounded-3xl' alt="" />
          </div>
        </div>

    </div>
  )
}

export default DashboardNavbar