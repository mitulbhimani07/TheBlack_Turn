import React, { useState } from 'react';
import Sidebar from '../header-sidebar/Sidebar';
import Navbar from '../header-sidebar/Header';

export default function CreateANewArtistProfile() {
  // Example state for form fields
  const [form, setForm] = useState({
    songs: '',
    artist: '',
    bio: '',
    era: '',
    language: '',
    genre: '',
    origin: '',
    file: null,
  });

const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
    

      const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => prev - 1);
  };

  // Static data for table
  const recentArtists = [
    {
      date: '2025-07-01',
      artistName: 'Arijit Singh',
      songs: 'Tum Hi Ho, Channa Mereya',
      status: 'Approved',
    },
    {
      date: '2025-06-28',
      artistName: 'Shreya Ghoshal',
      songs: 'Sun Raha Hai, Teri Meri',
      status: 'Pending',
    },
    {
      date: '2025-06-20',
      artistName: 'KK',
      songs: 'Yaaron, Tadap Tadap',
      status: 'Rejected',
    },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
                <Sidebar
                    isOpen={isSidebarOpen}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                      <div className="flex-1 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50">
          <Navbar
            toggleSidebar={toggleSidebar}
            sidebarOpen={isSidebarOpen}
            notifications={notifications}
            unreadCount={unreadCount}
            markAsRead={markAsRead}
          />
        </div>


        {/* Content Wrapper */}
        <div className="p-6 w-full mx-auto">
          {/* Card */}
          <div className="bg-white rounded-lg shadow p-6 md:p-8 mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#004d66]">Create a New Artist Page</h2>
            <div className="bg-green-100 border border-green-100 text-[#004d66] px-4 py-4 rounded mb-6 text-sm">
              <b>Artist Profile Image Guide.</b> 1500x1500px (need front facing &amp; clear image of Artist with Name). Artist should not wear sunglasses or specs; eyes and face must be clearly visible.
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Songs */}
              <div>
                <label className="block font-medium mb-1 text-[#004d66]">Select Songs:</label>
                <input
                  type="text"
                  name="songs"
                  placeholder="Select Songs"
                  value={form.songs}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004d66]"
                />
              </div>
              {/* Row: File, Artist, Bio */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block font-medium mb-1 text-[#004d66]">
                    Upload Your <span className="font-normal text-gray-500">(Artist Profile)</span> Picture
                  </label>
                  <input
                    type="file"
                    name="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Size must be 1500x1500px. Choose (.jpg, .png, .jpeg) Only
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1 text-[#004d66]">Select Artist</label>
                  <select
                    name="artist"
                    value={form.artist}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Select Artist</option>
                    <option value="Gfh">Gfh</option>
                    {/* Add more options here */}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1 text-[#004d66]">Artist Bio</label>
                  <input
                    type="text"
                    name="bio"
                    placeholder="Artist Bio"
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
              {/* Row: Era, Language, Genre, Origin */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block font-medium mb-1 text-[#004d66]">Era</label>
                  <input
                    type="text"
                    name="era"
                    placeholder="Song Published Year"
                    value={form.era}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1 text-[#004d66]">Language</label>
                  <select
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Select Language</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    {/* Add more options */}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1 text-[#004d66]">Genre</label>
                  <select
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Select Genre</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    {/* Add more options */}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1 text-[#004d66]">Origin</label>
                  <input
                    type="text"
                    name="origin"
                    placeholder="Country of Origin"
                    value={form.origin}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#004d66] text-white py-2 rounded font-semibold hover:bg-[#000] transition"
              >
                Create a New Artist Page
              </button>
            </form>
          </div>

          {/* Recent Artist Pages Table */}
          <div className="bg-white rounded-lg shadow p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#004d66]">
                Recent Artist Pages <span className="font-normal text-gray-500">| Created by you</span>
              </h3>
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded px-3 py-2 w-48"
              />
            </div>
            <div className="flex items-center mb-2">
              <select className="border border-gray-300 rounded px-2 py-1 text-sm mr-2">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <span className="text-sm text-gray-500">entries per page</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#004d66] text-[#fff]">
                    <th className="py-2 px-4 font-semibold text-left">Date of Submission</th>
                    <th className="py-2 px-4 font-semibold text-left">Artist Name</th>
                    <th className="py-2 px-4 font-semibold text-left">Selected Songs</th>
                    <th className="py-2 px-4 font-semibold text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentArtists.length === 0 ? (
                    <tr>
                      <td className="py-2 px-4 text-gray-500" colSpan={4}>No entries found</td>
                    </tr>
                  ) : (
                    recentArtists.map((artist, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="py-2 px-4">{artist.date}</td>
                        <td className="py-2 px-4">{artist.artistName}</td>
                        <td className="py-2 px-4">{artist.songs}</td>
                        <td className="py-2 px-4">
                          <span className={
                            artist.status === 'Approved'
                              ? 'text-green-600 font-semibold'
                              : artist.status === 'Pending'
                              ? 'text-yellow-600 font-semibold'
                              : 'text-red-600 font-semibold'
                          }>
                            {artist.status}
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
