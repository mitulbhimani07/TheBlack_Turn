import React, { useState, useEffect } from 'react';
import { Search, Music, CheckCircle, Trash2 } from 'lucide-react';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';
import Footer from '../../Header_Footer/Footer';
import { GiSandsOfTime, GiSettingsKnobs } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";
import { MdOutlineWarning, MdVerifiedUser } from "react-icons/md";
import { PiWarningDiamondFill } from "react-icons/pi";

export default function Allreleases() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('releases');
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState(''); // <-- Added for button group
  const itemsPerPage = 9;

  const releases = [
    {
      id: 1,
      title: "Euphoria Nights",
      isrc: "USUM72500001",
      liveDate: "2025-01-15",
      qcStatus: "Approved",
      payment: "Completed",
      poster: "https://i.pinimg.com/736x/67/0a/a0/670aa0f33a730e74e4312417d3ce1af3.jpg"
    },
    {
      id: 2,
      title: "Midnight Mirage",
      isrc: "USRC12500235",
      liveDate: "2025-02-28",
      qcStatus: "Approved",
      payment: "Pending",
      poster: "https://www.bollywoodhelpline.com/upload/articles/gfzp3ygb0aabri79830541.jpg"
    },
    {
      id: 3,
      title: "Midnight Mirage",
      isrc: "USRC12500235",
      liveDate: "2025-02-28",
      qcStatus: "Approved",
      payment: "Pending",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrojoIhhA6KUX20nlt-8cd75z8HIUZoLtJmQ&s"
    },
    {
      id: 4,
      title: "Midnight Mirage",
      isrc: "USRC12500235",
      liveDate: "2025-02-28",
      qcStatus: "Approved",
      payment: "Pending",
      poster: "https://c.saavncdn.com/025/Bollywood-Item-Songs-Hindi-2025-20250320082159-500x500.jpg"
    },
    {
      id: 5,
      title: "Midnight Mirage",
      isrc: "USRC12500235",
      liveDate: "2025-02-28",
      qcStatus: "Approved",
      payment: "Pending",
      poster: "https://i.scdn.co/image/ab67616d0000b2731e49ac58003becd2447bd10f"
    },
    {
      id: 6,
      title: "Digital Love",
      isrc: "UKSWR2500123",
      liveDate: "2025-04-10",
      qcStatus: "In Review",
      payment: "Pending",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmKek2wjz1eGPIaRa_qjI5q2t9Z9018G-dDA&s"
    },
    {
      id: 7,
      title: "City of Echoes",
      isrc: "INH512030209",
      liveDate: "2025-06-01",
      qcStatus: "Cancelled",
      payment: "Failed",
      poster: "https://aniportalimages.s3.amazonaws.com/media/details/ANI-20231218162158.jpg"
    },
    {
      id: 8,
      title: "Midnight Mirage",
      isrc: "USRC12500235",
      liveDate: "2025-02-28",
      qcStatus: "Approved",
      payment: "Pending",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR9gHxWXNMUr3lMJr4W8rWpVh6vwyjriJ6bQ&s"
    },
    {
      id: 9,
      title: "Digital Love",
      isrc: "UKSWR2500123",
      liveDate: "2025-04-10",
      qcStatus: "On Hold",
      payment: "Pending",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStfpL4gzYt9Y1swvSHXINTwLhXY-0EbN7tyg&s"
    },
    {
      id: 10,
      title: "City of Echoes",
      isrc: "INH512030209",
      liveDate: "2025-06-01",
      qcStatus: "Takedown",
      payment: "Failed",
      poster: "https://cdn.gulte.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-18-at-12.24.05_589265fd.jpg"
    },
    {
      id: 11,
      title: "Starlight Remedy",
      isrc: "USUM72500078",
      liveDate: "2025-07-20",
      qcStatus: "NOCRequired",
      payment: "Completed",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLft9H6AWvhObZUNcUmFTYuSHxxgJ8nuslSBLP_yvB_CaJ5yqtPjPKZKwzwaiklUvPviA&usqp=CAU"
    },
    {
      id: 12,
      title: "Starlight Remedy",
      isrc: "USUM72500078",
      liveDate: "2025-07-20",
      qcStatus: "Matched",
      payment: "Completed",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVkHxpSEjCny6ZBJs8KpmGEFIyKthBOeWmz4FMXWJ6FRRIZ4xFlw4SXzBQK4dUV-mjEr8&usqp=CAU"
    }
  ];

  // Filter and paginate releases
  const filteredReleases = releases.filter(release =>
    release.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReleases.length / itemsPerPage);
  const paginatedReleases = filteredReleases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => prev - 1);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const statusCards = [
    {
      title: 'Total Releases',
      count: releases.length,
      color: 'cyan',
      icon: <Music className="w-6 h-6" />,
      bgColor: 'bg-cyan-500',
    },
    {
      title: 'Required Approval',
      count: releases.filter(r => r.qcStatus === 'In Review').length,
      color: 'yellow',
      icon: <GiSandsOfTime className="w-6 h-6" />,
      bgColor: 'bg-yellow-500',
    },
    {
      title: 'Processing',
      count: releases.filter(r => r.payment === 'Pending' && r.qcStatus !== 'Cancelled').length,
      color: 'blue',
      icon: <GiSettingsKnobs className="w-6 h-6" />,
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Completed',
      count: releases.filter(r => r.payment === 'Completed').length,
      color: 'green',
      icon: <CheckCircle className="w-6 h-6" />,
      bgColor: 'bg-green-500',
    },
    {
      title: 'Cancelled',
      count: releases.filter(r => r.qcStatus === 'Cancelled').length,
      color: 'red',
      icon: <FaWindowClose className="w-6 h-6" />,
      bgColor: 'bg-red-500',
    },
    {
      title: 'Takedown',
      count: releases.filter(r => r.qcStatus === 'Takedown').length, // Use if this status exists in data
      color: 'pink',
      icon: <Trash2 className="w-6 h-6" />,
      bgColor: 'bg-pink-500',
    },
    {
      title: 'Matched',
      count: releases.filter(r => r.qcStatus === 'Matched').length, // Use if this status exists
      color: 'purple',
      icon: <MdVerifiedUser className="w-6 h-6" />,
      bgColor: 'bg-purple-500',
    },
    {
      title: 'NOCRequired',
      count: releases.filter(r => r.qcStatus === 'NOCRequired').length, // if your API/data supports this
      color: 'orange',
      icon: <MdOutlineWarning className="w-6 h-6" />,
      bgColor: 'bg-orange-500',
    },
    {
      title: 'On Hold',
      count: releases.filter(r => r.qcStatus === 'On Hold').length, // update if applicable
      color: 'yellow',
      icon: <PiWarningDiamondFill className="w-6 h-6" />,
      bgColor: 'bg-yellow-600',
    },
  ];


  const StatusCard = ({ title, count, color, icon, bgColor }) => (
    <div className={`${bgColor} rounded-lg p-4 text-white min-w-[160px]`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium opacity-90">{title}</h3>
          <p className="text-2xl font-bold mt-1">{count}</p>
        </div>
        <div className="text-white opacity-80">
          {icon}
        </div>
      </div>
    </div>
  );

  const ReleaseCard = ({ release }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="w-full lg:w-32 h-32 flex-shrink-0 flex items-center justify-center relative bg-gray-100 rounded">
          <img
            src={release.poster}
            alt={release.poster}
            className="object-cover w-full h-full rounded"
          />
        </div>
        <div className="flex-1">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#005d71]">{release.title}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div><span className="font-medium">ISRC:</span> {release.isrc}</div>
              <div><span className="font-medium">Live Date:</span> {release.liveDate}</div>
              <div className="flex items-center">
                <span className="font-medium">QC:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs font-medium ${release.qcStatus === 'Cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                    }`}
                >
                  {release.qcStatus}
                </span>
              </div>
              <div><span className="font-medium">Payment:</span> <span className="text-orange-600">{release.payment}</span></div>
            </div>
            <button className="bg-[#005d71] text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Pagination = () => {
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

    return (
      <nav aria-label="Page navigation" className="mt-8">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li key={page}>
              <button
                onClick={() => handlePageChange(page)}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === page
                  ? 'z-10 text-[#005d71] border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      {isSidebarOpen && (
        <Sidebar
          isOpen={isSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      <div className="flex flex-col flex-1 transition-all duration-300">
        <Navbar
          toggleSidebar={toggleSidebar}
          sidebarOpen={isSidebarOpen}
          notifications={notifications}
          unreadCount={unreadCount}
          markAsRead={markAsRead}
        />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
            {/* --- Button Group START --- */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 rounded-lg ${selectedOption === 'withCT' ? 'bg-[#005d71] text-white' : 'bg-gray-100 text-gray-800'} font-medium`}
                  onClick={() => setSelectedOption('withCT')}
                >
                  Single Song With CT
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${selectedOption === 'withoutCT' ? 'bg-[#005d71] text-white' : 'bg-gray-100 text-gray-800'} font-medium`}
                  onClick={() => setSelectedOption('withoutCT')}
                >
                  Single Song Without CT
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${selectedOption === 'onlyCaller' ? 'bg-[#005d71] text-white' : 'bg-gray-100 text-gray-800'} font-medium`}
                  onClick={() => setSelectedOption('onlyCaller')}
                >
                  Only Caller Tune
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${selectedOption === 'album' ? 'bg-[#005d71] text-white' : 'bg-gray-100 text-gray-800'} font-medium`}
                  onClick={() => setSelectedOption('album')}
                >
                  Release New Album
                </button>
              </div>
              {selectedOption && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
                  {selectedOption === 'withCT' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Single Song With CT</h2>
                      <p>Show relevant data or form for releasing a single song with caller tune.</p>
                    </div>
                  )}
                  {selectedOption === 'withoutCT' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Single Song Without CT</h2>
                      <p>Show relevant data or form for releasing a single song without caller tune.</p>
                    </div>
                  )}
                  {selectedOption === 'onlyCaller' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Only Caller Tune</h2>
                      <p>Show relevant data or form for only caller tune release.</p>
                    </div>
                  )}
                  {selectedOption === 'album' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Release New Album</h2>
                      <p>Show relevant data or form for releasing a new album.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* --- Button Group END --- */}

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
              {statusCards.map((card, index) => (
                <StatusCard
                  key={index}
                  title={card.title}
                  count={card.count}
                  color={card.color}
                  icon={card.icon}
                  bgColor={card.bgColor}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedReleases.map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
            <div className="flex justify-center">
              <Pagination />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}