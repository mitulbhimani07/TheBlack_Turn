import React, { useState } from 'react';
import Sidebar from '../header-sidebar/Sidebar';
import Navbar from '../header-sidebar/Header';

export default function ArtistProfileLinkGeneration() {
  const [form, setForm] = useState({ song: '', artistProfile: '' });
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('profile-link');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => prev - 1);
  };

  const recentLinks = [
    {
      date: '2025-07-02',
      artistName: 'Arijit Singh',
      songs: 'Tum Hi Ho',
      facebook: 'https://facebook.com/arijitsingh',
      instagram: 'https://instagram.com/arijitsingh',
      status: 'Approved'
    },
    {
      date: '2025-07-01',
      artistName: 'Shreya Ghoshal',
      songs: 'Sun Raha Hai',
      facebook: 'https://facebook.com/shreyaghoshal',
      instagram: 'https://instagram.com/shreyaghoshal',
      status: 'Pending'
    },
    {
      date: '2025-06-29',
      artistName: 'KK',
      songs: 'Yaaron',
      facebook: 'https://facebook.com/kk',
      instagram: 'https://instagram.com/kk',
      status: 'Rejected'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  const filteredLinks = recentLinks.filter(link =>
    link.artistName.toLowerCase().includes(search.toLowerCase()) ||
    link.songs.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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

        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-[#004d66]">Artist Profile Link Submission</h2>
            <p className="mb-4 text-gray-700 text-sm sm:text-base">
              If your song is not linked to the correct artist profile, follow these simple steps:
            </p>
            <div className="mb-4 space-y-2 text-sm">
              <div className="bg-[#c8f4fd] px-4 py-2 rounded font-medium">
                <span className="font-bold">Step 1:</span> Select your song.
              </div>
              <div className="bg-[#c8f4fd] px-4 py-2 rounded font-medium">
                <span className="font-bold">Step 2:</span> Enter the correct artist profile.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-[#004d66]">Search or Select Songs:</label>
                <input
                  type="text"
                  name="song"
                  placeholder="Search and Select Songs"
                  value={form.song}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004d66]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#004d66] text-white py-2 rounded font-semibold hover:bg-[#222] transition"
              >
                Submit for Profile Link
              </button>
            </form>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
              <h3 className="text-lg font-semibold text-[#004d66]">
                Recent Artist Profile Link <span className="text-gray-500 font-normal">| Submitted by you</span>
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <select
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                    value={entriesPerPage}
                    onChange={e => setEntriesPerPage(Number(e.target.value))}
                  >
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                  <span className="text-sm text-gray-500">entries per page</span>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-300 rounded px-3 py-2 w-full sm:w-60"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#f5f8fa] text-[#004d66]">
                    <th className="py-2 px-4 font-semibold text-left">Date of Submission</th>
                    <th className="py-2 px-4 font-semibold text-left">Artist Name</th>
                    <th className="py-2 px-4 font-semibold text-left">Selected Songs</th>
                    <th className="py-2 px-4 font-semibold text-left">Facebook Link</th>
                    <th className="py-2 px-4 font-semibold text-left">Instagram Link</th>
                    <th className="py-2 px-4 font-semibold text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLinks.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-gray-500">No entries found</td>
                    </tr>
                  ) : (
                    filteredLinks.map((link, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="py-2 px-4">{link.date}</td>
                        <td className="py-2 px-4">{link.artistName}</td>
                        <td className="py-2 px-4">{link.songs}</td>
                        <td className="py-2 px-4">
                          <a href={link.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Facebook</a>
                        </td>
                        <td className="py-2 px-4">
                          <a href={link.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 underline">Instagram</a>
                        </td>
                        <td className="py-2 px-4">
                          <span className={
                            link.status === 'Approved'
                              ? 'text-green-600 font-semibold'
                              : link.status === 'Pending'
                                ? 'text-yellow-600 font-semibold'
                                : 'text-red-600 font-semibold'
                          }>
                            {link.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
