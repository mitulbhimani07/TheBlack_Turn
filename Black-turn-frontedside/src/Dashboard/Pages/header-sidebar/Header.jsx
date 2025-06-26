// This replaces the charts section in your Dashboard
// Make sure you are importing relevant icons like FiUploadCloud, etc.

import React, { useState } from 'react';
import {
  Menu, X, Bell, Search, User, Palette, ChevronDown,
  LogOut, Settings, MessageCircle
} from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const { currentTheme, setTheme, themeName, themes } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const notifications = [
    { id: 1, message: 'New user registered', time: '2 min ago', unread: true },
    { id: 2, message: 'Server maintenance scheduled', time: '1 hour ago', unread: true },
    { id: 3, message: 'Payment received', time: '3 hours ago', unread: false },
  ];

  return (
    <nav className={`sticky top-0 z-40 shadow-sm px-4 py-3 flex items-center justify-between ${currentTheme.primary} ${currentTheme.border} border-b`}>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg ${currentTheme.textSecondary} hover:${currentTheme.secondary} transition-colors`}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h1 className={`text-xl font-bold ${currentTheme.text}`}>My Dashboard</h1>
      </div>

      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <form onSubmit={handleSearch} className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.textSecondary}`} size={16} />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} ${currentTheme.text} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-[#005f73]`}
          />
        </form>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className={`p-2 rounded-lg ${currentTheme.textSecondary} hover:${currentTheme.secondary} flex items-center gap-1`}
            title="Change Theme"
          >
            <Palette size={20} />
            <ChevronDown size={14} />
          </button>
          {showThemeMenu && (
            <div className={`absolute right-0 mt-2 w-48 ${currentTheme.card} rounded-lg shadow-lg border ${currentTheme.border} py-2 z-50`}>
              <div className={`px-4 py-2 border-b ${currentTheme.border}`}>
                <p className={`text-sm font-medium ${currentTheme.text}`}>Choose Theme</p>
              </div>
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => {
                    setTheme(theme);
                    setShowThemeMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:${currentTheme.secondary} ${currentTheme.text} capitalize flex items-center justify-between`}
                >
                  <span className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      theme === 'light' ? 'bg-white border border-gray-300' :
                      theme === 'dark' ? 'bg-black' :
                      theme === 'teal' ? 'bg-[#005f73]' :
                      'bg-gradient-to-r from-white to-black'
                    }`} />
                    <span>{theme}</span>
                  </span>
                  {themeName === theme && <div className="w-2 h-2 bg-[#005f73] rounded-full" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-lg ${currentTheme.textSecondary} hover:${currentTheme.secondary} relative`}
            title="Notifications"
          >
            <Bell size={20} />
            {notifications.some(n => n.unread) && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.filter(n => n.unread).length}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-80 ${currentTheme.card} rounded-lg shadow-lg border ${currentTheme.border} py-2 z-50`}>
              <div className={`px-4 py-2 border-b ${currentTheme.border}`}>
                <p className={`text-sm font-medium ${currentTheme.text}`}>Notifications</p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`px-4 py-3 hover:${currentTheme.secondary} ${notification.unread ? 'bg-[#005f73]/5' : ''}`}>
                    <p className={`text-sm ${currentTheme.text}`}>{notification.message}</p>
                    <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className={`px-4 py-2 border-t ${currentTheme.border}`}>
                <button className={`text-sm ${currentTheme.accentText} hover:underline`}>View all notifications</button>
              </div>
            </div>
          )}
        </div>

        <button className={`p-2 rounded-lg ${currentTheme.textSecondary} hover:${currentTheme.secondary}`} title="Messages">
          <MessageCircle size={20} />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`flex items-center gap-2 p-2 rounded-lg ${currentTheme.textSecondary} hover:${currentTheme.secondary}`}
          >
            <div className="w-8 h-8 bg-[#005f73] rounded-full flex items-center justify-center text-white text-sm font-bold">
              JD
            </div>
            <span className={`hidden md:block ${currentTheme.text} text-sm font-medium`}>John Doe</span>
            <ChevronDown size={14} />
          </button>
          {showProfileMenu && (
            <div className={`absolute right-0 mt-2 w-56 ${currentTheme.card} rounded-lg shadow-lg border ${currentTheme.border} py-2 z-50`}>
              <div className={`px-4 py-3 border-b ${currentTheme.border}`}>
                <p className={`font-medium ${currentTheme.text}`}>John Doe</p>
                <p className={`text-sm ${currentTheme.textSecondary}`}>john.doe@example.com</p>
              </div>
              <button className={`w-full text-left px-4 py-2 hover:${currentTheme.secondary} ${currentTheme.text} flex items-center gap-2`}>
                <User size={16} />
                <span>My Profile</span>
              </button>
              <button className={`w-full text-left px-4 py-2 hover:${currentTheme.secondary} ${currentTheme.text} flex items-center gap-2`}>
                <Settings size={16} />
                <span>Account Settings</span>
              </button>
              <hr className={`my-2 ${currentTheme.border}`} />
              <button className={`w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2`}>
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
