import React, { useState, useEffect } from 'react';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';

export default function FBInstaPageWhitelist() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeTab, setActiveTab] = useState('fb-insta-page');
    const [isMobile, setIsMobile] = useState(false);

    const [fbPageUrl, setFbPageUrl] = useState('');
    const [instaProfileUrl, setInstaProfileUrl] = useState('');
    const [additionalMessage, setAdditionalMessage] = useState('');

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

    const [submittedRequests, setSubmittedRequests] = useState([
        {
            id: 1,
            fbPageUrl: "https://facebook.com/samplepage",
            instaProfileUrl: "https://instagram.com/sampleprofile",
            additionalMessage: "Testing whitelist submission.",
            status: "Approved",
            submittedOn: "2025-07-02",
        },
        {
            id: 2,
            fbPageUrl: "https://facebook.com/musicwaveofficial",
            instaProfileUrl: "https://instagram.com/musicwave.in",
            additionalMessage: "Official artist page for music releases.",
            status: "Pending",
            submittedOn: "2025-07-01",
        },
        {
            id: 3,
            fbPageUrl: "https://facebook.com/thecomedynation",
            instaProfileUrl: "https://instagram.com/comedy.nation",
            additionalMessage: "Owned by creator. Requires whitelisting to avoid copyright flags.",
            status: "Rejected",
            submittedOn: "2025-06-29",
        },
        {
            id: 4,
            fbPageUrl: "https://facebook.com/gaminghubofficial",
            instaProfileUrl: "https://instagram.com/gaminghub_live",
            additionalMessage: "",
            status: "Approved",
            submittedOn: "2025-06-25",
        },
        {
            id: 5,
            fbPageUrl: "https://facebook.com/fashionbydivya",
            instaProfileUrl: "https://instagram.com/divyas.style",
            additionalMessage: "Fashion and lifestyle influencer.",
            status: "Pending",
            submittedOn: "2025-06-22",
        },
    ]);

    return (
        <div className="min-h-screen flex bg-gray-50 relative">
            {isSidebarOpen && (
                <Sidebar isOpen={isSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
            )}

            <div className="flex flex-col flex-1 transition-all duration-300">
                <Navbar
                    toggleSidebar={toggleSidebar}
                    sidebarOpen={isSidebarOpen}
                    notifications={notifications}
                    unreadCount={unreadCount}
                    markAsRead={markAsRead}
                />

                <main className="p-3 sm:p-4 lg:p-6">
                    <h1 className="text-xl sm:text-2xl font-semibold text-[#004d66] mb-4 sm:mb-6">
                        Submit Facebook & Instagram Whitelist Request
                    </h1>

                    {/* Info Box */}
                    <div className="bg-cyan-100 border border-cyan-300 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-sm leading-relaxed">
                        <p className="font-semibold text-[#BB3E00] mb-1">📢 What is Facebook & Instagram Whitelist?</p>
                        <p className="text-gray-700 text-xs sm:text-sm">
                            Whitelisting means that <strong>claims will not be applied</strong> to your selected Facebook Page & Instagram Profile.
                            <br />
                            ✅ Once approved, <strong>your page/profile will not receive Content ID claims</strong>, but other pages and profiles will still get claims.
                            <br />
                            ⚠️ <span className="text-red-600 font-medium">If you do not own the page/profile, make sure you have legal rights. False whitelisting requests may lead to account suspension.</span>
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium text-gray-800 mb-1 text-sm sm:text-base">Facebook Page URL</label>
                                <input
                                    type="text"
                                    value={fbPageUrl}
                                    onChange={(e) => setFbPageUrl(e.target.value)}
                                    placeholder="Enter your Facebook *Page* link only (No Video Links)"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#004d66] rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#004d66] focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-gray-800 mb-1 text-sm sm:text-base">Instagram Profile URL</label>
                                <input
                                    type="text"
                                    value={instaProfileUrl}
                                    onChange={(e) => setInstaProfileUrl(e.target.value)}
                                    placeholder="Enter your Instagram *Profile* link only (No Reel/Video Links)"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#004d66] rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#004d66] focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-gray-800 mb-1 text-sm sm:text-base">Additional Message (Optional)</label>
                                <textarea
                                    value={additionalMessage}
                                    onChange={(e) => setAdditionalMessage(e.target.value)}
                                    placeholder="If you have any additional details, mention here."
                                    rows={3}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#004d66] rounded-lg shadow-sm text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#004d66] focus:border-transparent"
                                />
                            </div>

                            <button className="w-full bg-[#004d66] text-white font-medium py-2 sm:py-3 rounded-lg hover:bg-[#1a282d] transition text-sm sm:text-base">
                                Submit Whitelist Request
                            </button>
                        </div>
                    </div>

                    {/* Submitted Requests Section */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#004d66] mb-4 sm:mb-6">Recent Submitted Requests</h2>
                        
                        {/* Desktop Table View */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="min-w-full border text-sm text-center">
                                <thead className="bg-[#004d66] text-white font-semibold">
                                    <tr>
                                        <th className="border-2 border-[#004d66] px-4 py-2">ID</th>
                                        <th className="border-2 border-[#004d66] px-4 py-2">Facebook Page URL</th>
                                        <th className="border-2 border-[#004d66] px-4 py-2">Instagram Profile URL</th>
                                        <th className="border-2 border-[#004d66] px-4 py-2">Additional Message</th>
                                        <th className="border-2 border-[#004d66] px-4 py-2">Status</th>
                                        <th className="border-2 border-[#004d66] px-4 py-2">Submitted On</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {submittedRequests.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="border px-4 py-4 text-gray-500">
                                                No requests submitted yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        submittedRequests.map((request) => (
                                            <tr key={request.id}>
                                                <td className="border-2 border-[#004d66] px-4 py-2">{request.id}</td>
                                                <td className="border-2 border-[#004d66] px-4 py-2 break-all max-w-xs">{request.fbPageUrl}</td>
                                                <td className="border-2 border-[#004d66] px-4 py-2 break-all max-w-xs">{request.instaProfileUrl}</td>
                                                <td className="border-2 border-[#004d66] px-4 py-2 max-w-xs">{request.additionalMessage || '-'}</td>
                                                <td className="border-2 border-[#004d66] px-4 py-2">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                                        request.status === "Approved"
                                                            ? "bg-green-100 text-green-700"
                                                            : request.status === "Rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}>
                                                        {request.status}
                                                    </span>
                                                </td>
                                                <td className="border-2 border-[#004d66] px-4 py-2">{request.submittedOn}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="lg:hidden space-y-4">
                            {submittedRequests.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No requests submitted yet.
                                </div>
                            ) : (
                                submittedRequests.map((request) => (
                                    <div key={request.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-medium text-gray-600">Request #{request.id}</span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                request.status === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : request.status === "Rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                                {request.status}
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-xs font-medium text-gray-600">Facebook Page:</span>
                                                <p className="text-sm text-gray-800 break-all">{request.fbPageUrl}</p>
                                            </div>
                                            
                                            <div>
                                                <span className="text-xs font-medium text-gray-600">Instagram Profile:</span>
                                                <p className="text-sm text-gray-800 break-all">{request.instaProfileUrl}</p>
                                            </div>
                                            
                                            {request.additionalMessage && (
                                                <div>
                                                    <span className="text-xs font-medium text-gray-600">Additional Message:</span>
                                                    <p className="text-sm text-gray-800">{request.additionalMessage}</p>
                                                </div>
                                            )}
                                            
                                            <div>
                                                <span className="text-xs font-medium text-gray-600">Submitted On:</span>
                                                <p className="text-sm text-gray-800">{request.submittedOn}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}