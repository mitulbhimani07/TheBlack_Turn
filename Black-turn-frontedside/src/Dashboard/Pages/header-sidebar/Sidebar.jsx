import React, { useState } from 'react';
import { 
  Home, Users, BarChart3, Settings, Calendar, FileText, 
  Mail, ShoppingCart, TrendingUp, Activity, CreditCard,
  Package, Shield, HelpCircle, Star, ChevronRight
} from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const Sidebar = ({ isOpen }) => {
  const { currentTheme } = useTheme();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      type: 'single'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      type: 'group',
      children: [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'reports', label: 'Reports', icon: FileText },
        { id: 'insights', label: 'Insights', icon: Activity }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      type: 'group',
      children: [
        { id: 'all-users', label: 'All Users', icon: Users },
        { id: 'user-roles', label: 'User Roles', icon: Shield },
        { id: 'permissions', label: 'Permissions', icon: Settings }
      ]
    },
    {
      id: 'ecommerce',
      label: 'E-Commerce',
      icon: ShoppingCart,
      type: 'group',
      children: [
        { id: 'products', label: 'Products', icon: Package },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
        { id: 'payments', label: 'Payments', icon: CreditCard }
      ]
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: Mail,
      type: 'single'
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: Calendar,
      type: 'single'
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      type: 'single'
    }
  ];

  const bottomMenuItems = [
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderMenuItem = (item, isChild = false) => {
    const Icon = item.icon;
    const isActive = activeItem === item.id;
    
    if (item.type === 'group') {
      const isExpanded = expandedGroups[item.id];
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleGroup(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
              isActive
                ? `bg-[#005f73] text-white shadow-lg`
                : `${currentTheme.sidebarText} hover:bg-[#005f73] hover:bg-opacity-10`
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronRight 
              size={16} 
              className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
            />
          </button>
          
          {isExpanded && (
            <div className="ml-4 mt-2 space-y-1 border-l-2 border-[#005f73] border-opacity-20 pl-4">
              {item.children.map(child => renderMenuItem(child, true))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => setActiveItem(item.id)}
        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
          isActive
            ? `bg-[#005f73] text-white shadow-lg transform scale-105`
            : `${currentTheme.sidebarText} hover:bg-[#005f73] hover:bg-opacity-10 hover:transform hover:scale-105`
        } ${isChild ? 'ml-2' : ''}`}
      >
        <Icon size={20} />
        <span className="font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <aside className={`${currentTheme.sidebar} ${isOpen ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden border-r ${currentTheme.border} h-full flex flex-col shadow-lg`}>
      {/* Header */}
      <div className="p-6 border-b border-[#005f73] border-opacity-20">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-[#005f73] rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 className="text-white" size={24} />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${currentTheme.sidebarText}`}>AdminPro</h2>
            <p className={`text-sm ${currentTheme.textSecondary} opacity-75`}>v3.0 Dashboard</p>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-[#005f73] border-opacity-20">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#005f73] bg-opacity-5">
          <div className="w-10 h-10 bg-[#005f73] rounded-full flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div className="flex-1">
            <p className={`font-semibold ${currentTheme.sidebarText}`}>John Doe</p>
            <p className={`text-xs ${currentTheme.textSecondary} opacity-75`}>Administrator</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={12} className="text-yellow-500 fill-current" />
            <span className={`text-xs ${currentTheme.textSecondary}`}>Pro</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[#005f73] border-opacity-20">
        {/* Bottom Menu Items */}
        <div className="space-y-1 mb-4">
          {bottomMenuItems.map(item => renderMenuItem(item))}
        </div>

        {/* Upgrade Section */}
        <div className="bg-gradient-to-r from-[#005f73] to-[#004a5a] p-4 rounded-xl text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="text-yellow-300" size={16} />
            <h3 className="font-semibold text-sm">Upgrade to Pro</h3>
          </div>
          <p className="text-xs text-gray-200 mb-3">
            Unlock premium features and advanced analytics
          </p>
          <button className="w-full py-2 px-4 bg-white text-[#005f73] rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
            Upgrade Now
          </button>
        </div>

        {/* Storage Usage */}
        <div className="mt-4 p-3 bg-[#ebf4f5] rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${currentTheme.text}`}>Storage</span>
            <span className={`text-xs ${currentTheme.textSecondary}`}>75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#005f73] h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>7.5GB of 10GB used</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;