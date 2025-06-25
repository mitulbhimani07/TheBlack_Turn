import React from 'react';
import banner from "../assets/images/Frame.png";
import { motion } from "framer-motion";
import { Home, Mail, Globe } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Home className="text-[#005f73] w-10 h-10 transition-transform duration-300 group-hover:scale-110" />,
      title: "AHMEDABAD OFFICE",
      description: "BLOCK-A-602TITANIUM BUSINESS PARK, MAKARBA RAILWAY CROSSING, B/H.DIVYA BHASKAR PRESS, AHMEDABAD-380007.",
    },
    {
      icon: <Home className="text-[#005f73] w-10 h-10 transition-transform duration-300 group-hover:scale-110" />,
      title: "DELHI OFFICE",
      description: "Registered address 704, 7th floor, palm Court, Mehrauli-Gurgaon Road, Sector 16, Gurugram,Haryana, 122007",
    },
    {
      icon: <Mail className="text-[#005f73] w-10 h-10 transition-transform duration-300 group-hover:scale-110" />,
      title: "EMAIL & PHONE",
      description: (
        <div>
          <div>support@theblackturn.in</div>
          <div>+91 9274466809</div>
        </div>
      ),
    },
    {
      icon: <Globe className="text-[#005f73] w-10 h-10 transition-transform duration-300 group-hover:scale-110" />,
      title: "FIND US ONLINE",
      description: "www.theblackturn.in",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      {/* Banner Section */}
      <div className="relative bg-cover bg-center h-[359px] flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${banner})` }}>
        <div className="absolute inset-0 bg-opacity-80"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-white text-base md:text-lg">
            We’d love to hear from you. Reach us any way that’s convenient for you!
          </p>
        </div>
      </div>

      {/* Get In Touch Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Ready to start your project? Drop us a message and we'll get back to you soon.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-base lowercase">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Our Location</h3>
            <p className="text-gray-600">Registered address 704, 7th floor, palm Court, Mehrauli-Gurgaon Road, Sector 16, Gurugram,Haryana, 122007</p>
          </div>
          <motion.div
            className="w-full md:w-[95%] mx-auto rounded-2xl overflow-hidden shadow-lg border-4 border-[#005f73]/20 hover:ring-4 hover:ring-[#005f73]/30 transition duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.235524095017!2d77.05225237549499!3d28.4724528757525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19aa57e3a1b3%3A0xf46d2e913c02a99d!2sTeam%20Co.work%20Spaces%20Gurgaon!5e0!3m2!1sen!2sin!4v1750833334024!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
