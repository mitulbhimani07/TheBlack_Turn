import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ViewSingleSongCTById } from '../../Api/api';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';
import { ArrowLeft, Music, Play, Pause, Volume2, Download } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://theblack-turn-2.onrender.com';

const ViewSingleSongCT = () => {
    const { id } = useParams();
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Audio player states
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const audioRef = useRef(null);

    // Image states
    const [imageError, setImageError] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);

    // Image URL construction
    const constructImageUrl = (path) => {
        if (!path) return `${BASE_URL}/upload/default-song-poster.jpg`;
        if (path.startsWith('http')) return path;
        const cleanPath = path.replace(/^\/+/, '');
        const possiblePatterns = [
            `${BASE_URL}/upload/${cleanPath}`,
            `${BASE_URL}/uploads/${cleanPath}`,
            `${BASE_URL}/images/${cleanPath}`,
            `${BASE_URL}/assets/${cleanPath}`,
            `${BASE_URL}/${cleanPath}`
        ];
        return possiblePatterns[0];
    };

    // Audio URL construction
    const constructAudioUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        const cleanPath = path.replace(/^\/+/, '');
        return `${BASE_URL}/${cleanPath}`;
    };

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const response = await ViewSingleSongCTById(id);
                if (response.success) {
                    setSong(response.data);
                    // Initialize image URL when song data is loaded
                    const url = constructImageUrl(response.data.songPoster);
                    setCurrentImageUrl(url);
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

    // Image loading and error handling
    useEffect(() => {
        if (song?.songPoster) {
            setImageLoading(true);
            setImageError(false);
            const img = new window.Image();
            img.src = currentImageUrl;
            img.onload = () => setImageLoading(false);
            img.onerror = () => {
                if (currentPatternIndex < 4) {
                    // Try next possible pattern
                    const cleanPath = song.songPoster.replace(/^\/+/, '');
                    const patterns = [
                        `${BASE_URL}/upload/${cleanPath}`,
                        `${BASE_URL}/uploads/${cleanPath}`,
                        `${BASE_URL}/images/${cleanPath}`,
                        `${BASE_URL}/assets/${cleanPath}`,
                        `${BASE_URL}/${cleanPath}`
                    ];
                    setCurrentPatternIndex(currentPatternIndex + 1);
                    setCurrentImageUrl(patterns[currentPatternIndex + 1]);
                } else {
                    setImageError(true);
                    setImageLoading(false);
                    setCurrentImageUrl(`${BASE_URL}/upload/default-song-poster.jpg`);
                }
            };
        }
    }, [song?.songPoster, currentImageUrl, currentPatternIndex]);

    // Audio player functions
const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                // Ensure audio source is properly set before playing
                if (!audioRef.current.src) {
                    const audioUrl = constructAudioUrl(song.audio);
                    if (audioUrl) {
                        audioRef.current.src = audioUrl;
                    }
                }

                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(error => {
                        console.error('Playback failed:', error);
                        setIsPlaying(false);
                        
                        // Additional error analysis
                        if (error.name === 'NotSupportedError') {
                            console.error('The audio format is not supported by the browser');
                        }
                    });
            }
        }
    };
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    };
 const handleAudioError = (e) => {
        console.error('Audio loading error:', e);
        if (audioRef.current?.error) {
            console.error('Audio error code:', audioRef.current.error.code);
            console.error('Audio error message:', audioRef.current.error.message);
        }
        setIsPlaying(false);
        
        // Additional troubleshooting info
        if (audioRef.current) {
            console.log('Audio source:', audioRef.current.src);
            console.log('Audio network state:', audioRef.current.networkState);
            console.log('Audio ready state:', audioRef.current.readyState);
        }
    };
    const handleSeek = (e) => {
        if (audioRef.current) {
            const seekTime = (e.target.value / 100) * duration;
            audioRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
        }
    };      

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => prev - 1);
    };

    // Loading Skeleton Component
    const CardLoading = () => (
        <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <div className="aspect-square bg-gray-200 rounded-lg"></div>
                </div>
                <div className="md:col-span-2 space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="bg-gray-100 p-4 rounded-lg space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    ))}
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
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <div className="h-10 bg-gray-200 rounded w-32"></div>
                                <div className="h-6 bg-gray-200 rounded w-48"></div>
                            </div>
                            <CardLoading />
                        </div>
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
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg font-semibold text-gray-800">Single Song with Caller Tune</h2>
                                {song.audio && (
                                    <a
                                        href={constructAudioUrl(song.audio)}
                                        download
                                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6"> 
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Left column - Song poster and audio player */}
                                <div className="md:col-span-1 space-y-4">
                                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative">
                                        {imageLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#005d71]"></div>
                                            </div>
                                        )}
                                        {!imageError ? (
                                            <img
                                                src={currentImageUrl}
                                                alt={song.songName || "Song Poster"}
                                                className={`object-cover w-full h-full rounded-lg ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                                                onLoad={() => setImageLoading(false)}
                                                onError={() => {
                                                    if (currentPatternIndex < 4) {
                                                        const cleanPath = song.songPoster.replace(/^\/+/, '');
                                                        const patterns = [
                                                            `${BASE_URL}/upload/${cleanPath}`,
                                                            `${BASE_URL}/uploads/${cleanPath}`,
                                                            `${BASE_URL}/images/${cleanPath}`,
                                                            `${BASE_URL}/assets/${cleanPath}`,
                                                            `${BASE_URL}/${cleanPath}`
                                                        ];
                                                        setCurrentPatternIndex(currentPatternIndex + 1);
                                                        setCurrentImageUrl(patterns[currentPatternIndex + 1]);
                                                    } else {
                                                        setImageError(true);
                                                        setCurrentImageUrl(`${BASE_URL}/upload/default-song-poster.jpg`);
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                                <Music className="w-12 h-12 text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Audio Player */}
                                   {song.audio && (
                <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <button
                            onClick={togglePlayPause}
                            className="w-10 h-10 bg-[#005f73] text-white rounded-full flex items-center justify-center hover:bg-[#004a5c]"
                            disabled={!song.audio}
                        >
                            {isPlaying ? (
                                <Pause className="w-4 h-4" />
                            ) : (
                                <Play className="w-4 h-4 ml-1" />
                            )}
                        </button>
                        <div className="flex items-center gap-2">
                            <Volume2 className="w-5 h-5 text-gray-600" />
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-20 accent-[#005f73]"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={duration ? (currentTime / duration) * 100 : 0}
                        onChange={handleSeek}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#005f73]"
                    />
                    <audio
                        ref={audioRef}
                        src={constructAudioUrl(song.audio)}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleTimeUpdate}
                        onEnded={() => setIsPlaying(false)}
                        onError={handleAudioError}
                        style={{ display: "none" }}
                    />
                    
                    {/* Error display for debugging */}
                    {audioRef.current?.error && (
                        <div className="mt-2 text-red-600 text-sm">
                            Audio error: {audioRef.current.error.message}
                        </div>
                    )}
                </div>
            )}
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