import React from 'react'
import { useAllPropertiesContext } from '../Context/GetAllPropertise'


function Properties() {

    const {allProperties} = useAllPropertiesContext()
    // console.log(AllPropertiesArray);
    
    
  return (
    <>
    <div>Properties</div>
    </>
  )
}

export default Properties