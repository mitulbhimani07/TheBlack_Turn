import React, { useState } from 'react';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';
import { FiUpload, FiX } from 'react-icons/fi';

function Complaint() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('complaints');
  const [showModal, setShowModal] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission here
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f6fafd] text-black">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          notifications={notifications}
          unreadCount={unreadCount}
          markAsRead={() => {}}
        />

        <div className="p-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#005f73]">Your Recent Complaints</h2>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-[#005f73] text-white px-4 py-2 rounded-full hover:bg-[#014a5a] transition"
              >
                <FiUpload size={16} />
                New Complain
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Category Filter */}
              <div>
                <label className="block font-semibold mb-1 text-[#333]">Filter by Category:</label>
                <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]">
                  <option>All</option>
                  <option>General</option>
                  <option>MemberShip</option>
                  <option>Copyright Issue</option>
                  <option>Song upload Issue</option>
                  <option>Caller Tune Help</option>
                  <option>Take Down Request</option>
                  <option>Withdraw Money</option>
                  <option>Payment Issue</option>
                  <option>Payment Status</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block font-semibold mb-1 text-[#333]">Filter by Complain Status:</label>
                <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]">
                  <option>All</option>
                  <option>Required Attention</option>
                  <option>Processing</option>
                  <option>Closed</option>
                </select>
              </div>

              {/* Search */}
              <div>
                <label className="block font-semibold mb-1 text-[#333]">Search:</label>
                <input
                  type="text"
                  placeholder="Search Complain Subject, Category, Status"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]"
                />
              </div>
            </div>

            {/* Table Headings */}
            <div className="grid grid-cols-5 border-t border-b border-gray-200 py-2 font-semibold text-sm text-[#222]">
              <div>Category</div>
              <div>Complain Date</div>
              <div>Subject</div>
              <div>Complain Status</div>
              <div>Details</div>
            </div>

            {/* No Data Placeholder */}
            <div className="text-center py-6 text-gray-500">
              No complaints found.
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <FiX size={20} />
            </button>
            <h3 className="text-lg font-bold mb-4 text-[#005f73]">New Complaint</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]" required>
                  <option value="">Select Category</option>
                  <option>General</option>
                  <option>MemberShip</option>
                  <option>Copyright Issue</option>
                  <option>Song upload Issue</option>
                  <option>Caller Tune Help</option>
                  <option>Take Down Request</option>
                  <option>Withdraw Money</option>
                  <option>Payment Issue</option>
                  <option>Payment Status</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Complain Status</label>
                <select className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]" required>
                  <option value="">Select Status</option>
                  <option>Required Attention</option>
                  <option>Processing</option>
                  <option>Closed</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Complain Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Subject</label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">Details</label>
                <textarea
                  rows="4"
                  placeholder="Write details here..."
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]"
                  required
                ></textarea>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#005f73] text-white px-6 py-2 rounded hover:bg-[#014a5a] transition"
                >
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Complaint;
