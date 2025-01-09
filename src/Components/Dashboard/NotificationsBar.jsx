import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import avatar from "../../assets/icons/avatar.png";
import Loadercomponent from "../loader";
import { useAuthContext } from "../../Context/Auth";

function NotificationsBar({ data }) {
  const [requestDoc, setRequestDoc] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const { UserId } = useAuthContext();

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
        setStatus("Accepted");
      }
    }
  };

  const updatePropertyTenant = async (propertyId, tenantRequestId) => {
    try {
      setLoading(true);

      // Step 1: Reference to the document in "AllProperties"
      const propertyRef = doc(db, "AllProperties", propertyId);
      const propertySnap = await getDoc(propertyRef);

      if (propertySnap.exists()) {
        const propertyData = propertySnap.data();

        // Step 2: Update the "AllProperties" document
        await updateDoc(propertyRef, { tenantId: tenantRequestId });

        // Step 3: Query the corresponding document in "MyProperties"
        const userPropertiesRef = collection(db, `properties/${UserId}/myproperties`);
        const q = query(userPropertiesRef, where("propertyName", "==", propertyData.propertyName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Step 4: Update each matching document in "MyProperties"
          querySnapshot.forEach(async (docSnap) => {
            const docRef = doc(db, `properties/${UserId}/myproperties`, docSnap.id);
            await updateDoc(docRef, { tenantId: tenantRequestId });
          });

          // Update local states
          setIsAssigned(true);
          setStatus("Accepted");
          console.log(`Updated tenantId in "AllProperties" and "MyProperties" successfully.`);
        } else {
          console.warn("No matching document found in MyProperties for the given propertyName.");
        }
      } else {
        console.error("Property document does not exist in AllProperties.");
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

  const handleReject = async () => {
    try {
      setLoading(true);

      // Update the rejection status in the "AllProperties" document
      const propertyRef = doc(db, "AllProperties", data?.propertyId);
      await updateDoc(propertyRef, { tenantId: "none" });

      setStatus("Rejected");
      console.log("Tenant request rejected successfully.");
    } catch (error) {
      console.error("Error rejecting tenant request:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?.tenantRequestId) {
      getCurrentTenantRequest(data.tenantRequestId);
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
