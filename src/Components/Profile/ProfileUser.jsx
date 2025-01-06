import { getAuth, signOut } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

function ProfileUser({ data ,display}) {
    const Navigate = useNavigate()
    const handleLogut = () => {
        console.log('logout');
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success('logout successfully')
            Navigate('/')


        }).catch((error) => {
            console.log('error while logout',error);
            
            toast.error(error)

        });

    }


    return (
        <div className='p-4'>
            {/* profile pic */}

            {/* profile pic */}

            <div className={`w-[435px] ${display} mt-5 `}>



                <div className=' flex gap-8'>

                    <div className='flex-col'>

                        <span className='text-[16px] font-semibold'>
                            Name
                        </span>
                        <div className='w-[200px] mt-2 h-11 border rounded flex items-center px-3'>
                            <h1 className='text-[#656e73] font-semibold'>{data?.username}</h1>
                        </div>
                    </div>


                    <div className='flex-col'>

                        <span className='text-[16px] font-semibold'>
                            Email
                        </span>
                        <div className='w-[200px] mt-2 h-11 border rounded flex items-center px-3'>
                            <h1 className='text-[#656e73] font-semibold'>{data?.email}</h1>
                        </div>
                    </div>





                </div>

                <div className=' flex gap-8 mt-12' >

                    <div className='flex-col'>

                        <span className='text-[16px] font-semibold'>
                            Contact
                        </span>
                        <div className='w-[200px] mt-2 h-11 border rounded flex items-center px-3'>
                            <h1 className='text-[#656e73] font-semibold'>+{data?.contact}</h1>
                        </div>
                    </div>

                    <div className='flex-col'>

                        <span className='text-[16px] font-semibold'>
                            Password
                        </span>
                        <div className='w-[200px] mt-2 h-11 border rounded flex items-center px-3'>
                            <h1 className='text-[#656e73] font-semibold'>{data?.password}</h1>
                        </div>
                    </div>

                </div>


                <div>

                    <div className='flex-col mt-12'>

                        <span className='text-[16px] font-semibold'>
                            Role
                        </span>
                        <div className='w-[full] mt-2 h-11 border rounded flex items-center px-3'>
                            <h1 className='text-[#656e73] font-semibold'>{data?.Role}</h1>
                        </div>
                    </div>


                </div>



                <div>
                    <button onClick={handleLogut} className="text-[14px] mt-10 w-[150px]  font-medium h-[40px] gap-1 bg-[#0b1D27] text-white rounded-[24px] px-4">
                    
                        Logout
                  
                </button>
                </div>



            </div>


        </div>

    )
}

export default ProfileUser