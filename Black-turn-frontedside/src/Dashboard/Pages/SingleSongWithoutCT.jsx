import React, { useState } from 'react'
import Navbar from '../Pages/header-sidebar/Header';
import Sidebar from '../Pages/header-sidebar/Sidebar';


function SingleSongWithoutCT() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
    

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

                <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar
                        toggleSidebar={toggleSidebar}
                        sidebarOpen={isSidebarOpen}
                        notifications={notifications}
                        unreadCount={unreadCount}
                        markAsRead={markAsRead}
                    />


                </div>
            </div>


        </>

    );
};

export default SingleSongWithoutCT