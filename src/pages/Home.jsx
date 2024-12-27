import React from 'react'
import Navbar from '../Components/LandingPage/Navbar'
// import HomeHero from '../Components/HomeHero'
import HomeHero2 from '../Components/LandingPage/HomeHero2'
import Intro from '../Components/LandingPage/Intro'
import HighlyRatedProperty from '../Components/LandingPage/HighlyRatedProperty'
import Highlight from '../Components/LandingPage/Highlight'
import Banner2 from '../Components/LandingPage/Banner2'
import Faq from '../Components/LandingPage/Faq'
import Footer from '../Components/LandingPage/Footer'


function Home() {
  return (
    <>
        <Navbar></Navbar>
        {/* <HomeHero></HomeHero> */}
        <HomeHero2></HomeHero2>
        <Intro></Intro>
        <HighlyRatedProperty></HighlyRatedProperty>
        <Highlight></Highlight>
        <Banner2></Banner2>
        <Faq></Faq>
        <Footer></Footer>
        
    </>
  )
}

export default Home