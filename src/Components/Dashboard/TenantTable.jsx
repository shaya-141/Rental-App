import React, { useEffect, useState } from "react";
import edit from "../../assets/icons/edit.png";
import eye from "../../assets/icons/eye.png";
import { useFilesContext } from "../../Context/GetUserFilesFromFirebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase"; // Ensure you have your Firebase configuration here

function TenantTable() {
  const { properties } = useFilesContext();
  const [tenantData, setTenantData] = useState({}); // Store user data by tenantId

  // Function to fetch tenant details based on tenantId
  async function fetchTenantDetails(tenantId) {
    try {
      const docRef = doc(db, "Users", tenantId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data(); // Return user data
      } else {
        console.error("No user data found for tenantId:", tenantId);
        return null;
      }
    } catch (error) {
      console.error("Error fetching tenant data:", error);
      return null;
    }
  }

  // Fetch tenant details for all properties once component is mounted
  useEffect(() => {
    async function fetchAllTenantDetails() {
      const data = {};
      for (const property of properties) {
        const { tenantId } = property;
        if (tenantId !== "none" && tenantId) {
          if (!data[tenantId]) {
            const tenantDetails = await fetchTenantDetails(tenantId);
            data[tenantId] = tenantDetails;
          }
        }
      }
      setTenantData(data); // Store all tenant data in state
    }

    if (properties?.length) {
      fetchAllTenantDetails();
    }
  }, [properties]);

  const propertiesWithTenant = properties.filter(
    (property) => property.tenantId !== "none" && property.tenantId
  );



  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-[#656e73] uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tenant Name
            </th>
            <th scope="col" className="px-6 py-3">
              Property Rented
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              Rent Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              View
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {propertiesWithTenant?.map((property, index) => {
            const tenant = tenantData[property.tenantId];
            return (
              <tr
                key={index}
                className="bg-white text-[#656e73] font-medium border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 text-[15px] font-semibold text-[#0b1D27] whitespace-nowrap dark:text-white"
                >
                  {tenant ? tenant.username : "Loading..."}
                </th>
                <td className="px-6 py-4">
                  {property.address}
                </td>
                <td className="px-6 py-4">+
                  {tenant ? tenant.contact:'loading'}
                </td>
                <td className="px-6 py-4">
                  {property.rent}
                </td>
                <td className="px-6 py-4">
                  {property.tenantId === "none" ? "Pending" : "Tenant Assigned"}
                </td>
                <td className="px-6 py-4">
                  <img src={eye} className="h-4 cursor-pointer" alt="view" />
                </td>
                <td className="px-6 py-4">
                  <img src={edit} className="h-4 cursor-pointer" alt="edit" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TenantTable;
