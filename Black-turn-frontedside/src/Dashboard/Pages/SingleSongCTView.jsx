import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ViewSingleSongCTById } from '../../Api/api';

const BASE_URL = import.meta.env.OFFLINE_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function SingleSongCTView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // लॉगिन चेक (localStorage में token या userId)
  useEffect(() => {
    const token = localStorage.getItem('Token') || localStorage.getItem('token');
    if (!token) {
      navigate('/Signin');
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchSong() {
      setLoading(true);
      setError('');
      try {
        const res = await ViewSingleSongCTById(id);
        setSong(res.data?.data || res.data?.data || res.data);
      } catch (err) {
        setError('Unable to fetch song details.');
      } finally {
        setLoading(false);
      }
    }
    fetchSong();
  }, [id]);

  const getImageUrl = (path) => {
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
    return patterns[0];
  };

  const getAudioUrl = (audio) => {
    if (!audio) return '';
    if (audio.startsWith('http')) return audio;
    const cleanPath = audio.replace(/^\/+/, '');
    const patterns = [
      `${BASE_URL}/upload/${cleanPath}`,
      `${BASE_URL}/uploads/${cleanPath}`,
      `${BASE_URL}/audio/${cleanPath}`,
      `${BASE_URL}/assets/${cleanPath}`,
      `${BASE_URL}/${cleanPath}`
    ];
    return patterns[0];
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;
  if (!song) return <div className="p-10 text-center">No data found</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-[#005f73] mb-4">{song.songName || 'Song Details'}</h1>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <img
            src={getImageUrl(song.songPoster)}
            alt={song.songName}
            className="w-48 h-48 object-cover rounded-lg border"
            onError={e => (e.target.src = `${BASE_URL}/upload/default-song-poster.jpg`)}
          />
          <div className="flex-1 space-y-2">
            <div><span className="font-semibold">Album:</span> {song.albumName || 'N/A'}</div>
            <div><span className="font-semibold">Singer:</span> {song.singer || 'N/A'}</div>
            <div><span className="font-semibold">Language:</span> {song.language || 'N/A'}</div>
            <div><span className="font-semibold">Release Date:</span> {song.releseDate || 'N/A'}</div>
            <div><span className="font-semibold">Music Composer:</span> {song.musicComposer || 'N/A'}</div>
            <div><span className="font-semibold">Song Writer:</span> {song.songWriter || 'N/A'}</div>
            <div><span className="font-semibold">Genre:</span> {song.genre || 'N/A'}</div>
            <div><span className="font-semibold">Sub Genre:</span> {song.subGenre || 'N/A'}</div>
            <div><span className="font-semibold">YouTube Content ID:</span> {song.youTubeContentID || 'No'}</div>
            <div><span className="font-semibold">Explicit Content:</span> {song.explicitContent || 'No'}</div>
            <div><span className="font-semibold">Description:</span> {song.description || 'N/A'}</div>
          </div>
        </div>
        <div className="mb-6">
          <audio controls src={getAudioUrl(song.audio)} className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
        <button
          className="bg-[#005f73] text-white px-4 py-2 rounded hover:bg-[#004a5b]"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
} 