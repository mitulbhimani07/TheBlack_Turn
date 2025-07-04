import React, { useState } from 'react';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';
import { Mail, Clock, ChevronDown, ChevronUp } from 'lucide-react';

function HelpAndSupport() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [openUploadFaqIndex, setOpenUploadFaqIndex] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => prev - 1);
  };

  const faqs = [
    {
      question: "What is song live time?",
      answer: "We deliver on all platforms minimum (1-3 Days) Maximum(5-8 Days). Get your song live in 3 hours, mail or contact us."
    },
    {
      question: "Old Song(Already Released Song) Caller Tune",
      answer: "Yes We distribute caller tunes for already released songs."
    },
    {
      question: "Why NOC?",
      answer: "A No Objection Certificate (NOC) is a crucial legal agreement that establishes your ownership of the song and verifies its originality. By providing us with an NOC, you grant us the explicit permission to distribute your music across various platforms on your behalf."
    },
    {
      question: "Documents required for NOC?",
      answer: "Adhar Card Pan Card, Cancelled Cheque or Passbook Front Page, Signature"
    }
  ];

  const uploadFaqs = [
    "Cover Art / Song Artwork / Song Poster",
    "Song Audio",
    "CallerTune Name & Timing",
    "Release Date",
    "Song Metadata(Song Name, Album Name, Singer_Lyricist)"
  ];

  const handleUploadFaqToggle = (index) => {
    setOpenUploadFaqIndex(openUploadFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-50">
          <Navbar
            toggleSidebar={toggleSidebar}
            sidebarOpen={isSidebarOpen}
            notifications={notifications}
            unreadCount={unreadCount}
            markAsRead={markAsRead}
          />
        </div>

        <div className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-sm text-gray-600 mb-6">
            <span className="font-medium">Help & Support</span>
          </div>

          {/* Contact Info and Feedback Form */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            {/* Contact Info Cards */}
            <div className="flex-1 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#005f73]">
                <div className="flex items-center mb-3">
                  <Mail className="text-[#005f73] mr-3" size={20} />
                  <h3 className="font-medium text-[16px]">Email Us</h3>
                </div>
                <p className="text-gray-700 text-sm">contact@theblackturn.com</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#005f73]">
                <div className="flex items-center mb-3">
                  <Clock className="text-[#005f73] mr-3" size={20} />
                  <h3 className="font-medium text-[16px]">Open Hours</h3>
                </div>
                <p className="text-gray-700 text-sm">Monday - Friday 9:00AM - 05:00PM</p>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="flex-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#005f73] h-full">
                <h3 className="font-medium text-[16px] mb-4 text-[#005f73]">
                  Submit Feedback or Report Desired Improvements
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#005f73]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#005f73]"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Basic FAQs */}
          <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#005f73]">
            <h3 className="font-medium text-xl mb-4 text-[#005f73]">Basic Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-medium text-[#005f73] mb-2">
                    {index + 1}. {faq.question}
                  </h4>
                  <p className="text-gray-700 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Accordion Section */}
          <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#005f73]">
            <h3 className="font-medium text-xl mb-4 text-[#005f73]">FAQs for Uploading Your Release</h3>
            <div className="space-y-2">
              {uploadFaqs.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-md">
                  <button
                    onClick={() => handleUploadFaqToggle(index)}
                    className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
                  >
                    <span className="text-sm font-medium text-gray-800">#{index + 1} {item}</span>
                    {openUploadFaqIndex === index ? (
                      <ChevronUp className="text-[#005f73]" size={18} />
                    ) : (
                      <ChevronDown className="text-[#005f73]" size={18} />
                    )}
                  </button>
                  {openUploadFaqIndex === index && (
                    <div className="px-4 pb-4 text-sm text-gray-600">
                      Additional details or requirements about "{item}" can be shared here. Please ensure it's accurate and complete.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpAndSupport;
