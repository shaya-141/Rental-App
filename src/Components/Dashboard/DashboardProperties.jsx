import React, { useEffect, useState } from 'react'
import PropertyTable from './PropertyTable'
import AddProperty from './AddProperty'
import { useAuthContext } from '../../Context/Auth'
import { useFilesContext } from '../../Context/GetUserFilesFromFirebase'

function DashboardProperties() {

  const {User,isLoggedin} = useAuthContext()
  console.log(isLoggedin);
  const {propertiesArray} = useFilesContext()
  const [Properties, setProperties] = useState([])
  useEffect(()=>{
    setProperties(propertiesArray)

    console.log("UserId from files", propertiesArray);
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
                 <PropertyTable Properties={propertiesArray}></PropertyTable>
            </section>
    </div>
  )
}

export default DashboardProperties