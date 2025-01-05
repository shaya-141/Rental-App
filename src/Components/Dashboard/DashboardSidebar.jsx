import React from 'react'
import homecolor from '../../assets/icons/homewhite.png'
import rentblack from '../../assets/icons/rentblack.png'
import rent from '../../assets/icons/rent.png'
import house from '../../assets/icons/house.png'
import tenantblack from '../../assets/icons/tenantblack.png'
import settings from '../../assets/icons/settings.png'
import settingblack from '../../assets/icons/settingblack.png'
import bell from '../../assets/icons/bell.png'
import bellblack from '../../assets/icons/bellblack.png'
import logout from '../../assets/icons/logoutwhite.png'
import { useDashboardContext } from '../../Context/ActiveDashboardPage'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { toast } from 'sonner'

function DashboardSidebar() {
    const Navigate = useNavigate()
    const { currentPage, setcurrentPage, check, a } = useDashboardContext()
    const handleDashboard = (e) => {
        setcurrentPage(e)
        console.log(currentPage);


    }

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
        <div className='w-[80px] bg-[#0b1D27]  rounded-3xl h-full flex flex-col items-center  p-6' >
            <div >
                <Link to={'/'}>
                    <img src={homecolor} className='h-8  cursor-pointer' alt="" />
                </Link>
            </div>

            <div className='mt-[100px] flex flex-col   gap-5'>
                <div onClick={() => handleDashboard('propertise')} className={`h-[60px]
                    ${currentPage === 'propertise' ? 'bg-[#fafafa]' : 'bg-[#0b1D27]'}  ml-1  rounded-tl-[30px] rounded-bl-[30px]  w-[80px] flex justify-center items-center `} >
                    <img src={currentPage === 'propertise' ? rentblack : rent} className='h-7  cursor-pointer' alt="" />
                </div>

                <div onClick={() => handleDashboard('tenant')} className={`h-[60px] w-[80px]  ml-1 flex justify-center items-center ${currentPage === 'tenant' ? 'bg-[#fafafa]' : 'bg-[#0b1D27]'} rounded-bl-[30px] rounded-tl-[30px]`} >
                    <img src={currentPage === 'tenant' ? tenantblack : house} className='h-7 cursor-pointer' alt="" />
                </div>

                <div onClick={() => handleDashboard('notifications')} className={`h-[60px] ml-1  w-[80px] flex justify-center items-center ${currentPage === 'notifications' ? 'bg-[#fafafa]' : 'bg-[#0b1D27]'} rounded-bl-[30px] rounded-tl-[30px]`} >
                    <img src={currentPage === 'notifications' ? bellblack : bell} className='h-7 cursor-pointer' alt="" />
                </div>

                <div onClick={() => handleDashboard('settings')} className={`h-[60px] ml-1  w-[80px] flex justify-center items-center ${currentPage === 'settings' ? 'bg-[#fafafa]' : 'bg-[#0b1D27]'} rounded-bl-[30px] rounded-tl-[30px]`} >
                    <img src={currentPage === 'settings' ? settingblack : settings} className='h-7 cursor-pointer' alt="" />
                </div>
            </div>


            <div onClick={handleLogut} className='h-[60px] w-[80px] mt-[100px] flex justify-center items-center ' >
                <img src={logout} className='h-5 cursor-pointer' alt="" />
            </div>
        </div>
    )
}

export default DashboardSidebar