import React, { useState, useEffect } from 'react';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';

export default function TakedownRequest() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeTab, setActiveTab] = useState('takedown-request');
    const [isMobile, setIsMobile] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => prev - 1);
    };

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            setIsSidebarOpen(!mobile);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const takedownRequests = [
        {
            id: 1,
            date: '2025-07-01',
            reason: 'Copyright Violation',
            selectedSongs: 'My First Song, Summer Beats',
            status: 'Pending'
        },
        {
            id: 2,
            date: '2025-06-25',
            reason: 'Unauthorized Upload',
            selectedSongs: 'Chill Vibes',
            status: 'Approved'
        },
        {
            id: 3,
            date: '2025-06-20',
            reason: 'Plagiarized Content',
            selectedSongs: 'Ocean Drive Remix',
            status: 'Rejected'
        },
        {
            id: 4,
            date: '2025-06-18',
            reason: 'Rights Dispute',
            selectedSongs: 'Lofi Dreams',
            status: 'Pending'
        },
        {
            id: 5,
            date: '2025-06-10',
            reason: 'Duplicate Submission',
            selectedSongs: 'Indie Rock Vibes',
            status: 'Approved'
        },
        {
            id: 6,
            date: '2025-06-05',
            reason: 'Fake Artist Name',
            selectedSongs: 'Morning Energy',
            status: 'Pending'
        },
        {
            id: 7,
            date: '2025-05-30',
            reason: 'Unlicensed Sample',
            selectedSongs: 'Night Drive',
            status: 'Rejected'
        },
        {
            id: 8,
            date: '2025-05-28',
            reason: 'Impersonation',
            selectedSongs: 'Bass Booster Vol 2',
            status: 'Approved'
        },
        {
            id: 9,
            date: '2025-05-15',
            reason: 'Mismatched Metadata',
            selectedSongs: 'Focus Flow',
            status: 'Pending'
        },
        {
            id: 10,
            date: '2025-05-10',
            reason: 'False Attribution',
            selectedSongs: 'Silent Echoes',
            status: 'Approved'
        }
    ];

    return (
         <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

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

        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-lg font-semibold text-[#004d66]">
                No Songs Published <span className="text-sm text-gray-500">by You</span>
              </h2>
              <button className="bg-black text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Upload New Song
              </button>
            </div>

            <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded-md flex justify-between items-start text-sm">
              <p>None of your song has been Delivered yet.</p>
              <button className="text-xl font-bold text-blue-500 hover:text-blue-700">×</button>
            </div>

            <p className="mt-3 text-sm text-gray-600">
              Incase, you have uploaded the song. Click <a href="/#/all-releases" className="text-blue-600 underline">Check Song Status</a>. If the Song Status is Completed. Then please <span className="text-blue-600 underline cursor-pointer">Raise a Complain</span>.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-lg font-semibold text-[#004d66]">
                Recent Song Takedown Requests <span className="text-sm text-gray-500">| Submitted by you</span>
              </h2>
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 px-3 py-1.5 rounded-md text-sm w-full sm:w-auto"
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <label htmlFor="entries" className="text-sm text-gray-600">Show</label>
              <select id="entries" className="border border-gray-300 px-2 py-1 text-sm rounded-md">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-sm text-gray-600">entries per page</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm text-center">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="border px-4 py-2">Date of Submission</th>
                    <th className="border px-4 py-2">Reason</th>
                    <th className="border px-4 py-2">Selected Songs</th>
                    <th className="border px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {takedownRequests.map((req, index) => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{req.date}</td>
                      <td className="border px-4 py-2">{req.reason}</td>
                      <td className="border px-4 py-2">{req.selectedSongs}</td>
                      <td className="border px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${req.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : req.status === 'Rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
    );
}
