import React, { useState } from 'react';
import { FiBell, FiMenu, FiX, FiMoon, FiSun, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

const Navbar = ({ 
  toggleSidebar, 
  sidebarOpen, 
  notifications, 
  unreadCount, 
  markAsRead
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className={`sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm`}>
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-[#005f73]/10 transition-all duration-200 text-gray-800"
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-gray-800">BLACK TURN Dashboard</h1>
          </div>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <input
            type="text"
            placeholder="Search songs, artists, or ISRC..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005f73] transition-all duration-200"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-[#005f73]/10 transition-all duration-200 text-gray-800"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-[#005f73]/10 transition-all duration-200 text-gray-800 relative"
            >
              <FiBell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-gray-100 hover:bg-[#005f73]/10 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <p className="text-sm text-gray-800">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="p-2 rounded-lg hover:bg-[#005f73]/10 transition-all duration-200 text-gray-800"
            >
              <FiUser size={20} />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-semibold text-gray-800">DJ Black</p>
                  <p className="text-sm text-gray-500">Artist</p>
                </div>
                <div className="py-2">
                  <button className="w-full text-left px-4 py-2 hover:bg-[#005f73]/10 transition-colors text-gray-800 flex items-center space-x-2">
                    <FiUser size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-[#005f73]/10 transition-colors text-gray-800 flex items-center space-x-2">
                    <FiSettings size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors text-red-600 flex items-center space-x-2">
                    <FiLogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;