import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
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
      setOwnerId(docSnap.data().OwnerId)
      console.log(docSnap.data());
    } else {
      console.log('Document not found');
    }
  };
 const getCurrentPropertyOwner = async (ownerId) => {
    console.log('Owner id', ownerId);

    const userRef = doc(db, 'Users', ownerId);
    const docSnap = await getDoc(userRef);
    console.log(docSnap.data());
    setOwnerDetailDoc(docSnap.data());
    
    
  };
 
  

  // Fetch property details when the component mounts or when `id` changes
  useEffect(() => {
    if (id) getCurrentPropertyByIdInURl(id);
    console.log('property id ',id);
    
  }, [id]);
   useEffect(() => {
      
      
      // Fetch owner details when `currentProperties` updates
        if (OwnerId) {
          
          getCurrentPropertyOwner(OwnerId);
        }
      }, [OwnerId]);

 

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
