import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import banner from "../../assets/images/callertune.png";
import distribute from "../../assets/images/distribute.png"
import { Zap, Shield, Headphones } from "lucide-react";
import { Globe, Upload, BarChart3, Clock } from 'lucide-react';
import { FaApple, FaMusic, FaSpotify } from "react-icons/fa";
import section from "../../assets/images/section.png"
import { Music, Radio, Smartphone } from 'lucide-react';
import tablist1 from "../../assets/images/tablist1.png"
import tablist2 from "../../assets/images/tablist2.png"
import tablist3 from "../../assets/images/tablist3.png"
import tablist4 from "../../assets/images/tablist4.png"
import { Link } from "react-router-dom";






const CallerTuneDistribution = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});


  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('sticky-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        setIsSticky(rect.top <= 0 && rect.bottom > window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Zap />,
      title: "Ultra Fast Delivery",
      subtitle: "We Deliver Caller Tune 5-8 Days",
    },
    {
      icon: <Shield />,
      title: "Fully Customize Caller Tune",
      subtitle: "Create Customize Caller Tune For Your Fans",
    },
    {
      icon: <Headphones />,
      title: "Earn",
      subtitle: "Earn Money, From Caller Tune",
    }
  ];



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const featuress = [
    {
      number: "01",
      icon: <Globe />,
      title: "Earn From CRBT",
      subtitle: "Just like you earn by getting your song distributed on all DSPs (Spotify, Apple Music, Gaana, Jiosaavn, etc.), you can also earn from the crbt of your music. The more times your caller tune is played or downloaded on stores, the more your earning will increase. You can also earn a lot by getting Caller tune distribution India and uploading it on all networks. By putting crbt for your song on all networks like Jio, airtel, vi, bsnl, the reach and growth of your song will also increase.",
      isHover: false
    },
    {
      number: "02",
      icon: <Upload />,
      title: "Earning & Payouts",
      subtitle: "Whatever revenue you generate from playing or downloading your song or tune, the black turn collects it from all networks and DSP and transfers your royalty to your bank account. We keep collecting your royalty for lifetime and transfer it to you. You do not have to manually follow up or send mail. We have auto payment here, so whenever your payment comes, it will be received directly in your bank account. We are smart to make payment in all currencies like: USD, Euro etc.",
      isHover: false
    },
    {
      number: "03",
      icon: <BarChart3 />,
      title: "ISRC and UPC",
      subtitle: "We also provide a verified and new ISRC (International Standard Recording Code) and Universal Product Code (UPC) code for your tune for free. With which you can track or identify your tune or song on all DSP (Digital Service Providers).",
      isHover: false
    },
    {
      number: "04",
      icon: <Clock />,
      title: "Rights And Controls",
      subtitle: "You are given 100% rights of your song. Like the copyright © of music and Sound Recording Copyright Unicode ℗ i.e. c-line and p-line 100% remains with you. Like you can get the song taken down whenever you want without any extra or hidden charges.",
      isHover: false
    }
  ];
  const toggleReadMore = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const truncateText = (text, isExpanded) => {
    if (isExpanded) return text;
    const words = text.split(' ');
    if (words.length == 12) return text; // Roughly 3 lines worth of text
    return words.slice(0, 12).join(' ') + '...';
  };


  const [activeTab, setActiveTab] = useState(0);

  const tabData = [
  {
    id: 'caller-tune-original',
    title: 'Caller Tune',
    icon: <Headphones className="w-5 h-5" />,
    heading: "India's All Network Caller Tune (Ring Back Tone) CUSTOMISED CALLER TUNES",
    description: '',
    features: [
      '📄 CRBT Codes - Get CRBT code for any user can set your song caller tune using CRBT codes',
      '🎵 Maximum Caller Tune - Get Maximum Caller tune for one song according to the time of your song'
    ],
    image: tablist1,
    bgColor: 'black'
  },
  {
    id: 'caller-tune',
    title: 'Caller Tune (CRBT)',
    icon: <Headphones className="w-5 h-5" />,
    heading: 'Mobile Operator Licensing CRBT Codes',
    description: 'Access caller tune via multiple channels, including SMS, USSD, WAP, and an online portal. We also provide you CRBT codes through which any user can set the caller tune of your song by sending a request via SMS from his phone. The more users use the caller tune of your song, the more you earn.',
    features: [
      'Multi-channel access: SMS, USSD, WAP, and online portal',
      'CRBT codes for easy song activation via SMS',
      'User-driven song setting boosts your royalty',
      'Available across Jio, Airtel, Vi, BSNL'
    ],
    image: tablist2,
    bgColor: 'black'
  },
  {
    id: 'crbt-distribution-india',
    title: 'CRBT Distribution',
    icon: <Radio className="w-5 h-5" />,
    heading: 'CRBT Distribution India',
    description: 'Caller Ring Back Tone (CRBT) solutions to enable your song for Caller Tune. If you are a singer and want your song to be made into Jio, Vi, Airtel, or BSNL caller tune, then you should take help of a call ring back tune solution provider company. The Black Turn uploads your song on all telecom networks and makes caller tune of your song and also generates CRBT codes.',
    features: [
      'Enable your song for CRBT/caller tune',
      'Get listed on Jio, Vi, Airtel, and BSNL',
      'Full support for song upload & CRBT generation',
      'Professional CRBT code generation service'
    ],
    image: tablist3,
    bgColor: 'black'
  },
  {
    id: 'caller-tune-versions',
    title: 'Caller Tune Creation',
    icon: <Smartphone className="w-5 h-5" />,
    heading: 'Distribute Your Song with the Caller Tune',
    description: 'You can make many caller ring back tunes from your song depending on its duration. We help you create multiple versions from the most impactful parts of your track — such as the main line — to ensure maximum public appeal. This increases your song’s streaming performance and boosts its overall growth.',
    features: [
      'Create multiple CRBT versions from one song',
      'Caller tune segments optimized by song duration',
      'Highlight the most liked/main line for popularity',
      'Boosts both caller tune usage and song streaming'
    ],
    image: tablist4,
    bgColor: 'black'
  }
];



  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${banner})` }}>

        {/* Background decorative elements */}


        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-white text-4xl md:text-6xl font-light mb-4 tracking-wide ">
            Caller tune
          </h1>
          <h2 className="text-white text-4xl md:text-5xl font-light mb-6 tracking-wide">
            Distribution India
          </h2>

          {/* Subtitle */}
          <p className="text-white text-lg md:text-xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            Introducing the Smartest way to
            present your Song Caller tune
          </p>

          {/* Telecom operator logos */}
          <div className="flex justify-center items-center space-x-8 md:space-x-12">
            {/* VI Logo */}
            <div className="bg-white rounded-full p-3 w-14 h-14 md:w-18 md:h-18 flex items-center justify-center shadow-lg">
              <div className="text-red-600 font-bold text-2xl md:text-3xl">
                VI
              </div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full ml-1"></div>
            </div>

            {/* Jio Logo */}
            <div className="bg-blue-600 rounded-full p-3 w-14 h-14 md:w-18 md:h-18 flex items-center justify-center shadow-lg">
              <div className="text-white font-bold text-lg md:text-xl">
                Jio
              </div>
            </div>

            {/* Airtel Logo */}
            <div className="bg-white rounded-full p-3 w-14 h-14 md:w-18 md:h-18 flex items-center justify-center shadow-lg">
              <div className="text-red-600 font-bold text-lg md:text-xl italic">
                airtel
              </div>
            </div>

            {/* BSNL Logo */}
            <div className="bg-white rounded-full p-3 w-14 h-14 md:w-18 md:h-18 flex items-center justify-center shadow-lg">
              <div className="flex flex-col items-center">
                <div className="text-blue-600 font-bold text-xs">BSNL</div>
                <div className="text-orange-500 text-xs">Connecting India</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">


          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-xl p-5 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-500 border border-[#005f73]/10 relative overflow-hidden cursor-pointer">
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#005f73]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                  <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 bg-[#ebf4f5] rounded-2xl  flex items-center justify-center group-hover:bg-[#005f73] transition-colors duration-300">
                        <div className="text-[#005f73] group-hover:text-white w-8 h-8 ml-2 mt-2 transition-colors duration-300">
                          {feature.icon}
                        </div>
                      </div>
                    </div>

                    <h4 className="text-[#005f73] text-2xl font-bold mb-3 text-center group-hover:text-[#0a7084] transition-colors duration-300">
                      {feature.title}
                    </h4>

                    <p className="text-gray-500 text-lg font-medium mb-4 text-center">
                      {feature.subtitle}
                    </p>

                    <p className="text-gray-400 text-center leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-[#005f73]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-[#ebf4f5] to-transparent rounded-full opacity-50" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}

        </div>
      </div>

      {/* Sticky Section */}
      <div id="sticky-section" className="relative min-h-screen">
        <div className="flex">
          {/* Fixed Image Side */}
          <div className="w-1/2 sticky top-0 h-screen flex items-center justify-center bg-white">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl p-8 shadow-2xl">
                <img
                  src={distribute}
                  alt="Distribution"
                  className="rounded-3xl object-cover max-w-[600px] w-full h-auto mx-auto"
                />
              </div>

              {/* Distribution Icon */}
              <div className="absolute -bottom-5 -right-6 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-indigo-500">
                <div className="relative">
                  <div className="w-8 h-8  rounded-full flex items-center justify-center"><FaMusic />
                    <span className="text-white text-lg">♪</span>
                  </div>
                  <div className="absolute top-0 left-0 w-8 h-8 border-2 border-green-500 rounded-full animate-ping"></div>
                </div>
              </div>

              {/* Network signals */}

            </div>
          </div>

          {/* Scrolling Content Side */}
          <div className="w-1/2 ">
            <div className={`transition-all duration-300 ${isSticky ? 'sticky top-0' : ''}`}>
              <div className="p-12 min-h-screen flex flex-col justify-center">
                <div className="max-w-lg">
                  <h2 className="text-4xl font-bold mb-8 text-[#005f73] bg-clip-text ">
                    How to distribute songs for Caller Tunes in India?
                  </h2>

                  <div className="space-y-6 text-gray-500 leading-relaxed">
                    <p>
                      Don't you think that through this <span className="text-[#005f73] font-bold">digital door</span> the song sung or written by you can be heard by all the people of India. When any person calls someone, he can hear your sweet song.
                    </p>

                    <p>
                      You can get your song distributed live through all the <span className="text-[#005f73] font-bold">streaming stores</span> (Spotify, Instagram, AppleMusic, Jiosaavn, Gaana and many more) music distribution along with us.
                    </p>

                    <p>
                      You can also distribute small line <span className="text-[#005f73] font-bold">CRBT (Call Ring Back Tone)</span> of your song. Along with your song, you can also earn from the caller tunes which are small parts of your song from all the networks.
                    </p>

                    <div className="bg-black rounded-xl p-6 border border-purple-500/20">
                      <h3 className="text-2xl font-bold mb-4 text-[#ebf4f5]">
                        CRBT Music Distribution For India's All Networks
                      </h3>
                      <p className="text-gray-300">
                        You can get many caller tunes made from your song. It will depend on the length of your song that how many CRBTs can be made from your song.
                      </p>
                    </div>

                    <p>
                      You can share your call ring back tune to all active networks of India like <span className="text-[#005f73] font-bold">Jio, Airtel, Vi, BSNL,</span> etc.
                    </p>

                    <p>
                      You can also <span className="text-[#005f73] font-bold">increase the reach</span> of your song by uploading CRBT on all these networks.
                    </p>

                    {/* Call to Action */}


                    {/* Network Icons */}
                    <div className="flex space-x-4 pt-6">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">JIO</div>
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs">Airtel</div>
                      <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm">VI</div>
                      <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs">BSNL</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Music distribution with CRBT */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#005f73] mb-4">
              Music Distribution Features
            </h2>

          </div>

          {/* Cards Grid - 2 columns */}
          <div className="grid md:grid-cols-2 gap-8">
            {featuress.map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`bg-white rounded-xl p-8 shadow-xl border-2 transition-all duration-500 cursor-pointer relative overflow-hidden ${feature.isHover
                  ? 'border-[#005f73] shadow-2xl transform -translate-y-2 scale-105'
                  : 'border-gray-200 hover:border-[#005f73] hover:shadow-2xl hover:-translate-y-2 hover:scale-105'
                  }`}>

                  {/* Large Number Background */}
                  <div className={`absolute top-4 right-4 text-8xl font-bold opacity-10 transition-all duration-500 ${feature.isHover ? 'text-[#005f73]' : 'text-gray-300 group-hover:text-[#005f73]'
                    }`}>
                    {feature.number}
                  </div>

                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#005f73]/5 to-transparent rounded-xl transition-opacity duration-500 ${feature.isHover ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`} />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex justify-start mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${feature.isHover
                        ? 'bg-[#005f73]'
                        : 'bg-[#ebf4f5] group-hover:bg-[#005f73]'
                        }`}>
                        <div className={`w-8 h-8 transition-colors duration-300 ${feature.isHover
                          ? 'text-white'
                          : 'text-[#005f73] group-hover:text-white ml-2 mt-2'
                          }`}>
                          {feature.icon}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${feature.isHover
                      ? 'text-[#005f73]'
                      : 'text-[#005f73] group-hover:text-[#0a7084]'
                      }`}>
                      {feature.title}
                    </h3>

                    {/* Description with Read More functionality */}
                    <div className="mb-4">
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {truncateText(feature.subtitle, expandedCards[index])}
                      </p>

                      {/* Read More Button */}
                      {feature.subtitle.split(' ').length > 15 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleReadMore(index);
                          }}
                          className="mt-2 text-[#005f73] hover:text-[#0a7084] text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                        >
                          {expandedCards[index] ? 'Read Less' : 'Read More'}
                          <span className={`transform transition-transform duration-200 ${expandedCards[index] ? 'rotate-180' : ''}`}>
                            ▼
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Decorative corner elements */}
                    <div className={`absolute top-6 left-6 w-16 h-16 bg-gradient-to-br from-[#005f73]/10 to-transparent rounded-full transition-opacity duration-500 ${feature.isHover ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`} />
                    <div className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-tr from-[#ebf4f5] to-transparent rounded-full opacity-50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Caller Tune Distribution */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Image Side */}
            <div className="w-full md:w-1/2">
              <div className="relative ml-20 ">
                <img
                  src={section}
                  alt="Caller Tune Distribution India"
                  className=" rounded-2xl shadow-2xl h-[500px] w-[400px]"
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2">
              <div className="max-w-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#005f73]">
                  Caller Tune Distribution India
                </h2>

                <p className="text-gray-800 leading-relaxed mb-6 text-[18px] font-light">
                  If you pay once, your song or caller tune will be available on all platforms and
                  networks for life time. After paying once, you can earn from your song for life
                  time. And your song will never be removed from streaming platforms or CRBT Music
                  Distribution and we will have 100% rights over it. We will never change or keep
                  your rights with us.
                </p>

                {/* Learn More Button */}
                <div className="flex justify-start">
                  <button className="bg-gradient-to-r from-[#005f73] to-[#0a7084] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    Learn More
                    <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ISRC and UPC */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Container with Border */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#005f73]  border-gradient-to-r from-[#005f73] to-[#0a7084] p-8 md:p-12 relative overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#005f73]/15 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-8 left-5 w-48 h-48 bg-gradient-to-tr from-blue-500/15 to-transparent rounded-full translate-y-24 -translate-x-24"></div>

            {/* Content Grid */}
            <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">

              {/* Left Column - ISRC & UPC */}
              <div className="space-y-8">
                {/* ISRC Card */}
                <div className="bg-white rounded-2xl p-6 border-2 border-[#005f73]/20 shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#005f73]/10 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-xl text-[#005f73] font-bold">ISRC and UPC</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We Provide Free ISRC & UPC for Audio.
                  </p>
                </div>

                {/* 100% Rights Card */}
                <div className="bg-white rounded-2xl p-6 border-2 border-[#005f73]/20 shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#005f73]/10 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-xs">©</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#005f73]">100% RIGHTS</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    KEEP YOUR ALL RIGHTS ON YOUR SONG AND REVENUE
                  </p>
                </div>
              </div>

              {/* Center Column - Phone Mockups */}
              <div className="flex justify-center">
                <div className="relative">
                  {/* Main Phone */}
                  <div className="relative">
                    <div className="w-64 h-[480px] bg-gradient-to-b from-gray-900 to-black rounded-[3rem] p-2 shadow-2xl">
                      <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                        {/* Phone Screen Content */}
                        <div className="bg-gradient-to-b from-orange-500 to-red-500 h-32 relative">
                          <div className="absolute top-4 left-4 text-white">
                            <div className="text-sm font-medium">Music Platforms</div>
                            <div className="text-xs opacity-80">Your Music Everywhere</div>
                          </div>
                        </div>

                        {/* Music App Interface */}
                        <div className="p-4 bg-gray-900 text-white h-full">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 bg-gray-800 rounded-lg p-3">
                              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                                <FaSpotify className="text-white" />
                              </div>
                              <div>
                                <div className="text-xs font-medium">Your Song</div>
                                <div className="text-xs text-gray-400">Spotify</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-800 rounded-lg p-3">
                              <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center"><FaApple /></div>
                              <div>
                                <div className="text-xs font-medium">Your Track</div>
                                <div className="text-xs text-gray-400">Apple Music</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-800 rounded-lg p-3">
                              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center"><FaMusic /></div>
                              <div>
                                <div className="text-xs font-medium">Your Tune</div>
                                <div className="text-xs text-gray-400">JioSaavn</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}

                  </div>

                  {/* Second Phone (Partially Hidden) */}

                </div>
              </div>

              {/* Right Column - Royalties & Availability */}
              <div className="space-y-8">
                {/* Royalties Card */}
                <div className="bg-white rounded-2xl p-6 border-2 border-[#005f73]/20 shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-12 bg-[#005f73]/10  rounded-xl flex items-center justify-center">
                      <div className="text-black font-bold">$</div>
                    </div>
                    <h3 className="text-xl text-[#005f73] font-bold">You keep 100% of your royalties!</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    The Black Turn never takes a cut of your deals.
                  </p>
                </div>

                {/* Availability Card */}
                <div className="bg-white rounded-2xl p-6 border-2 border-[#005f73]/20 shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#005f73]/10 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 text-black">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#005f73]">Caller Tune Availability</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Pay Once And Your Song Caller Tune Available For LifeTime
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Statistics Bar */}

          </div>
        </div>
      </div>
      {/*tablist  */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#005f73] mb-4">
              Our Distribution Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose from our comprehensive suite of music distribution services to grow your audience and maximize your earnings.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap  mb-10 bg-gray-100 rounded-2xl justify-between p-2 max-w-5xl mx-auto">
            {tabData.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl transition-all duration-300 font-medium text-sm md:text-base whitespace-nowrap ${activeTab === index
                    ? 'bg-[#005f73] text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-[#005f73] hover:bg-gray-200'
                  }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="relative">
            {tabData.map((tab, index) => (
              <div
                key={tab.id}
                className={`transition-all duration-500 ${activeTab === index
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 absolute inset-0 transform translate-y-4 pointer-events-none'
                  }`}
              >
                <div className="grid md:grid-cols-2 gap-12 items-center justify-center">
                  {/* Content Side */}
                  <div className="order-2 md:order-1">
                    <div className="max-w-lg">
                      {/* Tab Indicator */}
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white mb-6 bg-gradient-to-r ${tab.bgColor}`}>
                        {tab.icon}
                        {tab.title}
                      </div>

                      {/* Heading */}
                      <h3 className="text-3xl md:text-4xl font-bold text-[#005f73] mb-6">
                        {tab.heading}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {tab.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-3 mb-8">
                        {tab.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full bg-[#005f73] flex items-center justify-center flex-shrink-0`}>
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}

                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="order-1 md:order-2">
                    <div className="relative">
                      {/* Main Image Container */}
                      <div className={`relative  rounded-[10px] shadow-xl transform  transition-all duration-500`}>
                        <img
                          src={tab.image}
                          alt={tab.title}
                          className="rounded-xl object-cover w-full h-90 md:h-96"
                        />

                        {/* Floating Icon */}
                        

                        {/* Decorative Elements */}
                        <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                        <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full"></div>
                      </div>

                      {/* Background Decorative Circle */}
                      <div className={`absolute -z-10 top-8 right-8 w-32 h-32 bg-gradient-to-br ${tab.bgColor} opacity-20 rounded-full blur-2xl`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
          
        </div>
      </div>

      {/* pricing */}
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
                    <p className="text-white mb-6">Features</p>
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


            {/* Pay After Work Done */}

            {/* Pay After Work Done Section */}
<div 
  className="relative py-24 bg-cover bg-center bg-no-repeat"
  style={{ 
    backgroundImage: `url(${banner})`,
    backgroundAttachment: 'fixed'
  }}
>
  {/* Gradient Overlay - Sky Blue */}
  <div className="absolute inset-0 bg-[#005f73]/20 text-white"></div>
  
  <div className="relative z-10 container mx-auto px-4 text-center">
    {/* Main Heading */}
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
      Pay After Work Done
    </h2>
    
    {/* Subheading */}
    <h3 className="text-2xl md:text-3xl font-bold text-white mb-12">
      Distribute Your Music Today! - Pay After Work Done
    </h3>
    
    {/* Start Now Button */}
    <Link to="/pricing" className="bg-[#005f73] text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      Start Now
    </Link>
  </div>
</div>





    </>
  );
};

export default CallerTuneDistribution;