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
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import cross from './assets/images/icon-check.svg'
import check from './assets/images/icon-cross.svg'
import { RxCross2 } from 'react-icons/rx'
import Dashboard from './Dashboard/Pages/Dashboard'

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
            <Route path='/singleblog/:id' element={<SingleBlog/>}/>
            <Route path='/terms&conditions' element={<TermsandConditions/>}/>
            <Route path="/services/music-distribution" element={<MusicDistribution/>} />
            <Route path="/services/music-video-distribution" element={<MusicVideoDistributionInIndia/>} />
            <Route path="/services/caller-tune-distribution" element={<CallerTuneDistribution/>} />
            {/* signin  */}
              <Route path='/Signin' element={<Signin/>} />
              <Route path='*' element={<h1>404 Not Found</h1>} />
              <Route path='/Signup' element={<Signp/>} />

              {/* Dashboard */}
              <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>


        <Toaster
        position="top-right"
        toastOptions={{
          duration: 1000,
          error: {
            className: "alert error",
            icon: "⚠",
          },
          success: {
            className: "alert success",
            icon: "✅",
          },
        }}
      >
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible ? "custom-enter 1s ease" : "custom-exit 1s ease",
            }}
          >
            {(props) => {
              return (
                <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-2">
                  <div className="flex items-center flex-1 gap-3">
                    {t?.type === "success" ? (
                      <img
                        width={50}
                        height={50}
                        className=""
                        src={cross}
                        alt="Success Icon"
                      />
                    ) : (
                      <img
                        width={35}
                        height={35}
                        className=""
                        src={check}
                        alt="Error Icon"
                      />
                    )}

                    <div>
                      <div>
                        <strong className="text-lg">{t?.type === "success" ? "Success" : "Error"}</strong>
                      </div>
                      <span className="text-gray-500">{props.message}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <span
                      className="text-gray-500 ml-6 cursor-pointer"
                      onClick={() => toast.remove(t.id)}
                    >
                      <RxCross2 className="text-3xl" />
                    </span>
                  </div>
                </div>

              );
            }}
          </ToastBar>
        )}
      </Toaster>
    </div>
  )
}

export default AllRoutes