import React from 'react'

function HighLightCard({img,text,heading}) {
  return (
    <div id='HighLightCard' className='w-[240px] h-[180px] p-4 bg-[#fafafa] flex flex-col items-start gap-2 rounded-2xl'>
            <img src={img} className='h-6 w-6' alt="" />
            <h1 className='text-[20px] font-semibold'>{heading}</h1>
            <p className='text-[#656e73] text-[14px] font-semibold'>{text}</p>
    </div>
  )
}

export default HighLightCard