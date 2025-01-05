import React from 'react'

function DashboardSettings({data}) {

  console.log(data);
  
  return (

    <div className='p-4'>
      {/* profile pic */}
      <div className='w-[150px] h-[150px] mb-12 bg-blue-500 rounded-full'>

      </div>
      {/* profile pic */}

      <div className='w-[435px] mt-5 '>

     

      <div className=' flex gap-8'>

        <div className='flex-col'>

          <span className='text-[16px] font-semibold'>
            Name
          </span>
          <div className='w-[200px] mt-2 h-11 border rounded flex items-center px-3'>
            <h1 className='text-[#656e73] font-semibold'>{data?.username}</h1>
          </div>
        </div>


        <div className='flex-col'>

          <span className='text-[16px] font-semibold'>
            Email
          </span>
          <div className='w-[200px] mt-2 h-11 border rounded flex items-center px-3'>
            <h1 className='text-[#656e73] font-semibold'>{data?.email}</h1>
          </div>
        </div>





      </div>

      <div className=' flex gap-8 mt-12' >

        <div className='flex-col'>

          <span className='text-[16px] font-semibold'>
            Contact
          </span>
          <div className='w-[200px] mt-2 h-11 border rounded flex items-center px-3'>
            <h1 className='text-[#656e73] font-semibold'>+{data?.contact}</h1>
          </div>
        </div>

        <div className='flex-col'>

          <span className='text-[16px] font-semibold'>
            Password
          </span>
          <div className='w-[200px] mt-2 h-11 border rounded flex items-center px-3'>
            <h1 className='text-[#656e73] font-semibold'>{data?.password}</h1>
          </div>
        </div>

      </div>


      <div>

        <div className='flex-col mt-12'>

          <span className='text-[16px] font-semibold'>
            Role
          </span>
          <div className='w-[full] mt-2 h-11 border rounded flex items-center px-3'>
            <h1 className='text-[#656e73] font-semibold'>{data?.Role}</h1>
          </div>
        </div>
      </div>

      

      </div>


    </div>



  )
}

export default DashboardSettings