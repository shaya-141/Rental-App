import React, { useState } from 'react'
import DashboardSidebar from '../Components/Dashboard/DashboardSidebar'
import DashboardNavbar from '../Components/Dashboard/DashboardNavbar'
import DashboardProperties from '../Components/Dashboard/DashboardProperties'
import { useDashboardContext } from '../Context/ActiveDashboardPage'
import DashboardTenant from '../Components/Dashboard/DashboardTenant'
import DashboardNotifications from '../Components/Dashboard/DashboardNotifications'
import DashboardSettings from '../Components/Dashboard/DashboardSettings'
import AdddpropertyForm from '../Components/Dashboard/AdddpropertyForm'
import { useAuthContext } from '../Context/Auth'




function Dashboard() {
    const { currentPage, setcurrentPage, check, a } = useDashboardContext()
    const {User} = useAuthContext()
    // setActivePage('hoga')

    // console.log('currentPage',currentPage);
    // console.log('chcek',check);
    console.log(User);
    



    return (
        <>
            <AdddpropertyForm></AdddpropertyForm>
            <div className='h-screen  overflow-hidden flex  p-4 ' >
                <DashboardSidebar></DashboardSidebar>
                <section className='w-[93%] rounded-[20px] p-2 h-full bg-[#fafafa]'>
                    <DashboardNavbar></DashboardNavbar>

                    {
                        currentPage === 'propertise' ? (
                            <DashboardProperties />
                        ) : currentPage === 'tenant' ? (
                            <DashboardTenant />
                        ) : currentPage === 'notifications' ? (
                            <DashboardNotifications />
                        ) : currentPage === 'settings' ? (
                            <DashboardSettings />
                        ) : null
                    }





                </section>

            </div>
        </>
    )
}

export default Dashboard