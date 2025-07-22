import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';
import { ArrowLeft, Music } from 'lucide-react';
import { viewSingleOnlyCallerTune } from '../../Api/api';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://theblack-turn-2.onrender.com';

const ViewSingleOnlyCallerTune = () => {
    const { id } = useParams();

    const [callerTune, setCallerTune] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Image state & indexes for fallback patterns
    const [imageError, setImageError] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);

    // Construct image URL with multiple fallback patterns
    const constructImageUrl = (path) => {
        if (!path) return `${BASE_URL}/upload/default-song-poster.jpg`;
        if (path.startsWith('http')) return path;
        const cleanPath = path.replace(/^\/+/, '');
        const patterns = [
            `${BASE_URL}/upload/${cleanPath}`,
            `${BASE_URL}/uploads/${cleanPath}`,
            `${BASE_URL}/images/${cleanPath}`,
            `${BASE_URL}/assets/${cleanPath}`,
            `${BASE_URL}/${cleanPath}`
        ];
        return patterns[currentPatternIndex] || `${BASE_URL}/upload/default-song-poster.jpg`;
    };

    // Fetch caller tune data by id
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await viewSingleOnlyCallerTune(id);
                setCallerTune(res);
                if (res?.artwork) {
                    setCurrentImageUrl(constructImageUrl(res.artwork));
                    setImageLoading(true);
                    setImageError(false);
                    setCurrentPatternIndex(0);
                }
            } catch (error) {
                console.error("Error fetching caller tune:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Image loading and error handling fallback loop
    useEffect(() => {
        if (!callerTune?.artwork) {
            setCurrentImageUrl(`${BASE_URL}/upload/default-song-poster.jpg`);
            setImageLoading(false);
            return;
        }

        setImageLoading(true);
        setImageError(false);
        const img = new Image();
        img.src = currentImageUrl;
        img.onload = () => setImageLoading(false);
        img.onerror = () => {
            if (currentPatternIndex < 4) {
                setCurrentPatternIndex((prev) => prev + 1);
            } else {
                setImageError(true);
                setImageLoading(false);
                setCurrentImageUrl(`${BASE_URL}/upload/default-song-poster.jpg`);
            }
        };
    }, [currentImageUrl, currentPatternIndex, callerTune]);

    // Sidebar toggle and notifications handlers
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => prev - 1);
    };

    // Loading skeleton component
    const CardLoading = () => (
        <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-gray-200 aspect-square rounded-lg"></div>
                <div className="md:col-span-2 space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="space-y-2">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen flex bg-gray-50 relative">
                <Sidebar isOpen={isSidebarOpen} activeTab="releases" />
                <div className="flex-1 flex flex-col min-h-screen">
                    <Navbar
                        toggleSidebar={toggleSidebar}
                        sidebarOpen={isSidebarOpen}
                        notifications={notifications}
                        unreadCount={unreadCount}
                        markAsRead={markAsRead}
                    />
                    <div className="min-h-screen bg-gray-50 p-6">
                        <CardLoading />
                    </div>
                </div>
            </div>
        );
    }

    if (!callerTune) {
        return (
            <div className="min-h-screen flex bg-gray-50 relative">
                <Sidebar isOpen={isSidebarOpen} activeTab="releases" />
                <div className="flex-1 flex flex-col min-h-screen">
                    <Navbar
                        toggleSidebar={toggleSidebar}
                        sidebarOpen={isSidebarOpen}
                        notifications={notifications}
                        unreadCount={unreadCount}
                        markAsRead={markAsRead}
                    />
                    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
                        <div className="text-center">
                            <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">Caller Tune Not Found</h3>
                            <p className="text-gray-500 mt-2">The requested caller tune could not be loaded.</p>
                            <Link
                                to="/allreleases"
                                className="mt-4 inline-flex items-center px-4 py-2 bg-[#005f73] text-white rounded-md hover:bg-[#004a5c]"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Releases
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-gray-50 relative">
            <Sidebar isOpen={isSidebarOpen} activeTab="releases" />
            <div className="flex-1 flex flex-col min-h-screen">
                <Navbar
                    toggleSidebar={toggleSidebar}
                    sidebarOpen={isSidebarOpen}
                    notifications={notifications}
                    unreadCount={unreadCount}
                    markAsRead={markAsRead}
                />

                <div className="min-h-screen bg-gray-50 p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <Link
                                to="/allreleases"
                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Releases
                            </Link>
                            <h2 className="text-lg font-semibold text-gray-800">Caller Tune Details</h2>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Left column - Artwork */}
                                <div className="md:col-span-1">
                                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative">
                                        {imageLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#005d71]"></div>
                                            </div>
                                        )}
                                        {!imageError ? (
                                            <img
                                                src={currentImageUrl}
                                                alt={callerTune.songName || "Caller Tune Poster"}
                                                className={`object-cover w-full h-full rounded-lg ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                                <Music className="w-12 h-12 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right column - Details */}
                                <div className="md:col-span-2">
                                    <h1 className="text-2xl font-bold text-[#005f73] mb-2">{callerTune.songName}</h1>
                                    <p className="text-gray-600 mb-4">{callerTune.albumName}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-medium text-gray-700">Primary Artist</h3>
                                            <p className="text-gray-900">{callerTune.primaryArtist}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">Music Composer</h3>
                                            <p className="text-gray-900">{callerTune.musicComposer}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">Song Writer</h3>
                                            <p className="text-gray-900">{callerTune.songWriter}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">Release Date</h3>
                                            <p className="text-gray-900">{callerTune.releaseDate?.slice(0, 10)}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">Language</h3>
                                            <p className="text-gray-900">{callerTune.language}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">Genre</h3>
                                            <p className="text-gray-900">{callerTune.genre}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">Explicit Content</h3>
                                            <p className="text-gray-900">{callerTune.explicitContent}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">YouTube Content ID</h3>
                                            <p className="text-gray-900">{callerTune.youtubeContentId}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">AI Used</h3>
                                            <p className="text-gray-900">{callerTune.usedAI}</p>
                                        </div>
                                    </div>

                                    {/* Caller Tune Details */}
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <h2 className="text-xl font-bold text-[#005f73] mb-4">Caller Tune Details</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-medium text-gray-700 mb-2">First Caller Tune</h3>
                                                <p className="text-gray-900 font-medium">{callerTune.callerTuneName1}</p>
                                                <p className="text-gray-600 text-sm mt-1">Start Time: {callerTune.callerTuneStart1}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-medium text-gray-700 mb-2">Second Caller Tune</h3>
                                                <p className="text-gray-900 font-medium">{callerTune.callerTuneName2 || 'N/A'}</p>
                                                {callerTune.callerTuneStart2 && (
                                                    <p className="text-gray-600 text-sm mt-1">Start Time: {callerTune.callerTuneStart2}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Optional Description */}
                                    {callerTune.description && (
                                        <div className="mt-8 pt-6 border-t border-gray-200">
                                            <h2 className="text-xl font-bold text-[#005f73] mb-4">Description</h2>
                                            <p className="text-gray-900">{callerTune.description}</p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewSingleOnlyCallerTune;
