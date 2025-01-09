import React, { useEffect, useState } from "react";
import edit from "../../assets/icons/edit.png";
import eye from "../../assets/icons/eye.png";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../utils/firebase"; // Import your Firebase config

function PropertyTable({ Properties, display }) {
  const [tenantNames, setTenantNames] = useState({}); // Store tenant names by tenantId

  // Function to fetch tenant details
  async function fetchTenantDetail(tenantId) {
    try {
      const docRef = doc(db, "Users", tenantId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().username; // Returning the tenant's username
      } else {
        console.error("No user data found in Firestore for tenantId:", tenantId);
        return null;
      }
    } catch (error) {
      console.error("Error fetching tenant data:", error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchAllTenantDetails() {
      const names = {};
      for (const property of Properties || []) {
        const { tenantId } = property;
        if (tenantId && tenantId !== "none" && !names[tenantId]) {
          // Fetch the tenant details only once for each tenantId
          const tenantName = await fetchTenantDetail(tenantId);
          names[tenantId] = tenantName;
        }
      }
      setTenantNames(names); // Store tenant names in state
    }

    if (Properties?.length) {
      fetchAllTenantDetails();
    }
  }, [Properties]);

  return (
    <div className={`relative  overflow-x-auto shadow-md sm:rounded-lg`}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-[#656e73] uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Property Name
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Tenant
            </th>
            <th scope="col" className="px-6 py-3">
              Rent
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
          {Properties?.map((data, key) => {
            const tenantName = tenantNames[data.tenantId]; // Get tenant name from state
            return (
              <tr key={key} className="bg-white text-[#656e73] font-medium border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 text-[15px] font-semibold text-[#0b1D27] whitespace-nowrap dark:text-white">
                  {data.propertyName}
                </th>
                <td className="px-6 py-4 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {data.address}
                </td>
                <td className="px-6 py-4">
                  {data.tenantId === "none" ? "No Tenant" : tenantName || "Loading..."}
                </td>
                <td className="px-6 py-4">{data.rent}</td>
                <td className="px-6 py-4 text-[#0b1D27] font-semibold">
                  {data.tenantId === "none" ? "Pending" : "Tenant Assigned"}
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

export default PropertyTable;
