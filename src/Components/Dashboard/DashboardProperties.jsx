import React, { useEffect, useState } from 'react'
import PropertyTable from './PropertyTable'
import AddProperty from './AddProperty'
import { useAuthContext } from '../../Context/Auth'
import { useFilesContext } from '../../Context/GetUserFilesFromFirebase'


function DashboardProperties() {

  const {User,isLoggedin} = useAuthContext()
  const {properties} = useFilesContext()
  const [Properties, setProperties] = useState([])
  useEffect(()=>{
    setProperties(properties)

    console.log("UserId from files", properties);
  },[])

  
  

  return (
    <div className='h-[100%] w-full  p-3'>



        <h1 className='text-[18px] font-medium text-gray-900'>

          {
            isLoggedin ?
            
            
            User.Role === 'landlord' ?
            <AddProperty></AddProperty>
            : 
            'My Rented Properties'
            : null
            
          }
          </h1>

            <section className='mt-6'>
                 <PropertyTable Properties={properties}></PropertyTable>
            </section>
    </div>
  )
}

export default DashboardProperties