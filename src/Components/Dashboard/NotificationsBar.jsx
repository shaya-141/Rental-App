import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../utils/firebase';
import avatar from '../../assets/icons/avatar.png';

function NotificationsBar({data}) {

    // useState([] = useState(null));
    const [requestDoc, setrequestDoc] = useState(null)

    const getCurrentTenantRequest = async (tenantRequestId) => {
        console.log('tenant id', tenantRequestId);
    
        const userRef = doc(db, 'Users', tenantRequestId);
        const docSnap = await getDoc(userRef);
        console.log(docSnap.data());
        setrequestDoc(docSnap.data());
        
        
      };

      useEffect(() => {
        getCurrentTenantRequest(data?.tenantRequestId);
      },[data])


    return (
       
            <div className='w-[full] min-h-[100px] p-4 flex-wrap flex items-center justify-between gap-3 border-b border-gray-300 bg-[#fafafa]'>

                < div className='w-[60px] h-[60px] rounded-full bg-gray-400'>
                    <img src={requestDoc?.img !="" ? requestDoc?.img :avatar } alt="" />

                </div>

                <div>
                    <p className='text-[16px] font-semibold'>{data?.desc}</p>
                </div>

                <div className='w-[200px] '>
                    <button className='bg-[#0b1D27] text-white rounded-md p-2 px-4'>Accept</button>
                    <button className='bg-[#fff] font-medium text-[#0b1D27] border border-[#0b1D27] ml-4 rounded-md p-2 px-4'>Reject</button>
                </div>


            </div>
        
    )
}

export default NotificationsBar