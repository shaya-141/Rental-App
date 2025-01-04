import React from 'react'
import locate from '../../assets/icons/location.png'
function DetailText({ data }) {
    return (
        <div className='w-full mt-2 px-9'>
            {/* name of properties */}
            <div className='flex'>
                <h1 className='text-[22px] font-semibold'>{data?.propertyName}</h1>
                {/* <h1 className='text-[20px] font-semibold'>{data?.rent} <span>pkr</span></h1> */}
            </div>
            <h1  className='text-[20px] font-semibold mt-6'>Location</h1>
            <div className='flex items-center mt-6 gap-2'>  
                <img src={locate} alt="" className='h-6 mb-1' />
                <h1 className='text-[18px] font-semibold text-[#656e73]'>{data?.address}</h1>
            </div>
            {/* property details  */}

                <h1  className='text-[20px] font-semibold mt-6'>Details</h1>
            <div className="flex  max-w-[700px] min-h-[80px] mt-6 ">
                <div className="flex flex-col w-1/2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-[18px] font-semibold w-[40%]">Type:</h1>
                        <p className="w-[50%] text-[#656e73] font-semibold ">{data?.propertyType}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        <h1 className="text-[18px]  font-semibold w-[40%]">Furnished:</h1>
                        <p className="w-[50%] text-[#656e73] font-semibold ">{data?.furnished}</p>
                    </div>
                </div>
                <div className="flex flex-col w-1/2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-[18px]  font-semibold w-[40%]">Rent:</h1>
                        <p className="w-[50%] text-[#656e73] font-semibold ">
                            {data?.rent} <span>PKR</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        <h1 className="text-[18px] font-semibold w-[40%]">Type:</h1>
                        <p className="w-[50%] text-[#656e73] font-semibold ">{data?.propertyType}</p>
                    </div>
                </div>
            </div>




            <div className='max-w-[700px]'>


            <h1  className='text-[20px] font-semibold mt-3'>Overview</h1>
            <p className='text-[#656e73] font-semibold mt-5'>{data?.overview}</p>
            </div>

           



        </div>
    )
}

export default DetailText