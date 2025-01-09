import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
  } from "firebase/firestore";
  import React, { useEffect, useState } from "react";
  import { db } from "../../utils/firebase";
  import avatar from "../../assets/icons/avatar.png";
  import Loadercomponent from "../loader";
  
  function NotificationsBar({ data }) {
    const [requestDoc, setRequestDoc] = useState(null);
    const [status, setStatus] = useState(null); // Tracks the current status (e.g., "Accepted", "Rejected")
    const [requestProperty, setRequestProperty] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const getCurrentTenantRequest = async (tenantRequestId) => {
      console.log("tenant id", tenantRequestId);
  
      const userRef = doc(db, "Users", tenantRequestId);
      const docSnap = await getDoc(userRef);
      console.log(docSnap.data());
      setRequestDoc(docSnap.data());
    };
  
    const updatePropertyTenant = async (propertyId, tenantRequestId) => {
      try {
        setLoading(true);
        // Reference to the property document
        const propertyRef = doc(db, "AllProperties", propertyId);
  
        // Fetch the property document
        const propertySnap = await getDoc(propertyRef);
  
        if (propertySnap.exists()) {
          // Log the current data of the property
          const propertyData = propertySnap.data();
          setRequestProperty(propertyData);
          console.log("Current Property Data:", propertyData);
  
          // Update the tenant field
          await updateDoc(propertyRef, {
            tenantId: tenantRequestId,
          });
          updatePropertyForMyPropertiesCollection(propertyData?.propertyName);
          console.log(
            `Property ${propertyId} updated successfully with tenant ${tenantRequestId}`
          );
          setLoading(false);
        } else {
          console.error(`Property with ID ${propertyId} does not exist.`);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error updating property tenant:", error);
        setLoading(false);
      }
    };
  
    const updatePropertyForMyPropertiesCollection = async (propertyName) => {
      try {
        // Reference to the collection
        const propertyCollectionRef = collection(
          db,
          `properties/${data?.Ownerid
          }/myproperties`
        );
  
        // Query to find the document where "propertyName" matches
        const propertyQuery = query(
          propertyCollectionRef,
          where("propertyName", "==", propertyName)
        );
        const querySnapshot = await getDocs(propertyQuery);
  
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (docSnap) => {
            // Get the document reference
            const propertyDocRef = docSnap.ref;
  
            // Log the current data of the property
            const propertyData = docSnap.data();
            console.log("Current Property Data:", propertyData);
  
            // Update the tenant field
            await updateDoc(propertyDocRef, {
              tenantId: tenantRequestId,
            });
  
            console.log(
              `Property ${docSnap.id} updated successfully with tenant ${tenantRequestId}`
            );
          });
        } else {
          console.error(`No property found with the name "${propertyName}".`);
        }
      } catch (error) {
        console.error("Error updating property tenant:", error);
      }
    };
  
    const handleAccept = () => {
      
      console.log(data?.propertyId, data?.tenantRequestId);
  
      updatePropertyTenant(data?.propertyId, data?.tenantRequestId);
  
      localStorage.setItem(data?.tenantRequestId, "Accepted");
      setStatus("Accepted");
      
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
    }, [data]);
  
    return (
      <div className="w-full min-h-[100px] p-4 flex-wrap flex items-center justify-between gap-3 border-b border-gray-300 bg-[#fafafa]">
        <div className="w-[60px] h-[60px] rounded-full bg-gray-400">
          <img
            src={
              requestDoc?.img && requestDoc?.img !== "" ? requestDoc?.img : avatar
            }
            alt="User Avatar"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
  
        <div>
          <p className="text-[16px] font-semibold">{data?.desc}</p>
        </div>
  
        <div className="w-[200px]">
          {status === null ? (
            <>
              <button
                onClick={handleAccept}
                className="bg-[#0b1D27] text-white rounded-md p-2 px-4"
              >
                {loading ? <Loadercomponent /> : "Accept"}
              </button>
              <button
                onClick={handleReject}
                className="bg-[#fff] font-medium text-[#0b1D27] border border-[#0b1D27] ml-4 rounded-md p-2 px-4"
              >
                Reject
              </button>
            </>
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
  