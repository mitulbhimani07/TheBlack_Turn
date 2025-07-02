import React, { useState } from 'react';
import { Album } from 'lucide-react';
import {
  FiHome, FiMusic, FiUpload, FiUser, FiHelpCircle,
  FiLogOut, FiChevronRight, FiBarChart2, FiDownload,
  FiTrendingUp, FiStar, FiGlobe, FiFileText, FiChevronDown,
  FiChevronUp, FiLink, FiPlus
} from 'react-icons/fi';
import logo from '../../../assets/images/logo1.png';
import logo1 from '../../../assets/images/logo.png';

const Sidebar = ({ isOpen = true, activeTab = 'dashboard', setActiveTab = () => {} }) => {
  const [expandedSections, setExpandedSections] = useState({
    uploads: false,
    reports: false,
    releases: false,
    claims: false,
    artist: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    {
      id: 'member',
      label: 'Become a Member',
      icon: FiStar,
      badge: 'NEW',
      badgeColor: 'bg-red-500'
    },
    {
      id: 'noc-form',
      label: 'NOC Form',
      icon: FiFileText,
      subtitle: '(Payment Details)'
    },
    { id: 'releases', label: 'All Releases', icon: FiMusic },
  ];

  const sectionsWithItems = [
    {
      id: 'uploads',
      label: 'UPLOADS',
      items: [
        { id: 'new-single', label: 'New Single Release', icon: FiUpload },
        { id: 'new-album', label: 'Release New Album', icon: Album }
      ]
    },
    {
      id: 'reports',
      label: 'REPORTS',
      items: [
        { id: 'overview', label: 'Overview', icon: FiBarChart2 },
        { id: 'download-reports', label: 'Download All Reports', icon: FiDownload },
        { id: 'earnings-trends', label: 'Earnings Trends', icon: FiTrendingUp },
        { id: 'streaming-trends', label: 'Streaming Trends', icon: FiTrendingUp }
      ]
    },
    {
      id: 'claims',
      label: 'CLAIM RELEASE & WHITELIST',
      items: [
        { id: 'youtube-claim', label: 'YouTube Claim Release', icon: FiGlobe },
        { id: 'facebook-whitelist', label: 'Facebook Page Whitelist', icon: FiGlobe }
      ]
    },
    {
      id: 'artist',
      label: 'ARTIST PROFILES',
      items: [
        { id: 'create-profile', label: 'Create a New Artist Profile', icon: FiPlus },
        { id: 'profile-link', label: 'Artist Profile Link Generation', icon: FiLink },
        { id: 'manage-profile', label: 'Manage Your Profile', icon: FiUser }
      ]
    }
  ];

  const bottomItems = [
    { id: 'help', label: 'Help & Support', icon: FiHelpCircle },
    { id: 'complaints', label: 'Complaints', icon: FiFileText },
    { id: 'takedown', label: 'Takedown Request', icon: FiFileText }
  ];

  const renderMenuItem = (item, isSubItem = false) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;

    return (
      <button
        key={item.id}
        onClick={() => setActiveTab(item.id)}
        className={`w-full flex items-center space-x-3 px-3 py-2.5 mb-1 rounded-lg transition-all duration-200 group
          ${isSubItem ? 'ml-2' : ''}
          ${isActive
            ? 'bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white shadow-md'
            : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#005f73]/10 hover:to-[#0a9396]/10 hover:text-[#0a9396]'}`}
      >
        <Icon
          size={18}
          className={`transition-colors ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-[#0a9396]'}`}
        />
        {isOpen && (
          <div className="flex-1 text-left">
            <span className={`font-medium text-sm ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-[#0a9396]'}`}>
              {item.label}
            </span>
            {item.subtitle && (
              <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500 group-hover:text-[#0a9396]/80'}`}>
                {item.subtitle}
              </div>
            )}
          </div>
        )}
        {item.badge && isOpen && (
          <span className={`px-2 py-1 text-xs font-bold text-white rounded ${item.badgeColor}`}>
            {item.badge}
          </span>
        )}
        {isActive && isOpen && <FiChevronRight size={14} className="text-white" />}
      </button>
    );
  };

  const renderSection = (section) => {
    const isExpanded = expandedSections[section.id];

    return (
      <div key={section.id} className="mb-2">
        {isOpen && (
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
          >
            <span>{section.label}</span>
            {isExpanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          </button>
        )}
        {(isExpanded || !isOpen) && (
          <div className="space-y-1">
            {section.items.map(item => renderMenuItem(item, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 lg:hidden"
          onClick={() => setActiveTab('dashboard')}
        />
      )}

      <div className={`fixed lg:sticky top-0 left-0 h-screen z-40 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 ${isOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 shadow-lg flex flex-col mt-18 lg:mt-0`}>
        
        <div className="flex-shrink-0 p-4 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <img src={isOpen ? logo : logo1} alt="Logo" className="h-12 object-contain" />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 custom-scrollbar">
          <div className="space-y-1 mb-6">
            {menuItems.map(item => renderMenuItem(item))}
          </div>

          {sectionsWithItems.map(section => renderSection(section))}

          <div className="space-y-1 mb-4">
            {bottomItems.map(item => renderMenuItem(item))}
          </div>
          
          <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 text-gray-700 hover:bg-red-50 hover:text-red-600">
            <FiLogOut size={20} />
            {isOpen && <span className="font-medium">Logout</span>}
          </button>
        </nav>
      </div>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
          overflow-y: overlay !important;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
          margin: 4px 0;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 3px;
          background-clip: padding-box;
          border: 1px solid transparent;
          min-height: 40px;
          transition: background-color 0.3s;
        }

        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #94a3b8;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .custom-scrollbar:hover {
          scrollbar-color: #94a3b8 transparent;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
