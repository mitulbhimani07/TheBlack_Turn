import React, { useEffect, useState } from 'react';
import banner from "../assets/images/banner.png";

function Home() {
  const texts = ['Quality Service', '150+ Store'];
   const [index, setIndex] = useState(0);
 const [flip, setFlip] = useState(false);

   useEffect(() => {
    const interval = setInterval(() => {
      setFlip(true); // Start the flip

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFlip(false); // Reset flip
      }, 500); // match duration with animation
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#ebf4f5] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
      {/* Half Circle Stroke Elements - Responsive positioning */}
      <div className="absolute top-20 sm:top-36 -left-2 sm:-left-4 w-32 h-32 sm:w-40 sm:h-40 lg:w-55 lg:h-55 -translate-x-1/2 -translate-y-1/2">
        <div className="w-full h-full border-20 sm:border-46 lg:border-32 border-[#b8d4db] rounded-full opacity-30"></div>
      </div>
      <div className="absolute bottom-20 sm:bottom-36 -right-2 sm:-right-4 w-32 h-32 sm:w-40 sm:h-40 lg:w-55 lg:h-55 translate-x-1/2 translate-y-1/2">
        <div className="w-full h-full border-20 sm:border-46 lg:border-32 border-[#b8d4db] rounded-full opacity-30"></div>
      </div>
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center relative z-10">
        {/* Left Text Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 max-w-[700px]">
      Upload Unlimited Songs <br />
      <span
        className={`inline-block transition-transform duration-500 transform ${
          flip ? 'rotateX-180' : ''
        } text-[#00758f]`}
        style={{
          display: 'inline-block',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {texts[index]}
      </span>
    </h1>
          <p className="text-gray-700 mb-6 text-base md:text-[16px] max-w-[650px]">
            The Black Turn is your gateway to global music distribution, empowering artists to seamlessly
            share their creativity across more than 150 streaming platforms, including Spotify, Apple
            Music, and JioSaavn. By choosing our services, you will unlock the potential for your music to
            reach a wider audience, all while retaining an impressive 95% of your earnings. With our
            user-friendly platform, you can upload unlimited tracks and watch them go live in as little as
            72 hours—ensuring your music is always at the forefront.
          </p>
          <button className="bg-[#005f73] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-medium hover:bg-[#005f74] transition-all duration-300 text-sm sm:text-base transform hover:scale-105">
            Explore the Possibilities
          </button>
        </div>
        
        {/* Right Image Content */}
        <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-10 order-1 lg:order-2">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-96 xl:h-96 flex justify-center items-center">
            {/* Second border layer (furthest back) */}
            <div className="absolute w-full h-full border-2 sm:border-3 lg:border-4 border-[#075c7c] rounded-xl top-4 sm:top-6 lg:top-8 xl:top-10 left-2 sm:left-3 lg:left-4 xl:left-5 z-0"></div>
            
            {/* First border layer (middle) */}
            <div className="absolute w-full h-full border-2 sm:border-3 lg:border-4 border-[#075c7c] rounded-xl top-2 sm:top-3 lg:top-4 xl:top-5 left-4 sm:left-6 lg:left-8 xl:left-10 z-10"></div>
            
            {/* Main content box (front) */}
            <img 
              src={banner} 
              alt="Music Distribution Banner" 
              className="z-20 w-full h-full object-cover rounded-xl shadow-lg" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;