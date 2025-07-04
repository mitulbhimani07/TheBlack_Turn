import React, { useState } from 'react';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';
import { FiUpload, FiX, FiChevronRight, FiSearch, FiFilter } from 'react-icons/fi';

function Complaint() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-[#f6fafd] text-black">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col w-full">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          notifications={notifications}
          unreadCount={unreadCount}
          markAsRead={() => {}}
        />

        <main className="p-4 sm:p-6 flex-1 w-full">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 w-full overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl font-semibold text-[#005f73]">Your Recent Complaints</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 bg-[#005f73] text-white px-4 py-2 rounded-full hover:bg-[#014a5a] transition"
                >
                  <FiUpload size={16} />
                  New Complaint
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition sm:hidden"
                >
                  <FiFilter size={16} />
                  Filters
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="sm:hidden mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search complaints..."
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
              </div>
            </div>

            {/* Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} sm:block mb-4`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

                <div>
                  <label className="block font-semibold mb-1 text-[#333]">Filter by Complain Status:</label>
                  <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]">
                    <option>All</option>
                    <option>Required Attention</option>
                    <option>Processing</option>
                    <option>Closed</option>
                  </select>
                </div>

                <div className="hidden sm:block">
                  <label className="block font-semibold mb-1 text-[#333]">Search:</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Subject, Category, Status"
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]"
                    />
                    <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* Table View (Desktop Only) */}
            <div className="hidden sm:block overflow-x-auto">
              <div className="w-full">
                <div className="grid grid-cols-5 border-t border-b border-gray-200 py-2 font-semibold text-sm text-[#222] min-w-full">
                  <div className="p-2">Category</div>
                  <div className="p-2">Complain Date</div>
                  <div className="p-2">Subject</div>
                  <div className="p-2">Status</div>
                  <div className="p-2">Details</div>
                </div>

                {/* Table Rows */}
                <div className="w-full">
                  <div className="grid grid-cols-5 border-b border-gray-100 py-3 text-sm hover:bg-gray-50 min-w-full">
                    <div className="p-2 text-gray-700">Payment Issue</div>
                    <div className="p-2 text-gray-600">2023-10-15</div>
                    <div className="p-2 text-gray-800 font-medium">Withdrawal not processed</div>
                    <div className="p-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Processing</span>
                    </div>
                    <div className="p-2">
                      <button className="text-[#005f73] hover:text-[#014a5a] font-medium flex items-center gap-1">
                        View <FiChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 border-b border-gray-100 py-3 text-sm hover:bg-gray-50">
                    <div className="p-2 text-gray-700">Song Upload</div>
                    <div className="p-2 text-gray-600">2023-10-10</div>
                    <div className="p-2 text-gray-800 font-medium">Album not showing</div>
                    <div className="p-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Closed</span>
                    </div>
                    <div className="p-2">
                      <button className="text-[#005f73] hover:text-[#014a5a] font-medium flex items-center gap-1">
                        View <FiChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-4 mt-4">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mb-2 inline-block">Processing</span>
                    <h3 className="font-semibold text-gray-800">Withdrawal not processed</h3>
                  </div>
                  <button className="text-[#005f73]">
                    <FiChevronRight size={18} />
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-3">
                  <span>Payment Issue</span>
                  <span>2023-10-15</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mb-2 inline-block">Closed</span>
                    <h3 className="font-semibold text-gray-800">Album not showing</h3>
                  </div>
                  <button className="text-[#005f73]">
                    <FiChevronRight size={18} />
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-3">
                  <span>Song Upload</span>
                  <span>2023-10-10</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-lg p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
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
                <select required className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]">
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
                <select required className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]">
                  <option value="">Select Status</option>
                  <option>Required Attention</option>
                  <option>Processing</option>
                  <option>Closed</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Complain Date</label>
                <input type="date" required className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Subject</label>
                <input type="text" required placeholder="Enter subject" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]" />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">Details</label>
                <textarea rows="4" required placeholder="Write details here..." className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#005f73]"></textarea>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="bg-[#005f73] text-white px-6 py-2 rounded hover:bg-[#014a5a] transition w-full sm:w-auto">
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
