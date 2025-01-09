import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import avatar from "../../assets/icons/avatar.png";
import Loadercomponent from "../loader";

function NotificationsBar({ data }) {
  const [requestDoc, setRequestDoc] = useState(null);
  const [status, setStatus] = useState(null); // Tracks the current status
  const [loadingId, setLoadingId] = useState(null); // Tracks which button is loading
  const [isAssigned, setIsAssigned] = useState(false); // Tracks if a tenant is already assigned
  const [PropertiesArray, setPropertiesArray] = useState([])
  const getCurrentTenantRequest = async (tenantRequestId) => {
    const userRef = doc(db, "Users", tenantRequestId);
    const docSnap = await getDoc(userRef);
    setRequestDoc(docSnap.data());
  };

  const checkPropertyAssignment = async (propertyId) => {
    const propertyRef = doc(db, "AllProperties", propertyId);
    const propertySnap = await getDoc(propertyRef);

    if (propertySnap.exists()) {
      const propertyData = propertySnap.data();
      setPropertiesArray((prevArray) => [...prevArray, propertyData]);

      console.log("Updated Properties Array:", PropertiesArray)
      
      if (propertyData?.tenantId !== 'none') {
        setIsAssigned(true); // Disable buttons if tenant is already assigned

      }
    }
  };

  const updatePropertyTenant = async (propertyId, tenantRequestId) => {
    try {
      setLoadingId(tenantRequestId); // Set loading for the current tenant
      const propertyRef = doc(db, "AllProperties", propertyId);

      const propertySnap = await getDoc(propertyRef);

      if (propertySnap.exists()) {
        const propertyData = propertySnap.data();
        await updateDoc(propertyRef, {
          tenantId: tenantRequestId,
        });
        console.log(
          `Property ${propertyId} updated successfully with tenant ${tenantRequestId}`
        );
        setIsAssigned(true); // Mark the property as assigned
      } else {
        console.error(`Property with ID ${propertyId} does not exist.`);
      }
    } catch (error) {
      console.error("Error updating property tenant:", error);
    } finally {
      setLoadingId(null); // Reset loading after operation
    }
  };

  const handleAccept = () => {
    localStorage.setItem(data?.tenantRequestId, "Accepted");
    setStatus("Accepted");
    updatePropertyTenant(data?.propertyId, data?.tenantRequestId);
  };

  const handleReject = () => {
    localStorage.setItem(data?.tenantRequestId, "Rejected");
    setStatus("Rejected");
  };

  useEffect(() => {
    if (data?.tenantRequestId) {
      const savedStatus = localStorage.getItem(data?.tenantRequestId);
      if (savedStatus) {
        setStatus(savedStatus);
      } else {
        getCurrentTenantRequest(data.tenantRequestId);
      }
    }
    if (data?.propertyId) {
      checkPropertyAssignment(data?.propertyId);
    }
  }, [data]);

  return (
    <div className="w-full min-h-[100px] p-4 flex-wrap flex items-center justify-between gap-3 border-b border-gray-300 bg-[#fafafa]">
      <div className="w-[60px] h-[60px] rounded-full bg-gray-400">
        <img
          src={requestDoc?.img && requestDoc?.img !== "" ? requestDoc?.img : avatar}
          alt="User Avatar"
          className="rounded-full w-full h-full object-cover"
        />
      </div>

      <div>
        <p className="text-[16px] font-semibold">{data?.desc}</p>
      </div>

      <div className="w-[200px]">
        {status === null && !isAssigned ? (
          <>
            <button
              onClick={handleAccept}
              disabled={loadingId === data?.tenantRequestId}
              className={`${
                loadingId === data?.tenantRequestId
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0b1D27] text-white"
              } rounded-md p-2 px-4`}
            >
              {loadingId === data?.tenantRequestId ? <Loadercomponent /> : "Accept"}
            </button>
            <button
              onClick={handleReject}
              disabled={loadingId === data?.tenantRequestId}
              className={`${
                loadingId === data?.tenantRequestId
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#fff] text-[#0b1D27] border border-[#0b1D27]"
              } ml-4 rounded-md p-2 px-4`}
            >
              Reject
            </button>
          </>
        ) : isAssigned ? (
          <button
            disabled
            className="bg-[#1226319d] text-white rounded-md p-2 px-4 cursor-not-allowed"
          >
            Tenant Assigned
          </button>
        ) : status === "Accepted" ? (
          <button
            disabled
            className="bg-[#1226319d] text-white rounded-md p-2 px-4 cursor-not-allowed"
          >
            Accepted
          </button>
        ) : (
          <button
            disabled
            className="bg-[#fff] text-gray-400 border border-gray-300 ml-4 rounded-md p-2 px-4 cursor-not-allowed"
          >
            Rejected
          </button>
        )}
      </div>
    </div>
  );
}

export default NotificationsBar;
