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
                <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg lg:static lg:translate-x-0 transition-transform">
                    <Sidebar isOpen={isSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
                </aside>
            )}

            <div className="flex flex-col flex-1 transition-all duration-300">
                <Navbar
                    toggleSidebar={toggleSidebar}
                    sidebarOpen={isSidebarOpen}
                    notifications={notifications}
                    unreadCount={unreadCount}
                    markAsRead={markAsRead}
                />

                <main className="p-6">
                    <h1 className="text-2xl font-semibold text-[#004d66] mb-4">
                        Submit Facebook & Instagram Whitelist Request
                    </h1>

                    {/* Info Box */}
                    <div className="bg-cyan-100 border border-cyan-300 rounded-xl p-4 mb-6 text-sm leading-relaxed">
                        <p className="font-semibold text-[#BB3E00] mb-1">📢 What is Facebook & Instagram Whitelist?</p>
                        <p className="text-gray-700">
                            Whitelisting means that <strong>claims will not be applied</strong> to your selected Facebook Page & Instagram Profile.
                            <br />
                            ✅ Once approved, <strong>your page/profile will not receive Content ID claims</strong>, but other pages and profiles will still get claims.
                            <br />
                            ⚠️ <span className="text-red-600 font-medium">If you do not own the page/profile, make sure you have legal rights. False whitelisting requests may lead to account suspension.</span>
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
                        <div className="mb-4">
                            <label className="block font-medium text-gray-800 mb-1">Facebook Page URL</label>
                            <input
                                type="text"
                                value={fbPageUrl}
                                onChange={(e) => setFbPageUrl(e.target.value)}
                                placeholder="Enter your Facebook *Page* link only (No Video Links)"
                                className="w-full px-4 py-2 border border-[#004d66] rounded-lg shadow-sm text-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium text-gray-800 mb-1">Instagram Profile URL</label>
                            <input
                                type="text"
                                value={instaProfileUrl}
                                onChange={(e) => setInstaProfileUrl(e.target.value)}
                                placeholder="Enter your Instagram *Profile* link only (No Reel/Video Links)"
                                className="w-full px-4 py-2 border border-[#004d66] rounded-lg shadow-sm text-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium text-gray-800 mb-1">Additional Message (Optional)</label>
                            <textarea
                                value={additionalMessage}
                                onChange={(e) => setAdditionalMessage(e.target.value)}
                                placeholder="If you have any additional details, mention here."
                                rows={3}
                                className="w-full px-4 py-2 border border-[#004d66] rounded-lg shadow-sm text-sm"
                            />
                        </div>

                        <button className="w-full bg-[#004d66] text-white font-medium py-2 rounded-lg hover:bg-[#1a282d] transition">
                            Submit Whitelist Request
                        </button>
                    </div>

                    {/* Submitted Requests Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-[#004d66] mb-4">Recent Submitted Requests</h2>
                        <div className="overflow-auto">
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
                                                <td className="border-2 border-[#004d66] px-4 py-2 break-all">{request.fbPageUrl}</td>
                                                <td className="border-2 border-[#004d66] px-4 py-2 break-all">{request.instaProfileUrl}</td>
                                                <td className="border-2 border-[#004d66] px-4 py-2">{request.additionalMessage}</td>
                                                <td className="border-2 border-[#004d66] px-4 py-2">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${request.status === "Approved"
                                                        ? "bg-green-100 text-green-700"
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
                    </div>
                </main>
            </div>
        </div>
    );
}
