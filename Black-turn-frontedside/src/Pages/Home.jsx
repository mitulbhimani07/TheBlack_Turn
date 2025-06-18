import React, { useEffect, useState } from 'react';
import banner from "../assets/images/banner.png";
import { Music, Play, Radio, Smartphone, Headphones, Mic, Volume2, Disc } from 'lucide-react';
import ganna from '../assets/images/ganna.png'
import wynkmusic from '../assets/images/wynk.png'
import airtel from '../assets/images/airtel.png'
import amazonmusic from '../assets/images/amazon music.png'
import bsnl from '../assets/images/bsnl.png'
import digital from '../assets/images/digital.png'
import facebook from '../assets/images/Facebook.png'
import iheartradio from '../assets/images/iheartradio.png'
import instagram from '../assets/images/instagram.png'
import jio from '../assets/images/jio.png'
import jiosavan from '../assets/images/jiosavan.png'
import kkbox from '../assets/images/kkbox.png'
import napster from '../assets/images/napster.png'
import resso from '../assets/images/resso.png'
import shazam from '../assets/images/shazam.png'
import Soundcloud from '../assets/images/soundcloud.png'
import spotify from '../assets/images/spotify.png'
import vector from '../assets/images/Vector.png'
import vi from '../assets/images/vi.png'
import youtube from '../assets/images/youtube.png'
import applemusic from '../assets/images/apple_music.png'

function Home() {
  const texts = ['Quality Service', '150+ Store'];
   const [index, setIndex] = useState(0);
 const [flip, setFlip] = useState(false);


 // Main streaming platforms
  const mainPlatforms = [
    {  icon: wynkmusic},
    {  icon: ganna},
    { icon: jiosavan},
    {  icon: facebook },
    {  icon: instagram},
    {  icon: applemusic  },
     {  icon: spotify},
    {  icon: vector },
    {  icon: amazonmusic },
    {  icon: youtube},
    { icon: digital },
    {  icon: shazam},
     {  icon: kkbox},
      {  icon: resso},
       {  icon: napster},
        {  icon: Soundcloud},
         {  icon: iheartradio},
  ];

 
  // Mobile carrier platforms
  const carrierPlatforms = [
    { name: 'Jio', icon: <Smartphone className="w-5 h-5" />, color: 'bg-blue-600', textColor: 'text-white' },
    { name: 'Airtel', icon: <Radio className="w-5 h-5" />, color: 'bg-red-500', textColor: 'text-white' },
    { name: 'Vi', icon: <Volume2 className="w-5 h-5" />, color: 'bg-purple-600', textColor: 'text-white' },
    { name: 'BSNL', icon: <Mic className="w-5 h-5" />, color: 'bg-green-600', textColor: 'text-white' },
  ];

   const PlatformCard = ({ platform, size = 'normal' }) => {
    const sizeClasses = size === 'large' ? 'w-20 h-20' : 'w-16 h-16';
    const textSize = size === 'large' ? 'text-xs' : 'text-xs';
    
    return (
      <div className="group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:rotate-2">
        {/* <div className={`${sizeClasses} ${platform.color} rounded-2xl shadow-lg flex items-center justify-center mb-2 group-hover:shadow-xl transition-all duration-300`}>
          {typeof platform.icon === 'string' ? (
            <span className="text-2xl">{platform.icon}</span>
          ) : (
            <div className={platform.textColor}>{platform.icon}</div>
          )}
        </div> */}
        <img src={platform.icon} alt="" width='70px' />
        {/* <p className={`${textSize} font-medium text-gray-700 text-center group-hover:text-gray-900 transition-colors duration-300`}>
          {platform.name}
        </p> */}
      </div>
    );
  };

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

    <>
    
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

    {/* Distribute On​ section */}

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Distribute On​</h1>
          {/* <p className="text-gray-600 text-lg">Reach millions of listeners across all major platforms</p> */}
        </div>

        {/* Main Distribution Grid */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Music Streaming Platforms</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
            {mainPlatforms.map((platform, index) => (
              <PlatformCard key={index} platform={platform} />
            ))}
          </div>
        </div>

      

        {/* Mobile Carriers Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Mobile Carrier Distribution</h2>
          <p className="text-gray-500 text-center mb-6">Reach users through India's major cellular networks</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center max-w-2xl mx-auto">
            {carrierPlatforms.map((platform, index) => (
              <PlatformCard key={index} platform={platform} size="large" />
            ))}
          </div>
        </div>

       
      </div>
    </div>

    </>



  );
}

export default Home;