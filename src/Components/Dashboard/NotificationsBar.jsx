import React, { useEffect, useState } from "react";
import { doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import avatar from "../../assets/icons/avatar.png";
import Loadercomponent from "../loader";

function NotificationsBar({ data }) {
  const [requestDoc, setRequestDoc] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);

  const getCurrentTenantRequest = async (tenantRequestId) => {
    const userRef = doc(db, "Users", tenantRequestId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setRequestDoc(docSnap.data());
    }
  };

  const checkPropertyAssignment = async (propertyId) => {
    const propertyRef = doc(db, "AllProperties", propertyId);
    const propertySnap = await getDoc(propertyRef);

    if (propertySnap.exists()) {
      const propertyData = propertySnap.data();
      if (propertyData?.tenantId !== "none") {
        setIsAssigned(true);
      }
    }
  };

  const updatePropertyTenant = async (propertyId, tenantRequestId) => {
    try {
      setLoading(true);
      const propertyRef = doc(db, "AllProperties", propertyId);
      const propertySnap = await getDoc(propertyRef);
      const propertyRef2 = collection(db, `properties/${UserId}/myproperties`)
      const q = query(propertyRef2,where("propertName"== propertySnap.data().propertyName))
      const snapShot2 = await getDocs(`q`)
      if (propertySnap.exists()) {
        await updateDoc(propertyRef, { tenantId: tenantRequestId });
        await updateDoc(q, { tenantId: tenantRequestId });
        setIsAssigned(true);
        setStatus("Accepted");
        localStorage.setItem(data?.tenantRequestId, "Accepted");
      }
    } catch (error) {
      console.error("Error updating property tenant:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    updatePropertyTenant(data?.propertyId, data?.tenantRequestId);
  };

  const handleReject = () => {
    setStatus("Rejected");
    localStorage.setItem(data?.tenantRequestId, "Rejected");
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
          src={requestDoc?.img || avatar}
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
              disabled={loading}
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0b1D27] text-white"
              } rounded-md p-2 px-4`}
            >
              {loading ? <Loadercomponent /> : "Accept"}
            </button>
            <button
              onClick={handleReject}
              disabled={loading}
              className="bg-[#fff] text-[#0b1D27] border border-[#0b1D27] ml-4 rounded-md p-2 px-4"
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
