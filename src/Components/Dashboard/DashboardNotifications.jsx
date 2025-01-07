import React, { useEffect, useState } from 'react'
import NotificationsBar from './NotificationsBar'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useAuthContext } from '../../Context/Auth';

function DashboardNotifications() {
  const { User, UserId } = useAuthContext();
  const [Notifications, setNotifications] = useState([]);


  const forOwnerNotifications = async () => {
    try {
        console.log("forOwnerNotifications");
        
      const q = query(collection(db, 'Notifications'), where('Ownerid', '==', UserId));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const notifications = snap.docs.map((doc) => ({
          id: doc.id, // Include document ID if needed
          ...doc.data(), // Spread document data
        }));

        // Use Promise.all to fetch all properties concurrently
        // const fetchedProperties = await Promise.all(
        //   notifications.map(async (data) => {
        //     const docRef = doc(db, 'AllProperties', data.propertyId);
        //     const propertySnap = await getDoc(docRef);
        //     return propertySnap.exists() ? propertySnap.data() : null; // Return null if property doesn't exist
        //   })
        // );

        console.log("notifications",notifications);
        setNotifications(notifications)
        
        
        // Filter out any null values
        // setnotifications(fetchedProperties.filter((property) => property !== null));


      } else {
        console.log('No notifications found for the tenant.');
      }
    } catch (error) {
      console.error('Error fetching tenant notifications:', error);
    }
  };
useEffect(() => {
    if (User?.Role === 'landlord') {
        forOwnerNotifications();
      }
}, [UserId])



  return (
    <div className='p-4 w-full h-full'>
         <h1 className='text-[18px] font-medium text-gray-900'>Notifications</h1>
         <div className=' w-full h-full'>

         {
           Notifications.map((data,key)=>{
             
             return <NotificationsBar key={key} data={data}></NotificationsBar>
            })
          }
          </div>
        {/* <NotificationsBar ></NotificationsBar> */}
    </div>
  )
}

export default DashboardNotifications