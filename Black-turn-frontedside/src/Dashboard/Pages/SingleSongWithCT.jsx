import React, { useState } from 'react'
import Navbar from '../Pages/header-sidebar/Header';
import Sidebar from '../Pages/header-sidebar/Sidebar';
import { Upload, Music, Calendar, User, FileText, Clock, Star, CheckCircle } from 'lucide-react';
import visa from "../../assets/images/payment-platform/Visa.png"
import MasterCard from '../../assets/images/payment-platform/mastercard.png'
import maestro from '../../assets/images/payment-platform/maestro.png'
import rupay from '../../assets/images/payment-platform/Rupay.png'
import netbanking from '../../assets/images/payment-platform/netbanking.png'
import emi from '../../assets/images/payment-platform/emi.png'
import upi from '../../assets/images/payment-platform/upi.png'
import gpay from '../../assets/images/payment-platform/gpay.png'
import phonepe from '../../assets/images/payment-platform/phonepe.png'
import { CreateSingleSongCT } from '../../Api/api';
import toast from 'react-hot-toast';



function SingleSongWithCT() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeTab, setActiveTab] = useState('singleSongWithCT');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [formData, setFormData] = useState({
        songName: '',
        albumName: '',
        releseDate: '', // Changed from releaseDate
        songPoster: null, // Changed from artwork
        audio: null,
        singer: '', // Changed from primaryArtist
        musicComposer: '',
        songWriter: '',
        language: '',
        genre: '',
        subGenre: '',
        firstCallerTune: '', // Changed from callerTuneName1
        firstCallerTuneTime: '', // Changed from callerTuneStart1
        secondCallerTune: '', // Changed from callerTuneName2
        secondCallerTuneTime: '', // Changed from callerTuneStart2
        explicitContent: 'No',
        youTubeContentID: 'Yes', // Changed from youtubeContentId
        useAI: 'Yes', // Changed from usedAI
        description: '', // Changed from releaseDescription
        originalWork: false,
        agreeTerms: false
    });

    const [dragActive, setDragActive] = useState({ artwork: false, audio: false });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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
            handleInputChange(type, files[0]);
        }
    };

    const handleFileSelect = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            handleInputChange(type, file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.originalWork || !formData.agreeTerms) {
            alert("Please agree to the terms and conditions");
            return;
        }

        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            
            // Append all fields to formData
            formDataToSend.append('songName', formData.songName);
            formDataToSend.append('albumName', formData.albumName);
            formDataToSend.append('releseDate', formData.releseDate);
            if (formData.songPoster) formDataToSend.append('songPoster', formData.songPoster);
            if (formData.audio) formDataToSend.append('audio', formData.audio);
            formDataToSend.append('singer', formData.singer);
            formDataToSend.append('musicComposer', formData.musicComposer);
            formDataToSend.append('songWriter', formData.songWriter);
            formDataToSend.append('language', formData.language);
            formDataToSend.append('genre', formData.genre);
            formDataToSend.append('subGenre', formData.subGenre);
            formDataToSend.append('firstCallerTune', formData.firstCallerTune);
            formDataToSend.append('firstCallerTuneTime', formData.firstCallerTuneTime);
            formDataToSend.append('secondCallerTune', formData.secondCallerTune);
            formDataToSend.append('secondCallerTuneTime', formData.secondCallerTuneTime);
            formDataToSend.append('explicitContent', formData.explicitContent);
            formDataToSend.append('youTubeContentID', formData.youTubeContentID);
            formDataToSend.append('useAI', formData.useAI);
            formDataToSend.append('description', formData.description);

            await CreateSingleSongCT(formDataToSend);
            setSubmitSuccess(true);
                      toast.success('song created  successfully')
            
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Error submitting form. Please try again.');
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

    ]




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
                                            <h1 className="text-3xl font-bold text-[#005f73]">Upload Single Song with CallerTune</h1>
                                            <p className="text-gray-600 mt-1">Share your musical creation with the world</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <Star className="w-5 h-5" />
                                        <span className="text-sm font-medium">Video Guide</span>
                                    </div>
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
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Basic Information */}
                                <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#005f73]">
                                    <h2 className="text-2xl font-bold text-[#005f73] mb-6 flex items-center gap-3">
                                        <FileText className="w-6 h-6" />
                                        Basic Information
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Song Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name='songName'
                                                value={formData.songName}
                                                onChange={(e) => handleInputChange('songName', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                                placeholder="Enter song name"
                                            />
                                            <p className="text-xs text-gray-500">Don't Use Special Characters (Max 10 Words)</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Album Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name='albumName'
                                                value={formData.albumName}
                                                onChange={(e) => handleInputChange('albumName', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                                placeholder="Enter album name"
                                            />
                                            <p className="text-xs text-gray-500">In case of a single song, write the song name here</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Release Date <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name='releseDate'
                                                value={formData.releseDate}
                                                onChange={(e) => handleInputChange('releseDate', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                            />
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
                                                    : 'border-gray-300 hover:border-[#005f73] hover:bg-gray-50'
                                                    }`}
                                            >
                                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-600 mb-2">Click or Drag & Drop to upload your artwork</p>
                                                <input
                                                    type="file"
                                                    name='songPoster'
                                                    accept=".jpg,.png,.jpeg"
                                                    onChange={(e) => handleFileSelect(e, 'artwork')}
                                                    className="hidden"
                                                    id="artwork-upload"
                                                />
                                                <label
                                                    for="artwork-upload"
                                                    className="inline-block px-4 py-2 bg-[#005f73] text-white rounded-lg cursor-pointer hover:bg-[#004a5a] transition-colors"
                                                >
                                                    Choose File
                                                </label>
                                                {formData.artwork && (
                                                    <p className="text-sm text-green-600 mt-2">✓ {formData.artwork.name}</p>
                                                )}
                                            </div>
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
                                                    : 'border-gray-300 hover:border-[#005f73] hover:bg-gray-50'
                                                    }`}
                                            >
                                                <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-600 mb-2">Click or Drag & Drop to upload your audio</p>
                                                <input
                                                    type="file"
                                                    name="audio"
                                                    accept=".mp3,.wav"
                                                    onChange={(e) => handleFileSelect(e, 'audio')}
                                                    className="hidden"
                                                    id="audio-upload"
                                                />
                                                <label
                                                    for="audio-upload"
                                                    className="inline-block px-4 py-2 bg-[#005f73] text-white rounded-lg cursor-pointer hover:bg-[#004a5a] transition-colors"
                                                >
                                                    Choose File
                                                </label>
                                                {formData.audio && (
                                                    <p className="text-sm text-green-600 mt-2">✓ {formData.audio.name}</p>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500">Max Upload Size 2GB. Choose (.mp3, .wav) Only</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Credits */}
                                <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#005f73]">
                                    <h2 className="text-2xl font-bold text-[#005f73] mb-6 flex items-center gap-3">
                                        <User className="w-6 h-6" />
                                        Credits & Details
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Singers / Primary Artist <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="singer"
                                                value={formData.singer}
                                                onChange={(e) => handleInputChange('singer', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                                placeholder="Main Singer/Artist"
                                            />
                                            <p className="text-xs text-gray-500">Main Singer/Artist of Your Song (Use comma for multiple)</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Music Composer(s) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="musicComposer"
                                                value={formData.musicComposer}
                                                onChange={(e) => handleInputChange('musicComposer', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                                placeholder="Music composer name"
                                            />
                                            <p className="text-xs text-gray-500">Use comma for Multiple</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Song Writer / Lyricist(s) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="songWriter"
                                                value={formData.songWriter}
                                                onChange={(e) => handleInputChange('songWriter', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                                placeholder="Lyricist name"
                                            />
                                            <p className="text-xs text-gray-500">Song Writer / Lyricist. Use comma for multiple</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Language <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.language}
                                                name="language"
                                                onChange={(e) => handleInputChange('language', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                            >
                                                <option value="">Select Language</option>
                                                <option value="hindi">Hindi</option>
                                                <option value="english">English</option>
                                                <option value="punjabi">Punjabi</option>
                                                <option value="tamil">Tamil</option>
                                                <option value="telugu">Telugu</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Genre <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.genre}
                                                name="genre"
                                                onChange={(e) => handleInputChange('genre', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                            >
                                                <option value="">Select Genre</option>
                                                <option value="pop">Pop</option>
                                                <option value="rock">Rock</option>
                                                <option value="hip-hop">Hip Hop</option>
                                                <option value="classical">Classical</option>
                                                <option value="folk">Folk</option>
                                                <option value="electronic">Electronic</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Sub Genre <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.subGenre}
                                                name="subGenre"
                                                onChange={(e) => handleInputChange('subGenre', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                            >
                                                <option value="">Select Sub Genre</option>
                                                <option value="romantic">Romantic</option>
                                                <option value="sad">Sad</option>
                                                <option value="dance">Dance</option>
                                                <option value="devotional">Devotional</option>
                                                <option value="party">Party</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* CallerTune Settings */}
                                <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#005f73]">
                                    <h2 className="text-2xl font-bold text-[#005f73] mb-6 flex items-center gap-3">
                                        <Clock className="w-6 h-6" />
                                        CallerTune Settings
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    1st CallerTune Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstCallerTune"
                                                    value={formData.firstCallerTune}
                                                    onChange={(e) => handleInputChange('firstCallerTune', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                                    placeholder="First three words of lyrics"
                                                />
                                                <p className="text-xs text-gray-500">Max 3 Words It Should be the first three words of lyrics of the callertune</p>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    2nd CallerTune Name (Optional)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="secondCallerTune"

                                                    value={formData.secondCallerTune}
                                                    onChange={(e) => handleInputChange('secondCallerTune', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                                    placeholder="Optional second caller tune"
                                                />
                                                <p className="text-xs text-gray-500">Max 3 Words It Should be the first three words of lyrics of the callertune</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    1st CallerTune Start Timing <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.firstCallerTuneTime}
                                                    name="firstCallerTuneTime"
                                                    onChange={(e) => handleInputChange('firstCallerTuneTime', e.target.value)}
                                                    placeholder="mm:ss"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                                />
                                                <p className="text-xs text-gray-500">Caller tune start timing in (min:sec). Make sure it remains under the full song length</p>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    2nd CallerTune Timing (Optional)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="secondCallerTuneTime"

                                                    value={formData.secondCallerTuneTime}
                                                    onChange={(e) => handleInputChange('secondCallerTuneTime', e.target.value)}
                                                    placeholder="mm:ss"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors"
                                                />
                                                <p className="text-xs text-gray-500">Caller tune start timing in (hh:mm:sec) Make sure it remains under the full song length</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Settings */}
                                <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#005f73]">
                                    <h2 className="text-2xl font-bold text-[#005f73] mb-6 flex items-center gap-3">
                                        <CheckCircle className="w-6 h-6" />
                                        Additional Settings
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-4">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Explicit Content <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="explicitContent"
                                                        value="No"
                                                        checked={formData.explicitContent === 'No'}
                                                        onChange={(e) => handleInputChange('explicitContent', e.target.value)}
                                                        className="w-4 h-4 text-[#005f73] border-gray-300 focus:ring-[#005f73]"
                                                    />
                                                    <span className="text-sm text-gray-700">No</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="explicitContent"
                                                        value="Yes"
                                                        checked={formData.explicitContent === 'Yes'}
                                                        onChange={(e) => handleInputChange('explicitContent', e.target.value)}
                                                        className="w-4 h-4 text-[#005f73] border-gray-300 focus:ring-[#005f73]"
                                                    />
                                                    <span className="text-sm text-gray-700">Yes</span>
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500">Select Yes if the lyrics contain strong language or any reference to violence, language nudity, or sexual content.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                YouTube Content ID <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="youTubeContentID"
                                                        value="Yes"
                                                        checked={formData.youTubeContentID === 'Yes'}
                                                        onChange={(e) => handleInputChange('youTubeContentID', e.target.value)}
                                                        className="w-4 h-4 text-[#005f73] border-gray-300 focus:ring-[#005f73]"
                                                    />
                                                    <span className="text-sm text-gray-700">Yes</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="youTubeContentID"
                                                        value="No"
                                                        checked={formData.youTubeContentID === 'No'}
                                                        onChange={(e) => handleInputChange('youTubeContentID', e.target.value)}
                                                        className="w-4 h-4 text-[#005f73] border-gray-300 focus:ring-[#005f73]"
                                                    />
                                                    <span className="text-sm text-gray-700">No</span>
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500">Select Yes if you also want Content ID for Your Song.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Did you use AI in your song? <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="useAI"
                                                        value="Yes"
                                                        checked={formData.useAI === 'Yes'}
                                                        onChange={(e) => handleInputChange('useAI', e.target.value)}
                                                        className="w-4 h-4 text-[#005f73] border-gray-300 focus:ring-[#005f73]"
                                                    />
                                                    <span className="text-sm text-gray-700">Yes</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="useAI"
                                                        value="No"
                                                        checked={formData.useAI === 'No'}
                                                        onChange={(e) => handleInputChange('useAI', e.target.value)}
                                                        className="w-4 h-4 text-[#005f73] border-gray-300 focus:ring-[#005f73]"
                                                    />
                                                    <span className="text-sm text-gray-700">No</span>
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500">Wrong choice may delay song.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Release Description */}
                                <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#005f73]">
                                    <h2 className="text-2xl font-bold text-[#005f73] mb-6">Release Description (Optional)</h2>
                                    <textarea
                                        value={formData.description}
                                        name="description"

                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-[#005f73] transition-colors resize-none"
                                        placeholder="Tell us more about your song..."
                                    />
                                </div>

                                {/* Terms and Conditions */}
                                <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#005f73]">
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                name="originalWork"

                                                id="originalWork"
                                                checked={formData.originalWork}
                                                onChange={(e) => handleInputChange('originalWork', e.target.checked)}
                                                className="w-5 h-5 text-[#005f73] border-gray-300 rounded focus:ring-[#005f73] mt-1"
                                            />
                                            <label htmlFor="originalWork" className="text-sm text-gray-700 leading-relaxed">
                                                I agree and confirm that the song uploaded by me is original in composition, lyrics, and music, and I own the copyright. If the stores request documents for the song, I am responsible for providing them. Failure to provide the necessary documents will result in no refund, and the song will either not be processed or may be taken down from the stores.
                                            </label>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                name="agreeTerms"

                                                id="agreeTerms"
                                                checked={formData.agreeTerms}
                                                onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                                                className="w-5 h-5 text-[#005f73] border-gray-300 rounded focus:ring-[#005f73] mt-1"
                                            />
                                            <label htmlFor="agreeTerms" className="text-sm text-gray-700 leading-relaxed">
                                                I have read and agree to the website <span className="text-blue-600 underline cursor-pointer">terms and conditions</span>. I Confirm, This is not a cover song, if this is a cover song then cancel this order with no refund. I have the copyright, and I'm not giving it to Theblackturn. They're just helping monetizing and distributing my song worldwide. This is not a cover song. In case of any third party claim, I have documentary evidence to prove my ownership of the song.
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#005f73]">
                                    <h2 className="text-2xl font-bold text-[#005f73] mb-6">Your Order</h2>

                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-lg font-semibold text-gray-700">Singlesong (All Stores + CallerTune)</span>
                                            <span className="text-2xl font-bold text-[#005f73]">₹799</span>
                                        </div>
                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-bold text-gray-800">Total</span>
                                                <span className="text-2xl font-bold text-[#005f73]">₹799</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Options */}
                                    <div className="mt-6">
                                        <p className="text-sm text-gray-600 mb-4">We Accept:</p>
                                        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-6">
                                            {
                                                paymentplatform.map((platform, index) => (
                                                    <div key={index}
                                                        className="group w-20 h-20 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-200">
                                                        <img src={platform.img}
                                                            alt={platform.name}
                                                            className="w-12 h-12 object-contain" />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={!formData.originalWork || !formData.agreeTerms}
                                        className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-[1.02] ${formData.originalWork && formData.agreeTerms
                                            ? 'bg-gradient-to-r from-[#005f73] to-[#0a7c91] text-white hover:shadow-lg'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        Submit Song
                                    </button>
                                </div>
                            </form>

                            {/* Success Message (Hidden by default) */}
                            <div className="hidden bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-green-800">Song Submitted Successfully!</h3>
                                        <p className="text-green-700">Your song has been submitted for review. You will receive updates via email.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        </>

    );
};

export default SingleSongWithCT