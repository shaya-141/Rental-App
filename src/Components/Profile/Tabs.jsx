import React, { useEffect } from 'react'
import { useAuthContext } from '../../Context/Auth'
import ProfileUser from './ProfileUser'
import PropertiesOwner from './PropertiesOwner'
import PropertyTable from '../Dashboard/PropertyTable'
import { useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import { useFilesContext } from '../../Context/GetUserFilesFromFirebase'

function Tabs() {
    const { User, UserId } = useAuthContext()
    const [whichDisplayShow, setWhichDisplayShow] = useState('profile')
    const{RentProperties} = useFilesContext()

    function handleDsipaly(value) {
        setWhichDisplayShow(value)
        console.log(User)
    }

    // Function to fetch rented properties
   


    return (
        <>
            <div className='w-full flex mt-8 rounded items-center gap-3 justify-between  h-[80px] '>
                <div onClick={() => { handleDsipaly('profile') }} className={`w-[45%] cursor-pointer h-full border-[#0b1D27] ${whichDisplayShow == 'profile' ? 'border-b-4' : ''}  flex items-center `}>
                    <h1 className='text-[20px] font-semibold'>Profile</h1>
                </div>
                <div onClick={() => { handleDsipaly('rented') }} className={`w-[45%] cursor-pointer h-full border-[#0b1D27] ${whichDisplayShow == 'rented' ? 'border-b-4' : ''}  flex items-center `}>
                    <h1 className='text-[20px] font-semibold'>Rented Properties</h1>
                </div>
            </div>

            <ProfileUser data={User} display={whichDisplayShow == 'profile' ? 'block' : 'hidden'} />
            
            <div className={whichDisplayShow == 'rented' ? 'block' : 'hidden'}>
                {RentProperties.length === 0 ? (
                    <p className="text-center text-xl mt-[100px] font-semibold">No properties rented</p>
                ) : (
                    <PropertyTable Properties={RentProperties} />
                )}
            </div>
        </>
    )
}

export default Tabs
