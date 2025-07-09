import React, { useState } from 'react'
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';
import { ArrowLeft, Play, Pause, Volume2, MoreHorizontal } from 'lucide-react';



function ViewSingleRelese() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
     const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };


    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => prev - 1);
    };

    return (
        <>
            <div className="min-h-screen flex bg-gray-50 relative">
                <Sidebar
                    isOpen={isSidebarOpen}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <div className="flex-1 flex flex-col min-h-screen">
                    {/* Sticky Header */}
                    <div className="sticky top-0 z-50">
                        <Navbar
                            toggleSidebar={toggleSidebar}
                            sidebarOpen={isSidebarOpen}
                            notifications={notifications}
                            unreadCount={unreadCount}
                            markAsRead={markAsRead}
                        />
                    </div>

                    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              All Releases
            </button>
            <button className="px-4 py-2 bg-[#005f73] text-white rounded-md hover:bg-[#004a5c] transition-colors">
              Update
            </button>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold text-gray-800">Platform Links</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Release Details */}
          <div className="space-y-6">
            {/* Release Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-xl font-bold text-gray-800">
                  ISRC #INH512030446 - Release Details
                </h1>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Paid
                </span>
              </div>
              <p className="text-gray-600 italic mb-4">Single Song with CT</p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content ID:</label>
                    <p className="text-gray-900">No</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Release Date:</label>
                    <p className="text-gray-900">2025-07-08</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Song Name:</label>
                    <p className="text-gray-900">Hj</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Artist:</label>
                    <p className="text-gray-900">Gfh</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Album Name:</label>
                  <p className="text-gray-900">Bhj <span className="text-gray-500">( UPC -890919404167.2 )</span></p>
                </div>
              </div>
            </div>

            {/* Additional Song Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-[#005f73] mb-4">Additional Song Details</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Date:</label>
                <p className="text-gray-900">2025-07-08 12:17:36</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <p className="text-gray-900">Explicit</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lyricist</label>
                  <p className="text-gray-900">Gh</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Composers</label>
                  <p className="text-gray-900">Bhj</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <p className="text-gray-900">Telugu</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                  <p className="text-gray-900">Hindustani</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Genre</label>
                  <p className="text-gray-900">Vocal</p>
                </div>
              </div>
            </div>

            {/* Caller Tune Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-[#005f73] mb-4">Caller Tune Details</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">1st CallerTune Name:</label>
                    <p className="text-gray-900">Hg</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">2nd CallerTune Name:</label>
                    <p className="text-gray-900">Ghf</p>
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">1st CallerTune Timing:</label>
                    <p className="text-gray-900">00:fgh</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">2nd CallerTune Timing:</label>
                    <p className="text-gray-900">00:g</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-[#005f73] mb-4">Payment Details</h3>
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-1">Total:</label>
                <p className="text-2xl font-bold text-[#005f73]">799</p>
              </div>
            </div>
          </div>

          {/* Right Column - Album Art and Player */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="aspect-square bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <div className="w-8 h-8 bg-white rounded-full"></div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">WEALTH &</h3>
                    <h3 className="text-lg font-bold">TECHNOLOGY</h3>
                  </div>
                </div>
              </div>
              
              {/* Audio Player */}
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <button 
                    onClick={togglePlayPause}
                    className="w-8 h-8 bg-[#005f73] text-white rounded-full flex items-center justify-center hover:bg-[#004a5c] transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div className="text-sm text-gray-600">0:00 / 1:03</div>
                  <Volume2 className="w-5 h-5 text-gray-600" />
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </div>
                
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div className="bg-[#005f73] h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                </div>
            </div>


        </>

    );
};

export default ViewSingleRelese