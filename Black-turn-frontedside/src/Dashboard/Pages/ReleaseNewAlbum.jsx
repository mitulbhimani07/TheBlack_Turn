import React, { useState, useEffect } from 'react';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';
import { ChevronDown, ChevronUp, User, Wallet } from 'lucide-react';
import visa from '../../assets/images/payment-platform/Visa.png';
import mastercard from '../../assets/images/payment-platform/mastercard.png';
import maestro from '../../assets/images/payment-platform/maestro.png';
import rupay from '../../assets/images/payment-platform/rupay.png';
import emi from '../../assets/images/payment-platform/emi.png';
import upi from '../../assets/images/payment-platform/upi.png';
import netbanking from '../../assets/images/payment-platform/netbanking.png';
import phonepe from '../../assets/images/payment-platform/phonepe.png';
import googlepay from '../../assets/images/payment-platform/gpay.png';

export default function ReleaseNewAlbum() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeTab, setActiveTab] = useState('new-album');
    const [isMobile, setIsMobile] = useState(false);

    // ✅ Unified accordion toggle state
    const [openAccordion, setOpenAccordion] = useState(null);

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => prev - 1);
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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

    const toggleAccordion = (key) => {
        setOpenAccordion(openAccordion === key ? null : key);
    };

    return (
        <div className="min-h-screen flex bg-gray-50 relative">
            {/* Sidebar */}
            {isSidebarOpen && (
                // <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg lg:static lg:translate-x-0 transition-transform">
                    <Sidebar isOpen={isSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
                // </aside>
            )}

            {/* Main Content */}
            <div className="flex flex-col flex-1 transition-all duration-300">
                <Navbar
                    toggleSidebar={toggleSidebar}
                    sidebarOpen={isSidebarOpen}
                    notifications={notifications}
                    unreadCount={unreadCount}
                    markAsRead={markAsRead}
                />

                {/* Page Content */}
                <main className="p-6">
                    <form className="space-y-4 bg-white shadow-md rounded-lg p-6 rounded-xl shadow-xl p-8 border-t-4 border-[#005f73]">

                        {/* Coupon Code Accordion */}
                        <div className="border border-gray-200 rounded overflow-hidden transition-all duration-500">
                            <button
                                type="button"
                                onClick={() => toggleAccordion('coupon')}
                                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-left"
                            >
                                <span className="font-medium text-[#005d71]">Have a Coupon Code?</span>
                                {openAccordion === 'coupon' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>

                            <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${openAccordion === 'coupon' ? 'max-h-40 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'} px-4 bg-white`}>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <input
                                        type="text"
                                        placeholder="Enter Your Coupon Code Here"
                                        className="w-full border border-gray-300 rounded px-4 py-2"
                                    />
                                    <button type="button" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
                                        Apply Coupon
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cover Art Requirements Accordion */}
                        <div className="border border-gray-200 rounded overflow-hidden transition-all duration-500">
                            <button
                                type="button"
                                onClick={() => toggleAccordion('coverArt')}
                                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-left"
                            >
                                <span className="font-medium text-[#005d71]">Cover art (Song Poster) Requirements</span>
                                {openAccordion === 'coverArt' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>

                            <div className={`transition-all duration-500 ease-in-out overflow-hidden px-4 bg-white text-sm text-gray-700 ${openAccordion === 'coverArt' ? 'max-h-[600px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Size: 3000 x 3000 pixels (perfect square)</li>
                                    <li>Format: JPG, PNG (Max. 2 GB)</li>
                                    <li>You must own the rights of the artwork and every image or visual element in it.</li>
                                    <li>The information on the artwork must match the release metadata.</li>
                                    <li>Stores will reject blurry, low-quality images, or artwork with URL, email, phone number, barcode, price, or trademark logos.</li>
                                    <li>No explicit, outrageous, pornographic, or hate speech content.</li>
                                    <li>Any non-compliant artwork will be rejected by the stores.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Album Info */}
                        <div>
                            <h2 className="text-lg font-semibold border-t pt-4">Audio Requirements</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div>
                                    <label className="block font-medium mb-1">Album Name:</label>
                                    <input type="text" className="w-full border border-gray-300 rounded px-4 py-2" />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Upload Album Artwork:</label>
                                    <input type="file" accept=".jpg,.png" className="block w-full text-sm border border-gray-300 rounded  px-4 py-2" />
                                    <p className="text-xs text-gray-500 mt-1">Size must be 3000x3000px (.jpg or .png only)</p>
                                </div>
                            </div>
                        </div>

                        {/* Song Info */}
                        <div>
                            <h2 className="text-xl font-semibold text-blue-800">Song No. 1</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                <div>
                                    <label className="block font-medium mb-1">Song Name<span className="text-red-500">*</span></label>
                                    <input type="text" className="w-full border border-gray-300 rounded px-4 py-2" />
                                    <p className="text-xs text-gray-500 mt-1">Don't use special characters (max 10 words)</p>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Release Date<span className="text-red-500">*</span></label>
                                    <input type="date" className="w-full border border-gray-300 rounded px-4 py-2" />
                                    <p className="text-xs text-gray-500 mt-1">Present or future date</p>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Upload Your Audio<span className="text-red-500">*</span></label>
                                    <input type="file" accept=".mp3,.wav" className="block w-full text-sm border px-4 py-2 border-gray-300 rounded" />
                                    <p className="text-xs text-gray-500 mt-1">Max size 2GB (.mp3, .wav only)</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                <div>
                                    <label className="block font-medium mb-1">Singers / Primary Artist<span className="text-red-500">*</span></label>
                                    <input type="text" className="w-full border border-gray-300 rounded px-4 py-2" />
                                    <p className="text-xs text-gray-500 mt-1">Use comma for multiple</p>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Music Composer(s)<span className="text-red-500">*</span></label>
                                    <input type="text" className="w-full border border-gray-300 rounded px-4 py-2" />
                                    <p className="text-xs text-gray-500 mt-1">Use comma for multiple</p>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Song Writer / Lyricist(s)<span className="text-red-500">*</span></label>
                                    <input type="text" className="w-full border border-gray-300 rounded px-4 py-2" />
                                    <p className="text-xs text-gray-500 mt-1">Use comma for multiple</p>
                                </div>
                            </div>

                            {/* Language, Genre, Subgenre */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                {/* Language */}
                                <div>
                                    <label className="block font-medium mb-1">Language<span className="text-red-500">*</span></label>
                                    <select className="w-full border border-gray-300 rounded px-4 py-2">
                                        <option>Select Language</option>
                                        <option>English</option>
                                        <option>Hindi</option>
                                        <option>Gujarati</option>
                                        <option>Punjabi</option>
                                        <option>Marathi</option>
                                        <option>Tamil</option>
                                        <option>Telugu</option>
                                        <option>Malayalam</option>
                                        <option>Bengali</option>
                                        <option>Kannada</option>
                                        <option>Urdu</option>
                                        <option>Odia</option>
                                        <option>Assamese</option>
                                        <option>Rajasthani</option>
                                        <option>Nepali</option>
                                        <option>Bhojpuri</option>
                                        <option>Sanskrit</option>
                                    </select>
                                </div>

                                {/* Genre */}
                                <div>
                                    <label className="block font-medium mb-1">Genre<span className="text-red-500">*</span></label>
                                    <select className="w-full border border-gray-300 rounded px-4 py-2">
                                        <option>Select Genre</option>
                                        <option>Pop</option>
                                        <option>Rock</option>
                                        <option>Hip Hop</option>
                                        <option>Classical</option>
                                        <option>Electronic</option>
                                        <option>Jazz</option>
                                    </select>
                                </div>

                                {/* Subgenre */}
                                <div>
                                    <label className="block font-medium mb-1">Subgenre<span className="text-red-500">*</span></label>
                                    <select className="w-full border border-gray-300 rounded px-4 py-2">
                                        <option>Select Subgenre</option>
                                        <option>House</option>
                                        <option>Trance</option>
                                        <option>Dubstep</option>
                                    </select>
                                </div>
                            </div>


                            {/* Explicit, Content ID, CallerTune */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                {/* Explicit Content */}
                                <div>
                                    <label className="block font-medium mb-1">Explicit Content<span className="text-red-500">*</span></label>
                                    <select className="w-full border border-gray-300 rounded px-4 py-2">
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Select Yes if the lyrics contain strong language or any reference to violence, language nudity, or sexual content.
                                    </p>
                                </div>

                                {/* Content ID */}
                                <div>
                                    <label className="block font-medium mb-1">Content ID<span className="text-red-500">*</span></label>
                                    <select className="w-full border border-gray-300 rounded px-4 py-2">
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Select Yes if you also want Content ID for Your Song.
                                    </p>
                                </div>

                                {/* CallerTune Start Timing */}
                                <div>
                                    <label className="block font-medium mb-1">CallerTune Start Timing<span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="hh:mm:ss"
                                        className="w-full border border-gray-300 rounded px-4 py-2"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Caller tune start timing in (hh:min:sec) <span className="font-medium">Maximum 45 sec.</span><br />
                                        Make sure it remains under the full song length.
                                    </p>
                                </div>
                            </div>
                            {/* Apple & Spotify Artist ID Accordion */}
                            <div className="border border-gray-200 rounded overflow-hidden transition-all duration-500">
                                <button
                                    type="button"
                                    onClick={() => toggleAccordion('artistCredits')}
                                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-left"
                                >
                                    <span className="font-medium text-[#005d71]">
                                        Do you want to add Apple and Spotify Artist ID Link or more Song Credits? (Optional)
                                    </span>
                                    {openAccordion === 'artistCredits' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </button>

                                <div className={`transition-all duration-500 ease-in-out overflow-hidden px-4 bg-white text-sm text-gray-700 ${openAccordion === 'artistCredits' ? 'max-h-[1500px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}`}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <User className="w-6 h-6 text-[#005f73]" />
                                        <h2 className="text-xl font-semibold text-[#005f73]">Spotify Artist Search (Search by name or paste Spotify link)</h2>
                                    </div>                                        {/* 🎵 Spotify Artist Section */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shadow-md rounded-lg p-6 my-4">
                                        <div>
                                            <label className="font-medium">Search for Spotify Artist</label>
                                            <input type="text" placeholder="Enter artist name or Spotify link..." className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>e.g. “Arijit Singh” or “https://open.spotify.com/artist/123abc...”</span>
                                        </div>
                                        <div className="flex gap-2 items-end">
                                            <div className="flex-1">
                                                <label className="font-medium">Add a New Spotify Artist (Manually)</label>
                                                <input type="text" placeholder="Enter new Spotify artist name..." className="w-full border rounded px-4 py-2 mt-1" />
                                                <span>Use this if your artist does NOT exist on Spotify yet.</span>
                                            </div>
                                            <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Add as NEW</button>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="font-medium">Primary Artist Spotify IDs</label>
                                            <input type="text" placeholder="Artist IDs (pipe-separated or comma-separated)" className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Final IDs will appear here after you select from the list or add new.</span>
                                        </div>
                                    </div>
                                    {/* 🍏 Apple Artist Section */}
                                    <div className="flex items-center gap-3">
                                        <User className="w-6 h-6 text-[#005f73]" />
                                        <h2 className="text-xl font-semibold text-[#005f73]">Apple Artist Search (Exact Name Match + IDs)</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shadow-md rounded-lg p-6 my-4">
                                        <div>
                                            <label className="font-medium">Search Apple Artist by name or paste Apple Music link</label>
                                            <input type="text" placeholder="Enter exact artist name or Apple Music link..." className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Example: “Arijit Singh” or “https://music.apple.com/in/artist/arijit-singh/123456789”</span>
                                        </div>
                                        <div className="flex gap-2 items-end">
                                            <div className="flex-1">
                                                <label className="font-medium">Add a New Apple Artist (Manually)</label>
                                                <input type="text" placeholder="Enter new Apple artist name..." className="w-full border rounded px-4 py-2 mt-1" />
                                                <span>Use this if your artist does NOT exist on Apple Music yet.</span>
                                            </div>
                                            <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Add as NEW</button>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="font-medium">Primary Artist Apple IDs</label>
                                            <input type="text" placeholder="Artist IDs (pipe-separated or comma-separated)" className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Final IDs will be stored here after you select from the list or add new.</span>
                                        </div>
                                    </div>
                                    {/* 👥 Song Credits */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shadow-md rounded-lg p-6 my-4">

                                        <div>
                                            <label className="font-medium">Producer Name</label>
                                            <input type="text" placeholder="Enter Producer Name(s)" className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Use commas to separate multiple names.</span>
                                        </div>
                                        <div>
                                            <label className="font-medium">Featured Artist</label>
                                            <input type="text" placeholder="Enter Featured Artist" className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Enter Featured Artist Name for Your Track. Use Comma for Multiple</span>
                                        </div>
                                        <div>
                                            <label className="font-medium">Editors</label>
                                            <input type="text" placeholder="Enter Editors Name" className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Enter Editors Name for Your Track. Use Comma for Multiple</span>
                                        </div>

                                        <div>
                                            <label className="font-medium">Composer's Apple ID</label>
                                            <input type="text" placeholder="Enter Composer's Apple ID" className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Use Comma For Multiple. Find Existing Profile or Use NEW for a new artist profile.</span>
                                        </div>
                                        <div>
                                            <label className="font-medium">Composer's Spotify ID</label>
                                            <input type="text" placeholder="Enter Composer's Spotify ID" className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Use Comma For Multiple. Find Existing Profile or Use NEW for a new artist profile.</span>
                                        </div>
                                        <div>
                                            <label className="font-medium">Lyricist's Apple ID</label>
                                            <input type="text" placeholder="Enter Lyricist's Apple ID" className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Use Comma For Multiple. Find Existing Profile or Use NEW for a new artist profile.</span>
                                        </div>
                                        <div>
                                            <label className="font-medium">Lyricist's Spotify ID</label>
                                            <input type="text" placeholder="Enter Lyricist's Spotify ID" className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Use Comma For Multiple. Find Existing Profile or Use NEW for a new artist profile</span>
                                        </div>

                                        <div>
                                            <label className="font-medium">Guitarist(s)</label>
                                            <input type="text" placeholder="Enter Guitarist Name(s)" className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Use commas to separate multiple names.</span>
                                        </div>
                                        <div>
                                            <label className="font-medium">Bass Player(s)</label>
                                            <input type="text" placeholder="Enter Bass Player Name(s)" className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Use commas to separate multiple names.</span>
                                        </div>
                                        <div>
                                            <label className="font-medium">Drummer(s)</label>
                                            <input type="text" placeholder="Enter Drummer Name(s)" className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Use commas to separate multiple names.</span>
                                        </div>
                                        <div>
                                            <label className="font-medium">Harmonica Player(s)</label>
                                            <input type="text" placeholder="Enter Harmonica Player Name(s)" className="w-full border rounded px-4 py-2 mt-1" />
                                            <span>Use commas to separate multiple names.</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <User className="w-6 h-6 text-[#005f73]" />
                                        <h2 className="text-xl font-semibold text-[#005f73]">Facebook Artist ID's</h2>
                                    </div>
                                    <div>
                                        <label className="font-medium">Primary Artist's Facebook ID</label>
                                        <input type="text" placeholder="Enter Primary Artist's Facebook ID" className="w-full border rounded px-4 py-2 mt-1" />
                                        <span>Use Comma For Multiple. Find Existing Profile or Use NEW for a new artist profile.</span>
                                    </div>
                                    <div>
                                        <label className="font-medium">Composer's Facebook ID</label>
                                        <input type="text" placeholder="Enter Composer's Facebook ID" className="w-full border rounded px-4 py-2 mt-1" />
                                        <span>Use Comma For Multiple. Find Existing Profile or Use NEW for a new artist profile.</span>
                                    </div>
                                    <div>
                                        <label className="font-medium">Lyricist's Facebook ID</label>
                                        <input type="text" placeholder="Enter Lyricist's Facebook ID" className="w-full border rounded px-4 py-2 mt-1" />
                                        <span>Use Comma For Multiple. Find Existing Profile or Use NEW for a new artist profile.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 🎵 Add/Remove Song Controls */}
                        <div className="flex flex-col md:flex-row gap-4 mt-10">
                            <button
                                type="button"
                                className="w-full md:w-1/2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded"
                            >
                                Remove Song
                            </button>
                            <button
                                type="button"
                                className="w-full md:w-1/2 bg-[#005f73] hover:bg-[#2c313a] text-white font-semibold py-3 rounded"
                            >
                                + Add New Song
                            </button>
                        </div>

                        {/* 💳 Payment Summary */}
                        <div className="mt-8 border-t pt-6">
                            <h2 className="text-lg font-semibold mb-4">Your Order</h2>
                            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 rounded-md mb-4">
                                <span className="font-medium">Complete Album (All Stores + CallerTune)</span>
                                <span className="font-bold text-lg">₹1999</span>
                            </div>

                            <div className="flex items-center justify-between border-t pt-4">
                                <span className="font-semibold text-gray-800 text-lg">Total Amount Payable</span>
                                <span className="font-bold text-xl text-green-600">₹1999</span>
                            </div>

                            {/* Payment Method Icons */}
                            <div className="mt-4 flex flex-wrap items-center justify-start gap-3">
                                <img src={visa} alt="Visa" className="h-10" />
                                <img src={mastercard} alt="MasterCard" className="h-10" />
                                <img src={maestro} alt="Maestro" className="h-10" />
                                <img src={rupay} alt="RuPay" className="h-10" />
                                <img src={netbanking} alt="Net Banking" className="h-10" />
                                <img src={emi} alt="EMI" className="h-10" />
                                <img src={upi} alt="UPI" className="h-10" />
                                <img src={googlepay} alt="GPay" className="h-10" />
                                <img src={phonepe} alt="PhonePe" className="h-10" />
                            </div>
                        </div>

                        {/* 🚀 Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#005f73] hover:bg-[#2c313a] text-white font-semibold py-4 mt-6 rounded"
                        >
                            Submit Album
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
}
