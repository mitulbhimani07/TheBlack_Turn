  import React, { useState, useEffect, useRef } from 'react';
  import { useParams } from 'react-router-dom';
  import Sidebar from './header-sidebar/Sidebar';
  import Navbar from './header-sidebar/Header';
  import { ArrowLeft, Play, Pause, Volume2, MoreHorizontal } from 'lucide-react';
  import { SingleViewAlbum } from '../../Api/api';

  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

  // Left column skeleton
  function CardLoading() {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse p-6 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-7 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-6 w-16 bg-green-100 rounded-full"></div>
        </div>
        <div className="h-4 w-1/4 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-4 w-1/3 bg-gray-200 rounded mt-4"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  // Right column skeleton
  function RightCardLoading() {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse p-6 space-y-6">
        <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
          </div>
          <div className="h-2 w-full bg-gray-300 rounded-full"></div>
          <div className="h-8 w-full bg-gray-300 rounded mt-2"></div>
        </div>
      </div>
    );
  }

  function ViewSingleRelese() {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    
    const audioRef = useRef(null);

    const togglePlayPause = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          // Debug: Log the audio URL
          console.log('Audio URL:', audioRef.current.src);
          console.log('Audio file from API:', firstSong.audioFile);
          
          audioRef.current.play().catch(error => {
            console.error('Error playing audio:', error);
            console.error('Audio source:', audioRef.current.src);
            console.error('Audio ready state:', audioRef.current.readyState);
            console.error('Audio network state:', audioRef.current.networkState);
          });
        }
        setIsPlaying(!isPlaying);
      }
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    
    const markAsRead = (id) => {
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => prev - 1);
    };

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const current = audioRef.current.currentTime;
        const total = audioRef.current.duration;
        setCurrentTime(current);
        setDuration(total);
        setProgress((current / total) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
        console.log('Audio loaded successfully, duration:', audioRef.current.duration);
      }
    };

    const handleAudioError = (e) => {
      console.error('Audio loading error:', e);
      console.error('Audio error code:', audioRef.current?.error?.code);
      console.error('Audio error message:', audioRef.current?.error?.message);
      setIsPlaying(false);
    };

    const handleProgressClick = (e) => {
      if (audioRef.current) {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const clickTime = (clickX / width) * duration;
        audioRef.current.currentTime = clickTime;
      }
    };

    useEffect(() => {
      const fetchAlbum = async () => {
        try {
          const res = await SingleViewAlbum(id);
          setAlbum(res.data?.data || res.data);
        } catch (err) {
          console.error('Failed to fetch album details', err);
        } finally {
          setLoading(false);
        }
      };
      fetchAlbum();
    }, [id]);

    // Helper for image path
    const getImageUrl = (artwork) => {
      if (!artwork) return "http://localhost:3001";
      return artwork.startsWith('http')
        ? artwork
        : `${BASE_URL}/${artwork.replace(/^\/+/, '')}`;
    };

    // Helper for audio path with better error handling
    const getAudioUrl = (audioFile) => {
      if (!audioFile) {
        console.warn('No audio file provided');
        return "";
      }
      
      // Handle different audio file formats
      const supportedFormats = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];
      const hasValidExtension = supportedFormats.some(format => 
        audioFile.toLowerCase().includes(format)
      );
      
      if (!hasValidExtension) {
        console.warn('Audio file may not be in a supported format:', audioFile);
      }
      
      const url = audioFile.startsWith('http')
  ? audioFile
  : `${BASE_URL}/${audioFile.replace(/^\/+/, '')}`;

      console.log('Generated audio URL:', url);
      return url;
    };

    // First song shortcut for main details
    const firstSong = album && album.songs && album.songs.length > 0 ? album.songs[0] : {};

    if (loading) {
      // Show skeletons for both columns
      return (
        <div className="min-h-screen flex bg-gray-50 relative">
          <Sidebar isOpen={isSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 flex flex-col min-h-screen">
            <div className="sticky top-0 z-50">
              <Navbar toggleSidebar={toggleSidebar} sidebarOpen={isSidebarOpen} notifications={notifications} unreadCount={unreadCount} markAsRead={markAsRead} />
            </div>
            <div className="min-h-screen bg-gray-50 p-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-36 bg-gray-200 rounded"></div>
                    <div className="h-10 w-24 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-8 w-40 bg-gray-200 rounded"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <CardLoading />
                    <CardLoading />
                    <CardLoading />
                    <CardLoading />
                  </div>
                  <div className="space-y-6">
                    <RightCardLoading />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!album) return <div className="p-10 text-center">No release found</div>;

    return (
      <div className="min-h-screen flex bg-gray-50 relative">
        <Sidebar isOpen={isSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 flex flex-col min-h-screen">
          <div className="sticky top-0 z-50">
            <Navbar toggleSidebar={toggleSidebar} sidebarOpen={isSidebarOpen} notifications={notifications} unreadCount={unreadCount} markAsRead={markAsRead} />
          </div>

          <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                    <ArrowLeft className="w-4 h-4" />
                    All Releases
                  </button>
                  <button className="px-4 py-2 bg-[#005f73] text-white rounded-md hover:bg-[#004a5c]">Update</button>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Platform Links</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Header Details */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h1 className="text-xl font-bold text-gray-800">
                        ISRC #{album.couponCode} - Release Details
                      </h1>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Paid</span>
                    </div>
                    <p className="text-gray-600 italic mb-4">{album.releaseType || 'N/A'}</p>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Content ID:</label>
                          <p className="text-gray-900">{firstSong.contentId || 'No'}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Release Date:</label>
                          <p className="text-gray-900">{firstSong.releaseDate?.slice(0, 10) || album.createdAt?.slice(0, 10) || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Song Name:</label>
                          <p className="text-gray-900">{firstSong.songName}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Artist:</label>
                          <p className="text-gray-900">{firstSong.singers}</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Album Name:</label>
                        <p className="text-gray-900">{album.albumName} <span className="text-gray-500">( ID: {album._id} )</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Song Details */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#005f73] mb-4">Additional Song Details</h3>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Date:</label>
                      <p className="text-gray-900">{album.createdAt?.replace('T', ' ').slice(0, 19)}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <p className="text-gray-900">{firstSong.contentId}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lyricist</label>
                        <p className="text-gray-900">{firstSong.lyricists}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Composers</label>
                        <p className="text-gray-900">{firstSong.composers}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                        <p className="text-gray-900">{firstSong.language}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                        <p className="text-gray-900">{firstSong.genre}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Genre</label>
                        <p className="text-gray-900">{firstSong.subgenre}</p>
                      </div>
                    </div>

                    {/* -- Extra Song Details -- */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Explicit Content</label>
                        <p className="text-gray-900">{firstSong.explicitContent}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Producer</label>
                        <p className="text-gray-900">{firstSong.producer}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Featured Artist</label>
                        <p className="text-gray-900">{firstSong.featuredArtist}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Editors</label>
                        <p className="text-gray-900">{firstSong.editors}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Guitarist</label>
                        <p className="text-gray-900">{firstSong.guitarist}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bass Player</label>
                        <p className="text-gray-900">{firstSong.bassPlayer}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Drummer</label>
                        <p className="text-gray-900">{firstSong.drummer}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Harmonica Player</label>
                        <p className="text-gray-900">{firstSong.harmonicaPlayer}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Spotify Artist IDs</label>
                        <p className="text-gray-900">{firstSong.spotifyArtistIds}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Apple Artist IDs</label>
                        <p className="text-gray-900">{firstSong.appleArtistIds}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Composer Apple ID</label>
                        <p className="text-gray-900">{firstSong.composerAppleId}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Composer Spotify ID</label>
                        <p className="text-gray-900">{firstSong.composerSpotifyId}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lyricist Apple ID</label>
                        <p className="text-gray-900">{firstSong.lyricistAppleId}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lyricist Spotify ID</label>
                        <p className="text-gray-900">{firstSong.lyricistSpotifyId}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Artist ID</label>
                        <p className="text-gray-900">{firstSong.facebookArtistId}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Composer Facebook ID</label>
                        <p className="text-gray-900">{firstSong.composerFacebookId}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lyricist Facebook ID</label>
                        <p className="text-gray-900">{firstSong.lyricistFacebookId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Caller Tune Details */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#005f73] mb-4">Caller Tune Details</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">1st CallerTune Name:</label>
                          <p className="text-gray-900">{firstSong.songName}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">2nd CallerTune Name:</label>
                          <p className="text-gray-900">{firstSong.featuredArtist || '-'}</p>
                        </div>
                      </div>
                      <div>
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">1st CallerTune Timing:</label>
                          <p className="text-gray-900">{firstSong.callerTuneStart}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">2nd CallerTune Timing:</label>
                          <p className="text-gray-900">-</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#005f73] mb-4">Payment Details</h3>
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total:</label>
                      <p className="text-2xl font-bold text-[#005f73]">₹{album.price}</p>
                    </div>
                  </div>
                </div>

                {/* Right column - album art + audio */}
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={getImageUrl(album.albumArtwork)}
                        alt="Album Art"
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <button
                          onClick={togglePlayPause}
                          className="w-8 h-8 bg-[#005f73] text-white rounded-full flex items-center justify-center hover:bg-[#004a5c] transition-colors"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                        <div className="text-sm text-gray-600">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                        <Volume2 className="w-5 h-5 text-gray-600" />
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </div>
                      
                      {/* Custom Progress Bar */}
                      <div 
                        className="w-full bg-gray-300 rounded-full h-2 mt-2 cursor-pointer"
                        onClick={handleProgressClick}
                      >
                        <div 
                          className="bg-[#005f73] h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      
                      {/* Hidden Audio Element */}
                      <audio
                        ref={audioRef}
                        src={getAudioUrl(firstSong.audioFile)}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onError={handleAudioError}
                        onEnded={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        preload="metadata"
                        style={{ display: 'none' }}
                      />
                      <br />
                      {/* Debug info - remove in production */}
                      {process.env.NODE_ENV === 'development' && (
                        <div className="mt-2 text-xs text-gray-500">
                          <p className='font-bold'>Audio URL: <span className='font-normal'>{getAudioUrl(firstSong.audioFile)}</span></p>
                          <br />
                          <p className='font-bold'>Audio File: <span className='font-normal'>{firstSong.audioFile}</span></p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default ViewSingleRelese;