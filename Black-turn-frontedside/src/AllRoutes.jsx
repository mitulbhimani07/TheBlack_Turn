import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Pricing from './Pages/Pricing'
import Contact from './Pages/Contact'
import MusicDistribution from './Pages/OurServices/MusicDistribution'
import MusicVideoDistributionInIndia from './Pages/OurServices/MusicVideoDistributionInIndia'
import CallerTuneDistribution from './Pages/OurServices/CallerTuneDistribution'

function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/pricing" element={<Pricing/>} />
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/services/music-distribution" element={<MusicDistribution/>} />
            <Route path="/services/music-video-distribution" element={<MusicVideoDistributionInIndia/>} />
            <Route path="/services/caller-tune-distribution" element={<CallerTuneDistribution/>} />
        </Routes>
    </div>
  )
}

export default AllRoutes