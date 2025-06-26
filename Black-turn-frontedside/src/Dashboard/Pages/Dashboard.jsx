import React, { useState } from 'react';
import Navbar from '../Pages/header-sidebar/Header'; // Adjust path as needed
import Sidebar from '../Pages/header-sidebar/Sidebar'; // Adjust path as needed
import { useTheme } from '../Pages/Context/ThemeContext'; // Adjust path as needed

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { currentTheme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`${currentTheme.primary} min-h-screen flex`}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} sidebarOpen={isSidebarOpen} />

        {/* Main Dashboard Content */}
        <main className={`flex-1 p-6 ${currentTheme.text}`}>
          <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
          <p className={`${currentTheme.textSecondary} mb-4`}>
            This is your dashboard main content area. Try changing themes using the palette icon in the navbar.
          </p>

          {/* Sample Card */}
          <div className={`p-6 rounded-xl shadow-md ${currentTheme.card} border ${currentTheme.border}`}>
            <h2 className="text-xl font-semibold mb-2">Sample Card</h2>
            <p className={`${currentTheme.textSecondary}`}>
              This is a sample card styled using the selected theme.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
