import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../utils/firebase';
import Navbar from '../Components/LandingPage/Navbar';
import Detailimage from '../Components/PropertiseDetail/Detailimage';
import DetailText from '../Components/PropertiseDetail/DetailText';
import OwnerDetail from '../Components/PropertiseDetail/OwnerDetail';

function PropertiesDetail() {
  const { id } = useParams();
  const [currentProperties, setCurrentProperties] = useState(null);
  const [ownerDetailDoc, setOwnerDetailDoc] = useState(null);
  const [OwnerId, setOwnerId] = useState(null)

  const getCurrentPropertyByIdInURl = async (id) => {
    const currentPropertyRef = doc(db, 'AllProperties', id);
    const docSnap = await getDoc(currentPropertyRef);

    if (docSnap.exists()) {
      setCurrentProperties(docSnap.data());
      console.log(docSnap.data());
    } else {
      console.log('Document not found');
    }
  };

  const getCurrentPropertyOwner = async (ownerId) => {
    console.log("OwnerId",OwnerId);
    setOwnerId(currentProperties?.OwnerId)
    
    if (!ownerId) return; // Avoid fetching if ownerId is not available
    const docRef = doc(db, 'Users', ownerId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setOwnerDetailDoc(docSnap.data());
      console.log('OwnerDetail', docSnap.data());
    } else {
      console.log('Owner document not found');
    }
  };

  // Fetch property details when the component mounts or when `id` changes
  useEffect(() => {
    if (id) getCurrentPropertyByIdInURl(id);
    console.log('property id ',id);
    
  }, [id]);

  // Fetch owner details when `currentProperties` updates
  useEffect(() => {
    if (currentProperties?.OwnerId) {
      
      getCurrentPropertyOwner(currentProperties.OwnerId);
    }
  }, [currentProperties]);

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-between px-9 mt-4">
        <Detailimage data={currentProperties} />
        <OwnerDetail data={ownerDetailDoc} OwnerId ={OwnerId} propertyId={id} />
      </div>
      <DetailText data={currentProperties} />
    </>
  );
}

export default PropertiesDetail;
