import React, { useEffect, useState } from 'react';
import banner from "../assets/images/banner.png";
import right from "../assets/images/right.png";
import { motion } from 'framer-motion';
import card1 from "../assets/images/1.png"
import card2 from "../assets/images/2.png"
import card3 from "../assets/images/3.png"
import card4 from "../assets/images/4.png"
import card5 from "../assets/images/5.png"
import card6 from "../assets/images/6.png"

import { Music, Monitor, Building, Database, ChevronRight, Play, CheckCircle, ArrowRight } from 'lucide-react';
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
import spotify from '../assets/images/spofity.png'
import vector from '../assets/images/Vector.png'
import vi from '../assets/images/vi.png'
import youtube from '../assets/images/youtube.png'
import applemusic from '../assets/images/apple_music.png'
import audiblemagic from '../assets/images/audiblemagic.png'
import report from '../assets/images/report.png'
import { Check } from 'lucide-react';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import MusicDistribution from '../assets/images/Music_Distribution.png';
import MobileOperatorLicensing from '../assets/images/Mobile_Operator_Licensing.png';
import { FaMusic, FaYoutube, FaSpotify, FaGooglePlay } from 'react-icons/fa';

function Home() {
  const texts = ['Quality Service', '150+ Store'];
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeStep, setActiveStep] = useState(0);


  const steps = [
    { id: 1, title: 'Earnings from music streaming', icon: Music },
    { id: 2, title: 'theblackturn.com', icon: Monitor },
    { id: 3, title: 'Bank', icon: Building },
    { id: 4, title: 'Record labels', icon: Database },
  ];
  // Main streaming platforms
  const mainPlatforms = [
    { icon: wynkmusic },
    { icon: ganna },
    { icon: jiosavan },
    { icon: facebook },
    { icon: instagram },
    { icon: applemusic },
    { icon: spotify },
    { icon: vector },
    { icon: amazonmusic },
    { icon: youtube },
    { icon: digital },
    { icon: shazam },
    { icon: kkbox },
    { icon: resso },
    { icon: napster },
    { icon: Soundcloud },
    { icon: iheartradio },
    { icon: audiblemagic }
  ];


  // Mobile carrier platforms
  const carrierPlatforms = [
    { icon: jio },
    { icon: airtel },
    { icon: vi },
    { icon: bsnl },
  ];

  const PlatformCard = ({ platform, size = 'normal' }) => {
    const sizeClasses = size === 'large' ? 'w-20 h-20' : 'w-16 h-16';
    const textSize = size === 'large' ? 'text-xs' : 'text-xs';

    return (
      <div className="group  transform transition-all duration-300">

        <img src={platform.icon} alt="" width='70px' />

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

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add mouse move listener to document
    document.addEventListener('mousemove', handleMouseMove);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .hover-target');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  // const leftFeatures = featuress.slice(0, 3);
  // const rightFeatures = featuress.slice(3, 6);

  const features = [
    {
      icon: (
        <svg width="40" height="36" viewBox="0 0 53 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.9838 15.6696C48.7249 16.6339 52.2606 20.8125 52.2606 25.7143C52.2606 31.4196 47.5999 36 41.9749 36H12.4035C5.97489 36 0.832031 30.8571 0.832031 24.4286C0.832031 19.4464 4.04632 15.1071 8.54632 13.5804C8.54632 13.3393 8.54632 13.0982 8.54632 12.8571C8.54632 5.78571 14.2517 0 21.4035 0C26.1445 0 30.3231 2.65179 32.4927 6.50893C33.6981 5.625 35.2249 5.14286 36.832 5.14286C41.091 5.14286 44.5463 8.59821 44.5463 12.8571C44.5463 13.9018 44.3052 14.7857 43.9838 15.6696ZM32.4124 20.5714C33.5374 20.5714 34.0999 19.2054 33.2963 18.4018L24.8588 9.96429C24.3767 9.48214 23.4927 9.48214 23.0106 9.96429L14.5731 18.4018C13.7695 19.2054 14.332 20.5714 15.457 20.5714H20.7606V29.5714C20.7606 30.2946 21.3231 30.8571 22.0463 30.8571H25.9035C26.5463 30.8571 27.1892 30.2946 27.1892 29.5714V20.5714H32.4124Z" fill="#005F73" />
        </svg>
      ),
      title: 'Upload Your Music',
      description:
        'Get your tracks approved and live in as little as 1 to 10 days, maximizing your exposure on over 150 streaming platforms.',
      borderColor: 'border-[#005f73]',
    },
    {
      icon: (
        <svg width="38" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.9828 0.455575C33.3734 -0.950713 36.397 1.0884 35.9751 3.90098L31.8265 31.1126C31.6156 32.1674 31.0531 33.0111 30.139 33.5736C29.5765 33.8549 29.0139 33.9955 28.4514 33.9955C28.0295 33.9955 27.6077 33.9252 27.1858 33.7143L19.3106 30.4798L16.2167 34.6284C14.3182 37.23 10.1697 35.894 10.1697 32.5892V26.6828L2.08355 23.3781C-0.518086 22.3233 -0.729029 18.7373 1.73197 17.331L30.9828 0.455575ZM13.5448 32.5892L16.0761 29.1438L13.5448 28.0891V32.5892ZM28.4514 30.6204L32.6703 3.33846L3.41952 20.2139L10.9432 23.3781L25.8498 10.4402C26.8342 9.52613 28.2405 10.7918 27.5373 11.9168L17.623 26.1203L28.4514 30.6204Z" fill="#005F73" />
        </svg>
      ),
      title: 'Live All Stores & Caller Tune',
      description:
        'Get Live Music On Gaana, JioSaavan, Wynk, Spotify, Apple Music, iTunes, and 150+ More streaming Platform. Get Caller Tunes - Airtel, Jio, VI, BSNL, etc.',
      borderColor: 'border-gray-200',
    },
    {
      icon: (
        <svg width="37" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35.3042 38.4869C35.8929 38.4869 36.4093 38.2558 36.8345 37.8307C37.2596 37.4055 37.4907 36.8892 37.4907 36.3004V11.5631C37.4907 10.9743 37.2596 10.458 36.8345 10.0328C36.4093 9.60769 35.8929 9.37666 35.3042 9.37659H30.7437V4.14905C30.7436 3.70216 30.6786 3.28471 30.5376 2.90393C30.3866 2.49635 30.1238 2.17202 29.7573 1.94788C29.3921 1.65531 28.962 1.5024 28.4849 1.48792C28.0283 1.47408 27.5553 1.56379 27.0708 1.73987L1.32568 9.29163V9.2926C1.08849 9.36097 0.853843 9.48962 0.69873 9.72229C0.578387 9.90281 0.509277 10.1097 0.509277 10.3336V36.3004C0.509303 36.8892 0.740326 37.4055 1.16553 37.8307C1.59073 38.2559 2.10698 38.4869 2.6958 38.4869H35.3042ZM27.6792 3.71545L27.7056 3.70764L27.731 3.6969C27.9617 3.60077 28.1655 3.56024 28.3462 3.56018C28.4534 3.56018 28.5113 3.57382 28.5386 3.58362C28.5601 3.61988 28.5803 3.6648 28.5894 3.72815C28.6094 3.86885 28.6196 4.00908 28.6196 4.14905V9.37659H8.41846L27.6792 3.71545ZM2.65381 36.3571C2.65268 36.3566 2.65148 36.3565 2.65088 36.3561C2.65 36.3555 2.64794 36.3541 2.64502 36.3512C2.6421 36.3483 2.64074 36.3462 2.64014 36.3453C2.63974 36.3447 2.63962 36.3435 2.63916 36.3424C2.63836 36.3404 2.63331 36.3283 2.6333 36.3004V11.5006H35.3042C35.3319 11.5006 35.3441 11.5057 35.3462 11.5065L35.3481 11.5074C35.3488 11.5079 35.3509 11.5093 35.354 11.5123C35.357 11.5153 35.3593 11.5173 35.3599 11.5182C35.3603 11.5188 35.3604 11.5199 35.3608 11.5211C35.3616 11.5232 35.3657 11.5353 35.3657 11.5631V17.2477H25.1841C24.5954 17.2477 24.0789 17.478 23.6538 17.903C23.2286 18.3282 22.9976 18.8453 22.9976 19.4342V28.4293C22.9976 29.0182 23.2286 29.5353 23.6538 29.9606C24.0789 30.3855 24.5954 30.6158 25.1841 30.6158H35.3657V36.3004C35.3657 36.3283 35.3616 36.3404 35.3608 36.3424C35.3604 36.3436 35.3603 36.3447 35.3599 36.3453C35.3593 36.3462 35.357 36.3482 35.354 36.3512C35.3509 36.3542 35.3488 36.3556 35.3481 36.3561L35.3462 36.3571C35.3441 36.3579 35.3319 36.3629 35.3042 36.3629H2.6958C2.66796 36.3629 2.65586 36.3579 2.65381 36.3571ZM25.1421 28.4869C25.1408 28.4864 25.1398 28.4854 25.1392 28.485C25.1382 28.4843 25.1361 28.4829 25.1333 28.4801C25.1303 28.4771 25.129 28.475 25.1284 28.4742C25.128 28.4736 25.1279 28.4725 25.1274 28.4713C25.1266 28.4693 25.1216 28.4572 25.1216 28.4293V19.4342C25.1216 19.4063 25.1266 19.3943 25.1274 19.3922C25.1279 19.391 25.128 19.3899 25.1284 19.3893C25.129 19.3885 25.1303 19.3864 25.1333 19.3834C25.1361 19.3806 25.1382 19.3792 25.1392 19.3785C25.1398 19.3781 25.1408 19.3771 25.1421 19.3766C25.1441 19.3758 25.1562 19.3717 25.1841 19.3717H35.3657V28.4918H25.1841C25.1562 28.4918 25.1441 28.4877 25.1421 28.4869ZM29.5767 26.7858C30.3884 26.7857 31.0955 26.4935 31.6694 25.9196C32.2433 25.3456 32.5355 24.6385 32.5356 23.8268C32.5356 23.0152 32.2435 22.3044 31.6733 21.7203C31.1004 21.1334 30.3924 20.8317 29.5767 20.8317C28.7614 20.8317 28.0494 21.1325 27.4663 21.7155C26.8831 22.2986 26.5815 23.0113 26.5815 23.8268C26.5817 24.6424 26.8833 25.3505 27.4702 25.9235C28.0543 26.4936 28.7651 26.7858 29.5767 26.7858ZM29.5767 24.7672C29.3544 24.7672 29.1527 24.6938 28.9565 24.5221C28.7919 24.378 28.7056 24.1961 28.7056 23.9313C28.7057 23.6522 28.7914 23.4667 28.938 23.3268C29.0914 23.1805 29.2907 23.0963 29.5767 23.0963C29.7665 23.0964 29.9574 23.1636 30.1606 23.3414C30.3253 23.4855 30.4115 23.6667 30.4116 23.9313C30.4116 24.2178 30.3274 24.4061 30.189 24.5446C30.0506 24.6829 29.8629 24.7672 29.5767 24.7672Z" fill="#005F73" stroke="#005F73" />
        </svg>
      ),
      title: 'You Get Paid',
      description:
        'Your music play on any Store or music download on Any Platform. You will get your payment directly into your Bank account. No Payment Threshold limit.',
      borderColor: 'border-gray-200',
    },
  ];


  const services = [
    {
      id: 1,
      title: "Fastest Approval Time",
      description: "Get your music approved in as few with our streamlined process and automated systems. Live We Stored your content maximum (1 to 3 Days) Maximum 10 Days!",
      icon: card1

    },
    {
      id: 2,
      title: "Custom CRBT (Call Ring Back Tune)",
      description: "Create 1:24 Current Caller tune for Airtel, VI, Jio etc So Engr Hunme Other caller tune Ma, 15-30 boot max 75-90 days",
      icon: card2

    },
    {
      id: 3,
      title: "Free ISRC and UPC code",
      description: "Free ISRC and UPC code we provide We Also provide ISRC code UPC code code For your every Audio & Video Album.",
      icon: card3

    },
    {
      id: 4,
      title: "95% Royalty",
      description: "Get Your Monthly Royalty with no changes and clean. Royalty Respect with out any percentage we don't take anything.",
      icon: card4
    },
    {
      id: 5,
      title: "Custom Record Label",
      description: "Get Your Own Label our store Label we use Label Distribution out if you want your record with unlimited artist...",
      icon: card5

    },
    {
      id: 6,
      title: "One Time Payment",
      description: "Pay Once Your song Live for Life Time No yearly charges with unlimited tracks, UPI, PhonePe, UPI, PhonePe, etc.",
      icon: card6
    }
  ];

  return (
    <>



      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Outer cursor */}
        <div
          className={`w-10 h-10 border-2 border-white rounded-full transition-all duration-300 ease-out ${isHovering ? 'scale-150 opacity-60' : 'scale-100 opacity-40'
            }`}
        />
        {/* Inner cursor */}
        <div
          className={`absolute top-1/2 left-1/2 w-15 h-15 bg-[white] rounded-full transition-all duration-150 ease-out ${isHovering ? 'scale-0' : 'scale-100'
            }`}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Hide default cursor */}
      <style jsx>{`
        * {
          cursor: none !important;
        }
      `}</style>

      <div className="bg-[#ebf4f5] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
        {/* Half Circle Stroke Elements - Responsive positioning */}
        <div className="absolute top-20 sm:top-36 -left-2 sm:-left-4 w-32 h-32 sm:w-40 sm:h-40 lg:w-55 lg:h-55 -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-full border-20 sm:border-46 lg:border-32 border-[#b8d4db] rounded-full opacity-30"></div>
        </div>
        <div className="absolute bottom-20 sm:bottom-36 -right-2 sm:-right-4 w-32 h-32 sm:w-40 sm:h-40 lg:w-55 lg:h-55 translate-x-1/2 translate-y-1/2">
          <div className="w-full h-full border-20 sm:border-46 lg:border-32 border-[#b8d4db] rounded-full opacity-30"></div>
        </div>

        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center relative z-10">
            {/* Left Text Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 max-w-[700px]">
                Upload Unlimited Songs <br />
                <span
                  className={`inline-block leading-normal transition-transform duration-500 transform ${flip ? 'rotateX-180' : ''
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
              <button className="hover-target bg-[#005f73] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-medium hover:bg-[#005f74] transition-all duration-300 text-sm sm:text-base transform hover:scale-105">
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
                  className="hover-target z-20 w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* distribution your mmusic */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[42px] font-bold text-black mb-4">
              DISTRIBUTE YOUR MUSIC WORLDWIDE
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl font-light mx-auto">
              Seamlessly Share Your Sound with the World for just{' '}
              <span className="text-[#00758f] font-semibold">₹799/month</span>
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3  gap-8">
            {features.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="hover-target group bg-white border-2 border-[#005f73] rounded-2xl p-4 sm:p-8 text-center shadow-md hover:border-[#00758f] transform hover:-translate-y-2 transition-all duration-500 ease-in-out"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-[#ccdfe3] backdrop-blur-md flex items-center justify-center mb-6 mx-auto border border-[#ccdfe3] shadow-sm transition-all duration-300 group-hover:scale-110">
                  {item.icon}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-black mb-2 transition-colors duration-300 group-hover:text-[#005f73]">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-[#333] transition-colors duration-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Distribute On​ section */}

      <div className="min-h-screen bg-[#EBF4F5] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 ">Distribute On</h1>

          </div>

          {/* Music Streaming Platforms */}
          <div className=" backdrop-blur-md rounded-3xl  mb-10 ">
            {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Music Streaming Platforms</h2> */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-6 justify-items-center">
              {mainPlatforms.map((platform, index) => (
                <div
                  key={index}
                  className="group w-20 h-20 flex items-center justify-center rounded-xl bg-white hover:scale-105 transition transform shadow-md hover:shadow-lg border border-gray-200 hover:border-[#648f94]"
                >
                  <img src={platform.icon} alt="platform" className="w-12 h-12 object-contain transition duration-300 group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Carrier Platforms */}
          <div className=" backdrop-blur-md ">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Caller Tune Distribution for India's All Cellular Networks</h2>
            {/* <p className="text-gray-500 text-center mb-6">Reach users via major Indian telecom operators</p> */}
            <div className="grid grid-cols-2 sm:grid-cols-4 justify-items-center max-w-3xl mx-auto pt-4">
              {carrierPlatforms.map((platform, index) => (
                <div
                  key={index}
                  className="group w-24 h-24 flex items-center justify-center rounded-2xl bg-white hover:scale-105 transition transform shadow-md hover:shadow-lg border border-gray-200 hover:border-[#648f94]"
                >
                  <img src={platform.icon} alt="carrier" className="w-16 h-16 object-contain transition duration-300 group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 150 stores */}
      <section className="bg-white py-10 sm:py-10 lg:py-14 md:px-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:px-18">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-[42px] sm:text-[40px] lg:text-[42px] font-bold text-black mb-6">
                150+ Stores
              </h2>
              <p className="text-gray-600 text-sm font-bold mb-4">
                Release Song On National And International Platforms.
              </p>
              <p className="text-gray-700 text-base leading-relaxed mb-8 max-w-lg">
                Unlimited music distribution - Get your music on Gaana, JioSaavn,
                Wynk Music, Spotify, iTunes/Apple Music, Shazam, Tidal, Amazon,
                YouTube Music, Deezer, and 150+ more digital music platforms worldwide.
                Earn more sales and get more fans and more money. We provide a
                stable tune for you to think of all about money, there your data we
                never touch your fan base, and own friends. As an 100% safe music
                person - we know you hear Distribute, license & monetize of all in one
                place.
              </p>
              <button className="bg-[#005f73] text-white px-6 py-3 rounded-md font-medium hover:bg-[#005f74] transition-all duration-300 transform hover:scale-105">
                Join Now
              </button>
            </div>

            {/* Right Image Placeholder */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="w-full flex items-center justify-center max-w-md lg:max-w-lg xl:max-w-xl">
                <img src={right} height={400} width={450} />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* what we do */}

      <section className="bg-white  relative overflow-hidden pb-16">
        {/* Decorative Backgrounds */}


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-black mb-4">
              What We Do
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
              >
                <div
                  className="group relative flex flex-col  text-left bg-white/70 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-md border border-white/50 
              hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 ease-out cursor-pointer overflow-hidden h-[380px] w-full justify-around "
                >
                  {/* Icon */}
                  <div className="items-center justify-center   transition-all duration-500 group-hover:scale-110">
                    <img src={service.icon} alt="" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#001219] mb-4 group-hover:text-[#005f73] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Border Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#005f73] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Distribute On​ section */}

      <div className="bg-[#ebf4f5] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center relative z-10">
            {/* Left Text Content */}
            <div>
              <p className="text-gray-700 text-base md:text-[19px] max-w-[650px]">
                Make money with worldwide music distribution
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 max-w-[700px]">
                Upload Unlimited Songs <br />

              </h1>
              <p className="text-gray-700 mb-6 text-base md:text-[16px] max-w-[650px]">
                The Black Turn is your gateway to global music distribution, empowering artists to seamlessly
                share their creativity across more than 150 streaming platforms, including Spotify, Apple
                Music, and JioSaavn. By choosing our services, you will unlock the potential for your music to
                reach a wider audience, all while retaining an impressive 95% of your earnings. With our
                user-friendly platform, you can upload unlimited tracks and watch them go live in as little as
                72 hours—ensuring your music is always at the forefront.
              </p>
              <button className="hover-target bg-[#005f73] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-medium hover:bg-[#005f74] transition-all duration-300 text-sm sm:text-base transform hover:scale-105">
                Join Now
              </button>
            </div>

            {/* Right Image Content */}
            <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-10 order-1 lg:order-2">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-96 xl:h-96 flex justify-center items-center">
                {/* Second border layer (furthest back) */}
                <div className="absolute w-full h-full border-2 sm:border-3 lg:border-4 border-[#075c7c] rounded-xl top-4 sm:top-6 lg:top-8 xl:top-10 right-2 sm:right-3 lg:right-4 xl:right-5 z-0"></div>

                {/* First border layer (middle) */}
                <div className="absolute w-full h-full border-2 sm:border-3 lg:border-4 border-[#075c7c] rounded-xl top-2 sm:top-3 lg:top-4 xl:top-5 right-4 sm:right-6 lg:right-8 xl:right-10 z-10"></div>

                {/* Main content box (front) */}
                <img
                  src={MusicDistribution}
                  alt="Music Distribution Banner"
                  className="hover-target z-20 w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Music Distribution Plans Section */}
      <div className="bg-[#ebf4f5] lg:-mt-40 flex items-center justify-center px-4 sm:px-6 lg:py-10 lg:px-8 relative overflow-hidden">
        <div className="flex items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center relative z-10">

            {/* Left Text Content */}
            {/* Right Image Content */}
            <div>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-96 xl:h-96 flex justify-center items-center">
                {/* Second border layer (furthest back) */}
                <div className="absolute w-full h-full border-2 sm:border-3 lg:border-4 border-[#075c7c] rounded-xl top-4 sm:top-6 lg:top-8 xl:top-10 left-2 sm:left-3 lg:left-4 xl:left-5 z-0"></div>

                {/* First border layer (middle) */}
                <div className="absolute w-full h-full border-2 sm:border-3 lg:border-4 border-[#075c7c] rounded-xl top-2 sm:top-3 lg:top-4 xl:top-5 left-4 sm:left-6 lg:left-8 xl:left-10 z-10"></div>

                {/* Main content box (front) */}
                <img
                  src={MobileOperatorLicensing}
                  alt="Music Distribution Banner"
                  className="hover-target z-20 w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
            <div className=" items-center justify-center order-1 lg:order-2">
              <p className="text-gray-700 text-base md:text-[19px] max-w-[650px]">
                Caller Tune Distribution India               </p>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 max-w-[700px]">
                Mobile Operator Licensing <br />

              </h1>
              <p className="text-gray-700 mb-6 text-base md:text-[16px] max-w-[650px]">
                Reach Indian fans and make your music available for Indian fans to caller tune. Set Your Favorite Part Of Your Song As Your Caller Tune From - JIOSAAVN, WYNK & Vi(Vodafone & Idea), BSNL Etc. Get CRBT Codes For Caller Tune. Licensing on VAS such as CRBT, IVR & WAP. Previously released song accepted, a full song on JioSaavn and Wynk mandatory (if not we upload first on Wynk and JioSaavn and distribute for caller tune). We don't charge a yearly fee, the song is available for caller tune as a lifetime
              </p>
              <button className="hover-target bg-[#005f73] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-medium hover:bg-[#005f74] transition-all duration-300 text-sm sm:text-base transform hover:scale-105">
                Join Now
              </button>
            </div>


          </div>
        </div>
      </div>
      {/* Music Distribution Plans Section */}
      <section className="bg-[#EBF4F5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              Music Distribution Plans
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Choose the perfect plan to distribute your music to the world.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
            {/* Plan 1: Single Song */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 h-full flex flex-col"
            >
              <h3 className="text-2xl font-bold text-black mb-2">Single Song</h3>
              <p className="text-gray-500 mb-6">All Stores + Caller Tune</p>

              <div className="mb-6">
                <span className="text-5xl font-extrabold text-[#005f73]">₹799</span>
                <span className="text-gray-500">Per User /song</span>
              </div>
              <p className="text-gray-900 mb-6">Features</p>
              <ul className="space-y-4 text-gray-700 mb-8 flex-grow">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  All Music Live Stream Platforms
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Caller Tune Facility
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Song Availability Lifetime
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  95% Royalties
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  4 Monthly Payment / Report
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24 Hour Approval
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  YouTube Content ID
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No Per Year Charges
                </li>
              </ul>
              <button className="w-full bg-white text-[#005f73] border-2 border-[#005f73] px-6 py-3 rounded-md font-semibold hover:bg-[#005f73] hover:text-white transition-all duration-300 transform hover:scale-105">
                Upload Now
              </button>
            </motion.div>

            {/* Plan 2: Custom Label (Recommended) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="group bg-[#005f73] text-white rounded-2xl p-8 shadow-2xl transition-all duration-300 transform scale-105 relative border-2 border-[#005f73] h-full flex flex-col"
            >
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#00A9B7] text-white px-4 py-1 rounded-full text-sm font-semibold">
                Recommended
              </div>

              <h3 className="text-2xl font-bold mb-2">Custom Label</h3>
              <p className="opacity-80 mb-6">All Stores + Caller Tune</p>

              <div className="mb-6">
                <span className="text-5xl font-extrabold">₹4,999</span>
                <span className="opacity-80">per year /-</span>
              </div>
              <p className="text-gray-900 mb-6">Features</p>
              <ul className="space-y-4 opacity-90 mb-8 flex-grow">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  All Music Live Stream Platforms
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Caller Tune Facility
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Bulk Upload Facility
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Song Availability Lifetime
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Unlimited Song's Releases
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lifetime 95% Revenue
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  4 Monthly Payment / Report
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  YouTube Content ID
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24 Hour Approval
                </li>
              </ul>

              <button className="w-full bg-white text-[#005f73] px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                Join Now
              </button>
            </motion.div>

            {/* Plan 3: Previously Released Song */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 h-full flex flex-col"
            >
              <h3 className="text-2xl font-bold text-black mb-2">Previously Released</h3>
              <p className="text-gray-500 mb-6">Song Caller Tune</p>

              <div className="mb-6">
                <span className="text-5xl font-extrabold text-[#005f73]">₹499</span>
                <span className="text-gray-500">/ per song</span>
              </div>
              <p className="text-gray-900 mb-6">Features</p>

              <ul className="space-y-4 text-gray-700 mb-8 flex-grow">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Caller Tune Live in 3-5 days
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Caller Tunes on JIO, Vi, BSNL, Airtel
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ISRC - Caller Tune Sync
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Previously released song
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No yearly fee
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  95% Lifetime revenue
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  CRBT Codes
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-15 w-15 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  JioSaavn ( If Song is Already Live on Jiosaavn Take Down from Jiosaavn we distribute it again On JioSaavn With JioCRBT )
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-15 w-15 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Wynk ( If Song is Already Live on Wynk Take Down from Wynk we distribute it again On Wynk With Airtel CRBT )
                </li>
              </ul>

              <button className="w-full bg-white text-[#005f73] border-2 border-[#005f73] px-6 py-3 rounded-md font-semibold hover:bg-[#005f73] hover:text-white transition-all duration-300 transform hover:scale-105">
                Add On Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Pricing Card - Now with Gradient and enhanced shadow */}
          <div className="bg-gradient-to-br from-[#EBF4F5] to-[#B8D8D8] rounded-2xl p-8 shadow-xl border border-gray-200">

            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-black tracking-tight mb-4">
                Music Distribution Plans Without CT
              </h2>
              <p className="text-gray-600 text-lg">A straightforward plan for your music release.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              {/* Plan Details */}
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-3xl font-bold text-gray-800">Single Song</h3>
                <p className="text-gray-600 text-lg">Without Caller Tune</p>
              </div>
              {/* Price */}
              <div className="text-center md:text-right">
                <span className="text-6xl font-extrabold text-[#005f73]">₹599</span>
                <span className="text-gray-600 ml-2 text-lg">/ Per Song</span>
              </div>
            </div>

            {/* Features - With clearer icons */}
            <div className="mb-10">
              <div className="border-t border-gray-300 pt-6">
                <ul className="space-y-4 text-gray-700 text-base">
                  <li className="flex items-center">
                    <IoCheckmarkCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span>All Major Music Live Stream Platforms</span>
                  </li>
                  {/* Correctly showing "No Caller Tune" as an exclusion */}
                  <li className="flex items-center text-gray-500">
                    <IoCloseCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                    <span>No Caller Tune Facility</span>
                  </li>
                  <li className="flex items-center">
                    <IoCheckmarkCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span>Lifetime Song Availability</span>
                  </li>
                  <li className="flex items-center">
                    <IoCheckmarkCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span>95% Royalties</span>
                  </li>
                  <li className="flex items-center">
                    <IoCheckmarkCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span>4 Monthly Payment / Report</span>
                  </li>
                  <li className="flex items-center">
                    <IoCheckmarkCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span>YouTube Content ID</span>
                  </li>
                  <li className="flex items-center">
                    <IoCheckmarkCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span>24 Hour Approval</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 95, 115, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#005f73] text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg"
              >
                UPLOAD NOW
              </motion.button>
            </div>
          </div>

          {/* Process Steps - Redesigned for better visual appeal */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-8">A Simple Two-Step Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">

              {/* Step 1 */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex items-start">
                <div className="bg-[#EBF4F5] text-[#005f73] font-bold rounded-full h-10 w-10 flex items-center justify-center mr-5 flex-shrink-0">1</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Choose & Upload</h4>
                  <p className="text-gray-600">
                    Select the plan and upload your audio file & artwork. It's a quick and easy process.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex items-start">
                <div className="bg-[#EBF4F5] text-[#005f73] font-bold rounded-full h-10 w-10 flex items-center justify-center mr-5 flex-shrink-0">2</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Pay & Track</h4>
                  <p className="text-gray-600">
                    After filling in the details, simply pay to submit. You can track your order status from your account page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;