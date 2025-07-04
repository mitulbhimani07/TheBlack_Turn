import React, { useState, useEffect } from 'react';
import { 
  FiBell, 
  FiMenu, 
  FiX, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiSearch,
  FiChevronDown,
  FiMaximize,
  FiMinimize
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Arrow Toggle Icon Component with Enhanced Animations
const ArrowToggleIcon = ({ size = 20, className = "", isOpen = false }) => (
  <div className={`relative group ${className}`}>
    {/* Animated background circle */}
    <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
      isOpen 
        ? 'bg-gradient-to-r from-[#005f73]/20 to-[#0a9396]/20 scale-110' 
        : 'bg-transparent scale-100 group-hover:bg-[#005f73]/10 group-hover:scale-105'
    }`} />
    
    {/* Main SVG */}
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Animated gradient definition */}
      <defs>
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#005f73" />
          <stop offset="100%" stopColor="#0a9396" />
        </linearGradient>
      </defs>
      
      {/* Main arrow with enhanced styling */}
      <path
        d="M9 18l6-6-6-6"
        stroke="url(#arrowGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        style={{ transformOrigin: '50% 50%' }}
      />
      
      {/* Animated side lines with staggered animation */}
      <line
        x1="4" y1="6" x2="6" y2="6"
        stroke="url(#arrowGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        className={`transition-all duration-200 ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-70 translate-x-[-1px]'
        }`}
        style={{ transitionDelay: '0ms' }}
      />
      <line
        x1="4" y1="12" x2="6" y2="12"
        stroke="url(#arrowGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        className={`transition-all duration-200 ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-70 translate-x-[-1px]'
        }`}
        style={{ transitionDelay: '50ms' }}
      />
      <line
        x1="4" y1="18" x2="6" y2="18"
        stroke="url(#arrowGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        className={`transition-all duration-200 ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-70 translate-x-[-1px]'
        }`}
        style={{ transitionDelay: '100ms' }}
      />
      
      {/* Pulse effect when active */}
      {isOpen && (
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="url(#arrowGradient)"
          strokeWidth="0.5"
          opacity="0.3"
          className="animate-ping"
        />
      )}
    </svg>
    
    {/* Hover glow effect */}
    <div className={`absolute inset-0 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${
      isOpen ? 'shadow-lg shadow-[#005f73]/30' : 'shadow-md shadow-[#005f73]/20'
    }`} />
  </div>
);

const Navbar = ({ 
  toggleSidebar, 
  sidebarOpen, 
  notifications = [], 
  unreadCount = 0, 
  markAsRead
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleNotificationClick = (id) => {
    markAsRead(id);
    setShowNotifications(false);
  };

  const handleClickOutside = (e, type) => {
    if (type === 'notifications' && !e.target.closest('.notifications-container')) {
      setShowNotifications(false);
    }
    if (type === 'profile' && !e.target.closest('.profile-container')) {
      setShowProfile(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    if (showNotifications) {
      document.addEventListener('click', (e) => handleClickOutside(e, 'notifications'));
    }
    if (showProfile) {
      document.addEventListener('click', (e) => handleClickOutside(e, 'profile'));
    }
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('click', (e) => handleClickOutside(e, 'notifications'));
      document.removeEventListener('click', (e) => handleClickOutside(e, 'profile'));
    };
  }, [showNotifications, showProfile]);

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.15,
        ease: "easeInOut"
      }
    }
  };

  return (
    // MODIFIED: Reduced z-index from z-40 to z-30
    <nav className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm bg-opacity-90">
      <div className="flex flex-wrap items-center justify-between px-4 py-3">
        
        {/* Left - Logo + Toggle */}
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={toggleSidebar}
            className="relative p-2 rounded-lg hover:bg-[#005f73]/10 transition-all duration-300 text-gray-800 group"
            aria-label="Toggle sidebar"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowToggleIcon size={22} isOpen={sidebarOpen} />
          </motion.button>
         
        </div>

        {/* Desktop Search */}
        <div className={`hidden md:flex flex-1 max-w-md mx-4 ${showMobileSearch ? 'hidden' : ''}`}>
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search songs, artists, or ISRC..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005f73] transition"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>
        </div>

        {/* Mobile search icon */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            className="p-2 rounded-lg hover:bg-[#005f73]/10 text-gray-800 transition"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            aria-label="Search"
          >
            <FiSearch size={20} />
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 ml-auto">
          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-[#005f73]/10 text-gray-800 transition"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="p-2 rounded-lg hover:bg-[#005f73]/10 text-gray-800 transition relative"
              aria-label="Notifications"
            >
              <FiBell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 bg-[#005f73] text-white flex justify-between items-center">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={() =>
                          notifications.forEach(n => !n.read && markAsRead(n.id))
                        }
                        className="text-sm hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          whileHover={{ scale: 1.01 }}
                          className={`p-3 border-b border-gray-100 hover:bg-[#005f73]/10 cursor-pointer transition-colors ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.timestamp || Date.now()).toLocaleTimeString()}
                          </p>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center space-x-1 p-2 rounded-lg hover:bg-[#005f73]/10 text-gray-800 transition"
              aria-label="User profile"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] flex items-center justify-center text-white">
                <FiUser size={16} />
              </div>
              {!isMobile && (
                <>
                  <span className="text-sm font-medium">DJ Black</span>
                  <FiChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`}
                  />
                </>
              )}
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden"
                >
                  <div className="p-4 border-b bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white">
                    <p className="font-semibold">DJ Black</p>
                    <p className="text-xs">Artist</p>
                  </div>
                  <div className="py-2">
                    <motion.button
                      whileHover={{ x: 2 }}
                      className="w-full text-left px-4 py-2 hover:bg-[#005f73]/10 text-gray-800 flex items-center space-x-3"
                    >
                      <FiUser size={16} className="text-[#005f73]" />
                      <span>Profile</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ x: 2 }}
                      className="w-full text-left px-4 py-2 hover:bg-[#005f73]/10 text-gray-800 flex items-center space-x-3"
                    >
                      <FiSettings size={16} className="text-[#005f73]" />
                      <span>Settings</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ x: 2 }}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center space-x-3"
                    >
                      <FiLogOut size={16} />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Expanded */}
      {showMobileSearch && (
        <div className="px-4 py-2 bg-white shadow-md md:hidden z-50 w-full">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005f73] transition"
              autoFocus
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
            <button
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowMobileSearch(false)}
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;