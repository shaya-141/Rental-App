import React from 'react'
import Navbar from '../Components/LandingPage/Navbar.jsx'
import { useAllPropertiesContext } from '../Context/GetAllPropertise'
import Searchbar from '../Components/Propertise/Searchbar.jsx'
import CardsContainer from '../Components/Propertise/CardsContainer.jsx'


function Properties() {

  const { allProperties } = useAllPropertiesContext()
  // console.log(AllPropertiesArray);


  return (
    <>
      <Navbar></Navbar>
      <div className='px-8 py-2'>
        <Searchbar></Searchbar>
        <CardsContainer value={allProperties}></CardsContainer>
      </div>
    </>
  )
}

export default Properties