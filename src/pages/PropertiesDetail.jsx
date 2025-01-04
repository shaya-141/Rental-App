import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../utils/firebase';
import Navbar from '../Components/LandingPage/Navbar';
import Detailimage from '../Components/PropertiseDetail/Detailimage';
import DetailText from '../Components/PropertiseDetail/DetailText';
import OwnerDetail from '../Components/PropertiseDetail/OwnerDetail';

function PropertiesDetail() {

    const {id} = useParams()
    console.log(id);
    const [currentProperties, setCurrentProperties] = useState(null)

    const getCurrentPropertyByIdInURl = async (id)=>{
        // const currentPropertyRef = collection(db,`AllProperties/${id}/`)
        const currentPropertyRef = doc(db,'AllProperties',id)
        const docSnap = await getDoc(currentPropertyRef);

        if(docSnap.exists()){
                setCurrentProperties(docSnap.data())
                // console.log("currentProperties",currentProperties);
                // console.log('shayan');
                console.log(docSnap.data());
                
                

        }
        else{
            console.log('document not found');
            
        }
    }
    useEffect(()=>{
        getCurrentPropertyByIdInURl(id)
    },[id])
    


  return (
    <>
        <Navbar></Navbar>
        <div className='w-full flex justify-between  px-9 mt-4'>
            <Detailimage data={currentProperties}></Detailimage>
            <OwnerDetail></OwnerDetail>
        </div>
        <DetailText data={currentProperties}></DetailText>
    
    </>
  )
}

export default PropertiesDetail