import React from 'react'
import { useAuthContext } from '../../Context/Auth'
import ProfileUser from './ProfileUser'
import PropertiesOwner from './PropertiesOwner'
import PropertyTable from '../Dashboard/PropertyTable'

import { useState } from 'react'
function Tabs() {
    const{User} = useAuthContext()
    const [whichDisplayShow, setWhichDisplayShow] = useState('profile')
    const [data, setdata] = useState([])

    function handleDsipaly(value){
        setWhichDisplayShow(value)
        console.log(User);
        
    }
    // function handleDsipaly2(value){
    //     setWhichDisplayShow(value)
    // }

    
    return (
        <>
            <div className='w-full flex mt-8 rounded items-center gap-3 justify-between  h-[80px] '>
                <div onClick={()=>{handleDsipaly('profile')}}  className={`w-[45%] cursor-pointer h-full border-[#0b1D27] ${whichDisplayShow == 'profile'?'border-b-4':''}  flex items-center `}>
                    <h1 className='text-[20px] font-semibold'>Profile</h1>
                </div>
                <div  onClick={()=>{handleDsipaly('rented')}} className={`w-[45%] cursor-pointer h-full border-[#0b1D27] ${whichDisplayShow == 'rented'?'border-b-4':''}  flex items-center `}>
                    <h1 className='text-[20px] font-semibold'>Rented Properties</h1>
                </div>
                {/* <div className='w-[280px] cursor-pointer h-full   flex items-center '>
                    <h1 className='text-[20px] font-semibold'>Owners</h1>
                </div>
                <div className='w-[280px] cursor-pointer h-full   flex items-center '>
                    <h1 className='text-[20px] font-semibold'>Profile</h1>
                </div> */}
            </div>

            <ProfileUser data={User} display={whichDisplayShow == 'profile'? 'block': 'hidden'}></ProfileUser>
            
            <PropertyTable data={data} display={whichDisplayShow == 'rented'? 'block': 'hidden'}></PropertyTable>
            {/* <PropertiesOwner></PropertiesOwner> */}



        </>
    )
}

export default Tabs