import React from 'react'
import Card from '../LandingPage/Card'

function CardsContainer({value}) {
  return (
    <div id='propertyPage' className=' flex flex-wrap gap-12  w-full p-2'>
        {
            value.map((data,index)=>{
                return (

                    <Card data={data} key={index}></Card>
                )
            })
        }
    </div>
  )
}

export default CardsContainer