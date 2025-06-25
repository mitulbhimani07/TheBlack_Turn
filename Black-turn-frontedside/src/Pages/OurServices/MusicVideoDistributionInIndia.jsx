import React, { useRef, useState } from 'react';
import banner from '../../assets/images/musicbanner.png';
import figure from '../../assets/images/music/youtube.png';
import figure1 from '../../assets/images/music/mxplayer.png';
import figure2 from '../../assets/images/music/vevo.png';
import figure3 from '../../assets/images/music/amazon.png';
import figure4 from '../../assets/images/music/apple-music.png';
import figure5 from '../../assets/images/music/boomplay.png';
import figure6 from '../../assets/images/music/Facebook.png';
import figure7 from '../../assets/images/music/fizy.png';
import figure8 from '../../assets/images/music/hungama.png';
import figure9 from '../../assets/images/music/roxi.png';
import figure10 from '../../assets/images/music/tencent.png';
import figure11 from '../../assets/images/music/tidal.png';
import figure12 from '../../assets/images/music/music.jpg';
import figure13 from '../../assets/images/music/mediaagency.jpg';
import figure14 from '../../assets/images/music/xite.jpg';
import figure15 from '../../assets/images/music/zing.jpg';
import { Play } from 'lucide-react';
import card1 from "../../assets/images/1.png"
import card2 from "../../assets/images/2.png"
import card3 from "../../assets/images/3.png"
import card4 from "../../assets/images/4.png"
import card5 from "../../assets/images/5.png"
import card6 from "../../assets/images/6.png"
import videoImage from "../../assets/images/video.png"
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';




// Custom Arrows
function CustomPrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute -left-15 top-20 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-xl transition-all duration-300 hover:scale-110"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

function CustomNextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-13 top-20 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-xl transition-all duration-300 hover:scale-110"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

// Individual Platform Card
const PlatformItem = ({ platform, isActive, onClick }) => (
  <div className="px-4 py-8 focus:outline-none">
    <div
      className={`transition-all duration-500 ease-out transform cursor-pointer ${
        isActive
          ? "scale-110 opacity-100 z-20"
          : "scale-90 opacity-100 hover:scale-95 hover:opacity-80"
      }`}
      onClick={onClick}
    >
      <div
        className={`relative mx-auto ${
          isActive ? "w-32 h-32 md:w-36 md:h-36" : "w-32 h-32 md:w-36 md:h-36"
        } transition-all duration-500`}
      >
        <div
          className={`group w-25 h-25 shadow-md flex items-center justify-center rounded-2xl  bg-white transition-all duration-500 `}
        >
          <img
            src={platform.image}
            alt={platform.name}
            className="w-20 h-20 object-contain "
            loading="lazy"
          />
          {/* {!isActive && (
            <div className="absolute inset-0 bg-black opacity-20 transition-opacity duration-500" />
          )} */}
        </div>

        

      
      </div>

    </div>
  </div>
);

