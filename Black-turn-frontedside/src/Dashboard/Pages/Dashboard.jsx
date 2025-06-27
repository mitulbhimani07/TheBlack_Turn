import React, { useState, useEffect } from 'react';
import Navbar from '../Pages/header-sidebar/Header';
import Sidebar from '../Pages/header-sidebar/Sidebar';
import {
  FiMusic, FiUpload, FiDollarSign, FiYoutube, FiUser, FiAlertCircle,
  FiTrash2, FiLink, FiMessageSquare, FiCheckCircle, FiTrendingUp,
  FiEye, FiDownload, FiPlay, FiPause, FiEdit, FiShare2
} from 'react-icons/fi';
import SidebarDemo from '../Pages/header-sidebar/Sidebar';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const [isPlaying, setIsPlaying] = useState({});

  const stats = [
    { title: "Today's Money", value: "₹53,000", change: "+55%", icon: FiDollarSign, color: "from-[#005f73] to-[#0a9396]" },
    { title: "New Clients", value: "3,462", change: "-2%", icon: FiUser, color: "from-[#005f73] to-[#0a9396]" },
    { title: "Today's Users", value: "2,300", change: "+3%", icon: FiEye, color: "from-[#005f73] to-[#0a9396]" },
    { title: "Sales", value: "₹1,03,430", change: "+5%", icon: FiTrendingUp, color: "from-[#005f73] to-[#0a9396]" },
  ];

  const recentSongs = [
    {
      isrc: 'US-ABC-12-34567',
      name: 'Summer Vibes',
      artist: 'DJ Black',
      date: '2025-06-20',
      status: 'Live',
      payment: 'Pending',
      platforms: ['Spotify', 'Apple', 'YT Music'],
      plays: '12.5K',
      revenue: '₹2,340'
    },
    {
      isrc: 'US-ABC-12-34568',
      name: 'Midnight Dreams',
      artist: 'DJ Black ft. Maria',
      date: '2025-06-15',
      status: 'Processing',
      payment: 'Paid',
      platforms: ['Spotify', 'Apple'],
      plays: '8.2K',
      revenue: '₹1,680'
    },
    {
      isrc: 'US-ABC-12-34569',
      name: 'Urban Life',
      artist: 'Black Turn Collective',
      date: '2025-06-10',
      status: 'Live',
      payment: 'Paid',
      platforms: ['All Platforms'],
      plays: '25.1K',
      revenue: '₹4,560'
    }
  ];

  const recentUpdates = [
    {
      time: '2025-06-26 14:53:36',
      subject: 'Fill the NOC Form',
      message: 'Please upload your NOC to proceed with releases.',
      type: 'warning'
    },
    {
      time: '2025-06-25 11:20:15',
      subject: 'New Feature Available',
      message: 'You can now bulk upload up to 7 songs at once.',
      type: 'info'
    },
    {
      time: '2025-06-24 09:45:30',
      subject: 'Payment Processed',
      message: 'Your royalties for May have been processed.',
      type: 'success'
    }
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Upload Album',
      icon: <FiUpload />,
      price: '₹1999 / per Album',
      features: [
        'Release Upto 7 Songs at Once',
        'All Stores with CallerTune',
        'Multiple Artists',
        'YouTube Content ID'
      ],
      action: () => alert('Upload Album clicked!')
    },
    {
      id: 2,
      title: 'Single Song',
      icon: <FiMusic />,
      price: '₹799 / per song',
      features: [
        'With CallerTune',
        'All Stores & Content ID',
        'Pay Once, Earn Lifetime'
      ],
      action: () => alert('Single Song clicked!')
    },
    {
      id: 3,
      title: 'CallerTune Only',
      icon: <FiDollarSign />,
      price: '₹499 / per song',
      features: [
        'Previously Released Songs',
        'All CallerTune Platforms',
        'Pay Once, Earn Lifetime'
      ],
      action: () => alert('CallerTune Only clicked!')
    }
  ];

  const serviceCards = [
    {
      id: 1, 
      title: 'YouTube Claim Release', 
      icon: <FiYoutube />, 
      description: 'Remove Claim from Your video', 
      action: 'Submit Link',
      onClick: () => alert('YouTube Claim Release clicked!')
    },
    {
      id: 2, 
      title: 'Artist Profile Link', 
      icon: <FiUser />, 
      description: 'Link Your Correct Artist Profile', 
      action: 'Request Now',
      onClick: () => alert('Artist Profile Link clicked!')
    },
    {
      id: 3, 
      title: 'FB/Insta Whitelist', 
      icon: <FiAlertCircle />, 
      description: 'Remove Claims from Reels', 
      action: 'Submit Now',
      onClick: () => alert('FB/Insta Whitelist clicked!')
    },
    {
      id: 4, 
      title: 'Channel Whitelist', 
      icon: <FiLink />, 
      description: 'Whitelist Your Artist Channel', 
      action: 'Submit Now',
      onClick: () => alert('Channel Whitelist clicked!')
    },
    {
      id: 5, 
      title: 'Song Takedown', 
      icon: <FiTrash2 />, 
      description: 'Takedown Song from All Stores', 
      action: 'Submit Request',
      onClick: () => alert('Song Takedown clicked!')
    },
    {
      id: 6, 
      title: 'Raise a Complaint', 
      icon: <FiMessageSquare />, 
      description: 'Any Issue or Help', 
      action: 'Submit Now',
      onClick: () => alert('Raise a Complaint clicked!')
    }
  ];

  // Rotating Earth Animation Component
  const RotatingEarth = () => (
    <div className="relative w-80 h-80 mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#005f73] via-[#0a9396] to-[#94d3ac] animate-spin-slow shadow-2xl">
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#005f73] via-[#0a9396] to-[#94d3ac] opacity-80">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
          {/* Continents */}
          <div className="absolute top-8 left-12 w-16 h-8 bg-green-600 rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute top-20 right-8 w-12 h-12 bg-green-700 rounded-full opacity-60"></div>
          <div className="absolute bottom-16 left-8 w-20 h-6 bg-green-600 rounded-full opacity-80"></div>
          <div className="absolute bottom-8 right-12 w-8 h-16 bg-green-700 rounded-full opacity-70"></div>
          {/* Clouds */}
          <div className="absolute top-4 left-20 w-8 h-4 bg-white rounded-full opacity-40 animate-float"></div>
          <div className="absolute top-12 right-16 w-6 h-3 bg-white rounded-full opacity-50 animate-float-delayed"></div>
          <div className="absolute bottom-20 left-16 w-10 h-5 bg-white rounded-full opacity-30 animate-float"></div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-full shadow-inner"></div>
    </div>
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setMobileView(isMobile);
      setIsSidebarOpen(!isMobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const sampleNotifications = [
      { id: 1, message: 'New royalty payment received', read: false },
      { id: 2, message: 'Your album is live on stores', read: false },
      { id: 3, message: 'CallerTune activation in progress', read: true },
    ];
    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.read).length);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => prev - 1);
  };

  const togglePlay = (songId) => {
    setIsPlaying(prev => ({ ...prev, [songId]: !prev[songId] }));
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
      `}</style>
      
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          toggleSidebar={toggleSidebar}
          sidebarOpen={isSidebarOpen}
          notifications={notifications}
          unreadCount={unreadCount}
          markAsRead={markAsRead}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 text-gray-800">
          {/* Welcome Section */}
          <div className="p-6 rounded-xl mb-6 bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white shadow-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex-1 mb-6 lg:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to The BLACK TURN Family</h1>
                <p className="mb-4 opacity-90">Team on 9817889799 currently unavailable. For Urgent Inquiries WhatsApp us at 📞 9817889799.</p>
                <a
                  href="https://wa.me/919817889799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-lg bg-white text-[#005f73] font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                >
                  Contact on WhatsApp
                </a>
              </div>
              <div className="hidden lg:block">
                <RotatingEarth />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="p-6 rounded-xl shadow-sm bg-white border border-gray-200 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {quickActions.map(action => (
              <div key={action.id} className="p-6 rounded-xl shadow-sm bg-white border border-gray-200 flex flex-col hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white">{action.icon}</div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">{action.title}</h3>
                    <p className="font-semibold text-[#005f73]">{action.price}</p>
                  </div>
                </div>
                <ul className="flex-1 space-y-2 mb-4">
                  {action.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheckCircle className="mt-1 mr-2 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={action.action}
                  className="mt-auto w-full py-3 rounded-lg bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  {action.title}
                </button>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Recent Songs Table */}
            <div className="p-6 rounded-xl shadow-sm bg-white border border-gray-200 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Songs</h3>
                <button className="px-4 py-2 rounded-lg border border-gray-200 text-[#005f73] hover:bg-gradient-to-r hover:from-[#005f73]/10 hover:to-[#0a9396]/10 transition-all duration-200">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left">Song</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Plays</th>
                      <th className="py-3 px-4 text-left">Revenue</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSongs.map((song, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-[#005f73]/5 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => togglePlay(song.isrc)}
                              className="p-2 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white hover:shadow-lg transition-all duration-200"
                            >
                              {isPlaying[song.isrc] ? <FiPause size={16} /> : <FiPlay size={16} />}
                            </button>
                            <div>
                              <p className="font-semibold">{song.name}</p>
                              <p className="text-sm text-gray-500">{song.artist}</p>
                              <p className="text-xs text-gray-500 font-mono">{song.isrc}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            song.status === 'Live' ? 'bg-green-100 text-green-800' :
                            song.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {song.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold">{song.plays}</td>
                        <td className="py-4 px-4 font-semibold text-green-600">{song.revenue}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Edit">
                              <FiEdit size={16} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Share">
                              <FiShare2 size={16} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Download">
                              <FiDownload size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="p-6 rounded-xl shadow-sm bg-white border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
              <div className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 hover:bg-[#005f73]/5 transition-colors cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        update.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        update.type === 'success' ? 'bg-green-100 text-green-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {update.type === 'warning' ? <FiAlertCircle size={16} /> :
                         update.type === 'success' ? <FiCheckCircle size={16} /> :
                         <FiUser size={16} />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-1">{update.subject}</p>
                        <p className="text-sm text-gray-500 mb-2">{update.message}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(update.time).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {serviceCards.map(service => (
              <div key={service.id} className="p-6 rounded-xl shadow-sm bg-white border border-gray-200 flex flex-col hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-[#005f73]/10 to-[#0a9396]/10 text-[#005f73]">{service.icon}</div>
                  <h3 className="text-lg font-semibold ml-3">{service.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4 flex-1">{service.description}</p>
                <button 
                  onClick={service.onClick}
                  className="w-full py-3 rounded-lg border-2 border-[#005f73] text-[#005f73] font-semibold hover:bg-gradient-to-r hover:from-[#005f73] hover:to-[#0a9396] hover:text-white transition-all duration-200 transform hover:scale-105"
                >
                  {service.action}
                </button>
              </div>
            ))}
          </div>

          {/* Sales by Country Section */}
          <div className="p-6 rounded-xl shadow-sm bg-white border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold mb-6">Sales by Country</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { country: 'United States', flag: '🇺🇸', sales: 2500, value: '$230,900', bounce: '29.9%' },
                { country: 'Germany', flag: '🇩🇪', sales: 3900, value: '$440,000', bounce: '40.22%' },
                { country: 'Great Britain', flag: '🇬🇧', sales: 1400, value: '$190,700', bounce: '23.44%' },
                { country: 'Brasil', flag: '🇧🇷', sales: 562, value: '$143,960', bounce: '32.14%' }
              ].map((country, index) => (
                <div key={index} className="p-4 rounded-lg border border-gray-200 hover:bg-[#005f73]/5 transition-colors">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{country.flag}</span>
                    <div>
                      <p className="font-semibold">{country.country}</p>
                      <p className="text-sm text-gray-500">Sales: {country.sales}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Value:</span>
                      <span className="font-semibold text-green-600">{country.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Bounce:</span>
                      <span className="font-semibold text-gray-500">{country.bounce}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="p-6 rounded-xl bg-white border border-gray-200 text-center">
            <p className="text-sm text-gray-500 mb-2">
              © 2025 BLACK TURN Music Distribution. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              For support: +91 9817889799 | Email: support@blackturn.com
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;