import React, { useEffect, useState } from 'react'
import HiglyRatedText from './HiglyRatedText'
import Card from './Card'
import { use } from 'react'
import { useAllPropertiesContext } from '../../Context/GetAllPropertise';

function HighlyRatedProperty() {

  const [which, setWhich] = useState('house')
  const [filterProperty, setFilterProperty] = useState(null)

  const { allProperties } = useAllPropertiesContext()

  const handleDisplay = (value) => {
    setWhich(value) // Update the 'which' state

    // Wait for the state update before filtering
  }

  useEffect(() => {
    // Perform filtering based on the updated 'which' state
    const filter = allProperties.filter((item) => item.propertyType === which)
    setFilterProperty(filter)

    // console.log('Filtered Properties:', filter)
  }, [which, allProperties]) // Re-run the effect when 'which' changes

  useEffect(() => {
    // Initial filtering on load
    handleDisplay('house')
  }, [])




  


  return (
    <div className='p-8 mt-12 '>
        <HiglyRatedText fun={handleDisplay}></HiglyRatedText>
        <div id='HighlyRatedProperty' className='min-h-[500px] w-full flex flex-wrap items-center justify-between  mt-8'>
        {
  filterProperty?.slice(0, 3).map((item, index) => {
    return <Card key={index} data={item}></Card>
  })
}

            {/* <Card></Card> */}
        </div>
    </div>
  )
}

export default HighlyRatedProperty