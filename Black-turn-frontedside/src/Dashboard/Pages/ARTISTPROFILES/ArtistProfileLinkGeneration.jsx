import React, { useState } from 'react';
import Sidebar from '../header-sidebar/Sidebar';
import Navbar from '../header-sidebar/Header';

export default function ArtistProfileLinkGeneration() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [form, setForm] = useState({ song: '', artistProfile: '' });
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [search, setSearch] = useState('');

  // Static data for the table
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
    // Submit logic here
  };

  // Filtered data for search (optional)
  const filteredLinks = recentLinks.filter(link =>
    link.artistName.toLowerCase().includes(search.toLowerCase()) ||
    link.songs.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-[#f5f8fa] relative">
      {/* Sidebar */}
      {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} />
        
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} sidebarOpen={isSidebarOpen} />

        <div className="p-4 md:p-6 w-full mx-auto">
          {/* Link Submission Card */}
          <div className="bg-white rounded-lg shadow p-6 md:p-8 mb-8">
            <h2 className="text-lg md:text-xl font-bold mb-2 text-[#004d66]">Artist Profile Link Submission</h2>
            <p className="mb-4 text-gray-700">
              If your song is not linked to the correct artist profile, follow these simple steps:
            </p>
            <div className="mb-3 space-y-2">
              <div className="bg-[#c8f4fd] px-4 py-2 rounded font-medium">
                <span className="font-bold">Step 1:</span> Select your song.
              </div>
              <div className="bg-[#c8f4fd] px-4 py-2 rounded font-medium">
                <span className="font-bold">Step 2:</span> Enter the correct artist profile where you want the song to be linked.
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

          {/* Recent Artist Profile Link Table */}
          <div className="bg-white rounded-lg shadow p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#004d66] mb-2 md:mb-0">
                Recent Artist Profile Link <span className="font-normal text-gray-500">| Submitted by you</span>
              </h3>
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
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-300 rounded px-3 py-2 ml-4"
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
                      <td className="py-2 px-4 text-gray-500" colSpan={6}>No entries found</td>
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
