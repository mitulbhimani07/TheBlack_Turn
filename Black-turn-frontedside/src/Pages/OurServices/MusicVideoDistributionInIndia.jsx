import React from 'react';
import banner from '../../assets/images/musicbanner.jpg';

function MusicVideoDistributionInIndia() {
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
            Contact Us
          </h1>
          <p className="text-white text-base md:text-lg">
            We’d love to hear from you. Reach us any way that’s convenient for you!
          </p>
        </div>
      </div>
    </>
  );
}

export default MusicVideoDistributionInIndia;
