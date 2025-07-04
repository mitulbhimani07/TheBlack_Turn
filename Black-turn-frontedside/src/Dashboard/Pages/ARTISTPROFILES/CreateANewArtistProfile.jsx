import React, { useState } from 'react';
import Sidebar from '../header-sidebar/Sidebar';
import Navbar from '../header-sidebar/Header';

export default function CreateANewArtistProfile() {
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
    // Submit logic here
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
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

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          {/* Form Card */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-[#004d66]">
              Create a New Artist Page
            </h2>
            <div className="bg-green-100 border border-green-100 text-[#004d66] px-3 py-3 rounded mb-6 text-sm">
              <b>Artist Profile Image Guide.</b> 1500x1500px front-facing clear image of artist with name.
              No sunglasses/specs; eyes and face must be visible.
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Songs Field */}
              <div>
                <label className="block font-medium mb-1 text-[#004d66]">Select Songs:</label>
                <input
                  type="text"
                  name="songs"
                  placeholder="Enter song names"
                  value={form.songs}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004d66]"
                />
              </div>

              {/* Row: File, Artist, Bio */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <label className="block font-medium mb-1 text-[#004d66]">
                    Upload Artist <span className="font-normal text-gray-500">(Profile Picture)</span>
                  </label>
                  <input
                    type="file"
                    name="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    1500x1500px. Format: .jpg, .jpeg, .png
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
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1 text-[#004d66]">Artist Bio</label>
                  <input
                    type="text"
                    name="bio"
                    placeholder="Enter bio"
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>

              {/* Row: Era, Language, Genre, Origin */}
              <div className="flex flex-col lg:flex-row gap-4">
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
                className="w-full bg-[#004d66] text-white py-2 rounded font-semibold hover:bg-black transition"
              >
                Create a New Artist Page
              </button>
            </form>
          </div>

          {/* Recent Artists Table */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h3 className="text-lg font-semibold text-[#004d66]">
                Recent Artist Pages <span className="text-gray-500 font-normal">| Created by you</span>
              </h3>
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded px-3 py-2 w-full sm:w-48"
              />
            </div>
            <div className="flex items-center mb-2 gap-2">
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <span className="text-sm text-gray-500">entries per page</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#004d66] text-white">
                    <th className="py-2 px-4 text-left font-semibold">Date of Submission</th>
                    <th className="py-2 px-4 text-left font-semibold">Artist Name</th>
                    <th className="py-2 px-4 text-left font-semibold">Selected Songs</th>
                    <th className="py-2 px-4 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentArtists.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-gray-500">No entries found</td>
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
