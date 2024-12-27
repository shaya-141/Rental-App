import React from 'react'
import HiglyRatedText from './HiglyRatedText'
import Card from './Card'

function HighlyRatedProperty() {
  return (
    <div className='p-8 mt-12 '>
        <HiglyRatedText></HiglyRatedText>
        <div className='h-[500px] w-full flex flex-wrap items-center justify-between  mt-8'>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            {/* <Card></Card> */}
        </div>
    </div>
  )
}

export default HighlyRatedProperty