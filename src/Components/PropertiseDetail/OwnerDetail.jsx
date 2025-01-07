import React, { useEffect, useState } from 'react';
import avatar from '../../assets/icons/avatar.png';
import key from '../../assets/icons/key.png';
import { useAuthContext } from '../../Context/Auth';
import LoaderComponent from '../loader';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';

function OwnerDetail({ data, OwnerId, propertyId }) {
  const { User, UserId } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);

 

  // Add notification to Firestore
  const addNotification = async (notification) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, 'Notifications'), notification);
      console.log('Notification added with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding notification:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if a notification exists for this tenant and property
  const checkTenantNotification = async (tenantId, propertyId) => {
    try {
      const q = query(
        collection(db, 'Notifications'),
        where('tenantRequestId', '==', tenantId),
        where('propertyId', '==', propertyId)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty; // Return true if notification exists
    } catch (error) {
      console.error('Error checking notifications:', error);
      return false;
    }
  };

  // Handle rent request
  const handleRentRequest = async () => {
    const notification = {
      type: 'request for rent',
      Ownerid: OwnerId,
      tenantRequestId: UserId,
      desc: `Mr. ${User.username} is interested in renting your property. Please review the request and choose to accept or reject it.`,
      accept: false,
      propertyId: propertyId,
    };

    await addNotification(notification);
    setIsRequestSent(true); // Update button state after sending request
  };

  // Check notification status on component load
  useEffect(() => {
    const fetchNotificationStatus = async () => {
      const result = await checkTenantNotification(UserId, propertyId);
      setIsRequestSent(result);
      console.log('Notification status:', result);
    };

    fetchNotificationStatus();
  }, [UserId, propertyId]);
 

  return (
    <div className="w-[35%] h-[400px] bg-[#fafafa] rounded p-4 px-6">
      <h1 className="text-[22px] font-semibold">Owner</h1>
      <img src={data?.img || avatar} className="h-[100px] mt-4" alt="Owner Avatar" />
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex items-center gap-3">
          <h2 className="text-[20px] font-semibold">Name</h2>
          <h2 className="text-[#656e73] font-semibold">{data?.username}</h2>
        </div>
        <div className="flex items-center gap-3">
          <h2 className="text-[20px] font-semibold">Contact</h2>
          <h2 className="text-[#656e73] font-semibold">+{data?.contact}</h2>
        </div>
      </div>

      {/* Rent Button */}
      <button
        onClick={handleRentRequest}
        disabled={isRequestSent || loading} // Disable button if request is sent or loading
        className={`w-full h-11 flex items-center gap-5 justify-center ${
          isRequestSent || loading ? 'bg-gray-400' : 'bg-[#0b1D27]'
        } text-white mt-5 rounded text-[18px]`}
      >
        {loading ? (
          <LoaderComponent />
        ) : isRequestSent ? (
          'Request Sent'
        ) : (
          <>
            Rent It
            <img src={key} className="h-4" alt="Key Icon" />
          </>
        )}
      </button>
    </div>
  );
}

export default OwnerDetail;
