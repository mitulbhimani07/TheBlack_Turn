import React, { useEffect, useState } from 'react';
import banner from "../assets/images/banner.png";
import right from "../assets/images/right.png";
import { motion, AnimatePresence } from 'framer-motion';
import card1 from "../assets/images/1.png"
import card2 from "../assets/images/2.png"
import card3 from "../assets/images/3.png"
import card4 from "../assets/images/4.png"
import card5 from "../assets/images/5.png"
import card6 from "../assets/images/6.png"
import businessowner from "../assets/images/businessOwner.png"
import { Headphones, Disc, Phone, Wallet, Mic2, DollarSign, Repeat, ChevronDown, Minus, Plus } from 'lucide-react';
import { Music, Monitor, Building, Database, ArrowRight } from 'lucide-react';
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
import report from "../assets/images/report.png";
import silder from "../assets/images/silder1.png";
import client1 from '../assets/images/client1.jpeg';
import client2 from '../assets/images/client2.jpeg';
import client3 from '../assets/images/client3.jpeg';
import client4 from '../assets/images/client4.jpeg';
import client5 from '../assets/images/client5.jpeg';
import client6 from '../assets/images/client6.jpeg';
import client7 from '../assets/images/client7.jpg';
import leftqoute from "../assets/images/leftqoute.png";
import rightquote from "../assets/images/rightquote.png";
import { Check } from 'lucide-react';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import MusicDistribution from '../assets/images/Music_Distribution.png';
import MobileOperatorLicensing from '../assets/images/Mobile_Operator_Licensing.png'; import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { FaQuoteRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { img } from 'framer-motion/client';
import figure from '../assets/images/fun.png';
import figure1 from '../assets/images/great.png';
import figure2 from '../assets/images/creative vision.png';
import figure3 from '../assets/images/showcase.png';
import figure4 from '../assets/images/Figure.png';
import figure5 from '../assets/images/Figure1.png';
import figure6 from '../assets/images/Figure2.png';
import figure7 from '../assets/images/Figure3.png';
import figure8 from '../assets/images/Figure4.png';
import figure9 from '../assets/images/Figure5.png';
import figure10 from '../assets/images/Figure6.png';
import figure11 from '../assets/images/Figure7.png';
import figure12 from '../assets/images/Figure8.png';
import figure13 from '../assets/images/Figure9.png';
import figure14 from '../assets/images/Figure10.png';
import figure15 from '../assets/images/Figure11.png';
import phone from '../assets/images/phone.png';



function Home() {
  const texts = ['Quality Service', '150+ Store'];
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 z-10 border border-gray-200 hover:bg-gray-50"
      aria-label="Previous testimonial"
    >
      <ChevronLeft className="w-6 h-6 text-gray-700" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 z-10 border border-gray-200 hover:bg-gray-50"
      aria-label="Next testimonial"
    >
      <ChevronRight className="w-6 h-6 text-gray-700" />
    </button>
  );

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    loop: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dotsClass: "slick-dots custom-dots",
    customPaging: (i) => (
      <button
        className="w-3 h-3 rounded-full transition-all duration-200 bg-gray-300 hover:bg-gray-400"
        aria-label={`Go to testimonial ${i + 1}`}
      />
    )
  };

  const steps = [
    { id: 1, title: 'Earnings from music streaming', icon: Music },
    { id: 2, title: 'theblackturn.com', icon: Monitor },
    { id: 3, title: 'Bank', icon: Building },
    { id: 4, title: 'Record labels', icon: Database },
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
    },
    {
      id: 13,
      name: "Sunset Co",
      logo: figure12,
      alt: "Sunset Company Logo"
    },
    {
      id: 14,
      name: "Tech Solutions",
      logo: figure13,
      alt: "Tech Solutions Logo"
    },
    {
      id: 15,
      name: "Creative Hub",
      logo: figure14,
      alt: "Creative Hub Logo"
    },
    {
      id: 16,
      name: "Magadhi Music",
      logo: figure15,
      alt: "Magadhi Music Logo"
    }
  ];

  const testimonials = [
    {
      id: 1,
      title: "YT World",
      content: "Hello, Team The Black Turn,The attention to detail with which you helped me understand the initial concept of digital distribution platform and how can I make more revenue is in a league of its own 👏. I am incredibly pleased with the quality of customer service provided to me🤟🤟🤟🤟.The best service provider I have ever met. 😊😊😊😊😊😊",
      date: "18. June, 2021.",
      img: client1,
      rating: 5
    },
    {
      id: 2,
      title: "SITA MAHLI",
      content: "I am from Jharkhand It's music distribution company we got very good and very honest. Above all, it has a very fast service which is india's most best music distributer.I am very satisfied with this company.",
      date: "17. June, 2021.",
      img: client2,
      rating: 5
    },
    {
      id: 3,
      title: "GOVIND MAHALI",
      content: "I am from Jharkhand Good music distributer",
      date: "17.June, 2021.",
      img: client3,
      rating: 5
    },
    {
      id: 4,
      title: "RDX karan",
      content: "very good and fast service, very polite staff",
      date: "17.June, 2021.",
      img: client4,
      rating: 5
    },
    {
      id: 5,
      title: "Knowledge Jinni",
      content: "I researched several digital distribution platforms, but among them all, I really liked The Black Turn Platform. Among the many reasons I chose The Black Trun is for a few reasons such as It is the only platform that provides us with free caller tune conversions, through which we can increase our revenue. The second is free ISRC and UPC codes, ISRC and UPC codes are a paid service on many platforms, while this important service is free on The Black Turn. Third, the only paid platform gives us up to 95% of revenue which is a huge amount for me, and best of all Instant service, reply and solution. Industry Khatam Bhai..... Industry Khatam..... Guys, I must say The Black Turn Rocks Man...",
      date: "16.June, 2021.",
      img: client5,
      rating: 5
    },
    {
      id: 6,
      title: "Illusion Studio",
      content: "It's a lovely team to work with. Honest and trustworthy ❤️",
      date: "15.June, 2021.",
      img: client6,
      rating: 5
    },
    {
      id: 7,
      title: "The Pawsitive Effects",
      content: "Amazing budget service with instant response. But I must say that The Black Turn platform helped me a lot to generate my first revenue.",
      date: "15.June, 2021.",
      img: silder,
      rating: 5
    },
    {
      id: 8,
      title: "Mudit Chauhan",
      content: "In the digital distribution industry where customers are worried about how to start, how to manage, the black turn does it all for you. It is the only easy-to-use platform of its kind where uploading songs is a game and generating handsome revenue seems like My Dreams Come True.... The Black Turn Rocks..... Highly Recommended",
      date: "14.June, 2021.",
      img: client7,
      rating: 5
    },
    {
      id: 9,
      title: "Ankur Chauhan",
      content: "This Is One Of best Music Distribution company Plus apni indian company hai Apni indian company ko support kare guys Thank You So Much The Black Turn 🙌🙌",
      date: "11.June, 2021.",
      img: client7,
      rating: 5
    }
  ];



  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        duration: 0.6
      }
    }
  };



  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  //   const prevSlide = () => {
  //     setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  //   };

  // React.useEffect(() => {
  //   const interval = setInterval(nextSlide, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  const PawAvatar = ({ img }) => (
    <div className="relative w-44 h-44">
      {/* Background cards - stack effect */}
      <div className="absolute -left-4 -top-4 w-full h-full bg-white rounded-tl-lg border-2 border-gray-900 transform shadow-sm"></div>
      <div className="absolute top-4 -right-4 w-full h-full bg-white rounded-br-lg border-2 border-gray-900 transform shadow-sm"></div>

      {/* Main avatar image */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg  bg-white ">
        <img src={img} alt="Client Avatar" className="object-cover w-full h-full rounded-lg" />
      </div>
    </div>
  );


  const according = [
    {
      title: "All platforms",
      description: "Domestic Full Track Services Amazon, Gaana, Jio Saavn, Hungama Wynk. International Full Track Services:Alibaba, Apple(Itune), Audible Magic, Awa, Boomplay, Deezer, Facebook, Iheart, Imusic Corp, Jaxsta, Kkbox, Kuack Media, Napster, Netease, Pandora, Resso, Snap, Soundcloud, Spotify, Touch Tunes, youtube music."
    },
    {
      title: "Custom Label",
      description: "Distribute Music Using Your Own Label Name, and Get Your Custom C and P Line, Custom Label Name, Unlimited Lifetime Releases, with Unlimited artists."

    },
    {
      title: "Song live Time",
      description: "We deliver on all platforms minimum (1-3 Days) Maximum(5-8 Days) .Get your song live in 3 hours. mail or contact us."

    },
    {
      title: "Customize Caller Tune For All Networks",
      description: "We Distribute Music on all major Telecom operators – Jio, Airtel, Idea, Vodafone, Bsnl."
    },
    {
      title: "Pay once, use lifetime",
      description: "Pay Once for song distribution and your song live for a lifetime"
    },
    {
      title: "95% revenue share",
      description: "Your Song Play Anywhere Anytime You Get Paid 95% Revenue Your 5% our."
    },
    {
      title: "24/7 Phone Support",
      description: "Call Any Time : +919729786689 Mail us : contact@theblackturn.com"
    },
    {
      title: "Old Song(Already Released Song) Caller Tune",
      description: "Want to create a Caller tune for your previous released song. Call Us Now"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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

  const cardsData = [
    {
      id: 1,
      title: "Auto Payment & Reporting System",
      features: [
        "Now you don't have to email or follow-up on the phone.",
        "All reports and payments are automatically available in your dashboard on time and without any manual hassle.",
        "Whether it's INR, USD, Euro or any other currency we are able to process payment in your desired currency.",
        "No more conversion tensions for international artists and labels."
      ],
      delay: 0.1,
      gridClass: ""
    },
    {
      id: 2,
      title: "Detailed DSP-Wise Reports",
      features: [
        "Customized reports for every digital store (Spotify, Apple Music, JioSaavn, YouTube etc.).",
        "By viewing monthly or DSP-wise breakdown, you can get a clear analysis of how much revenue is being generated from which platform.",
        "Interactive charts and graphs in the dashboard that visually represent your revenue growth and regional performance."
      ],
      delay: 0.2,
      gridClass: ""
    },
    {
      id: 3,
      title: "Growth & Trend Analysis",
      features: [
        "Detailed analytics on genre-wise, region-wise or time period basis, so you can make informed decisions for future releases.",
        "Detailed insights will reveal which audience your content reached and which areas you can improve in.",
        "100% Transparency & Security",
        "Detailed record of every transaction available for you."
      ],
      delay: 0.3,
      gridClass: "md:col-span-2 lg:col-span-1"
    }
  ];

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
          <path d="M30.9828 0.455575C33.3734 -0.950713 36.397 1.0884 35.9751 3.90098L31.8265 31.1126C31.6156 32.1674 31.0531 33.0111 30.139 33.5736C29.5765 33.8549 29.0139 33.9955 28.4514 33.9955C28.0295 33.9955 27.6077 33.9252 27.1858 33.7143L19.3106 30.4798L16.2167 34.6284C14.3182 37.23 10.1697 35.894 10.1697 32.5892V26.6828L2.08355 23.3781C-0.518086 22.3233 -0.729029 18.7373 1.73197 17.331L30.9828 0.455575ZM25.1421 32.5892L16.0761 29.1438L13.5448 28.0891V32.5892ZM28.4514 30.6204L32.6703 3.33846L3.41952 20.2139L10.9432 23.3781L25.8498 10.4402C26.8342 9.52613 28.2405 10.7918 27.5373 11.9168L17.623 26.1203L28.4514 30.6204Z" fill="#005F73" />
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

  const independentFeatures = [
    "Fastest Approval Time",
    "Free ISRC and UPC code",
    "Unlimited Forever Releases",
    "Unlimited Custom Caller Tune",
    "Custom Record Label Get Your Custom C and P Line",
    "Previously released song, accepted for Custom Caller Tune"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Distribute On​ section */}
      <div className="min-h-screen bg-[#EBF4F5] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            <motion.h1
              className="text-4xl font-bold text-gray-800"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.2
              }}
            >
              Distribute On
            </motion.h1>
          </motion.div>

          {/* Music Streaming Platforms */}
          <motion.div
            className="backdrop-blur-md rounded-3xl mb-10"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-6 justify-items-center"
              variants={containerVariants}
            >
              {mainPlatforms.map((platform, index) => (
                <motion.div
                  key={index}
                  className="group w-20 h-20 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-200"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.1,
                    borderColor: "#648f94",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.img
                    src={platform.icon}
                    alt={platform.name}
                    className="w-12 h-12 object-contain"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Mobile Carrier Platforms */}
          <motion.div
            className="backdrop-blur-md"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ delay: 0.4 }}
          >
            <motion.h2
              className="text-2xl font-semibold text-gray-800 mb-4 text-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: 0.6
              }}
            >
              Caller Tune Distribution for India's All Cellular Networks
            </motion.h2>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 justify-items-center max-w-3xl mx-auto pt-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
            >
              {carrierPlatforms.map((platform, index) => (
                <motion.div
                  key={index}
                  className="group w-24 h-24 flex items-center justify-center rounded-2xl bg-white shadow-md border border-gray-200"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.15,
                    borderColor: "#648f94",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.img
                    src={platform.icon}
                    alt={platform.name}
                    className="w-16 h-16 object-contain"
                    whileHover={{
                      scale: 1.3,
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Floating Animation for Background Elements */}
          <motion.div
            className="fixed top-20 left-10 w-4 h-4 bg-[#648f94] rounded-full opacity-20"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="fixed top-40 right-20 w-6 h-6 bg-[#648f94] rounded-full opacity-15"
            animate={{
              y: [0, 30, 0],
              x: [0, 10, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          <motion.div
            className="fixed bottom-40 left-1/4 w-3 h-3 bg-[#648f94] rounded-full opacity-25"
            animate={{
              y: [0, -15, 0],
              x: [0, -15, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </div>

      {/* 150 stores */}
      <section className="bg-white py-10 sm:py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <img src={right} height={400} width={450} alt="150+ stores" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* what we do */}
      <section className="bg-white relative overflow-hidden pb-16">
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



      {/* Featured For independent labels */}
      <section className="bg-[#005f73] py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              Featured For Independent Labels
            </h2>
          </div>

          {/* Features Grid - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {independentFeatures.slice(0, 3).map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 sm:space-x-4 text-white group  transition-transform duration-300 md:mb-2 sm:mb-2 lg:mb-6"
                >
                  {/* Checkmark Icon */}
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center  transition-colors duration-300">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#005f73] stroke-[3]" />
                  </div>

                  {/* Feature Text */}
                  <span className="text-sm sm:text-base lg:text-lg font-medium leading-relaxed  transition-colors duration-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {independentFeatures.slice(3).map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 sm:space-x-4 text-white group transition-transform duration-300"
                >
                  {/* Checkmark Icon */}
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center  transition-colors duration-300">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#005f73] stroke-[3]" />
                  </div>

                  {/* Feature Text */}
                  <span className="text-sm sm:text-base lg:text-lg font-medium leading-relaxed  transition-colors duration-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reporting & Revenue Analytics */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-5xl font-bold text-slate-900 mb-4">
                  Reporting & Revenue Analytics
                </h2>
                <p className="text-slate-900 text-lg leading-relaxed font-medium">
                  Track Your Growth, Earnings & Opportunities – With The Black Turn
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-slate-500 leading-relaxed">
                  Are you confused about which genre to work on, how much revenue did which
                  artist earn, or which DSP is giving you the best performance?
                </p>

                <p className="text-slate-500 leading-relaxed">
                  The Black Turn introduces a smart, auto-updated system that manages all revenue
                  and reporting in a single dashboard.
                </p>
              </div>
            </div>

            {/* Right Analytics Dashboard */}
            <div className="rounded-2xl p-6">
              <img src={report} alt="Analytics Dashboard" />
            </div>
          </div>
        </div>
      </section>

      {/* step section */}
      <section className="bg-white pt-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Flow */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting Dashed Line */}
              <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-[#00b4d8] transform -translate-y-1/2 z-0"></div>

              {/* Steps */}
              <div className="relative z-10 grid grid-cols-4 gap-x-20 gap-y-8">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.id}
                      className={`group cursor-pointer transition-all duration-500 ${activeStep === index ? 'scale-105' : 'hover:scale-102'
                        }`}
                      onMouseEnter={() => setActiveStep(index)}
                    >
                      <div
                        className={`relative bg-[#ebf4f5] border-[#005f73] border-2 hexagon h-64 p-6 backdrop-blur-sm transition-all duration-500 flex flex-col justify-center items-center ${activeStep === index ? 'shadow-2xl shadow-current/20' : ''
                          }`}
                      >
                        {/* Step Number Badge */}
                        <div className="absolute top-[18px] left-1/2 transform -translate-x-1/2 z-20">
                          <div className="w-8 h-8 rounded-full bg-[#005f73] text-white font-bold text-sm flex items-center justify-center shadow-lg ring-2 ring-white">
                            {step.id}
                          </div>
                        </div>

                        {/* Icon */}
                        <div className="w-16 h-16 rounded-xl bg-[#004d5f] flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-black text-center">
                          {step.title}
                        </h3>

                        {/* Arrow */}
                        {index < steps.length - 1 && (
                          <div className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 ">
                            <div className="w-8 h-8 bg-[#005f73] rounded-full flex items-center justify-center border-2 border-[#004d5f] shadow-md">
                              <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="relative">
                  <div className="bg-[#ebf4f5] border-[#005f73] border-2 hexagon h-64 p-6 backdrop-blur-sm flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#005f73] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#005f73] text-white font-bold text-sm flex items-center justify-center shadow-md">
                        {step.id}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3">
                      {step.title}
                    </h3>
                  </div>

                  {/* Vertical Line */}
                  {step.id < steps.length && (
                    <div className="flex justify-center py-4">
                      <div className="w-0.5 h-8 bg-[#005f73]"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* Add your header content here */}
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {cardsData.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: card.delay }}
                viewport={{ once: true }}
                className={`group ${card.gridClass}`}
              >
                <div className="bg-[#005f73] rounded-2xl p-6 sm:p-8 text-white h-full hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 ease-out cursor-pointer shadow-lg hover:shadow-2xl">
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-[#ccdfe3] transition-colors duration-300">
                      {card.title}
                    </h3>
                  </div>
                  <ul className="space-y-3 text-sm sm:text-base">
                    {card.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* dicision making simplified */}
      <div className="w-full pb-16 bg-white">
        <div className="w-[90%] mx-auto relative">
          <motion.section
            className="bg-[#005f73] relative rounded-3xl overflow-visible"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden rounded-3xl">
              <div className="absolute top-[-3rem] left-[-4rem] w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 opacity-20">
                <div className="w-full h-full border-32 border-[#66c1d1] rounded-full"></div>
              </div>
              <div className="absolute bottom-[-3rem] right-[-4rem] w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 opacity-25">
                <div className="w-full h-full border-32 border-[#66c1d1] rounded-full"></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-8 md:px-16 lg:px-24">
              <div className="flex flex-col lg:flex-row justify-between gap-8">

                {/* Animated Text Block */}
                <motion.div
                  className="flex-1 text-white px-4 lg:px-8 space-y-6 pt-22"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div className="space-y-3">
                    <p className="text-[#b8dce3] text-sm sm:text-base font-medium">
                      Elevate Your Music Career with The Black Turn
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                      Decision-Making
                      <br />
                      Simplified
                    </h2>
                  </div>
                  <div className="space-y-4 text-sm sm:text-base lg:text-lg leading-relaxed text-[#d4eaf0]">
                    <p>
                      Now, decision making is even easier – based on data-driven insights,
                      decide which genre to focus on, which platform is giving the best royalty,
                      and what your next steps will be. Each feature empowers you to effectively manage your growth,
                      without the hassle of follow-up.
                    </p>
                  </div>
                </motion.div>

                {/* Animated Image Block */}
                <motion.div
                  className="flex-1 flex justify-center lg:justify-end relative z-20"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <div className="relative h-[500px] flex items-end">
                    <motion.div
                      className="relative w-72 sm:w-80 lg:w-96 h-[550px] -mt-12"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <img
                        src={businessowner}
                        alt="Professional man with tablet"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Floating Circles */}
                    <div className="absolute top-8 right-8 w-4 h-4 bg-white opacity-60 rounded-full animate-pulse"></div>
                    <div className="absolute top-20 right-16 w-3 h-3 bg-[#4db8cb] opacity-70 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute top-32 right-4 w-2 h-2 bg-white opacity-50 rounded-full animate-pulse delay-700"></div>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.section>
        </div>
      </div>


      {/* according section */}

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Music Distribution</h1>
          </div>

          <div className="space-y-4">
            {according.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md transition-all border border-gray-200"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <div className="flex items-center space-x-4">
                      <h3
                        className={`text-xl font-semibold transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-gray-800'
                          }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <div className="bg-[#004D5F] text-white p-2 rounded-full">
                      {isActive ? <Minus size={15} /> : <Plus size={15} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden px-5 pb-5 text-gray-700"
                      >
                        <div>{item.description}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="pb-16 max-w-7xl mx-auto bg-white">
        {/* Music Distribution Section */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center relative z-10">
            {/* Left Text Content */}
            <div className="space-y-6">
              <p className="text-gray-700 text-base md:text-[19px] max-w-[650px]">
                Make money with worldwide music distribution
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-black max-w-[700px] leading-tight">
                Upload Unlimited Songs
              </h1>
              <p className="text-gray-700 text-base md:text-[16px] max-w-[650px] leading-relaxed">
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
            <div className="flex items-center justify-center">
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

        {/* Mobile Operator Licensing Section */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center relative z-10">
            {/* Left Image Content */}
            <div className="flex items-center justify-start">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-96 xl:h-96 flex justify-center items-center">
                {/* Second border layer (furthest back) */}
                <div className="absolute w-full h-full border-2 sm:border-3 lg:border-4 border-[#075c7c] rounded-xl top-4 sm:top-6 lg:top-8 xl:top-10 left-2 sm:left-3 lg:left-4 xl:left-5 z-0"></div>

                {/* First border layer (middle) */}
                <div className="absolute w-full h-full border-2 sm:border-3 lg:border-4 border-[#075c7c] rounded-xl top-2 sm:top-3 lg:top-4 xl:top-5 left-4 sm:left-6 lg:left-8 xl:left-10 z-10"></div>

                {/* Main content box (front) */}
                <img
                  src={MobileOperatorLicensing}
                  alt="Mobile Operator Licensing Banner"
                  className="hover-target z-20 w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>

            {/* Right Text Content */}
            <div className="space-y-6">
              <p className="text-gray-700 text-base md:text-[19px] max-w-[650px]">
                Caller Tune Distribution India
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-black max-w-[700px] leading-tight">
                Mobile Operator Licensing
              </h1>
              <p className="text-gray-700 text-base md:text-[16px] max-w-[650px] leading-relaxed">
                Reach Indian fans and make your music available for Indian fans to caller tune. Set Your Favorite Part Of Your Song As Your Caller Tune From - JIOSAAVN, WYNK & Vi(Vodafone & Idea), BSNL Etc. Get CRBT Codes For Caller Tune. Licensing on VAS such as CRBT, IVR & WAP. Previously released song accepted, a full song on JioSaavn and Wynk mandatory (if not we upload first on Wynk and JioSaavn and distribute for caller tune). We don't charge a yearly fee, the song is available for caller tune as a lifetime
              </p>
              <button className="hover-target bg-[#005f73] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-medium hover:bg-[#005f74] transition-all duration-300 text-sm sm:text-base transform hover:scale-105">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>


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


      <section className=" py-20 px-4 sm:px-6 lg:px-8">
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


      <section className="bg-[#005f73] py-16 sm:py-20 lg:py-24">
        <motion.div
          className="max-w-4xl mx-auto text-center text-white px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
            Best Music Distribution India
          </h2>
          <span className='text-[24px] font-medium '>Why Think</span>
          <p className="text-[18px] sm:text-lg lg:text-xl mb-8">
            Distribute Your Music Today! – Pay After Work Done
          </p>
          <motion.button
            className="bg-white text-[#005f73] px-12 py-3 rounded-md font-semibold shadow-md hover:bg-gray-100 transition transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Now
          </motion.button>
        </motion.div>
      </section>


      {/* We Have A Great Client List in The Showcase section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              We Have A Great Client List in The Showcase
            </h2>

          </div>

          {/* Client Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-lg border-2 border-slate-200 p-6 shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="flex items-center justify-center h-20">
                  <img
                    src={client.logo}
                    alt={client.alt}
                    className="max-w-full max-h-full object-contain  group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* silder section */}
      <div className="bg-white py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Hear What Our Artists Are Achieving
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Join a community of thriving musicians who trust The Black Turn to amplify their reach and revenue.
          </p>
        </div>

        {/* Decorative Quotes */}
        <div className="relative">
          <div className="absolute top-8 left-8 md:top-8 md:left-56 lg:left-[10rem] z-10 hidden md:block">
            <img src={leftqoute} alt="left quote" className="w-12 md:w-20" />
          </div>
          <div className="absolute bottom-10 right-8 md:bottom-8 md:right-60 lg:right-[10rem] z-10 hidden md:block">
            <img src={rightquote} alt="right quote" className="w-12 md:w-20" />
          </div>

          {/* Testimonial Slider */}
          <Slider {...sliderSettings}>
            {testimonials.map((testimonial, index) => {
              const isExpanded = expandedIndex === index;

              return (
                <div key={testimonial.id}>
                  <div className="px-2 sm:px-4">
                    <div className="max-w-6xl mx-auto">
                      <div className="relative px-4 sm:px-6 py-6 sm:py-8 h-full">
                        {/* Background Card */}
                        <div
                          className="absolute bg-[#EBF4F5] rounded-2xl transform -rotate-5"
                          style={{
                            top: "1rem",
                            left: "1rem",
                            right: "1rem",
                            bottom: "1rem",
                            zIndex: 1,
                          }}
                        ></div>

                        {/* Main Card */}
                        <div className="relative bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl border-2 border-gray-300 z-10 h-full min-h-[300px] md:min-h-[350px] flex flex-col justify-between">
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 items-center h-full">
                            {/* Avatar */}
                            <div className="md:col-span-2 flex justify-center h-full">
                              <PawAvatar img={testimonial.img} />
                            </div>

                            {/* Testimonial Content */}
                            <div className="md:col-span-3 flex flex-col justify-between space-y-4 sm:space-y-6 h-full">
                              <div className="flex items-center justify-between flex-wrap gap-4">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                                  {testimonial.title}
                                </h3>

                                <div className="flex items-center gap-1">
                                  {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="w-5 h-5 fill-orange-400 text-orange-400"
                                    />
                                  ))}
                                  <div className="ml-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center p-1">
                                    <Check className="text-white w-4 h-4" />
                                  </div>
                                </div>
                              </div>

                              <div className="flex-1">
                                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-2">
                                  "
                                  {isExpanded
                                    ? testimonial.content
                                    : `${testimonial.content.slice(0, 180)}...`}
                                  "
                                </p>
                                {testimonial.content.length > 180 && (
                                  <button
                                    onClick={() =>
                                      setExpandedIndex(isExpanded ? null : index)
                                    }
                                    className="text-teal-600 hover:underline text-sm font-medium"
                                  >
                                    {isExpanded ? "Show Less" : "Read More"}
                                  </button>
                                )}
                              </div>

                              <p className="text-gray-500 font-medium text-sm sm:text-base mt-2">
                                {testimonial.date}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>

          {/* Custom Slick Styles */}
          <style jsx global>{`
      .slick-slider {
        overflow: visible !important;
      }
      .slick-list {
        overflow: visible !important;
        padding: 2rem 0 !important;
      }
      .slick-track {
        overflow: visible !important;
      }
      .slick-slide {
        overflow: visible !important;
      }
      .slick-slide > div {
        overflow: visible !important;
      }
    `}</style>
        </div>
      </div>

           <div className="flex items-center justify-between max-w-5xl mx-auto px-8 py-16 bg-white">
      {/* Left side - Text and buttons */}
      <div className="flex-1 max-w-md">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Download the app
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Music Distribution India - The Black Turn
        </p>
        
        {/* App Store Buttons */}
        <div className="flex gap-4">
          <button className="flex items-center gap-3 bg-[#005F73] text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
            <div className="w-6 h-6">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
            </div>
            <span className="font-medium">Google Play</span>
          </button>
          
          <button className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="w-6 h-6">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.17 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
              </svg>
            </div>
            <span className="font-medium">App Store</span>
          </button>
        </div>
      </div>

      {/* Right side - Phone mockup with circular background */}
      <div className="flex-1 flex justify-center relative">
  {/* Circular gradient background - vertically and horizontally centered */}
  <div className="absolute top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#005F73] opacity-90"></div>

  {/* Phone mockup */}
  <div className="relative z-10 w-72 h-[580px] rounded-[3rem] p-2">
    <img src={phone} alt="" />
  </div>
</div>

    </div>

    </>

  );
}

export default Home;