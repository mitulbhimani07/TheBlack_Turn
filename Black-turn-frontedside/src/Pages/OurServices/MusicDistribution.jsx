import React, { useState } from 'react';
import { Play, Menu, X, Music, Users, Globe, TrendingUp, DollarSign, CalendarDays, UserCog, RefreshCw, Award, ArrowRight } from 'lucide-react';
import { Phone, Shield, CheckCircle, Star, Clock } from 'lucide-react';
import musicdistribution from '../../assets/images/music-distribution.png'; // Adjust the path as necessary

import { motion } from 'framer-motion';
import { IoCheckmarkCircle, IoCloseCircle, IoMusicalNotesSharp, IoWalletSharp } from 'react-icons/io5';
import { MdWifiCalling } from "react-icons/md";
import { SiYoutubestudio } from "react-icons/si";
import { PiHashFill } from "react-icons/pi";
import { GiPayMoney, GiTrophy } from "react-icons/gi";
import { RiMoneyDollarCircleFill, RiCustomerService2Fill } from "react-icons/ri";
import { GrDocumentPerformance } from "react-icons/gr";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { BiSolidTimer } from "react-icons/bi";
import { MdOutlineStart } from "react-icons/md";
import { Database, Youtube, BarChart3 } from 'lucide-react';
import royalite from '../../assets/images/royalti.png'; // Adjust the path as necessary
import logoApp from '../../assets/images/logo.png'
const MusicDistribution = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const imagePlatforms = [
    { name: 'Gaana', icon: 'https://play-lh.googleusercontent.com/IqNQxWzyvknT0kradpcPPvZhC8sAfjng6-IO_TGCtIsn7JvD6hGnNUoH1OaIxb0x_48' }, // Placeholder for actual icon
    { name: 'JioSaavn', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRExgtuG9rtrMVEQNcX70GvaXEk9SixnxIvnQ&s' },
    { name: 'Wynk Music', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNf-zvwCMyxMdzKmDX7j8KWVbfSf4y-tWtuA&s' },
    { name: 'Hungama', icon: 'https://play-lh.googleusercontent.com/RFz03osd5kgWv7lDKiuIIuMHDFhZ6GkEzz5DiuckJH15t-NvphBoYo70WgnHXKPbrlM' },
    { name: 'TikTok', icon: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84bbc47506465f6295da49c812' },
    { name: 'YouTube Music', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSECPDlHPpKnx9hyK38AiGDqrB01lhenL__Fg&s' },
    { name: 'iTunes', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRR6gBlhkyFJJZcGTY4xS_aM-MHvl9WQ2hbg&s' },
    { name: 'Spotify', icon: 'https://m.media-amazon.com/images/I/51rttY7a+9L._h1_.png' },
    { name: 'Amazon Music', icon: 'https://www.emubands.com/es/wp-content/uploads/sites/2/2018/02/Amazon-Music-Logo.jpg' },
    { name: 'Google Play', icon: 'https://downloadr2.apkmirror.com/wp-content/uploads/2019/08/5d5b289388c6d.png' },
    { name: 'YouTube', icon: 'https://yt3.googleusercontent.com/Bg5wS82KGryRmcsn1YbPThtbXoTmj2XJ9_7LmuE2RF6wbKJBkovfRypbSz6UD3gEu_nHiwGZtQ=s900-c-k-c0x00ffffff-no-rj' },
    { name: 'Groove', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtqYo_l8wjBrhEcP7Cv82NZaxTujo8JmdxA&s' },
    { name: 'Rdio', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ORUM4FitU-lMX-01_Tk1f_KLD12URht2fz0x8HpTYsBMTAYzZupb5KNDMyylg8K0_gc&usqp=CAU' },
    { name: 'N MUSIC', icon: 'https://image.pitchbook.com/iqSTLQPeQ1f2zxiiOlqoMmuTWLt1607613317287_200x200' },
    { name: 'Tracks', icon: 'https://seoserviceinindia.co.in/assets/img/podcast/8tracks.webp' },
    { name: 'Facebook', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
    { name: 'Zvooq', icon: 'https://syntaxcreative.com/wp-content/uploads/ZVOOQ_Logo.jpg' },
    { name: 'Play.me', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/cf/41/6b/cf416bc9-ae9c-c1e6-1ea5-a4916f78d158/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png' },
    { name: 'Claro-musica', icon: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/062015/1_57.png?itok=ZblXbDTS' },
    { name: 'Target Music', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXSAHaDWNnGqXJ6dIrNBj_nFl9flgxZiiyT_aLuxosqPZFhVwS' },
    { name: 'Neurolic Media', icon: 'https://yt3.googleusercontent.com/ytc/AIdro_nuXyw5BgRdjkAG5kQ_ba2SjDfPM7X_t4cqcK6wSj9PVg=s900-c-k-c0x00ffffff-no-rj' },
    { name: 'Spinlet', icon: 'https://www.musicinafrica.net/sites/default/files/styles/profile_images_large/public/images/music_professional_profile/201408/spinlet-inspire.png?itok=GM3CdeuG' },
    { name: 'KKbox', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUdhWHl5xGZHm3WdMBGQXeqXqY5imHhor6eg&s' },
    { name: 'Anghami', icon: 'https://i.tracxn.com/logo/company/9dc9c92cbf357c4df62ad3b794aabbf' },
    { name: 'Akazoo', icon: 'https://www.dablessingproduction.com/wp-content/uploads/2019/06/AKAZOO.png' },
    { name: 'Guvera', icon: 'https://guveranews.com/wp-content/uploads/2024/11/cropped-GN-FAVICON.png' },
    { name: 'Medianet', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6yR6Z23TgunFhlxMeqvv5XPtP0D3rHx_BTw&s' },
    { name: 'Slacker Radio', icon: 'https://spng.pngfind.com/pngs/s/31-318461_slacker-radio-logo-hd-png-download.png' },
    { name: 'Music', icon: 'https://seeklogo.com/images/J/jb-hi-fi-now-music-logo-2AAA239095-seeklogo.com.png' },
    { name: 'Digital', icon: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/7-digital_m?wid=120&hei=120' },
    { name: 'JUKE', icon: 'https://www.billboard.com/wp-content/uploads/stylus/1205259-Juke.png' },
    { name: 'Gracenote', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5KFHA27IaI2hdwuJRgqgUkba7F5lVq5APpwWamLy7j5z-S0AUWeQscJpHmtVLzSKmjp0&usqp=CAU' },
    { name: 'Shazam', icon: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSnw98ms3eYXejorVRumsVmC8mhMUymdMDRZl_-AnfZwCSZUL6H' },
    { name: 'TIDAL', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5G_ljvlMZGr5T8_cOjFBCc-q68v1yH70rww&s' },
    { name: 'Emusic', icon: 'https://yt3.googleusercontent.com/ytc/AIdro_mYL1upN_393_PL6sT1OgwG7LT6A_Zk3HLg6uTRLQfCfw=s900-c-k-c0x00ffffff-no-rj' },
    { name: 'MixRadio', icon: 'https://img.utdstc.com/icon/35c/61e/35c61e33016a379187be65548b26307433a459b7df59f508fa819c9a3fc993d8:200' },
    { name: 'iHeartRADIO', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu-B7YQqCprB9J8zjP-RzCTFbG_cSwqXfmBQ&s' },
    { name: 'Rhapsody', icon: 'https://images.dwncdn.net/images/t_app-icon-l/p/77100690-0c1b-43e9-9beb-7db17e33db35/772414340/2141_4-10072153-Foreman_14490898_5494_256x256.png' },
    { name: 'Simfy Africa', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF682vjvZ5xAzS76tF1L1fkMpv0xYiHCBRiA&s' },
    { name: 'DEEZER', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM7oa_FCMCpm53A-OBQotS4sYaIcEyi_13WAl2RJenIqeNuEh1NhYj8VJlcglBHg_Ruwg&usqp=CAU' },
    { name: 'Cür', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa2fICjof4UVcXYU-zQWsFoLfO_Z7ozi5mdQ&s' },
  ];
  const features = [
    {
      number: '01',
      icon: <IoMusicalNotesSharp size={48} strokeWidth={1} />,
      title: 'MUSIC',
      description: 'MUSIC DISTRIBUTION INDIA RELEASE SONG ON 150+ (NATIONAL+INTERNATIONAL) PLATFORMS WITH MINIMUM CHARGES.',
    },
    {
      number: '02',
      icon: <MdWifiCalling size={48} strokeWidth={1} />, // Closest match for "No Fee"
      title: 'CALLERTUNESs',
      description: 'WE PROVIDE MAXIMUM CALLERTUNES IT DEPENDS ON YOUR SONG LENGTH',
    },
    {
      number: '03',
      icon: <SiYoutubestudio size={48} strokeWidth={1} />, // Calendar with play button conceptualized
      title: 'YOUTUBE CONTENT ID',
      description: 'WE ALSO PROVIDE YOUTUBE CONTENT ID FOR RIGHTS & COPYRIGHT ON YOUR OWN SONG',
    },
    {
      number: '04',
      icon: <GiPayMoney size={48} strokeWidth={1} />, // Person with gear conceptualized
      title: 'ONE TIME PAYMENT',
      description: 'IN YOUR SONG DISTRIBUTION YOU HAVE PAY ONLY ONE TIME. IT S VALID FOR LIFETIME',
    },
    {
      number: '05',
      icon: <PiHashFill size={48} strokeWidth={1} />, // Music notes and switch conceptualized
      title: 'CREATE YOUR OWN CMS',
      description: 'KEEP YOUR ALL SONG DATA IN ONE LOGIN ID',
    },
    {
      number: '06',
      icon: <RiMoneyDollarCircleFill size={48} strokeWidth={1} />, // Person with ribbon conceptualized
      title: 'NO HIDDEN COSTS',
      description: 'FREE UPC AND ISRC CODES FOR EVERY RELEASE',
    },
    {
      number: '07',
      icon: <GiTrophy size={48} strokeWidth={1} />, // Person with ribbon conceptualized
      title: '100% RIGHTS',
      description: 'KEEP YOUR ALL RIGHTS ON YOUR SONG AND REVENUE',
    },
    {
      number: '08',
      icon: <IoWalletSharp size={48} strokeWidth={1} />, // Person with ribbon conceptualized
      title: 'GET PAID',
      description: 'REQUEST PAYMENTS DIRECT TO YOUR BANK ACCOUNT',
    },
    {
      number: '09',
      icon: <GrDocumentPerformance size={48} strokeWidth={1} />, // Person with ribbon conceptualized
      title: 'REPORTING',
      description: 'LEARN MORE ABOUT YOUR FAN AND MONTHLY ANALYTIC REPORTS',
    },
    {
      number: '10',
      icon: <TfiShoppingCartFull size={48} strokeWidth={1} />, // Person with ribbon conceptualized
      title: 'BULK UPLOAD',
      description: 'WE GIVE 20% DISCOUNT ON BULK SONG, BUT WHEN IN A MONTH YOU GIVE US MINIMUM 10 SONGS.',
    },
    {
      number: '11',
      icon: <BiSolidTimer size={48} strokeWidth={1} />, // Person with ribbon conceptualized
      title: 'WR RE QUICK',
      description: 'GET YOUR MUSIC LIVE FASTER THEN ANYWHERE AND START EARN FAST',
    },
    {
      number: '12',
      icon: <RiCustomerService2Fill size={48} strokeWidth={1} />, // Person with ribbon conceptualized
      title: '24*7 HELP & SUPPORTS',
      description: 'WE ALWAYS AVAILABEL HERE FOR HELP & SUPPORT.',
    },
  ];
  const feature = [
    {
      icon: <Database className="w-8 h-8 text-[#005f73]" />,
      title: "IRSC and UPC",
      description: "We provide you ISRC for every song, every song UPC. Use our provided ISRC&UPC anywhere."
    },
    {
      icon: <Youtube className="w-8 h-8 text-[#005f73]" />,
      title: "YouTube Content ID",
      description: "Make money from your music on YouTube, Monetize Your Audio & Video With Content ID"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-[#005f73]" />,
      title: "Analytics and Statistics",
      description: "Get The Real Statistics And Report, Get Paid When the Song Play Anywhere Anytime."
    }
  ];
  const whatWeDoItems
    = [
      {
        title: 'Fastest Approval Time',
        description: 'We approve your song very fast with no time. We deliver on all platforms minimum (3-5 Days) Maximum(8-10 Days)',
        icon: 'https://theblackturn.com/wp-content/uploads/2021/03/on-deman-asset-loading1.svg',
      },
      {
        title: 'Custom CRBT (Call Ring Back Tune)',
        description: 'Creates 1-4 custom caller tone for Airtel, VI, Bsnl, & 4s sec single JioTune. Deliver caller tune Min. (3-5 days) max. (5-8 days)',
        icon: 'https://theblackturn.com/wp-content/uploads/2021/03/line-icon2.svg',
      },
      {
        title: 'Free ISRC and UPC code',
        description: 'If you are a new artist no worry we provide a fresh unlimited artist UPC or ISRC code for your every Audio & Video Album.',
        icon: 'https://theblackturn.com/wp-content/uploads/2021/03/site-sync-vector.svg',
      },
      {
        title: '95% Royalty',
        description: 'Get Your Monthly Reports with no changes we send you original reports with cut our percentage we don’t hide anything.',
        icon: 'https://theblackturn.com/wp-content/uploads/2021/03/floating-effect.svg',
      },
      {
        title: 'Custom Record Label',
        description: 'Get Your Custom C and P Line, Custom Label Name, Unlimited Lifetime Releases, with Unlimited artist.',
        icon: 'https://theblackturn.com/wp-content/uploads/2021/03/live-copy.svg',
      },
      {
        title: 'One Time Payment',
        description: 'Pay Once Your song lives for Life Time. Accepted Payment through NEFT PayTM, GPay, PayPal, UPI, PhonePe, etc.',
        icon: 'https://theblackturn.com/wp-content/uploads/2021/03/section-nesting.svg',
      },
    ];
  const steps = [
    {
      title: 'Create',
      description: 'You make your music how you like it! Your music, your fashion, your stream, your way! Anything it is, we need to listen to it!',
      icon: '🧩',
      link: '#',
    },
    {
      title: 'Distribute',
      description: 'So numerous Computerized Benefit Suppliers to select from. Transfer your music utilizing our computerized dispersion benefit, and select as numerous suppliers as suits you!',
      icon: '📤',
      link: '#',
    },
    {
      title: 'Earn',
      description: 'Simply include your installment strategy and get paid for making music you cherish and sharing it all-inclusive! Eminences are a go!',
      icon: '💰',
      link: '#',
    },
  ];
  return (
    <div className="min-h-screen bg-[#ebf4f5] text-white">
      <div className=" flex flex-col px-20 lg:flex-row min-h-screen ">
        {/* Left Section */}
        <div className="flex-1 px-6 lg:px-12 py-8 lg:py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-black">MUSIC DISTRIBUTION</span><br />
              <span className="text-[#00758f]"> INDIA</span><br />
            </h1>

            <p className="text-gray-700 mb-6 text-base md:text-[16px] max-w-[650px]">
              Domestic Full Track Services: Amazon, Gaana, Jio Saavn, Wynk. International Full Track Services: Alibaba, Apple(Itune), Audible Magic, Awa, Boomplay, Deezer, Facebook, Iheart, Imusic Corp, Jaxsta, Kkbox, Kuack Media, Napster, Netease, Pandora, Resso, Snap, Soundcloud, Spotify, Touch Tunes, youtube music. We provide caller tune facility on india’s all cellular networks. Share your music and grow your fan base and view trends, keep 100% safe music royalties and view trends. Distribute, license & monetize at all in one place!
            </p>

            <button className="flex items-center space-x-3 bg-teal-500 hover:bg-teal-600 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105">
              <Music size={20} />
              <span>Check PlatFroms</span>
            </button>
          </div>
        </div>
        {/* Half Circle Stroke Elements - Responsive positioning */}
        <div className="relative">
          {/* Top-left half circle - only right half visible */}
          <div className="absolute top-0 -left-220 w-32 h-32 sm:w-40 sm:h-40 lg:w-55 lg:h-55 -translate-x-1/2">
            <div className="w-full h-full border-20 sm:border-46 lg:border-32 border-[#b8d4db] rounded-full opacity-30"></div>
          </div>

          {/* Bottom-right half circle - only left half visible */}
          <div className="absolute -bottom-5 -right-130 w-32 h-32 sm:w-40 sm:h-40 lg:w-55 lg:h-55 translate-x-1/2">
            <div className="w-full h-full border-20 sm:border-46 lg:border-32 border-[#b8d4db] rounded-full opacity-30"></div>
          </div>
        </div>
        {/* Stats Section */}

        {/* Right Section - Mobile Responsive */}
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-10 pb-20 order-1 lg:order-2">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-120 xl:h-120 flex justify-center items-center">

            {/* Main content box (front) */}
            <img
              src={musicdistribution}
              alt="Music Distribution Banner"
              className="hover-target z-20 w-full h-full object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
      {/* Pay Minimum to Get Maximum */}
      {/* Pay Minimum to Get Maximum */}
      <section className="py-16 bg-white text-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">Pay Minimum to Get Maximum</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            Check Out our Awesome Stores where your music can reach millions of listeners worldwide.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5">
            {imagePlatforms.map((platform, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <img src={platform.icon} alt={platform.name} className="w-16 h-16 mb-2 rounded-full" />
                <span className="text-md font-semibold text-gray-800">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Caller Tune Distribution for India's All Cellular Networks
          </h2>



          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 items-center justify-center group">
            {[
              {
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGxXe0XvtCWFKaLz8i1zTm3fal0bRupHdC6g&s",
                alt: "Jio",
              },
              {
                src: "https://findzambiajobs.com/wp-content/uploads/2021/03/Airtel-Zambia-150x150-1-150x150.png",
                alt: "Airtel",
              },
              {
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyU3IkQVfj8_FiAbRlB_D1bKLjy1lBuw-6Zw&s",
                alt: "VI",
              },
              {
                src: "https://cdn.bitrefill.com/content/cn/b_rgb%3AFFFFFF%2Cc_pad%2Ch_800%2Cw_800/v1556284441/bsnl-india.webp",
                alt: "BSNL",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-b-3xl opacity-100 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-16 h-16 mb-2 rounded-full object-contain"
                />
              </div>
            ))}
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
      {/* Music Distribution Features */}
      <section className="py-26 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-16">Music Distribution Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative bg-zinc-900 border border-zinc-800  p-8 pb-12 flex flex-col items-start text-left 
             transition-all duration-300 group hover:border-teal-400 hover:shadow-[0_0_20px_#14b8a6]"
              >
                {/* Background Number */}
                <div className="absolute top-4 right-4 text-zinc-100 hover:text-teal-400  text-5xl font-extrabold opacity-10 pointer-events-none">
                  {feature.number}
                </div>

                {/* Icon */}
                <div className="text-teal-400 mb-5 text-5xl transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>

                {/* Description */}
                <p className="text-zinc-400 text-base leading-relaxed">{feature.description}</p>
              </div>

            ))}
          </div>
        </div>
      </section>
      <section className="py-26 bg-black relative">
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-10 overflow-hidden flex items-center">
          <div className="absolute inset-0" style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Geometric shapes */}
        <div className="absolute inset-0">
          {/* Large diamond shape */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-32">
            <div className="w-76 h-76 bg-[#005d71] transform rotate-45 opacity-80"></div>
          </div>

          {/* Secondary diamond */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-48 translate-y-24">
            <div className="w-44 h-44 bg-[#005d71] transform rotate-45 opacity-60"></div>
          </div>


          {/* Arrow element */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-8">
            <svg width="300" height="40" viewBox="0 0 200 40" className="text-[#fff]">
              <path d="M0 20 L160 20 M140 10 L160 20 L140 30"
                stroke="currentColor"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-7xl font-light text-white leading-tight">
                SELL YOUR MUSIC WORLDWIDE
                <br />
              </h1>
              <p className="text-white">Get your music online and make it go worldwide! Our advanced music dissemination is the ideal arrangement for growing your group of onlookers and salary. Through our organizations with more than 150 best gushing stages, you’ll be able to discharge your music to reach your fans wherever they are.</p>
              <br />

              <div className="flex items-center space-x-4">
                <div className="w-12 h-0.5 bg-white"></div>
                <p className="text-gray-400 text-lg">Let's start the conversation</p>
              </div>
            </div>

            {/* Right content */}
            <div className="flex flex-col items-end space-y-8">
              {/* Circular text element */}
              <div className="relative">
                <div className="w-48 h-48 border border-gray-600 rounded-full flex items-center justify-center relative">
                  {/* Circular text path */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                    <defs>
                      <path id="circle" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                    </defs>
                    <text className="text-xs fill-gray-500 uppercase tracking-widest">
                      <textPath href="#circle">
                        Smart Digital Video and Media Solutions • Creative Content •
                      </textPath>
                    </text>
                  </svg>

                  {/* Center logo */}
                  <div className="text-center  ">
                    <img src={logoApp} className='rounded-full w-50 h-50' alt="" />
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a href='https://api.whatsapp.com/send/?phone=919729786689&text=Hi,%20The%20Black%20Turn%20-%20Query%20For%20Music%20Distribution' target='_blank' rel="noopener noreferrer" className="group relative px-8 py-4 border-3 border-[#005D71] text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center space-x-2">
                <MdOutlineStart className="w-4 h-4" />
                <span className="text-sm font-medium tracking-wider uppercase">Start Today</span>
              </a>
            </div>
          </div>
        </div>
        {/* Corner decorative lines */}
        <div className="absolute top-8 right-8">
          <div className="w-16 h-0.5 bg-gray-600 mb-2"></div>
          <div className="w-8 h-0.5 bg-gray-600"></div>
        </div>
      </section>
      {/* Upload Music Section */}
      <section className="py-20 bg-[] text-[#005f73]">
        <div className="container mx-auto  max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* Left Content */}
            <div className="flex-1">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                You keep 100% of your royalties!
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                The Black Turn never takes a cut of your deals. Each penny you gain is put right into you’re the Black Turn account. At Black Turn, we know that your money matters and we respect your passion for music.Comprehensive Sales Data
              </p>

              <p className="text-gray-700 mb-8 text-lg">
                Discover out precisely where fans are downloading and spilling your music so you’ll be able to increment showcasing endeavors and arrange visits around those cities. We make sure that you reach the audience which you are targeting and deliver your music to them.
              </p>
            </div>
            {/* Right Image - Placeholder for music upload illustration */}
            <div className="flex-1">
              <div className="bg-gray-700 rounded-xl  aspect-square flex items-center justify-center">
                <img src={royalite} alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* IRSC and UPC */}
        {/* Features Section */}
        <div className="mt-20 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {feature.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg transition duration-300 transform hover:scale-[1.03] hover:shadow-2xl hover:border-[#005f73]"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-gray-50 rounded-lg">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#005f73] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#005f73] mx-16 rounded-3xl py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-black px-4">
          <h2 className="text-2xl font-medium text-white mb-2 tracking-wider uppercase">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
            {whatWeDoItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-20 h-20 mb-4 object-contain"
                />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-20 max-w-5xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Digital Music Distribution</h2>
          <p className="text-white leading-relaxed">
            <strong>Copyright Protection:</strong> Take control of your sound. Make beyond any doubt individuals do not take credit for or monetize your substance without your assent. Choose how you’d like reuploaded substance to be managed on numerous stages. We help to do so for you.
          </p>
          <p className="text-white mt-4 leading-relaxed">
            <strong>Record Label Tools:</strong> Our client entrance has a full suite of devices, permitting total administration of your specialists and resources. Take advantage of full analytics, income detailing, music dispersion, and rights administration.
          </p>
        </div>
      </section>
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#005f73] mb-2">
            HOW TO SELL YOUR MUSIC ONLINE
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Get your music online and make it go worldwide!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-md hover:bg-[#005f73] hover:shadow-lg transition duration-300 p-8 text-left"
              >
                <div className="text-4xl text-indigo-600 group-hover:text-white mb-4 transition-colors duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#005f73] group-hover:text-white transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-100 mb-4 transition-colors duration-300">
                  {step.description}
                </p>
                <a
                  href={step.link}
                  className="text-indigo-600 group-hover:text-white font-medium hover:underline transition-colors duration-300"
                >
                  Discover
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        {/* Hero Section */}
        <div className="relative overflow-hidden mx-10 rounded-2xl my-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#005f73] to-[#0a9396] rounded-full mb-8 shadow-2xl">
                <span className="text-3xl font-bold text-white">₹</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Pay After Work Done
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
                #1 First time in India pay after work is done. We want to increase our customer trust for us.
              </p>
              <p className="text-2xl md:text-3xl font-semibold text-[#005f73] mb-12">
                Your trust is our success.
              </p>
            </div>

            {/* Main Action Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
              <div className="group bg-gradient-to-br from-[#005f73] to-[#0a9396] p-8 rounded-2xl shadow-2xl hover:shadow-[#005f73]/20 transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <Phone className="w-12 h-12 mx-auto mb-6 text-white" />
                  <h3 className="text-3xl font-bold mb-4 text-white">Let's talk!</h3>
                  <p className="text-lg mb-8 text-gray-100 leading-relaxed">
                    For More Info Call Now. We Talk in Hindi, English, Punjabi, Haryanvi, Bhojpuri
                  </p>
                  <a href="tel:9274466809" className="bg-white text-[#005f73] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    CALL NOW
                  </a>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-gray-900 to-black border-2 border-[#005f73] p-8 rounded-2xl shadow-2xl hover:shadow-[#005f73]/20 transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-6 text-[#005f73]" />
                  <h3 className="text-3xl font-bold mb-4 text-white">Why Think ?</h3>
                  <p className="text-lg mb-8 text-gray-300 leading-relaxed">
                    Pay After Work Done.
                  </p>
                  <button className="bg-[#005f73] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#0a9396] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    GET PRICE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

       {/* FAQ Section */}
      <div className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Frequently Asked <span className="text-[#005f73]">Questions</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get answers to common questions about our pay-after-work service
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-[#005f73] transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-4 text-[#005f73] bg-[#005f73]/20 px-4 py-2 rounded-lg inline-block">
                WHAT ABOUT MY WORK RIGHTS?
              </h3>
              <p className="text-gray-300 leading-relaxed bg-[#005f73]/10 p-4 rounded-lg">
                Take control of your project. Make beyond any doubt you understand and accept how your work will be managed without your consent. Choose how you'd like your completed work to be managed on numerous platforms and maintained with full quality standards.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-[#005f73] transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-4 text-[#005f73] bg-[#005f73]/20 px-4 py-2 rounded-lg inline-block">
                HOW DOES OUR WORK PROCESS FUNCTION?
              </h3>
              <p className="text-gray-300 leading-relaxed bg-[#005f73]/10 p-4 rounded-lg">
                Get your project online and make it reach the right audience! Our comprehensive work management system covers the complete course of action for developing your project success and delivery. Through our network of over 150 quality assurance checkpoints, we ensure your work meets the highest standards before completion.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-[#005f73] transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-4 text-[#005f73] bg-[#005f73]/20 px-4 py-2 rounded-lg inline-block">
                WHAT IS THE BEST WAY TO START WORK?
              </h3>
              <p className="text-gray-300 leading-relaxed bg-[#005f73]/10 p-4 rounded-lg">
                We value every project and put in maximum effort to deliver the best results. Our work advancement team guarantees the most excellent outcomes. We work around the clock utilizing our network of experts, professionals, and specialists to deliver outstanding results. We value your unique requirements and ensure they reach completion successfully.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-[#005f73] transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-4 text-[#005f73] bg-[#005f73]/20 px-4 py-2 rounded-lg inline-block">
                HOW DO I START A WORK SERVICE?
              </h3>
              <p className="text-gray-300 leading-relaxed bg-[#005f73]/10 p-4 rounded-lg">
                We are not a mass service company. We invest our time into our clients! We support our customers to reach their potential. As a matter of fact, we take full responsibility for the work delivered with complete partnership with our clients throughout the entire process.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-[#005f73] transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-4 text-[#005f73] bg-[#005f73]/20 px-4 py-2 rounded-lg inline-block">
                HOW MUCH DO WE CHARGE FOR SERVICES?
              </h3>
              <p className="text-gray-300 leading-relaxed bg-[#005f73]/10 p-4 rounded-lg">
                We never take advance payment from our clients. Every service you receive is delivered first, and payment is made only after your complete satisfaction. We believe that your satisfaction matters, and we respect your investment in our services. Quality work first, payment after - that's our commitment.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-[#005f73] transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-4 text-[#005f73] bg-[#005f73]/20 px-4 py-2 rounded-lg inline-block">
                HOW DO I GET A SERVICE QUOTE?
              </h3>
              <p className="text-gray-300 leading-relaxed bg-[#005f73]/10 p-4 rounded-lg">
                With so many different service providers to select from, it can be challenging but definitely worth it. Contact us using our multiple communication channels, and get personalized quotes that suit your needs. We help you reach out to all types of solutions so that everyone can benefit from our unique services and competitive pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
        {/* Language Support Section */}
        <div className="py-20 bg-gradient-to-b  from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                We Speak <span className="text-[#005f73]">Your Language</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                Communication without barriers. Talk to us in your preferred language.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6 max-w-4xl mx-auto">
              {['Hindi', 'English', 'Punjabi', 'Haryanvi', 'Bhojpuri'].map((language, index) => (
                <div key={index} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[#005f73] transition-all duration-300 text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">{language}</h3>
                  <div className="w-12 h-1 bg-[#005f73] mx-auto rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* CTA Section */}
        <div className="py-20 bg-black">
          <div className="max-w-4xl mx-auto px-6 text-center ">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Experience the <span className="text-[#005f73]">Difference</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of satisfied customers who chose trust over traditional payment methods.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#005f73]/30 transition-all duration-300 flex items-center gap-3">
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              {/* Call Now Button */}
                <a href="tel:9274466809" className="group border-2 border-[#005f73] text-[#005f73] px-10 py-5 rounded-full font-semibold text-lg hover:bg-[#005f73] hover:text-white transition-all duration-300 flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
             

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MusicDistribution;