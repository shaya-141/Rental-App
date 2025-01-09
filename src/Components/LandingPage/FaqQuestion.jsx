import React, { useState } from 'react'
import plus from '../../assets/icons/plus.png'

function FaqQuestion({ heading, para }) {
  const [hide, sethide] = useState(true)

  const hideAndShow = () => {
    hide ? sethide(false) : sethide(true)
  }

  return (
    <div className='w-full sm:w-[80%] rounded-2xl p-8 flex flex-col gap-4 bg-[#fafafa]'>
      <div className='flex items-center justify-between'>
        <h1 className='font-semibold text-[20px]'>{heading}</h1>
        <img onClick={hideAndShow} src={plus} className='h-5 cursor-pointer' alt="" />
      </div>

      <p className={`${hide ? 'hidden' : 'inline'} text-[15px] font-semibold w-[70%] text-[#656e73]`}>
        {para}
      </p>
    </div>
  )
}

export default FaqQuestion
