import React from 'react'
// import cardimg from '../../assets/banner/cardimg.JFIF'
import locate from '../../assets/icons/location.png'
import bed from '../../assets/icons/bed.png'
import bath from '../../assets/icons/bath.png'
import area from '../../assets/icons/area.png'
import { Link } from 'react-router-dom'
function Card({data}) {
  return (
    <Link to={`/propertise/${data?.id}`}>
  
    <div className='w-[330px] h-[440px] mt-10  rounded-2xl '>
        <div className='h-[75%] w-full'>
            <img src={data? data?.images?.[0] : ''} className='h-full rounded-2xl w-full' alt="" />
        </div>
        <p className='flex items-center mt-4 font-medium gap-1'><img src={locate} className='h-4' alt="" />{data? data?.address.slice(0,20) :  'Majeed Colony'}</p>
        <div className='flex items-center justify-between mt-1'>
            <h1 className='text-[20px] font-semibold'>{data? data?.propertyName :  'SunnyVale Retreat'}   </h1>
            <h1 className='text-[18px] font-semibold'> {data? data?.rent :  '500'} pkr</h1>
        </div>
        <div className='flex items-center mt-2 gap-2  font-medium '>
            <p className='flex items-center gap-1 text-[14px] text-[#656e73] font-semibold'><img src={bed} className='h-4' alt="" />Bedroom</p>
            <p className='flex items-center gap-1 text-[14px] text-[#656e73] font-semibold'>|<img src={bath} className='h-4' alt="" />Bathroom</p>
            <p className='flex items-center gap-1 text-[14px] text-[#656e73] font-semibold'>|<img src={area} className='h-4' alt="" />{data? data?.area :  '80'} </p>
        </div>

    </div>
    </Link>
  )
}

export default Card