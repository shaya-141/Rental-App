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

  const forTenantProperties = async () => {
    try {
      const q = query(collection(db, 'Notifications'), where('tenantRequestId', '==', UserId));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const notifications = snap.docs.map((doc) => ({
          id: doc.id, // Include document ID if needed
          ...doc.data(), // Spread document data
        }));

        // Use Promise.all to fetch all properties concurrently
        const fetchedProperties = await Promise.all(
          notifications.map(async (data) => {
            const docRef = doc(db, 'AllProperties', data.propertyId);
            const propertySnap = await getDoc(docRef);
            return propertySnap.exists() ? propertySnap.data() : null; // Return null if property doesn't exist
          })
        );

        // Filter out any null values
        setRentProperties(fetchedProperties.filter((property) => property !== null));
      } else {
        console.log('No notifications found for the tenant.');
      }
    } catch (error) {
      console.error('Error fetching tenant notifications:', error);
    }
  };

  useEffect(() => {
    // Only fetch tenant properties when the role is 'tenant'
    if (User?.Role === 'tenant') {
      forTenantProperties();
    }

    // Set properties based on user role
    setProperties(User?.Role === 'landlord' ? properties : RentProperties);

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
