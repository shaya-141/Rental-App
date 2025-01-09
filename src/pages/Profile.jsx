import React from 'react'
import Navbar from '../Components/LandingPage/Navbar'
import DashboardSidebar from '../Components/Dashboard/DashboardSidebar'
import Tabs from '../Components/Profile/Tabs'
import ProfileDp from '../Components/Profile/ProfileDp'

function Profile() {

    

    return (
        <>
            <Navbar></Navbar>
            <div className='p-8'>

                 <ProfileDp></ProfileDp>

                <Tabs></Tabs>
           

                {/* <div className='w-full h-full bg-red-300'>
            <div className='flex-col p-10'>
            <h1>Profile</h1>
            <h1>My properties</h1>
            </div>
            </div> */}

            </div>
        </>
    )
}

export default Profile