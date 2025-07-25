import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';
import { ArrowLeft, Music, Eye, X, Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { viewSingleOnlyCallerTune } from '../../Api/api';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://theblack-turn-2.onrender.com';

const ViewSingleOnlyCallerTune = () => {
    const { id } = useParams();
    const [callerTune, setCallerTune] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);
    
    // Audio player states
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [audioError, setAudioError] = useState(null);
    const [audioUrl, setAudioUrl] = useState('');
    
    const audioRef = useRef(null);

    // Fetch caller tune data by id
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await viewSingleOnlyCallerTune(id);
                console.log('API Data:', res);

                if (!res) {
                    throw new Error('No data received from server');
                }

                setCallerTune(res);
                
                // Handle image URL
                let finalImageUrl = '';
                if (res.artwork) {
                    if (res.artwork.startsWith('http')) {
                        finalImageUrl = res.artwork;
                    } else {
                        const cleanPath = res.artwork.replace(/^\/+/, '');
                        finalImageUrl = `${BASE_URL}/${cleanPath}`;
                    }
                } else {
                    finalImageUrl = `${BASE_URL}/upload/default-song-poster.jpg`;
                }
                setImageUrl(finalImageUrl);

                // Handle audio URL - adjust these field names based on your API response
                let finalAudioUrl = '';
                if (res.audioFile || res.songFile || res.callerTuneFile) {
                    const audioPath = res.audioFile || res.songFile || res.callerTuneFile;
                    if (audioPath.startsWith('http')) {
                        finalAudioUrl = audioPath;
                    } else {
                        const cleanPath = audioPath.replace(/^\/+/, '');
                        finalAudioUrl = `${BASE_URL}/${cleanPath}`;
                    }
                    setAudioUrl(finalAudioUrl);
                    console.log('Audio URL:', finalAudioUrl);
                }

            } catch (err) {
                console.error("Fetch Error:", err);
                setError(err.response?.data?.message || err.message || 'Failed to load caller tune');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Audio event handlers
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        const handleError = (e) => {
            console.error('Audio error:', e);
            setAudioError('Failed to load audio file');
            setIsPlaying(false);
        };

        const handleCanPlay = () => {
            setAudioError(null);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);
        audio.addEventListener('canplay', handleCanPlay);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('canplay', handleCanPlay);
        };
    }, [audioUrl]);

    // Audio control functions
    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio || !audioUrl) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(err => {
                console.error('Play error:', err);
                setAudioError('Failed to play audio');
            });
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        if (!audio) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * duration;
        
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isMuted) {
            audio.volume = volume;
            setIsMuted(false);
        } else {
            audio.volume = 0;
            setIsMuted(true);
        }
    };

    const skipForward = () => {
        const audio = audioRef.current;
        if (!audio) return;
        
        audio.currentTime = Math.min(audio.currentTime + 10, duration);
    };

    const skipBackward = () => {
        const audio = audioRef.current;
        if (!audio) return;
        
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
    };

    // Format time helper
    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Audio Player Component
    const AudioPlayer = () => {
        if (!audioUrl) return null;

        return (
            <div className="bg-gradient-to-r from-[#005f73] to-[#0a9396] p-4 rounded-lg text-white mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold flex items-center gap-2">
                        <Music className="w-5 h-5" />
                        Audio Player
                    </h3>
                    {audioError && (
                        <span className="text-red-200 text-sm">{audioError}</span>
                    )}
                </div>

                {/* Audio element */}
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    preload="metadata"
                />

                {/* Progress bar */}
                <div className="mb-4">
                    <div 
                        className="w-full h-2 bg-white bg-opacity-30 rounded-full cursor-pointer"
                        onClick={handleSeek}
                    >
                        <div 
                            className="h-full bg-white rounded-full transition-all duration-150"
                            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-sm mt-1 opacity-90">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={skipBackward}
                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                            title="Skip back 10s"
                        >
                            <SkipBack className="w-5 h-5" />
                        </button>
                        
                        <button
                            onClick={togglePlay}
                            className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
                            disabled={!audioUrl || audioError}
                        >
                            {isPlaying ? (
                                <Pause className="w-6 h-6" />
                            ) : (
                                <Play className="w-6 h-6 ml-1" />
                            )}
                        </button>
                        
                        <button
                            onClick={skipForward}
                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                            title="Skip forward 10s"
                        >
                            <SkipForward className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Volume controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleMute}
                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                        >
                            {isMuted || volume === 0 ? (
                                <VolumeX className="w-5 h-5" />
                            ) : (
                                <Volume2 className="w-5 h-5" />
                            )}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-20 accent-white"
                        />
                    </div>
                </div>
            </div>
        );
    };

    // Image Modal Component
    const ImageModal = ({ isOpen, onClose, imageUrl, altText }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
                <div className="relative max-w-4xl max-h-screen p-4">
                    <button
                        onClick={onClose}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <img
                        src={imageUrl}
                        alt={altText}
                        className="max-w-full max-h-full object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            </div>
        );
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

                        {/* Audio Player */}
                        <AudioPlayer />

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Left column - Artwork */}
                                <div className="md:col-span-1">
                                    <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden group">
                                        <img
                                            src={imageUrl}
                                            alt={callerTune.songName || "Caller Tune Poster"}
                                            className="object-cover w-full h-full rounded-lg transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `${BASE_URL}/upload/default-song-poster.jpg`;
                                            }}
                                        />
                                        {/* View Image Button Overlay */}
                                        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                            <button
                                                onClick={() => setShowImageModal(true)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg"
                                                title="View Full Image"
                                            >
                                                <Eye className="w-6 h-6 text-gray-700" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* View Image Button Below */}
                                    <button
                                        onClick={() => setShowImageModal(true)}
                                        className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-[#005f73] text-white rounded-md hover:bg-[#004a5c] transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Full Image
                                    </button>
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
                                            <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                                <h3 className="font-medium text-gray-700 text-sm">{item.label}</h3>
                                                <p className="text-gray-900 font-medium">{item.value || 'N/A'}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Caller Tune Details */}
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <h2 className="text-xl font-bold text-[#005f73] mb-4">Caller Tune Details</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                                <h3 className="font-medium text-blue-700 mb-2">First Caller Tune</h3>
                                                <p className="text-gray-900 font-medium">
                                                    {callerTune.callerTuneName1 || 'N/A'}
                                                </p>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    Start Time: {callerTune.callerTuneStart1 || 'N/A'}
                                                </p>
                                            </div>
                                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                                <h3 className="font-medium text-green-700 mb-2">Second Caller Tune</h3>
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
                                    </div>

                                    {/* Additional Metadata */}
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <h2 className="text-xl font-bold text-[#005f73] mb-4">Additional Information</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <h3 className="font-medium text-gray-700 text-sm">Original Work</h3>
                                                <p className="text-gray-900 font-medium">{callerTune.originalWork ? 'Yes' : 'No'}</p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <h3 className="font-medium text-gray-700 text-sm">Agreed to Terms</h3>
                                                <p className="text-gray-900 font-medium">{callerTune.agreeTerms ? 'Yes' : 'No'}</p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
                                                <h3 className="font-medium text-gray-700 text-sm">Apple/Spotify Links</h3>
                                                {callerTune.appleSpotifyLinks ? (
                                                    <a
                                                        href={callerTune.appleSpotifyLinks}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline break-all hover:text-blue-800"
                                                    >
                                                        {callerTune.appleSpotifyLinks}
                                                    </a>
                                                ) : (
                                                    <p className="text-gray-900 font-medium">N/A</p>
                                                )}
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <h3 className="font-medium text-gray-700 text-sm">Old ISRC/UPC</h3>
                                                <p className="text-gray-900 font-medium">{callerTune.oldISRCUPC || 'N/A'}</p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <h3 className="font-medium text-gray-700 text-sm">Created At</h3>
                                                <p className="text-gray-900 font-medium">{new Date(callerTune.createdAt).toLocaleString()}</p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <h3 className="font-medium text-gray-700 text-sm">Last Updated</h3>
                                                <p className="text-gray-900 font-medium">{new Date(callerTune.updatedAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {callerTune.description && (
                                        <div className="mt-8 pt-6 border-t border-gray-200">
                                            <h2 className="text-xl font-bold text-[#005f73] mb-4">Description</h2>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-gray-900 whitespace-pre-line">{callerTune.description}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            <ImageModal
                isOpen={showImageModal}
                onClose={() => setShowImageModal(false)}
                imageUrl={imageUrl}
                altText={callerTune?.songName || "Caller Tune Poster"}
            />
        </div>
    );
};

export default ViewSingleOnlyCallerTune;