function MusicVideoDistributionInIndia() {
const [openItems, setOpenItems] = useState(new Set());

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const platforms = [
    {
      id: 1,
      image:figure,
    },
    {
      id: 2,
      image:figure1,
    },
    {
      id: 3,
      image:figure2,
    },
    {
      id: 4,
      image:figure3,
    },
    {
      id: 5,
      image:figure4,
    },
    {
      id: 6,
      image:figure5,
    },
    {
      id: 7,
      image:figure6,
    },
    {
      id: 8,
      image:figure7,
    },
    {
      id: 9,
      image:figure8,
    },
    {
      id: 10,
      image:figure9,
    },
    {
      id: 11,
      image:figure10,
    },
    {
      id: 12,
      image:figure11,
    },
    {
      id: 13,
      image:figure12,
    },
    {
      id: 14,
      image:figure13,
    },
    {
      id: 15,
      image:figure14,
    },
    {
      id: 16,
      image:figure15,
    },
  ];

  const sliderSettings = {
    // dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    beforeChange: (_, next) => setCurrentSlide(next),
    afterChange: (index) => setCurrentSlide(index),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };



  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

 const faqData = [
    {
      id: 1,
      question: "TO WHICH DSPS CAN I SEND MUSIC VIDEOS?",
      answer: "As it stands now, you're able to send music videos to these DSPs:",
      listItems: [
        "Amazon",
        "Apple Music/iTunes", 
        "Boomplay",
        "Facebook Video",
        "fizy",
        "Hungama",
        "Nightlife Music",
        "ROXi Video",
        "Tencent Music Entertainment",
        "Tidal",
        "United Media Agency",
        "VEVO",
        "Xite",
        "Yandex",
        "Zing MP3",
        "Mx Player",
        "JioSaavn (Coming Soon)",
        "Gaana.com (Coming Soon)"
      ],
      additionalText: "Over the course of this year and the next, we expect to add more DSPs to this list."
    },
    {
      id: 2,
      question: "WHAT KIND OF VIDEO FILES DOES BLACK TURN SUPPORT?",
      answer: "Video specifications differ per DSP. Generally, we advise adhering to the following specifications:",
      listItems: [
        "HD Resolution: 1920×1080 or 1280×720",
        "4K Resolution: 3840×2160 or 4096×2160",
        "Supported codecs: MPG, AVI or MOV/M4V/MP4",
        "MPG: MJPEG, MPEG 1 Video, MPEG 2 Video",
        "M4V: MPEG4, H264, MP4, HEVC",
        "MOV: SVQ1, SVQ3, DV video, Apple ProRes",
        "Video codec: H264 or Apple ProRes 422",
        "Frame rate: 23.976 up to 29.970",
        "For any format, bitrate should be at least 15 Mbit/s"
      ],
      additionalText: "For AppleMusic Video Specification, please refer to their specific requirements."
    },
    {
      id: 3,
      question: "WHAT IS ARTWORK OR POSTER SIZE?",
      answer: "Thumbnail with us – 1920×1080 pixels – The thumbnail must be an actual screenshot from your video [max. 3mb, File types: jpg, jpeg, png]. Artist Profile pic without text or logo’s in 5000×5000 px & 800×800 px.",
      // listItems:"Artist Profile pic without text or logo’s in 5000×5000 px & 800×800 px."
    }
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

  const clients = [
      {
        id: 1,
        name: "Pop FM",
        logo: figure,
        alt: "Pop FM Logo"
      },
      {
        id: 2,
        name: "Client Name",
        logo: figure1,
        alt: "Client Logo"
      },
      {
        id: 3,
        name: "Sports Club",
        logo: figure2,
        alt: "Sports Club Logo"
      },
      {
        id: 4,
        name: "Gold Records",
        logo: figure3,
        alt: "Gold Records Logo"
      },
      {
        id: 5,
        name: "Radio Raabta",
        logo: figure4,
        alt: "Radio Raabta Logo"
      },
      {
        id: 6,
        name: "Orange Music",
        logo: figure5,
        alt: "Orange Music Logo"
      },
      {
        id: 7,
        name: "Music Label",
        logo: figure6,
        alt: "Music Label Logo"
      },
      {
        id: 8,
        name: "PTF Studio",
        logo: figure7,
        alt: "PTF Studio Logo"
      },
      {
        id: 9,
        name: "Gaming Co",
        logo: figure8,
        alt: "Gaming Company Logo"
      },
      {
        id: 10,
        name: "Madly Records",
        logo: figure9,
        alt: "Madly Records Logo"
      },
      {
        id: 11,
        name: "News Channel",
        logo: figure10,
        alt: "News Channel Logo"
      },
      {
        id: 12,
        name: "HK Media",
        logo: figure11,
        alt: "HK Media Logo"
      }
    ];

 const videos = [
  {
    id: 1,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=Z99APaBbaBc"
  },
  {
    id: 2,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=WZlNbW9enOA"
  },
  {
    id: 3,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    youtubeUrl: "https://www.youtube.com/watch?v=_HMbywTCmrQ"
  }
];

// Helper function to extract YouTube ID
const getYouTubeID = (url) => {
  const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};


  const handleVideoClick = (youtubeUrl) => {
    window.open(youtubeUrl, '_blank');
  };


  return (
    <>
      {/* Banner Section */}
      <div
        className="relative bg-cover bg-center h-[359px] flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0  bg-opacity-60"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
            Music Video Distribution in india & Worldwide
          </h1>
    <p className="text-white text-base md:text-lg">
Global stage, local roots. Share your music video with the world—start distributing today.
</p>
        </div>
      </div>


      {/* ott video section */}

    <div className="bg-[#EBF4F5] py-10 pt-12  px-4 ">
      <div className="max-w-3xl mx-auto text-center ">
        <h1 className="text-5xl md:text-5xl font-bold bg-[#005F73] bg-clip-text text-transparent mb-6 tracking-tight">
          Our Video OTT
        </h1>
        <p className="text-xl md:text-xl text-gray-600 max-w-4xl mx-auto mb-7">
          Deliver Your Video To More than 15+ Video Ott And Get More Reach, Fans And Revenue
        </p>
        
      

      <div className="relative px-20">
        <Slider ref={sliderRef} {...sliderSettings}>
          {platforms.map((platform, index) => (
            <PlatformItem
              key={platform.id}
              platform={platform}
              isActive={index === currentSlide}
              onClick={() => sliderRef.current?.slickGoTo(index)}
            />
          ))}
        </Slider>
      </div>
    </div>
    </div>

      {/* Ott section */}

      <section className="py-16 px-4">
              <div className="max-w-7xl mx-auto">
               
      
                {/* Client Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      className="bg-white rounded-lg border-2 border-slate-200 p-6  transition-all duration-300  cursor-pointer group"
                    >
                      <div className="flex items-center justify-center h-20">
                        <img
                          src={client.logo}
                          alt={client.alt}
                          className="max-w-full max-h-full object-contain  group-hover:grayscale-0 hover:scale-105 transition-all duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
      
              </div>
            </section>


            {/* youtube section */}

            <div className="bg-[#EBF4F5]  py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Check out our work
          </h1>
          <p className="text-gray-600 text-lg">
            Take a peek inside our Wonderworld
          </p>
        </div>

        {/* Video Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map((video) => {
        const videoId = getYouTubeID(video.youtubeUrl);
        const posterUrl = videoId
          ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
          : '';

        return (
          <div
            key={video.id}
            className="group transform transition-all duration-300 hover:scale-105"
          >
            {/* Video Thumbnail Container */}
            <div className="relative overflow-hidden rounded-xl shadow-lg ">
              {/* HTML5 Video Tag */}
              <div className="aspect-video relative">
                <video
                  className="w-full h-full rounded-t-xl object-cover"
                  controls
                  preload="metadata"
                  poster={posterUrl}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  <source src={video.videoUrl.replace('.mp4', '.webm')} type="video/webm" />
                  <source src={video.videoUrl.replace('.mp4', '.ogg')} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay */}
                <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 pointer-events-none rounded-t-xl" />
              </div>

              {/* Video Info */}
              <div className="p-4 bg-white rounded-b-xl">
                <div className="flex flex-col items-center space-y-2">
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVideoClick(video.youtubeUrl);
                    }}
                    className="flex items-center text-slate-900 font-semibold cursor-pointer transition-colors duration-300 text-sm"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    View on YouTube
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
        
        
      </div>
    </div>


    {/* srevices section */}

    <section className="bg-white relative overflow-hidden pb-16 mt-10">
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
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: service.id * 0.15,
                }}
                viewport={{ once: true }}
              >
                <div
                  className="group relative flex flex-col text-left bg-white/70 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-md 
              hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 ease-out cursor-pointer overflow-hidden h-[380px] w-full justify-around"
                >
                  {/* Icon */}
                  <div className="items-center justify-center transition-all duration-500 group-hover:scale-110">
                    <img src={service.icon} alt={service.title} />
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


      {/* gloas section */}

      <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src={videoImage}
            alt="Music Video Distribution"
            className="h-[500px] rounded-xl shadow-lg"
          />
        </div>

        {/* Right Content */}
        <div>
          <h3 className="text-4xl font-bold text-slate-900 mb-5">Our goal</h3>
          <h2 className="text-2xl md:text-2xl  text-gray-900 leading-snug mb-6">
            We are here to solve your music video distribution in India problem
            and delivery your content to world's best Video OTT.
          </h2>

          <div className=" mt-4">
            {/* Column 1 */}
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                Worldwide Music Video Distribution
              </h2>
              <p className="text-gray-600 text-lg">
                Your Music Video will be Available across 200+ Countries and 15+
                Video OTT platforms
              </p>
            </div>

            {/* Column 2 */}
            <div className='mt-5'>
              <h4 className="text-3xl font-semibold text-gray-800 mb-2">
                Upload Limit
              </h4>
              <p className="text-gray-600 text-lg">
                There is no limit you can upload. Unlimited uploads for
                Unlimited artists or Brands.
              </p>
            </div>

            <div className="mt-8">
    <Link to="/signin" className="bg-[#005F73] text-white flex items-center text-lg font-medium py-3 px-6 rounded-lg transition duration-300 w-[300px]">
      <FaUpload className='me-4'/>Submit Your Video
    </Link>
  </div>

          </div>
        </div>
      </div>
    </section>

      {/* FAQ section */}

      <div className="max-w-4xl mx-auto p-6 bg-white mb-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">FAQ</h1>
        <p className="text-lg text-gray-600">Most frequent questions and answers</p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            {/* Question Header */}
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-5 text-left"
              aria-expanded={openItems.has(item.id)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0 transition-transform duration-200">
                  {openItems.has(item.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>
            </button>

            {/* Answer Content */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                openItems.has(item.id)
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="px-6 pb-5">
                <div className="h-px bg-gray-200 mb-4"></div>
                <div className="text-gray-700 leading-relaxed">
                  <p className="mb-4">{item.answer}</p>
                  
                  {item.listItems && (
                    <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
                      {item.listItems.map((listItem, index) => (
                        <li key={index} className="text-gray-700">
                          {listItem.includes("Coming Soon") ? (
                            <>
                              {listItem.replace(" (Coming Soon)", "")}
                              <span className="text-blue-600 font-medium"> (Coming Soon)</span>
                            </>
                          ) : (
                            listItem
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {item.additionalText && (
                    <p className="text-gray-700 mt-4">{item.additionalText}</p>
                  )}
                  
                  {/* {!item.listItems && !item.additionalText && item.answer} */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </div>


    </>
  );
}

export default MusicVideoDistributionInIndia;
