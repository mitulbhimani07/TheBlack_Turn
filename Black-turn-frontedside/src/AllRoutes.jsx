// # routing
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Pricing from './Pages/Pricing'
import Contact from './Pages/Contact'
import MusicDistribution from './Pages/OurServices/MusicDistribution'
import MusicVideoDistributionInIndia from './Pages/OurServices/MusicVideoDistributionInIndia'
import CallerTuneDistribution from './Pages/OurServices/CallerTuneDistribution'
import Signin from './Pages/Authentication/Signin'
import Signp from './Pages/Authentication/SignUp'
import Aboutus from './Pages/Aboutus'
import TermsandConditions from './Pages/TermsandConditions'
import Refunds from './Pages/Refunds'
import Blog from './Pages/Blog'
import Privacy from './Pages/Privacy'
import Blogform from './Pages/Blogform'
import SingleBlog from './Pages/SingleBlog'

function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/pricing" element={<Pricing/>} />
            <Route path="/contact" element={<Contact/>}/>
            <Route path='/about' element={<Aboutus/>}/>
            <Route path='/Refund' element={<Refunds/>}/>
            <Route path='/privacy' element={<Privacy/>}/>
            <Route path="/blog" element={<Blog/>} />
            <Route path='/blogform' element={<Blogform/>}/>
            <Route path='/singleblog' element={<SingleBlog/>}/>
            <Route path='/terms&conditions' element={<TermsandConditions/>}/>
            <Route path="/services/music-distribution" element={<MusicDistribution/>} />
            <Route path="/services/music-video-distribution" element={<MusicVideoDistributionInIndia/>} />
            <Route path="/services/caller-tune-distribution" element={<CallerTuneDistribution/>} />
            {/* signin  */}
              <Route path='/Signin' element={<Signin/>} />
              <Route path='*' element={<h1>404 Not Found</h1>} />
              <Route path='/Signup' element={<Signp/>} />
        </Routes>
    </div>
  )
}

export default AllRoutes