import React, { useState, useEffect } from 'react';
import { useTheme } from '../Pages/Context/ThemeContext';
import Navbar from '../Pages/header-sidebar/Header';
import Sidebar from '../Pages/header-sidebar/Sidebar';
import {
  FiMusic, FiUpload, FiDollarSign, FiYoutube, FiUser, FiAlertCircle,
  FiTrash2, FiLink, FiMessageSquare, FiCheckCircle
} from 'react-icons/fi';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const { currentTheme, toggleTheme } = useTheme();
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);

  const recentSongs = [
    {
      isrc: 'US-ABC-12-34567',
      name: 'Summer Vibes',
      artist: 'DJ Black',
      date: '2025-06-20',
      status: 'Live',
      payment: 'Pending',
      platforms: ['Spotify', 'Apple', 'YT Music']
    },
    {
      isrc: 'US-ABC-12-34568',
      name: 'Midnight Dreams',
      artist: 'DJ Black ft. Maria',
      date: '2025-06-15',
      status: 'Processing',
      payment: 'Paid',
      platforms: ['Spotify', 'Apple']
    },
    {
      isrc: 'US-ABC-12-34569',
      name: 'Urban Life',
      artist: 'Black Turn Collective',
      date: '2025-06-10',
      status: 'Live',
      payment: 'Paid',
      platforms: ['All Platforms']
    }
  ];

  const recentUpdates = [
    {
      time: '2025-06-26 14:53:36',
      subject: 'Fill the NOC Form',
      message: 'Please upload your NOC to proceed with releases.'
    },
    {
      time: '2025-06-25 11:20:15',
      subject: 'New Feature Available',
      message: 'You can now bulk upload up to 7 songs at once.'
    },
    {
      time: '2025-06-24 09:45:30',
      subject: 'Payment Processed',
      message: 'Your royalties for May have been processed.'
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
      ]
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
      ]
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
      ]
    }
  ];

  const serviceCards = [
    {
      id: 1, title: 'YouTube Claim Release', icon: <FiYoutube />, description: 'Remove Claim from Your video', action: 'Submit Link'
    },
    {
      id: 2, title: 'Artist Profile Link', icon: <FiUser />, description: 'Link Your Correct Artist Profile', action: 'Request Now'
    },
    {
      id: 3, title: 'FB/Insta Whitelist', icon: <FiAlertCircle />, description: 'Remove Claims from Reels', action: 'Submit Now'
    },
    {
      id: 4, title: 'Channel Whitelist', icon: <FiLink />, description: 'Whitelist Your Artist Channel', action: 'Submit Now'
    },
    {
      id: 5, title: 'Song Takedown', icon: <FiTrash2 />, description: 'Takedown Song from All Stores', action: 'Submit Request'
    },
    {
      id: 6, title: 'Raise a Complaint', icon: <FiMessageSquare />, description: 'Any Issue or Help', action: 'Submit Now'
    }
  ];

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

  return (
    <div className={`${currentTheme.background} min-h-screen flex transition-colors duration-300`}>
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTheme={currentTheme}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          toggleSidebar={toggleSidebar}
          sidebarOpen={isSidebarOpen}
          notifications={notifications}
          unreadCount={unreadCount}
          markAsRead={markAsRead}
          toggleTheme={toggleTheme}
          currentTheme={currentTheme}
        />

        <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${currentTheme.text}`}>
          <div className={`p-6 rounded-xl mb-6 ${currentTheme.primaryLight} ${currentTheme.primaryText}`}>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome to The BLACK TURN Family</h1>
            <p className="mt-2">Team on 9817889799 currently unavailable. For Urgent Inquiries WhatsApp us at 📞 9817889799.</p>
            <a
              href="https://wa.me/919817889799"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-4 py-2 rounded-lg bg-green-500 text-white"
            >
              Contact on WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {quickActions.map(action => (
              <div key={action.id} className={`p-6 rounded-xl shadow-sm ${currentTheme.card} border ${currentTheme.border} flex flex-col`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full ${currentTheme.primaryLight} ${currentTheme.primaryText}`}>{action.icon}</div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">{action.title}</h3>
                    <p className={`font-semibold ${currentTheme.primaryText}`}>{action.price}</p>
                  </div>
                </div>
                <ul className="flex-1 space-y-2 mb-4">
                  {action.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheckCircle className={`mt-1 mr-2 ${currentTheme.primaryText}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`mt-auto w-full py-2 rounded-lg ${currentTheme.accent} text-white`}>
                  {action.title}
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className={`p-6 rounded-xl shadow-sm ${currentTheme.card} border ${currentTheme.border} lg:col-span-2`}>
              <h3 className="text-lg font-semibold mb-4">Recent Songs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className={`border-b ${currentTheme.border}`}>
                      <th className="py-3 px-4 text-left">ISRC</th>
                      <th className="py-3 px-4 text-left">Song Name</th>
                      <th className="py-3 px-4 text-left">Primary Artist</th>
                      <th className="py-3 px-4 text-left">Release Date</th>
                      <th className="py-3 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSongs.map((song, index) => (
                      <tr key={index} className={`border-b ${currentTheme.border}`}>
                        <td className="py-3 px-4 font-mono">{song.isrc}</td>
                        <td className="py-3 px-4">{song.name}</td>
                        <td className="py-3 px-4">{song.artist}</td>
                        <td className="py-3 px-4">{song.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            song.status === 'Live' ? 'bg-green-100 text-green-800' :
                            song.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {song.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={`p-6 rounded-xl shadow-sm ${currentTheme.card} border ${currentTheme.border}`}>
              <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
              <div className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="pb-4 border-b last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{update.subject}</p>
                        <p className={`text-sm ${currentTheme.textSecondary}`}>{update.message}</p>
                      </div>
                      <span className={`text-xs ${currentTheme.textSecondary}`}>
                        {new Date(update.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {serviceCards.map(service => (
              <div key={service.id} className={`p-4 rounded-xl shadow-sm ${currentTheme.card} border ${currentTheme.border} flex flex-col`}>
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-full ${currentTheme.primaryLight} ${currentTheme.primaryText}`}>{service.icon}</div>
                  <h3 className="text-lg font-semibold ml-3">{service.title}</h3>
                </div>
                <p className={`text-sm ${currentTheme.textSecondary} mb-4`}>{service.description}</p>
                <button className={`mt-auto w-full py-2 rounded-lg border ${currentTheme.border} ${currentTheme.accentText}`}>
                  {service.action}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
