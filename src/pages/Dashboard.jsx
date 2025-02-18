import React, { useState, useEffect } from 'react'
import DashboardSidebar from '../Components/Dashboard/DashboardSidebar'
import DashboardNavbar from '../Components/Dashboard/DashboardNavbar'
import DashboardProperties from '../Components/Dashboard/DashboardProperties'
import { useDashboardContext } from '../Context/ActiveDashboardPage'
import DashboardTenant from '../Components/Dashboard/DashboardTenant'
import DashboardNotifications from '../Components/Dashboard/DashboardNotifications'
import DashboardSettings from '../Components/Dashboard/DashboardSettings'
import AdddpropertyForm from '../Components/Dashboard/AdddpropertyForm'
import { useAuthContext } from '../Context/Auth'
import Profile from './Profile'
import { Navigate } from 'react-router-dom'
import LoaderComponent from '../Components/loader'
// import LoaderComponent from '../Components/Loader' // Assume you have a loader component

function Dashboard() {
    const { currentPage } = useDashboardContext()
    const { User, isLoggedin } = useAuthContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check the login state and set loading to false once the check is done
        if (isLoggedin !== null) {
            setLoading(false)
        }
    }, [isLoggedin])

    // if (loading) {
    //     // Display loader until authentication state is determined
    //     return <LoaderComponent />
    // }

    return (
        <>
            {
                isLoggedin ? (
                    User?.Role === 'landowner' ? (
                        <>
                            <AdddpropertyForm />
                            <div className="h-screen overflow-hidden flex p-4">
                                <DashboardSidebar />
                                <section className="w-[93%] rounded-[20px] p-2 h-full bg-[#fafafa]">
                                    <DashboardNavbar />

                                    {
                                        currentPage === 'propertise' ? (
                                            <DashboardProperties />
                                        ) : currentPage === 'tenant' ? (
                                            <DashboardTenant />
                                        ) : currentPage === 'notifications' ? (
                                            <DashboardNotifications />
                                        ) : currentPage === 'settings' ? (
                                            <DashboardSettings data={User} />
                                        ) : null
                                    }

                                </section>
                            </div>
                        </>
                    ) : (
                        <Profile />
                    )
                ) : 
                <div className='w-screen h-screen flex justify-center items-center'>    
                    <LoaderComponent size={50} color="#ffffff" />

                </div>
                    // Redirect to login if the user is not logged in
                
            }
        </>
    )
}

export default Dashboard
