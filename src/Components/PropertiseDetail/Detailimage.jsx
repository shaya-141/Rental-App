import React from 'react'
import locate from '../../assets/icons/location.png'
import bed from '../../assets/icons/bed.png'
import bath from '../../assets/icons/bath.png'
import area from '../../assets/icons/area.png'
import kitchen from '../../assets/icons/kitchen.png'

function Detailimage({data}) {
    return (
        <div className='w-[700px]'>

            <div className='w-full h-[400px]  rounded'>

                <img src={data?.images?.[0]} alt="" className='w-full h-[400px] rounded' />

            </div>

            <div className='w-full flex gap-2 h-[60px] px-1  '>
                <div className='w-[25%]  flex gap-2 items-center h-full'>
                    <img src={bed} alt="" className='h-7' />
                    <h1 className=' text-[#656e73] text-[15px] '> {data?.bedrooms} bedrooms</h1>
                </div>

                <div className='w-[25%]  gap-2  flex items-center h-full'>
                    <img src={bath} alt="" className='h-7' />
                    <h1 className=' text-[#656e73] text-[15px] mt-1'> {data?.bathrooms} bathrooms</h1>
                </div>

                <div className='w-[25%]   gap-2  flex items-center h-full'>
                    <img src={kitchen} alt="" className='h-7' />
                    <h1 className=' text-[#656e73] text-[15px] mt-2'>{data?.kitchens} kitchens</h1>
                </div>
                <div className='w-[25%]   gap-2  flex items-center h-full'>
                    <img src={area} alt="" className='h-7 mt-2' />
                    <h1 className=' text-[#656e73] text-[15px] mt-3'>{data?.area}<span className='text-[12px]'>gaz</span>  area</h1>
                </div>
            </div>

        </div>
    )
}

export default Detailimage