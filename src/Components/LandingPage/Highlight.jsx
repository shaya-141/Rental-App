import React from 'react'
import HighlightText from './HighlightText'
import HighLightCard from './HighLightCard'
import analysis from '../../assets/icons/analysis.png'

function Highlight() {
  return (
    <div className='w-full mt-14'>
        <HighlightText></HighlightText>
        <div className='w-full flex flex-wrap justify-center gap-12 mt-12 '>
            <HighLightCard img={analysis} heading={'Market Analysis'} text={'In-depth understading of markets trends to guide pricing and strategy'}></HighLightCard>
            <HighLightCard img={analysis} heading={'Market Analysis'} text={'In-depth understading of markets trends to guide pricing and strategy'}></HighLightCard>
            <HighLightCard img={analysis} heading={'Market Analysis'} text={'In-depth understading of markets trends to guide pricing and strategy'}></HighLightCard>
        </div>
        <div className=' w-full flex flex-wrap justify-center gap-12 mt-6'>
            <HighLightCard img={analysis} heading={'Market Analysis'} text={'In-depth understading of markets trends to guide pricing and strategy'}></HighLightCard>
            <HighLightCard img={analysis} heading={'Market Analysis'} text={'In-depth understading of markets trends to guide pricing and strategy'}></HighLightCard>
            <HighLightCard img={analysis} heading={'Market Analysis'} text={'In-depth understading of markets trends to guide pricing and strategy'}></HighLightCard>
        </div>
    </div>
  )
}

export default Highlight