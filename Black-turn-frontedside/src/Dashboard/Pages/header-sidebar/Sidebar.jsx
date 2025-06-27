import React from 'react';
import { 
  FiHome, FiMusic, FiUpload, FiDollarSign, 
  FiSettings, FiUser, FiHelpCircle, FiLogOut, FiChevronRight, 
  FiBarChart2
} from 'react-icons/fi';

const Sidebar = ({ isOpen, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: FiHome },
    { id: 'music', label: 'My Music', icon: FiMusic },
    { id: 'upload', label: 'Upload', icon: FiUpload },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart2 },
    { id: 'royalties', label: 'Royalties', icon: FiDollarSign },
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'settings', label: 'Settings', icon: FiSettings },
    { id: 'help', label: 'Help & Support', icon: FiHelpCircle },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setActiveTab('overview')}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 ${isOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 shadow-lg`}>
        
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#005f73] to-[#0a9396] rounded-lg flex items-center justify-center">
              <FiMusic className="text-white" size={20} />
            </div>
            {isOpen && (
              <div>
                <h2 className="font-bold text-lg text-gray-800">BLACK TURN</h2>
                <p className="text-xs text-gray-500">Music Distribution</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 mb-1 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white shadow-lg' 
                    : 'text-gray-800 hover:bg-gradient-to-r hover:from-[#005f73]/10 hover:to-[#0a9396]/10'
                }`}
              >
                <Icon size={20} className={`${isActive ? 'text-white' : 'text-gray-800'} transition-colors`} />
                {isOpen && (
                  <>
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                    {isActive && <FiChevronRight size={16} className="text-white" />}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 text-gray-800 hover:bg-red-50 hover:text-red-600">
            <FiLogOut size={20} />
            {isOpen && <span className="font-medium">Logout</span>}
          </button>
          
          {isOpen && (
            <div className="mt-4 p-3 bg-gradient-to-r from-[#005f73]/10 to-[#0a9396]/10 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Need Help?</p>
              <p className="text-sm font-medium text-gray-800">Contact Support</p>
              <p className="text-xs text-gray-500">+91 9817889799</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;