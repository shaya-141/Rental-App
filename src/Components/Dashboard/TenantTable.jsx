import React from 'react'
import edit from '../../assets/icons/edit.png'
import eye from '../../assets/icons/eye.png'
function TenantTable() {
  return (
    

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-[#656e73]  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Tenant Name
                </th>
                <th scope="col" class="px-6 py-3">
                   Property Rented
                </th>
                <th scope="col" class="px-6 py-3">
                Phone Number
                </th>
                <th scope="col" class="px-6 py-3">
                    Rent Amount
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    View
                </th>
                <th scope="col" class="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
           
            <tr class="bg-white text-[#656e73] font-medium border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 text-[15px] font-semibold text-[#0b1D27] whitespace-nowrap dark:text-white">
                    House No 12
                </th>
                <td class="px-6 py-4">
                    Majeed Colony Sector 1
                </td>
                <td class="px-6 py-4">
                    Shayan
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4">
                    PAID
                </td>
                <td class="px-6 py-4">
                    <img src={eye} className='h-4 cursor-pointer' alt="" />
                </td>
                <td class="px-6 py-4">
                    <img src={edit} className='h-4 cursor-pointer' alt="" />
                </td>
            </tr>
           
        </tbody>
    </table>
</div>

  )
}

export default TenantTable