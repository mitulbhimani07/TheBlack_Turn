import React, { useState, useEffect } from 'react';
import { Music, TrendingUp, Download, Play, ChevronDown } from 'lucide-react';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';

// Simple CountUp implementation since we can't import external libraries
const CountUp = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{prefix}{count}{suffix}</span>;
};

function Overview() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSong, setSelectedSong] = useState('');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => prev - 1);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
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

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Header */}
          <h1 className="text-3xl font-semibold text-gray-700 mb-8">Royalty/Earning Reports</h1>
          
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Total Views Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold mb-2">
                    <CountUp end={286} />
                  </div>
                  <div className="text-blue-100 text-lg">Total Views</div>
                </div>
                <div className="text-white/80">
                  <Music size={48} />
                </div>
              </div>
            </div>

            {/* Total Earnings Card */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold mb-2 flex items-center">
                    <span className="text-2xl mr-1">₹</span>
                    <CountUp end={1} />
                  </div>
                  <div className="text-green-100 text-lg">Total Earnings</div>
                </div>
                <div className="text-white/80">
                  <span className="text-4xl font-bold">₹</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Download Card */}
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 text-white p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Download size={32} className="mr-3" />
                <div>
                  <div className="text-xl font-semibold">Download</div>
                </div>
              </div>
              <div className="text-gray-300">Get Your Reports</div>
            </div>

            {/* Earnings Card */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <TrendingUp size={32} className="mr-3" />
                <div>
                  <div className="text-xl font-semibold">Earnings</div>
                </div>
              </div>
              <div className="text-teal-100">Yearly,Monthly & Platform-wise Analytics</div>
            </div>

            {/* Streams/Plays Card */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Play size={32} className="mr-3" />
                <div>
                  <div className="text-xl font-semibold">Streams/Plays</div>
                </div>
              </div>
              <div className="text-orange-100">Yearly,Monthly & Platform-wise Analytics</div>
            </div>
          </div>

          {/* Song Selection Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Music className="text-blue-600 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-blue-800">
                Select or Search Song to View Detailed Analytics:
              </h2>
            </div>

            <div className="mb-4">
              <p className="text-pink-500 text-sm mb-4">
                If you have ever updated the song name, the data might not match. For better accuracy, please download the reports
              </p>
            </div>

            {/* Search Dropdown */}
            <div className="relative">
              <select 
                className="w-full p-4 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-500"
                value={selectedSong}
                onChange={(e) => setSelectedSong(e.target.value)}
              >
                <option value="">Search and Select</option>
                <option value="song1">Sample Song 1</option>
                <option value="song2">Sample Song 2</option>
                <option value="song3">Sample Song 3</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;