import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "./header-sidebar/Sidebar";
import Navbar from "./header-sidebar/Header";
import { ArrowLeft, Music, Edit, Download, Play, Pause } from "lucide-react";
import { viewSingleSongWithoutCTById } from "../../Api/api";

const BASE_URL = import.meta.env.VITE_API_URL || "https://theblack-turn-2.onrender.com";

export default function ViewSingleSongWithoutCT() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      try {
        const res = await viewSingleSongWithoutCTById(id);
        console.log("API response:", res);
        console.log("Song audio field:", res.data?.audio || res.audio);
        
        // Handle response data
        const songData = res.data || res;
        setSong(songData);

        // Set image URL
        const imgUrl = songData.songPoster 
          ? songData.songPoster.startsWith("http") 
            ? songData.songPoster 
            : `${BASE_URL}/${songData.songPoster.replace(/^\/+/, "")}`
          : `${BASE_URL}/upload/default-song-poster.jpg`;
        setImageUrl(imgUrl);

        // Set audio URL if available
        if (songData.audio) {
          const audioUrl = songData.audio.startsWith("http")
            ? songData.audio
            : `${BASE_URL}/upload/${songData.audio.replace(/^\/+/, "")}`;
          setAudioUrl(audioUrl);
        } else {
          setAudioUrl("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
        }

      } catch (err) {
        console.error("Error fetching song:", err);
        setError("Failed to load song details");
      } finally {
        setLoading(false);
      }
    };
    fetchSong();
  }, [id]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error("Error playing audio:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  if (loading) {
    return <LoadingView isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />;
  }

  if (error || !song) {
    return <ErrorView error={error} isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />;
  }

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      <Sidebar isOpen={isSidebarOpen} activeTab="releases" />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/allreleases"
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Releases
              </Link>
              <div className="flex gap-3">
                <Link
                  to={`/edit-song-without-ct/${id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>
                {audioUrl && (
                  <a
                    href={audioUrl}
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                )}
              </div>
            </div>

            <SongDetailsView 
              song={song} 
              imageUrl={imageUrl} 
              audioUrl={audioUrl} 
              isPlaying={isPlaying} 
              setIsPlaying={setIsPlaying}
              togglePlayPause={togglePlayPause} 
              audioRef={audioRef} 
              formatDate={formatDate} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for loading state
function LoadingView({ isSidebarOpen, toggleSidebar }) {
  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      <Sidebar isOpen={isSidebarOpen} activeTab="releases" />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="h-10 w-32 bg-gray-200 rounded"></div>
              <div className="h-8 w-40 bg-gray-200 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for error state
function ErrorView({ error, isSidebarOpen, toggleSidebar }) {
  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      <Sidebar isOpen={isSidebarOpen} activeTab="releases" />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              {error || "Song Not Found"}
            </h3>
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

// Component for song details view
function SongDetailsView({ song, imageUrl, audioUrl, isPlaying, setIsPlaying, togglePlayPause, audioRef, formatDate }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Artwork and Audio */}
        <div className="md:col-span-1 space-y-6">
          <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={imageUrl}
              alt={song.songName || "Song Poster"}
              className="object-cover w-full h-full"
              onError={e => {
                e.target.onerror = null;
                e.target.src = `${BASE_URL}/upload/default-song-poster.jpg`;
              }}
            />
          </div>

          {audioUrl && (
            <div className="bg-gray-100 rounded-lg p-4 space-y-4">
              {/* Custom Play/Pause Button */}
              <div className="flex items-center justify-center">
                <button
                  onClick={togglePlayPause}
                  className="w-12 h-12 bg-[#005f73] text-white rounded-full flex items-center justify-center hover:bg-[#004a5c] transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-1" />
                  )}
                </button>
              </div>
              
              {/* Native Audio Controls */}
              <div className="w-full">
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  controls
                  className="w-full"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  style={{
                    height: '40px',
                    borderRadius: '8px'
                  }}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
              
              {/* Audio Info */}
              <div className="text-center text-sm text-gray-600">
                <p className="font-medium">{song.songName || "Audio Track"}</p>
                {song.singer && <p className="text-xs">{song.singer}</p>}
              </div>
            </div>
          )}

          {!audioUrl && (
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <Music className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">No audio file available</p>
            </div>
          )}
        </div>

        {/* Right Column - Song Details */}
        <div className="md:col-span-2">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#005f73]">
              {song.songName || "Untitled Song"}
            </h1>
            <p className="text-gray-600">{song.albumName || "No album specified"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">Basic Information</h2>
              <DetailItem label="ISRC" value={song.couponCode} />
              <DetailItem label="Primary Artist" value={song.singer} />
              <DetailItem label="Language" value={song.language} />
              <DetailItem label="Release Date" value={formatDate(song.releaseDate)} />
              <DetailItem label="Created At" value={formatDate(song.createdAt)} />
              <DetailItem label="Updated At" value={formatDate(song.updatedAt)} />
            </div>

            {/* Music Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">Music Details</h2>
              <DetailItem label="Genre" value={song.genre} />
              <DetailItem label="Sub Genre" value={song.subGenre} />
              <DetailItem label="Music Composer" value={song.musicComposer} />
              <DetailItem label="Song Writer" value={song.songWriter} />
              <DetailItem 
                label="Explicit Content" 
                value={song.explicitContent} 
                highlight={song.explicitContent === "Yes"}
              />
              <DetailItem label="Use AI" value={song.useAI} />
            </div>

            {/* Additional Information */}
            <div className="space-y-4 md:col-span-2">
              <h2 className="text-lg font-semibold border-b pb-2">Additional Information</h2>
              <DetailItem label="Additional Credits" value={song.additionalCredit} />
              <DetailItem label="Original Work" value={song.originalWork} />
              <DetailItem label="YouTube Content ID" value={song.youTubeContentID} />
              <DetailItem label="Agreed to Terms" value={song.agreeTerms} />
            </div>

            {/* Description */}
            {song.description && (
              <div className="md:col-span-2 space-y-2 pt-4 border-t">
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{song.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable component for detail items
function DetailItem({ label, value, highlight = false }) {
  return (
    <div>
      <span className="block text-sm font-medium text-gray-500">{label}</span>
      <span 
        className={`block ${highlight ? "text-red-600 font-medium" : "text-gray-900"}`}
      >
        {value || "N/A"}
      </span>
    </div>
  );
}