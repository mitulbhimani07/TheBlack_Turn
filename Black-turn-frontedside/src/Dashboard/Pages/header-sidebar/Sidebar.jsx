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

  const toggleGroup = (id) => {
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
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

  const bottomItems = [
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderMenuItem = (item, isChild = false) => {
    const Icon = item.icon;
    const isActive = activeItem === item.id;
    const isExpanded = expandedGroups[item.id];

    const baseStyle = `w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive ? 'bg-[#005f73] text-white shadow-md' : `${currentTheme.sidebarText} hover:bg-[#005f73] hover:bg-opacity-10`
    }`;

    const childStyle = isChild ? 'ml-3 pl-3 border-l border-[#005f73]/30' : '';

    if (item.type === 'group') {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleGroup(item.id)}
            className={`${baseStyle} ${childStyle}`}
          >
            <div className="flex items-center gap-2">
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <ChevronRight size={16} className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
          {isExpanded && (
            <div className="mt-1">
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
        className={`${baseStyle} ${childStyle}`}
      >
        <div className="flex items-center gap-2">
          <Icon size={18} />
          <span className="text-sm font-medium">{item.label}</span>
        </div>
      </button>
    );
  };

  return (
    <aside
      className={`${currentTheme.sidebar} ${isOpen ? 'w-72' : 'w-0'} transition-all duration-300 border-r ${currentTheme.border} h-screen overflow-hidden shadow-md`}
    >
      {/* Header */}
      <div className="p-5 border-b border-[#005f73]/20">
        <div className="flex items-center gap-3">
          <div className="bg-[#005f73] p-2 rounded-lg text-white">
            <BarChart3 size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#005f73]">AdminPro</h2>
            <p className="text-xs text-gray-500">v3.0 Dashboard</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-[#005f73]/20">
        <div className="flex items-center gap-3 bg-[#005f73]/10 p-3 rounded-lg">
          <div className="bg-[#005f73] w-10 h-10 flex items-center justify-center text-white rounded-full font-bold">
            JD
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">John Doe</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-gray-500">Pro</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>

      {/* Bottom Items + Upgrade + Storage */}
      <div className="p-4 border-t border-[#005f73]/20 space-y-4">
        {bottomItems.map(item => renderMenuItem(item))}

        {/* Upgrade Box */}
        <div className="bg-gradient-to-r from-[#005f73] to-[#004a5a] text-white p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Star size={16} className="text-yellow-300" />
            <span className="font-semibold text-sm">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-gray-200">Unlock premium features and insights</p>
          <button className="mt-3 w-full bg-white text-[#005f73] text-sm font-semibold py-1.5 rounded-lg hover:bg-gray-100">
            Upgrade Now
          </button>
        </div>

        {/* Storage Usage */}
        <div className="bg-[#ebf4f5] p-3 rounded-lg">
          <div className="flex justify-between text-sm font-medium">
            <span>Storage</span>
            <span className="text-xs text-gray-500">75%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div className="bg-[#005f73] h-2 rounded-full" style={{ width: '75%' }} />
          </div>
          <p className="text-xs text-gray-500 mt-1">7.5GB of 10GB used</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
