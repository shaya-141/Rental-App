import React, { useEffect, useState } from 'react'
import Navbar from '../Components/LandingPage/Navbar.jsx'
import { useAllPropertiesContext } from '../Context/GetAllPropertise'
import Searchbar from '../Components/Propertise/Searchbar.jsx'
import CardsContainer from '../Components/Propertise/CardsContainer.jsx'


function Properties() {

  const { allProperties } = useAllPropertiesContext();
  const [filterProperties, setFilterProperties] = useState(allProperties);
  const [location, setLocation] = useState('all');
  
  const handleLocation = (e) => {
    setLocation(e);
    console.log("Selected location:", e);
  };
  
  useEffect(() => {
    if (location === 'all') {
      setFilterProperties(allProperties);
    } else {
      const filtered = allProperties.filter((item) => 
        item.address.toLowerCase().includes(location.toLowerCase())
      );
      setFilterProperties(filtered);
    }
    console.log("Filtered properties:", filterProperties);
  }, [location, allProperties]);
  
  



  return (
    <>
      <Navbar></Navbar>
      <div className='px-8 py-2'>
        <Searchbar fun={handleLocation}></Searchbar>
        

        {
          filterProperties.length === 0 ?
          <h1 className='text-center font-semibold text-2xl mt-20'>No Properties Found</h1>
          :
          <CardsContainer value={filterProperties}></CardsContainer>
        }
        
      </div>
    </>
  )
}

export default Properties