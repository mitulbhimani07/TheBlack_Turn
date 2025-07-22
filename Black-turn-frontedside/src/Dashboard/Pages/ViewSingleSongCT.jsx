import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ViewSingleSongCTById } from '../../Api/api';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';
import { ArrowLeft, Music } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://theblack-turn-2.onrender.com';

const ViewSingleSongCT = () => {
    const { id } = useParams();
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const response = await ViewSingleSongCTById(id);
                if (response.success) {
                    setSong(response.data);
                } else {
                    console.error('Failed to fetch song:', response.message);
                }
            } catch (error) {
                console.error('Error fetching song:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSong();
    }, [id]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => prev - 1);
    };

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
                    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#005f73]"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!song) {
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
                            <h3 className="text-lg font-medium text-gray-900">Song not found</h3>
                            <p className="text-gray-500 mt-2">The requested song could not be loaded</p>
                            <Link
                                to="/releases"
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
                                to="/releases"
                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Releases
                            </Link>
                            <h2 className="text-lg font-semibold text-gray-800">Single Song with Caller Tune</h2>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Left column - Song poster */}
                                <div className="md:col-span-1">
                                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                                        {song.songPoster ? (
                                            <img
                                                src={
                                                    song.songPoster
                                                        ? song.songPoster.startsWith('http')
                                                            ? song.songPoster
                                                            : song.songPoster.startsWith('/uploads')
                                                                ? `${BASE_URL}${song.songPoster}`
                                                                : `${BASE_URL}/uploads/${song.songPoster.replace(/^\/+/, '')}`
                                                        : `${BASE_URL}/placeholder.jpg`
                                                }
                                                alt={song.songName}
                                                className="object-cover w-full h-full"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `${BASE_URL}/placeholder.jpg`;
                                                }}
                                            />
                                        ) : (
                                            <Music className="w-16 h-16 text-gray-400" />
                                        )}
                                        
                                    </div>
                                </div>

                                {/* Right column - Song details */}
                                <div className="md:col-span-2">
                                    <h1 className="text-2xl font-bold text-[#005f73] mb-2">{song.songName}</h1>
                                    <p className="text-gray-600 mb-4">{song.albumName}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-medium text-gray-700">Primary Artist</h3>
                                            <p className="text-gray-900">{song.singer}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">Music Composer</h3>
                                            <p className="text-gray-900">{song.musicComposer}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">Song Writer</h3>
                                            <p className="text-gray-900">{song.songWriter}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">Release Date</h3>
                                            <p className="text-gray-900">{song.releseDate}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">Language</h3>
                                            <p className="text-gray-900">{song.language}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">Genre</h3>
                                            <p className="text-gray-900">{song.genre}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700">Sub Genre</h3>
                                            <p className="text-gray-900">{song.subGenre}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Caller Tune Section */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h2 className="text-xl font-bold text-[#005f73] mb-4">Caller Tune Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-700 mb-2">First Caller Tune</h3>
                                        <p className="text-gray-900 font-medium">{song.firstCallerTune}</p>
                                        <p className="text-gray-600 text-sm mt-1">Start Time: {song.firstCallerTuneTime}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-700 mb-2">Second Caller Tune</h3>
                                        <p className="text-gray-900 font-medium">{song.secondCallerTune || 'N/A'}</p>
                                        {song.secondCallerTuneTime && (
                                            <p className="text-gray-600 text-sm mt-1">Start Time: {song.secondCallerTuneTime}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Additional Details */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h2 className="text-xl font-bold text-[#005f73] mb-4">Additional Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-medium text-gray-700">Explicit Content</h3>
                                        <p className="text-gray-900 capitalize">{song.explicitContent}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-700">YouTube Content ID</h3>
                                        <p className="text-gray-900 capitalize">{song.youTubeContentID}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-700">AI Used</h3>
                                        <p className="text-gray-900 capitalize">{song.useAI}</p>
                                    </div>
                                </div>

                                {song.description && (
                                    <div className="mt-4">
                                        <h3 className="font-medium text-gray-700">Description</h3>
                                        <p className="text-gray-900">{song.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewSingleSongCT;