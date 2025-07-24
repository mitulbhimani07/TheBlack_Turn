import React, { useState } from 'react';
import Navbar from '../Pages/header-sidebar/Header';
import Sidebar from '../Pages/header-sidebar/Sidebar';
import { Upload, Music, Calendar, User, FileText, CheckCircle } from 'lucide-react';
import visa from "../../assets/images/payment-platform/Visa.png";
import MasterCard from '../../assets/images/payment-platform/mastercard.png';
import maestro from '../../assets/images/payment-platform/maestro.png';
import rupay from '../../assets/images/payment-platform/Rupay.png';
import netbanking from '../../assets/images/payment-platform/netbanking.png';
import emi from '../../assets/images/payment-platform/emi.png';
import upi from '../../assets/images/payment-platform/upi.png';
import gpay from '../../assets/images/payment-platform/gpay.png';
import phonepe from '../../assets/images/payment-platform/phonepe.png';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CreateSingleSongWithoutCt } from '../../Api/api';

function SingleSongWithoutCT() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeTab, setActiveTab] = useState('singleSongwithoutCT');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const initialFormState = {
        songName: '',
        albumName: '',
        releaseDate: '',
        artwork: '',
        audio: '',
        singer: '',
        language: '',
        explicitContent: 'No',
        genre: '',
        musicComposer: '',
        youtubeContentID: 'Yes',
        songWriter: '',
        subGenre: '',
        useAI: 'No',
        description: '',
        additionalCredit:'',
        originalWork: false,
        agreeTerms: false,
        couponCode: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [dragActive, setDragActive] = useState({ artwork: false, audio: false });

    const validateForm = () => {
        const newErrors = {};
        
        // Required fields validation
        if (!formData.songName.trim()) newErrors.songName = 'Song name is required';
        if (!formData.albumName.trim()) newErrors.albumName = 'Album name is required';
        if (!formData.releaseDate) newErrors.releaseDate = 'Release date is required';
        if (!formData.artwork) newErrors.artwork = 'Artwork is required';
        if (!formData.audio) newErrors.audio = 'Audio file is required';
        if (!formData.singer.trim()) newErrors.singer = 'Singer is required';
        if (!formData.language) newErrors.language = 'Language is required';
        if (!formData.genre) newErrors.genre = 'Genre is required';
        if (!formData.musicComposer.trim()) newErrors.musicComposer = 'Music composer is required';
        if (!formData.songWriter.trim()) newErrors.songWriter = 'Song writer is required';
        if (!formData.subGenre) newErrors.subGenre = 'Sub genre is required';
        if (!formData.originalWork) newErrors.originalWork = 'You must confirm this is original work';
        if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
        
        // File type validation
        if (formData.artwork) {
            const validArtworkTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validArtworkTypes.includes(formData.artwork.type)) {
                newErrors.artwork = 'Only JPG, PNG, JPEG files are allowed';
            }
        }
        
        if (formData.audio) {
            const validAudioTypes = ['audio/mpeg', 'audio/wav'];
            if (!validAudioTypes.includes(formData.audio.type)) {
                newErrors.audio = 'Only MP3, WAV files are allowed';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
            // Clear error when file is selected
            if (files[0]) {
                setErrors(prev => ({ ...prev, [name]: '' }));
            }
        } else if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
            // Clear error when checkbox is checked
            if (checked) {
                setErrors(prev => ({ ...prev, [name]: '' }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            // Clear error when input changes
            if (value) {
                setErrors(prev => ({ ...prev, [name]: '' }));
            }
        }
    };

    const handleDragOver = (e, type) => {
        e.preventDefault();
        setDragActive(prev => ({ ...prev, [type]: true }));
    };

    const handleDragLeave = (e, type) => {
        e.preventDefault();
        setDragActive(prev => ({ ...prev, [type]: false }));
    };

    const handleDrop = (e, type) => {
        e.preventDefault();
        setDragActive(prev => ({ ...prev, [type]: false }));
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setFormData(prev => ({ ...prev, [type]: files[0] }));
            // Clear error when file is dropped
            setErrors(prev => ({ ...prev, [type]: '' }));
        }
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setErrors({});
        // Reset file inputs
        document.getElementById('artwork-upload').value = '';
        document.getElementById('audio-upload').value = '';
    };

   const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("Please fill all required fields correctly");
    return;
  }

  setIsSubmitting(true);

  try {
    const form = new FormData();
    
    // Append all fields except files and booleans
    form.append('songName', formData.songName);
    form.append('albumName', formData.albumName);
    form.append('releaseDate', formData.releaseDate);
    form.append('singer', formData.singer);
    form.append('language', formData.language);
    form.append('explicitContent', formData.explicitContent);
    form.append('genre', formData.genre);
    form.append('musicComposer', formData.musicComposer);
    form.append('youtubeContentID', formData.youtubeContentID);
    form.append('songWriter', formData.songWriter);
    form.append('subGenre', formData.subGenre);
    form.append('useAI', formData.useAI);
    form.append('description', formData.description);
    form.append('couponCode', formData.couponCode);
    form.append('additionalCredit', formData.additionalCredit);
    
    // Append booleans as actual booleans
    form.append('originalWork', formData.originalWork);
    form.append('agreeTerms', formData.agreeTerms);
    
    // Append files
    form.append('artwork', formData.artwork);
    form.append('audio', formData.audio);

    await CreateSingleSongWithoutCt(form);
    toast.success("Song created successfully!");
    resetForm();
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error(error.response?.data?.message || "Error creating song");
  } finally {
    setIsSubmitting(false);
  }
};


    const paymentplatform = [
        { img: visa },
        { img: MasterCard },
        { img: maestro },
        { img: rupay },
        { img: netbanking },
        { img: emi },
        { img: upi },
        { img: gpay },
        { img: phonepe }
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => prev - 1);
    };

    return (
        <>
            <div className="min-h-screen flex bg-gray-50 relative">
                <Sidebar
                    isOpen={isSidebarOpen}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <div className="flex-1 flex flex-col min-h-screen">
                    <div className="sticky top-0 z-50">
                        <Navbar
                            toggleSidebar={toggleSidebar}
                            sidebarOpen={isSidebarOpen}
                            notifications={notifications}
                            unreadCount={unreadCount}
                            markAsRead={markAsRead}
                        />
                    </div>

                    {/* main */}
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
                        <div className="max-w-6xl mx-auto">
                            {/* Header */}
                            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-[#005f73]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-[#005f73] rounded-full">
                                            <Music className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-bold text-[#005f73]">Upload Single Song without CallerTune</h1>
                                            <p className="text-gray-600 mt-1">Share your musical creation with the world</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={resetForm}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Reset Form
                                    </button>
                                </div>
                            </div>

                            {/* Alert */}
                            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                                    <p className="text-cyan-800 font-medium">
                                        Remember to enter the correct details when submitting; otherwise, your song will be put on hold and delayed.
                                    </p>
                                </div>
                                <p className="text-cyan-700 mt-2 text-sm">
                                    These details are essential for sharing and promoting your song effectively. Make sure everything is accurate and ready to showcase your musical creation to the world!
                                </p>
                            </div>

                            {/* Coupon Code */}
                            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Have a Coupon Code?</h3>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        name="couponCode"
                                        value={formData.couponCode}
                                        onChange={handleInputChange}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                        placeholder="Enter coupon code"
                                    />
                                    <button className="px-4 py-2 bg-[#005f73] text-white rounded-lg hover:bg-[#004a5a] transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Basic Information */}
                                <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#005f73]">
                                    <h2 className="text-2xl font-bold text-[#005f73] mb-6 flex items-center gap-3">
                                        <FileText className="w-6 h-6" />
                                        Basic Information
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Song Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="songName"
                                                value={formData.songName}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border ${errors.songName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors`}
                                                placeholder="Enter song name"
                                            />
                                            {errors.songName && <p className="text-xs text-red-500">{errors.songName}</p>}
                                            <p className="text-xs text-gray-500">Don't Use Special Characters (Max 10 Words)</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Album Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="albumName"
                                                value={formData.albumName}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border ${errors.albumName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors`}
                                                placeholder="Enter album name"
                                            />
                                            {errors.albumName && <p className="text-xs text-red-500">{errors.albumName}</p>}
                                            <p className="text-xs text-gray-500">In case of a single song, write the song name here</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Release Date <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="releaseDate"
                                                value={formData.releaseDate}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border ${errors.releaseDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors`}
                                            />
                                            {errors.releaseDate && <p className="text-xs text-red-500">{errors.releaseDate}</p>}
                                            <p className="text-xs text-gray-500">Choose Any (Past, Present or Future) Date of Your Music Release</p>
                                        </div>
                                    </div>
                                </div>

                                {/* File Uploads */}
                                <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#005f73]">
                                    <h2 className="text-2xl font-bold text-[#005f73] mb-6 flex items-center gap-3">
                                        <Upload className="w-6 h-6" />
                                        File Uploads
                                    </h2>

                                    <div className="space-y-8">
                                        {/* Artwork Upload Requirements */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-semibold text-gray-700 mb-2">Cover art (Song Poster) Requirements</h3>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Size must be 3000x3000px</li>
                                                <li>• Formats: .jpg, .png, .jpeg only</li>
                                                <li>• High quality, no blurry images</li>
                                            </ul>
                                        </div>

                                        {/* Audio Requirements */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-semibold text-gray-700 mb-2">Audio Requirements</h3>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• High quality audio file</li>
                                                <li>• Formats: .mp3, .wav</li>
                                                <li>• Properly mastered track</li>
                                            </ul>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Artwork Upload */}
                                            <div className="space-y-4">
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    Upload Your (Song Poster) Artwork <span className="text-red-500">*</span>
                                                </label>
                                                <div
                                                    onDragOver={(e) => handleDragOver(e, 'artwork')}
                                                    onDragLeave={(e) => handleDragLeave(e, 'artwork')}
                                                    onDrop={(e) => handleDrop(e, 'artwork')}
                                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${dragActive.artwork
                                                        ? 'border-[#005f73] bg-blue-50'
                                                        : errors.artwork 
                                                            ? 'border-red-500 bg-red-50'
                                                            : 'border-gray-300 hover:border-[#005f73] hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                    <p className="text-gray-600 mb-2">Click or Drag & Drop to upload your artwork</p>
                                                    <input
                                                        type="file"
                                                        name="artwork"
                                                        accept=".jpg,.png,.jpeg"
                                                        onChange={handleInputChange}
                                                        className="hidden"
                                                        id="artwork-upload"
                                                    />
                                                    <label
                                                        htmlFor="artwork-upload"
                                                        className="inline-block px-4 py-2 bg-[#005f73] text-white rounded-lg cursor-pointer hover:bg-[#004a5a] transition-colors"
                                                    >
                                                        Choose File
                                                    </label>
                                                    {formData.artwork && (
                                                        <p className="text-sm text-green-600 mt-2">✓ {formData.artwork.name}</p>
                                                    )}
                                                </div>
                                                {errors.artwork && <p className="text-xs text-red-500">{errors.artwork}</p>}
                                                <p className="text-xs text-gray-500">Size must be 3000x3000px. Choose (.jpg, .png, .jpeg) Only</p>
                                            </div>

                                            {/* Audio Upload */}
                                            <div className="space-y-4">
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    Upload Your Audio <span className="text-red-500">*</span>
                                                </label>
                                                <div
                                                    onDragOver={(e) => handleDragOver(e, 'audio')}
                                                    onDragLeave={(e) => handleDragLeave(e, 'audio')}
                                                    onDrop={(e) => handleDrop(e, 'audio')}
                                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${dragActive.audio
                                                        ? 'border-[#005f73] bg-blue-50'
                                                        : errors.audio 
                                                            ? 'border-red-500 bg-red-50'
                                                            : 'border-gray-300 hover:border-[#005f73] hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                    <p className="text-gray-600 mb-2">Click or Drag & Drop to upload your audio</p>
                                                    <input
                                                        type="file"
                                                        name="audio"
                                                        accept=".mp3,.wav"
                                                        onChange={handleInputChange}
                                                        className="hidden"
                                                        id="audio-upload"
                                                    />
                                                    <label
                                                        htmlFor="audio-upload"
                                                        className="inline-block px-4 py-2 bg-[#005f73] text-white rounded-lg cursor-pointer hover:bg-[#004a5a] transition-colors"
                                                    >
                                                        Choose File
                                                    </label>
                                                    {formData.audio && (
                                                        <p className="text-sm text-green-600 mt-2">✓ {formData.audio.name}</p>
                                                    )}
                                                </div>
                                                {errors.audio && <p className="text-xs text-red-500">{errors.audio}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Credits */}
                                <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#005f73]">
                                    <h2 className="text-2xl font-bold text-[#005f73] mb-6 flex items-center gap-3">
                                        <User className="w-6 h-6" />
                                        Credits & Details
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Singers / Primary Artist <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="singer"
                                                value={formData.singer}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border ${errors.singer ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors`}
                                                placeholder="Main Singer/Artist"
                                            />
                                            {errors.singer && <p className="text-xs text-red-500">{errors.singer}</p>}
                                            <p className="text-xs text-gray-500">Main Singer/Artist of Your Song (Use comma for multiple)</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Language <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="language"
                                                value={formData.language}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border ${errors.language ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors`}
                                            >
                                                <option value="">Select Language</option>
                                                <option value="hindi">Hindi</option>
                                                <option value="english">English</option>
                                                <option value="punjabi">Punjabi</option>
                                                <option value="tamil">Tamil</option>
                                                <option value="telugu">Telugu</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {errors.language && <p className="text-xs text-red-500">{errors.language}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Explicit Content <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="explicitContent"
                                                value={formData.explicitContent}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                            >
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                            <p className="text-xs text-gray-500">Select Yes if the lyrics contain strong language or any reference to violence, language nudity, or sexual content.</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Genre <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="genre"
                                                value={formData.genre}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border ${errors.genre ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors`}
                                            >
                                                <option value="">Select Genre</option>
                                                <option value="pop">Pop</option>
                                                <option value="rock">Rock</option>
                                                <option value="hip-hop">Hip Hop</option>
                                                <option value="classical">Classical</option>
                                                <option value="folk">Folk</option>
                                                <option value="electronic">Electronic</option>
                                            </select>
                                            {errors.genre && <p className="text-xs text-red-500">{errors.genre}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Music Composer(s) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="musicComposer"
                                                value={formData.musicComposer}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border ${errors.musicComposer ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors`}
                                                placeholder="Music composer name"
                                            />
                                            {errors.musicComposer && <p className="text-xs text-red-500">{errors.musicComposer}</p>}
                                            <p className="text-xs text-gray-500">Use comma for Multiple</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                YouTube Content ID <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="youtubeContentID"
                                                value={formData.youtubeContentID}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                            >
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                            <p className="text-xs text-gray-500">Select Yes if you also want Content ID for Your Song.</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Song Writer / Lyricist(s) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="songWriter"
                                                value={formData.songWriter}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border ${errors.songWriter ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors`}
                                                placeholder="Lyricist name"
                                            />
                                            {errors.songWriter && <p className="text-xs text-red-500">{errors.songWriter}</p>}
                                            <p className="text-xs text-gray-500">Song Writer / Lyricist. Use comma for multiple</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Sub Genre <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="subGenre"
                                                value={formData.subGenre}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border ${errors.subGenre ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors`}
                                            >
                                                <option value="">Select Sub Genre</option>
                                                <option value="romantic">Romantic</option>
                                                <option value="sad">Sad</option>
                                                <option value="dance">Dance</option>
                                                <option value="devotional">Devotional</option>
                                                <option value="party">Party</option>
                                            </select>
                                            {errors.subGenre && <p className="text-xs text-red-500">{errors.subGenre}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Did you use AI in your song? <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="useAI"
                                                value={formData.useAI}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                            >
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                            <p className="text-xs text-gray-500">Wrong choice may delay song.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Optional Fields */}
                                <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#005f73]">
                                    <h2 className="text-2xl font-bold text-[#005f73] mb-6">Additional Information (Optional)</h2>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Do you want to add Apple and Spotify Artist ID Link or more Song Credits?
                                            </label>
                                            <input
                                                type="text"
                                                name="additionalCredit"
                                                value={formData.additionalCredit}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                                placeholder="Add any additional credits or links"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Release Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors resize-none"
                                                placeholder="Tell us more about your song..."
                                            />
                                            <p className="text-xs text-gray-500">Anything More?</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#005f73]">
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                id="originalWork"
                                                name="originalWork"
                                                checked={formData.originalWork}
                                                onChange={handleInputChange}
                                                className={`w-5 h-5 text-[#005f73] ${errors.originalWork ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-[#005f73] mt-1`}
                                            />
                                            <label htmlFor="originalWork" className="text-sm text-gray-700 leading-relaxed">
                                                I agree and confirm that the song uploaded by me is original in composition, lyrics, and music, and I own the copyright. If the stores request documents for the song, I am responsible for providing them. Failure to provide the necessary documents will result in no refund, and the song will either not be processed or may be taken down from the stores.
                                            </label>
                                        </div>
                                        {errors.originalWork && <p className="text-xs text-red-500">{errors.originalWork}</p>}

                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                id="agreeTerms"
                                                name="agreeTerms"
                                                checked={formData.agreeTerms}
                                                onChange={handleInputChange}
                                                className={`w-5 h-5 text-[#005f73] ${errors.agreeTerms ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-[#005f73] mt-1`}
                                            />
                                            <label htmlFor="agreeTerms" className="text-sm text-gray-700 leading-relaxed">
                                                I have read and agree to the website terms and conditions. I Confirm, This is not a cover song, if this is a cover song then cancel this order with no refund. I have the copyright, and I'm not giving it to Theblackturn. They're just helping monetizing and distributing my song worldwide. This is not a cover song. In case of any third party claim, I have documentary evidence to prove my ownership of the song.
                                            </label>
                                        </div>
                                        {errors.agreeTerms && <p className="text-xs text-red-500">{errors.agreeTerms}</p>}
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#005f73]">
                                    <h2 className="text-2xl font-bold text-[#005f73] mb-6">Your Order</h2>

                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-lg font-semibold text-gray-700">Single song (All Stores without CallerTune)</span>
                                            <span className="text-2xl font-bold text-[#005f73]">₹599</span>
                                        </div>
                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-bold text-gray-800">Total</span>
                                                <span className="text-2xl font-bold text-[#005f73]">₹599</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Options */}
                                    <div className="mt-6">
                                        <p className="text-sm text-gray-600 mb-4">We Accept:</p>
                                        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4 mb-6">
                                            {paymentplatform.map((platform, index) => (
                                                <div key={index}
                                                    className="group w-20 h-20 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-200">
                                                    <img src={platform.img}
                                                        alt="payment method"
                                                        className="w-12 h-12 object-contain" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-[1.02] ${Object.keys(errors).length === 0
                                            ? 'bg-gradient-to-r from-[#005f73] to-[#0a7c91] text-white hover:shadow-lg'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            'Submit Song'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleSongWithoutCT;