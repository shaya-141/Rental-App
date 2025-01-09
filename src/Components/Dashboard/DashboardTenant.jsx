import React from 'react'
import TenantTable from './TenantTable'
import { useAuthContext } from '../../Context/Auth';

function DashboardTenant() {
   const {User,isLoggedin} = useAuthContext()
    // console.log(isLoggedin);
  return (
    <div className='h-[100%] w-full  p-3'>
             <h1 className='text-[18px] font-medium text-gray-900'>
              {
                isLoggedin ? 
                    User.Role === 'landlord' ?
                    'Tenant'
                    :
                    'LandOwner'
                : 
                null
              }
       </h1>

            <section className='mt-6'>
                 <TenantTable></TenantTable>
            </section>
    </div>
  )
}

export default DashboardTenant