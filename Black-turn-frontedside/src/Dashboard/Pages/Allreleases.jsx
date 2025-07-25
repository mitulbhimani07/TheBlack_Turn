import React, { useState, useEffect } from 'react';
import { Search, Music, CheckCircle, Trash2 } from 'lucide-react';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';
import { GiSandsOfTime, GiSettingsKnobs } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";
import { MdOutlineWarning, MdVerifiedUser } from "react-icons/md";
import { PiWarningDiamondFill } from "react-icons/pi";
import { ViewAlbum, ViewSingleSongCT, viewOnlyCallerTuneData, viewSingleSongWithoutCT } from "../../Api/api";
import { Link, useNavigate } from 'react-router-dom';

export default function Allreleases() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('releases');
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState('album'); // Or 'onlyCaller' if you want caller tunes default
  const itemsPerPage = 9;

  // Data states
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [singleSongCTData, setSingleSongCTData] = useState([]);
  const [ctLoading, setCTLoading] = useState(false);
  const [onlyCallerTuneData, setOnlyCallerTuneData] = useState([]);
  const [onlyCallerLoading, setOnlyCallerLoading] = useState(false);
  const [singleSongWithoutCTData, setSingleSongWithoutCTData] = useState([]);
  const [withoutCTLoading, setWithoutCTLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL || 'https://theblack-turn-2.onrender.com';

  // Get current data based on selected option
  const getCurrentData = () => {
    switch (selectedOption) {
      case 'withCT':
        return singleSongCTData;
      case 'withoutCT':
        return singleSongWithoutCTData;
      case 'onlyCaller':
        return onlyCallerTuneData;
      case 'album':
      default:
        return releases;
    }
  };

  // Filtering and pagination logic
  const currentData = getCurrentData();
  const filteredData = currentData.filter(item => {
    if (selectedOption === 'withCT') {
      return (item.songName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.albumName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.singer || '').toLowerCase().includes(searchQuery.toLowerCase());
    } else if (selectedOption === 'onlyCaller') {
      return (item.songName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.albumName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.primaryArtist || '').toLowerCase().includes(searchQuery.toLowerCase());
    }
    return (item.albumName || '').toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => prev - 1);
  };

  // Fetch Single Song CT Data
  const fetchSingleSongCTData = async () => {
    setCTLoading(true);
    try {
      const res = await ViewSingleSongCT();
      setSingleSongCTData(Array.isArray(res.data) ? res.data : (res.data?.data || []));
    } catch (err) {
      console.error("Failed to fetch single song CT data", err);
      setSingleSongCTData([]);
    } finally {
      setCTLoading(false);
    }
  };


  const fetchOnlyCallerTuneData = async () => {
    setOnlyCallerLoading(true);
    try {
      const res = await viewOnlyCallerTuneData();
      console.log('OnlyCallerTune API response:', res);  // What exactly is res here?

      // Example: if res is { data: [...] }
      // but your api returns data array directly, then use it accordingly.
      const dataArray = Array.isArray(res) ? res : (res?.data || res?.data?.data || []);
      console.log('Parsed data array:', dataArray);
      setOnlyCallerTuneData(dataArray);
    } catch (err) {
      console.error("Failed to fetch only caller tune data", err);
      setOnlyCallerTuneData([]);
    } finally {
      setOnlyCallerLoading(false);
    }
  };

  const fetchSingleSongWithoutCTData = async () => {
    setWithoutCTLoading(true);
    try {
      const res = await viewSingleSongWithoutCT();
      setSingleSongWithoutCTData(Array.isArray(res.data) ? res.data : (res.data?.data || []));
      console.log("view song with out CT",res)
    } catch (err) {
      console.error("Failed to fetch single song without CT data", err);
      setSingleSongWithoutCTData([]);
    } finally {
      setWithoutCTLoading(false);
    }
  };

  // Handle option selection
  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    setCurrentPage(1);

    if (option === 'withCT' && singleSongCTData.length === 0) {
      await fetchSingleSongCTData();
    } else if (option === 'withoutCT' && singleSongWithoutCTData.length === 0) {
      await fetchSingleSongWithoutCTData();
    } else if (option === 'onlyCaller' && onlyCallerTuneData.length === 0) {
      await fetchOnlyCallerTuneData();
    }
  };


  useEffect(() => {
  const handleResize = async () => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    setIsSidebarOpen(!mobile);
    
    try {
      const res = await ViewAlbum();
      // Set releases directly to res.data (which is now the albums array)
      setReleases(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch albums", err);
      setReleases([]);
    } finally {
      setLoading(false);
    }
  };
  
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  const statusCards = [
    {
      title: 'Total Releases',
      count: releases.length,
      color: 'cyan',
      icon: <Music className="w-6 h-6" />,
      bgColor: 'bg-cyan-500',
    },
    {
      title: 'Required Approval',
      count: releases.filter(r => r.qcStatus === 'In Review').length,
      color: 'yellow',
      icon: <GiSandsOfTime className="w-6 h-6" />,
      bgColor: 'bg-yellow-500',
    },
    {
      title: 'Processing',
      count: releases.filter(r => r.payment === 'Pending' && r.qcStatus !== 'Cancelled').length,
      color: 'blue',
      icon: <GiSettingsKnobs className="w-6 h-6" />,
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Completed',
      count: releases.filter(r => r.payment === 'Completed').length,
      color: 'green',
      icon: <CheckCircle className="w-6 h-6" />,
      bgColor: 'bg-green-500',
    },
    {
      title: 'Cancelled',
      count: releases.filter(r => r.qcStatus === 'Cancelled').length,
      color: 'red',
      icon: <FaWindowClose className="w-6 h-6" />,
      bgColor: 'bg-red-500',
    },
    {
      title: 'Takedown',
      count: releases.filter(r => r.qcStatus === 'Takedown').length,
      color: 'pink',
      icon: <Trash2 className="w-6 h-6" />,
      bgColor: 'bg-pink-500',
    },
    {
      title: 'Matched',
      count: releases.filter(r => r.qcStatus === 'Matched').length,
      color: 'purple',
      icon: <MdVerifiedUser className="w-6 h-6" />,
      bgColor: 'bg-purple-500',
    },
    {
      title: 'NOCRequired',
      count: releases.filter(r => r.qcStatus === 'NOCRequired').length,
      color: 'orange',
      icon: <MdOutlineWarning className="w-6 h-6" />,
      bgColor: 'bg-orange-500',
    },
    {
      title: 'On Hold',
      count: releases.filter(r => r.qcStatus === 'On Hold').length,
      color: 'yellow',
      icon: <PiWarningDiamondFill className="w-6 h-6" />,
      bgColor: 'bg-yellow-600',
    },
  ];

  const StatusCard = ({ title, count, color, icon, bgColor }) => (
    <div className={`${bgColor} rounded-lg p-4 text-white min-w-[160px]`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium opacity-90">{title}</h3>
          <p className="text-2xl font-bold mt-1">{count}</p>
        </div>
        <div className="text-white opacity-80">
          {icon}
        </div>
      </div>
    </div>
  );

  const CardLoading = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="w-full lg:w-32 h-32 bg-gray-200 rounded"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-24 mt-3"></div>
        </div>
      </div>
    </div>
  );

  const SingleSongCTCard = ({ song }) => {
    const [imageError, setImageError] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(true);

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

    useEffect(() => {
      setImageLoading(true);
      setImageError(false);
      const url = constructImageUrl(song.songPoster);
      setCurrentImageUrl(url);
      const img = new window.Image();
      img.src = url;
      img.onload = () => setImageLoading(false);
      img.onerror = () => {
        setImageError(true);
        setImageLoading(false);
      };
    }, [song.songPoster]);

    const handleImageError = () => {
      if (!imageError) {
        console.warn('Image load failed, switching to default');
        setImageError(true);
        setCurrentImageUrl(`${BASE_URL}/upload/default-song-poster.jpg`);
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          <div className="w-full lg:w-32 h-32 flex-shrink-0 flex items-center justify-center relative bg-gray-100 rounded">
            {imageLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#005d71]"></div>
              </div>
            ) : null}
            <img
              src={currentImageUrl}
              alt={song.songName || "Song Poster"}
              className={`object-cover w-full h-full rounded-lg ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setImageLoading(false)}
              onError={handleImageError}
            />
            {imageError && !imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <Music className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#005d71]">{song.songName || 'Unknown Song'}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div><span className="font-medium">Artist:</span> {song.singer || 'N/A'}</div>
                <div><span className="font-medium">Language:</span> {song.language || 'N/A'}</div>
                <div><span className="font-medium">Release Date:</span> {song.releseDate || 'N/A'}</div>
                <div><span className="font-medium">Song Writer:</span> {song.songWriter || 'N/A'}</div>
                <div>
                  <span className="font-medium">YouTube Content ID:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${song.youTubeContentID === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {song.youTubeContentID || 'No'}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Explicit Content:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${song.explicitContent === 'No' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {song.explicitContent || 'No'}
                  </span>
                </div>
              </div>
              <Link
                to={`/ViewSingleSongCT/${song._id}`}
                className="bg-[#005d71] text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
              >
                View CT Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
const SingleSongWithoutCTCard = ({ song }) => {
  const [imageError, setImageError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(true);

  // Properly construct image URL
  const constructImageUrl = (path) => {
    // Handle cases where no artwork is provided
    if (!path || path === 'undefined' || path === 'null') {
      return `${BASE_URL}/upload/default-song-poster.jpg`;
    }

    // Handle full URLs
    if (path.startsWith('http')) return path;
    
    // Handle various server path patterns
    const cleanPath = path.replace(/^\/+/, '');
    
    // Check if path already contains 'upload' directory
    if (cleanPath.includes('upload/')) {
      return `${BASE_URL}/${cleanPath}`;
    }
    
    // Default to upload directory
    return `${BASE_URL}/upload/${cleanPath}`;
  };

  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
    
    // Use artwork for image (not audio)
    const url = constructImageUrl(song.artwork);
    setCurrentImageUrl(url);
    
    // Preload image to detect errors
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setImageLoading(false);
      // Double-check if image loaded correctly
      if (img.naturalWidth === 0) {
        setImageError(true);
        setCurrentImageUrl(`${BASE_URL}/upload/default-song-poster.jpg`);
      }
    };
    img.onerror = () => {
      setImageError(true);
      setImageLoading(false);
      setCurrentImageUrl(`${BASE_URL}/upload/default-song-poster.jpg`);
    };
  }, [song.artwork]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="w-full lg:w-32 h-32 flex-shrink-0 flex items-center justify-center relative bg-gray-100 rounded">
          {imageLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#005d71]"></div>
            </div>
          ) : null}
          
          {!imageLoading && (
            <img
              src={currentImageUrl}
              alt={song.songName || "Song Poster"}
              className={`object-cover w-full h-full rounded-lg ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              onError={() => {
                if (!imageError) {
                  setImageError(true);
                  setCurrentImageUrl(`${BASE_URL}/upload/default-song-poster.jpg`);
                }
              }}
            />
          )}
          
          {imageError && !imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <Music className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#005d71]">{song.songName || 'Unknown Song'}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div><span className="font-medium">Artist:</span> {song.singer || 'N/A'}</div>
              <div><span className="font-medium">Album:</span> {song.albumName || 'N/A'}</div>
              <div><span className="font-medium">Language:</span> {song.language || 'N/A'}</div>
              <div><span className="font-medium">Release Date:</span> {song.releaseDate || 'N/A'}</div>
              <div><span className="font-medium">Genre:</span> {song.genre || 'N/A'}</div>
              <div>
                <span className="font-medium">Explicit Content:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${song.explicitContent === 'No' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {song.explicitContent || 'No'}
                </span>
              </div>
            </div>
            <Link
              to={`/ViewSingleSongWithoutCT/${song._id}`}
              className="bg-[#005d71] text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
  const OnlyCallerTuneCard = ({ callerTune }) => {
    const [imageError, setImageError] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(true);

    const constructImageUrl = (path) => {
      if (!path) return `${BASE_URL}/upload/default-song-poster.jpg`;
      if (path.startsWith('http')) return path;

      let cleanPath = path.replace(/^\/+/, '');

      if (cleanPath.startsWith('upload/') || cleanPath.startsWith('uploads/')) {
        return `${BASE_URL}/${cleanPath}`;
      }

      return `${BASE_URL}/upload/${cleanPath}`;
    };


    useEffect(() => {
      console.log('Artwork path:', callerTune.artwork);
      const url = constructImageUrl(callerTune.artwork);
      console.log('Image URL set:', url);
      setCurrentImageUrl(url);
      setImageLoading(true);
      setImageError(false);
      const img = new window.Image();
      img.src = url;
      img.onload = () => setImageLoading(false);
      img.onerror = () => {
        setImageError(true);
        setImageLoading(false);
      };
    }, [callerTune.artwork]);

    const handleImageError = () => {
      if (!imageError) {
        console.log('Image error fallback triggered');
        setImageError(true);
        setCurrentImageUrl(`${BASE_URL}/upload/default-song-poster.jpg`);
      }
    };

    const formatDate = (isoString) => isoString ? new Date(isoString).toLocaleDateString() : 'N/A';

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          <div className="w-full lg:w-32 h-32 flex-shrink-0 flex items-center justify-center relative bg-gray-100 rounded">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#005d71]" />
              </div>
            )}
            {!imageError && (
              <img
                src={currentImageUrl}
                alt={callerTune.songName || "Caller Tune Poster"}
                className={`object-cover w-full h-full rounded-lg ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                onError={handleImageError}
              />
            )}
            {imageError && !imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <Music className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#005d71]">{callerTune.songName}</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div><b>Artist:</b> {callerTune.primaryArtist || 'N/A'}</div>
              <div><b>Language:</b> {callerTune.language || 'N/A'}</div>
              <div><b>Release Date:</b> {formatDate(callerTune.releaseDate)}</div>
              <div><b>Caller Tune 1:</b> {callerTune.callerTuneName1 || 'N/A'}</div>
              <div><b>Start 1:</b> {callerTune.callerTuneStart1 || 'N/A'}</div>
              <div><b>Caller Tune 2:</b> {callerTune.callerTuneName2 || 'N/A'}</div>
              <div><b>Start 2:</b> {callerTune.callerTuneStart2 || 'N/A'}</div>
              <div><b>Explicit Content:</b> {callerTune.explicitContent || 'N/A'}</div>
              <div><b>YouTube Content ID:</b> {callerTune.youtubeContentId || 'N/A'}</div>
            </div>
            <Link
              to={`/ViewSingleOnlyCallerTune/${callerTune._id}`}
              className="block mt-2 bg-[#005d71] text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  };


  const ReleaseCard = ({ release }) => {
    const [imageError, setImageError] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [currentPatternIndex, setCurrentPatternIndex] = useState(0);

    useEffect(() => {
      if (release.albumArtwork) {
        const cleanPath = release.albumArtwork.replace(/^\/+/, '');
        const patterns = [
          `${BASE_URL}/upload/${cleanPath}`,
          `${BASE_URL}/uploads/${cleanPath}`,
          `${BASE_URL}/images/${cleanPath}`,
          `${BASE_URL}/assets/${cleanPath}`,
          `${BASE_URL}/${cleanPath}`
        ];
        setCurrentImageUrl(patterns[currentPatternIndex]);
        setImageError(false);
      } else {
        setCurrentImageUrl(`${BASE_URL}/upload/default-album-poster.jpg`);
      }
    }, [release.albumArtwork, currentPatternIndex]);

    const handleImageError = () => {
      const cleanPath = release.albumArtwork.replace(/^\/+/, '');
      const patterns = [
        `${BASE_URL}/upload/${cleanPath}`,
        `${BASE_URL}/uploads/${cleanPath}`,
        `${BASE_URL}/images/${cleanPath}`,
        `${BASE_URL}/assets/${cleanPath}`,
        `${BASE_URL}/${cleanPath}`,
        `${BASE_URL}/upload/default-album-poster.jpg`
      ];
      if (currentPatternIndex < patterns.length - 1) {
        setCurrentPatternIndex(currentPatternIndex + 1);
        setCurrentImageUrl(patterns[currentPatternIndex + 1]);
      } else {
        setImageError(true);
        setCurrentImageUrl(`${BASE_URL}/upload/default-album-poster.jpg`);
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          <div className="w-full lg:w-32 h-32 flex-shrink-0 flex items-center justify-center relative bg-gray-100 rounded">
            <img
              src={currentImageUrl}
              alt={release.albumName || "Album Poster"}
              className="object-cover w-full h-full rounded-lg"
              onError={handleImageError}
            />
          </div>
          <div className="flex-1">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#005d71]">{release.albumName}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div><span className="font-medium">ISRC:</span> {release.couponCode}</div>
                <div><span className="font-medium">Release Date:</span> {release.createdAt ? release.createdAt.slice(0, 10) : ''}</div>
                <div><span className="font-medium">Payment:</span> <span className='ml-2 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800'>₹{release.price}</span></div>
                <div>
                  <span className="font-medium">QC:</span> <span className={`ml-2 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 `}>{release.songs ? release.songs.length : 0}</span>
                </div>
              </div>
              <Link
                to={`/viewSingleRelese/${release._id}`}
                className="bg-[#005d71] text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Pagination = () => {
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

    return (
      <nav aria-label="Page navigation" className="mt-8">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li key={page}>
              <button
                onClick={() => handlePageChange(page)}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === page
                  ? 'z-10 text-[#005d71] border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      {isSidebarOpen && (
        <Sidebar
          isOpen={isSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      <div className="flex flex-col flex-1 transition-all duration-300">
        <Navbar
          toggleSidebar={toggleSidebar}
          sidebarOpen={isSidebarOpen}
          notifications={notifications}
          unreadCount={unreadCount}
          markAsRead={markAsRead}
        />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
            {/* Button Group */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 rounded-lg ${selectedOption === 'withCT' ? 'bg-[#005d71] text-white' : 'bg-gray-100 text-gray-800'} font-medium`}
                  onClick={() => handleOptionSelect('withCT')}
                >
                  Single Song With CT
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${selectedOption === 'withoutCT' ? 'bg-[#005d71] text-white' : 'bg-gray-100 text-gray-800'} font-medium`}
                  onClick={() => handleOptionSelect('withoutCT')}
                >
                  Single Song Without CT
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${selectedOption === 'onlyCaller' ? 'bg-[#005d71] text-white' : 'bg-gray-100 text-gray-800'} font-medium`}
                  onClick={() => handleOptionSelect('onlyCaller')}
                >
                  Only Caller Tune
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${selectedOption === 'album' ? 'bg-[#005d71] text-white' : 'bg-gray-100 text-gray-800'} font-medium`}
                  onClick={() => handleOptionSelect('album')}
                >
                  Release New Album
                </button>
              </div>

              {/* Search Bar */}
              {selectedOption && (
                <div className="mt-4">
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder={`Search ${selectedOption === 'withCT' ? 'songs' : 'releases'}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005d71] focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
              {statusCards.map((card, index) => (
                <StatusCard
                  key={index}
                  title={card.title}
                  count={card.count}
                  color={card.color}
                  icon={card.icon}
                  bgColor={card.bgColor}
                />
              ))}
            </div>

            {/* Content based on selected option */}
            {selectedOption ? (
              <div>
                <h2 className="text-xl font-bold mb-4 text-[#005d71]">
                  {selectedOption === 'withCT' && 'Single Songs With Caller Tune'}
                  {selectedOption === 'withoutCT' && 'Single Songs Without Caller Tune'}
                  {selectedOption === 'onlyCaller' && 'Only Caller Tunes'}
                  {selectedOption === 'album' && 'Album Releases'}
                </h2>

                {/* Display data based on selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {(selectedOption === 'withCT' ? ctLoading :
                    selectedOption === 'withoutCT' ? withoutCTLoading :
                    selectedOption === 'onlyCaller' ? onlyCallerLoading : loading) ? (
                    Array.from({ length: 6 }).map((_, i) => <CardLoading key={i} />)
                  ) : paginatedData.length > 0 ? (
                    paginatedData.map((item, idx) => (
                      selectedOption === 'withCT' ?
                        <SingleSongCTCard key={item._id || idx} song={item} /> :
                      selectedOption === 'withoutCT' ?
                        <SingleSongWithoutCTCard key={item._id || idx} song={item} /> :
                      selectedOption === 'onlyCaller' ?
                        <OnlyCallerTuneCard key={item._id || idx} callerTune={item} /> :
                        <ReleaseCard key={item._id || idx} release={item} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500 text-lg">
                        {selectedOption === 'withCT' ? 'No single songs with CT found' :
                         selectedOption === 'withoutCT' ? 'No single songs without CT found' :
                         selectedOption === 'onlyCaller' ? 'No caller tunes found' :
                         'No album releases found'}
                      </p>
                    </div>
                  )}
                </div>

                {paginatedData.length > 0 && totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Category</h3>
                <p className="text-gray-500">Choose from the options above to view your releases</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}