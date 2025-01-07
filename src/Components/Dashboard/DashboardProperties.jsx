import React, { useEffect, useState } from 'react'
import PropertyTable from './PropertyTable'
import AddProperty from './AddProperty'
import { useAuthContext } from '../../Context/Auth'
import { useFilesContext } from '../../Context/GetUserFilesFromFirebase'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../utils/firebase'

function DashboardProperties() {
  const { User, isLoggedin, UserId } = useAuthContext();
  const { properties } = useFilesContext();
  const [Properties, setProperties] = useState([]);
  const [RentProperties, setRentProperties] = useState([]);

 
  useEffect(() => {
    // Only fetch tenant properties when the role is 'tenant'
   

    // Set properties based on user role
    setProperties(properties);
    console.log('Properties from files', properties);
    

  }, [User, properties, RentProperties]);
  // console.log('UserId from files', properties);

  return (
    <div className="h-[100%] w-full p-3">
      <h1 className="text-[18px] font-medium text-gray-900">
       <AddProperty></AddProperty>
      </h1>

      <section className="mt-6">
        <PropertyTable display={'block'} Properties={User?.Role === 'landlord' ? properties : RentProperties} />
      </section>
    </div>
  );
}

export default DashboardProperties;
