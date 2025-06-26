import React from 'react'
import banner from '../assets/images/about.png';
import videoImage from "../assets/images/aboutsec.png"
import facebook from '../assets/images/Facebook.png'
import instagram from '../assets/images/instagram.png'
import youtube from '../assets/images/youtube.png'
import twitter from '../assets/images/twitter.png'
import Header from '../Header_Footer/Header';
import Footer from '../Header_Footer/Footer';

function Aboutus() {
    const platforms = [
    {
      name: 'Facebook',
      icon: '📘',
      textColor: 'text-blue-600',
      link:'https://www.facebook.com/TheBlackTurnindia'
    },
    {
      name: 'Instagram',
      icon: '📷',
      textColor: 'text-pink-600',
      link:'https://www.instagram.com/theblackturn/'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      textColor: 'text-black',
      link:'https://twitter.com/theblackturnIND'
    },
    {
      name: 'YouTube',
      icon: '📺',
      textColor: 'text-red-600',
      link:'https://in.pinterest.com/theblackturn/'
    }
  ];
  return (
    <>
        {/* Banner Section */}
          <Header/>
        <div
                className="relative bg-cover bg-center h-[359px] flex items-center justify-center text-center"
                style={{ backgroundImage: `url(${banner})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0  bg-opacity-60"></div>
        
                {/* Text Content */}
                <div className="relative z-10 px-4">
                  <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
                    About Us
                  </h1>
            <p className="text-white text-base md:text-xl">
       India’s No.1 Music Distribution Company
        </p>
                </div>
              </div>


              {/* aboutus section */}

              <section className="bg-[#EBF4F5] py-16 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      {/* Left Image */}
                      <div className="flex justify-center">
                        <img
                          src={videoImage}
                          alt="Music Video Distribution"
                          className="h-[450px] w-[550px] rounded-xl shadow-lg"
                        />
                      </div>
              
                      {/* Right Content */}
                      <div>
                        <h3 className="text-4xl font-bold text-slate-900 mb-5">About Us</h3>
                        <h2 className="text-xl md:text-xl  text-gray-900 leading-snug mb-6">
                          <span className='font-medium'>The Black Turn</span> is built for independent musicians who want full control over their music. We help you distribute your songs to over 150 platforms like Spotify, Apple Music, JioSaavn, and more quickly and easily.
                        </h2>

                        <p className='text-xl mb-6'>Upload unlimited tracks, keep <span className='font-medium'>95% of your revenue</span>, and see your music go live within <span className='font-medium'>72 hours</span>. No middlemen. No hidden fees. Just a smooth and reliable way to reach a global audience.
</p>

<p className='text-xl mb-6'>Whether you're just starting out or already making waves, we’re here to support your journey.</p>
              
                      <h4 className='text-2xl font-bold'>The Black Turn – where your music meets the world.</h4>
                      </div>
                    </div>
                  </section>

                  {/* our social media platform */}

              <div className="bg-white p-15">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-4xl font-bold text-[#004D5F] text-center mb-12">
      Our Social Media Platforms
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {platforms.map((platform, index) => (
        <a
          key={platform.name}
          href={platform.link}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          <div className="bg-[#EBF4F5] rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group h-full">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
                {platform.icon === '📘' && (
                  <img src={facebook} alt="Facebook" />
                )}
                {platform.icon === '📷' && (
                  <img src={instagram} alt="Instagram" />
                )}
                {platform.icon === '🐦' && (
                  <img src={twitter} alt="Twitter" className="w-18" />
                )}
                {platform.icon === '📺' && (
                  <img src={youtube} alt="YouTube" />
                )}
              </div>

              <h3 className={`text-2xl font-bold ${platform.textColor} mb-4`}>
                {platform.name}
              </h3>
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
</div>

<Footer/>
    </>
  )
}

export default Aboutus