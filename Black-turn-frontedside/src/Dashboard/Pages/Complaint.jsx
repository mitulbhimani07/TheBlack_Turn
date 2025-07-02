import React, { useState } from 'react'
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';

function Complaint() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('complaints');


  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => prev - 1);
  };

  return (
    <>
      <div className="min-h-screen flex bg-gray-50">

        <Sidebar
          isOpen={isSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        // onCloseSidebar={closeSideba.r}
        />
        <div className="flex-1 flex flex-col min-h-screen">
          <div className="sticky top-0 z-50">
            <Navbar
              toggleSidebar={toggleSidebar}
              sidebarOpen={isSidebarOpen}
              notifications={notifications}
              unreadCount={unreadCount}
              markAsRead={markAsRead}
            />
          </div>


        </div>
      </div>
    </>
  )
}

export default Complaint