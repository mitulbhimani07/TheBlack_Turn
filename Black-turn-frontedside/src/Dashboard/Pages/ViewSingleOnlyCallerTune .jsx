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
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [imageUrl, setImageUrl] = useState('');

    // Fetch caller tune data by id
    useEffect(() => {
        // In your fetchData function within useEffect:
        // In your fetchData function within useEffect:
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await viewSingleOnlyCallerTune(id);
                console.log('API Data:', res); // Debug log

                if (!res) {
                    throw new Error('No data received from server');
                }

                setCallerTune(res);

                // Improved image URL handling
                let finalImageUrl = '';
                if (res.artwork) {
                    if (res.artwork.startsWith('http')) {
                        finalImageUrl = res.artwork;
                    } else {
                        // Remove leading slash if present
                        const cleanPath = res.artwork.replace(/^\/+/, '');
                        // Try multiple possible paths
                        finalImageUrl = `${BASE_URL}/uploads/${cleanPath}`;
                        // Alternative path if the above doesn't work
                        // finalImageUrl = `${BASE_URL}/upload/${cleanPath}`;
                    }
                } else {
                    // Use a reliable placeholder image
                    finalImageUrl = 'https://via.placeholder.com/500?text=No+Image+Available';
                }
                console.log('Image URL:', finalImageUrl); // Debug the image URL
                setImageUrl(finalImageUrl);

            } catch (err) {
                console.error("Fetch Error:", err);
                setError(err.response?.data?.message || err.message || 'Failed to load caller tune');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

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
                    <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                    <div className="min-h-screen bg-gray-50 p-6">
                        <CardLoading />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !callerTune) {
        return (
            <div className="min-h-screen flex bg-gray-50 relative">
                <Sidebar isOpen={isSidebarOpen} activeTab="releases" />
                <div className="flex-1 flex flex-col min-h-screen">
                    <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
                        <div className="text-center">
                            <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">
                                {error || 'Caller Tune Not Found'}
                            </h3>
                            <p className="text-gray-500 mt-2">
                                {error ? 'There was an error loading the caller tune' : 'The requested caller tune could not be loaded.'}
                            </p>
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
                <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

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
                                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                                        <img
                                            src={imageUrl}
                                            alt={callerTune.songName || "Caller Tune Poster"}
                                            className="object-cover w-full h-full rounded-lg"
                                            onError={(e) => {
                                                e.target.onerror = null; // Prevent infinite loop
                                                // Fallback to a working placeholder image
                                                e.target.src = 'https://theblack-turn-2.onrender.com';
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Right column - Details */}
                                <div className="md:col-span-2">
                                    <h1 className="text-2xl font-bold text-[#005f73] mb-2">
                                        {callerTune.songName || 'Untitled Song'}
                                    </h1>
                                    <p className="text-gray-600 mb-4">
                                        {callerTune.albumName || 'No album specified'}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { label: 'Primary Artist', value: callerTune.primaryArtist },
                                            { label: 'Music Composer', value: callerTune.musicComposer },
                                            { label: 'Song Writer', value: callerTune.songWriter },
                                            { label: 'Release Date', value: callerTune.releaseDate?.slice(0, 10) },
                                            { label: 'Language', value: callerTune.language },
                                            { label: 'Genre', value: callerTune.genre },
                                            { label: 'Explicit Content', value: callerTune.explicitContent },
                                            { label: 'YouTube Content ID', value: callerTune.youtubeContentId },
                                            { label: 'AI Used', value: callerTune.usedAI },
                                        ].map((item, index) => (
                                            <div key={index}>
                                                <h3 className="font-medium text-gray-700">{item.label}</h3>
                                                <p className="text-gray-900">{item.value || 'N/A'}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Caller Tune Details */}
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <h2 className="text-xl font-bold text-[#005f73] mb-4">Caller Tune Details</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-medium text-gray-700 mb-2">First Caller Tune</h3>
                                                <p className="text-gray-900 font-medium">
                                                    {callerTune.callerTuneName1 || 'N/A'}
                                                </p>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    Start Time: {callerTune.callerTuneStart1 || 'N/A'}
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-medium text-gray-700 mb-2">Second Caller Tune</h3>
                                                <p className="text-gray-900 font-medium">
                                                    {callerTune.callerTuneName2 || 'N/A'}
                                                </p>
                                                {callerTune.callerTuneStart2 && (
                                                    <p className="text-gray-600 text-sm mt-1">
                                                        Start Time: {callerTune.callerTuneStart2}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {/* Optional Description */}
                                        {callerTune.description && (
                                            <div className="mt-8 pt-6 border-t border-gray-200">
                                                <h2 className="text-xl font-bold text-[#005f73] mb-4">Description</h2>
                                                <p className="text-gray-900">{callerTune.description}</p>
                                            </div>
                                        )}

                                        {/* Additional Metadata */}
                                        <div className="mt-8 pt-6 border-t border-gray-200">
                                            <h2 className="text-xl font-bold text-[#005f73] mb-4">Additional Info</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <h3 className="font-medium text-gray-700">Original Work</h3>
                                                    <p className="text-gray-900">{callerTune.originalWork ? 'Yes' : 'No'}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-700">Agreed to Terms</h3>
                                                    <p className="text-gray-900">{callerTune.agreeTerms ? 'Yes' : 'No'}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-700">Apple/Spotify Links</h3>
                                                    {callerTune.appleSpotifyLinks ? (
                                                        <a
                                                            href={callerTune.appleSpotifyLinks}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 underline break-all"
                                                        >
                                                            {callerTune.appleSpotifyLinks}
                                                        </a>
                                                    ) : (
                                                        <p className="text-gray-900">N/A</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-700">Old ISRC/UPC</h3>
                                                    <p className="text-gray-900">{callerTune.oldISRCUPC || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-700">Created At</h3>
                                                    <p className="text-gray-900">{new Date(callerTune.createdAt).toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-700">Last Updated</h3>
                                                    <p className="text-gray-900">{new Date(callerTune.updatedAt).toLocaleString()}</p>
                                                </div>
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