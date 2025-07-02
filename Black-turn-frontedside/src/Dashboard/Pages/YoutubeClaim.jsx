import React, { useState, useMemo } from 'react';
import { Upload, Check, AlertCircle, Clock, X, Search, Filter, Download, RefreshCw, Eye, Edit, Plus, FileText, ExternalLink } from 'lucide-react';
import Navbar from './header-sidebar/Header';
import Sidebar from './header-sidebar/Sidebar';
import { Link } from 'react-router-dom';






// Modal Components
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}>
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};



const NewClaimModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        url: '',
        selectedSongs: [],
        reason: '',
        priority: 'medium'
    });

    const availableSongs = [
        'Song Title 1', 'Song Title 2', 'Another Song', 'Track Name', 'Beat Title',
        'New Track', 'Demo Song', 'Latest Release'
    ];

    const handleSongToggle = (song) => {
        setFormData(prev => ({
            ...prev,
            selectedSongs: prev.selectedSongs.includes(song)
                ? prev.selectedSongs.filter(s => s !== song)
                : [...prev.selectedSongs, song]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ url: '', selectedSongs: [], reason: '', priority: 'medium' });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Submit New YT Claim Request" size="lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
                    <input
                        type="url"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Songs to Claim</label>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                        {availableSongs.map(song => (
                            <label key={song} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.selectedSongs.includes(song)}
                                    onChange={() => handleSongToggle(song)}
                                    className="text-[#005f73] focus:ring-[#005f73]"
                                />
                                <span className="text-sm text-gray-700">{song}</span>
                            </label>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Selected: {formData.selectedSongs.length} songs</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-transparent"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Claim</label>
                    <textarea
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-transparent"
                        placeholder="Explain why you're claiming this content..."
                        required
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={formData.selectedSongs.length === 0}
                        className="px-4 py-2 bg-[#005f73] text-white rounded-lg hover:bg-[#007a8c] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Claim
                    </button>
                </div>
            </form>
        </Modal>
    );
};

const ViewClaimModal = ({ isOpen, onClose, claim }) => {
    if (!claim) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="View Claim Details" size="lg">
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Submission Date</label>
                        <p className="text-gray-900">{claim.date}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${claim.status === 'approved' ? 'bg-green-100 text-green-800' :
                            claim.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                        </span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                    <a href={claim.url} target="_blank" rel="noopener noreferrer"
                        className="text-[#005f73] hover:underline flex items-center space-x-1">
                        <span>{claim.url}</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Selected Songs</label>
                    <div className="space-y-2">
                        {claim.selectedSongs.map((song, index) => (
                            <div key={index} className="bg-gray-100 px-3 py-2 rounded-lg text-sm">
                                {song}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Submitted By</label>
                    <p className="text-gray-900">{claim.submittedBy}</p>
                </div>

                {claim.status === 'rejected' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason</label>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-800 text-sm">The provided content does not match our database records. Please verify the songs and resubmit.</p>
                        </div>
                    </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Close
                    </button>
                    {claim.status === 'pending' && (
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                            Cancel Claim
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

const EditClaimModal = ({ isOpen, onClose, claim, onUpdate }) => {
    const [formData, setFormData] = useState({
        url: claim?.url || '',
        selectedSongs: claim?.selectedSongs || [],
        reason: ''
    });

    const availableSongs = [
        'Song Title 1', 'Song Title 2', 'Another Song', 'Track Name', 'Beat Title',
        'New Track', 'Demo Song', 'Latest Release'
    ];

    const handleSongToggle = (song) => {
        setFormData(prev => ({
            ...prev,
            selectedSongs: prev.selectedSongs.includes(song)
                ? prev.selectedSongs.filter(s => s !== song)
                : [...prev.selectedSongs, song]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(claim.id, formData);
        onClose();
    };

    if (!claim) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Claim Request" size="lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
                    <input
                        type="url"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Songs to Claim</label>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                        {availableSongs.map(song => (
                            <label key={song} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.selectedSongs.includes(song)}
                                    onChange={() => handleSongToggle(song)}
                                    className="text-[#005f73] focus:ring-[#005f73]"
                                />
                                <span className="text-sm text-gray-700">{song}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#005f73] text-white rounded-lg hover:bg-[#007a8c]"
                    >
                        Update Claim
                    </button>
                </div>
            </form>
        </Modal>
    );
};

const SongStatusModal = ({ isOpen, onClose }) => {
    const songStatuses = [
        { id: 1, title: 'Summer Vibes', status: 'complete', uploaded: '2024-06-15', processed: '2024-06-16' },
        { id: 2, title: 'Night Drive', status: 'processing', uploaded: '2024-06-20', processed: null },
        { id: 3, title: 'Urban Beat', status: 'pending', uploaded: '2024-06-25', processed: null },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Song Status Check" size="lg">
            <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                        Check the processing status of your uploaded songs. Complete songs are ready for distribution.
                    </p>
                </div>

                <div className="space-y-3">
                    {songStatuses.map(song => (
                        <div key={song.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">{song.title}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${song.status === 'complete' ? 'bg-green-100 text-green-800' :
                                    song.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                    {song.status.charAt(0).toUpperCase() + song.status.slice(1)}
                                </span>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                                <p>Uploaded: {song.uploaded}</p>
                                {song.processed && <p>Processed: {song.processed}</p>}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-[#005f73] text-white rounded-lg hover:bg-[#007a8c]">
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

const ComplaintModal = ({ isOpen, onClose, onSubmit }) => {
    const [complaint, setComplaint] = useState({
        type: '',
        subject: '',
        description: '',
        priority: 'medium'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(complaint);
        setComplaint({ type: '', subject: '', description: '', priority: 'medium' });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Raise a Complaint" size="lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Complaint Type</label>
                    <select
                        value={complaint.type}
                        onChange={(e) => setComplaint({ ...complaint, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-transparent"
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="delivery">Song Not Delivered</option>
                        <option value="quality">Quality Issues</option>
                        <option value="payment">Payment Issues</option>
                        <option value="technical">Technical Problems</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                        type="text"
                        value={complaint.subject}
                        onChange={(e) => setComplaint({ ...complaint, subject: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-transparent"
                        placeholder="Brief description of the issue"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                        value={complaint.priority}
                        onChange={(e) => setComplaint({ ...complaint, priority: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-transparent"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        value={complaint.description}
                        onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-transparent"
                        placeholder="Provide detailed information about your complaint..."
                        required
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#005f73] text-white rounded-lg hover:bg-[#007a8c]"
                    >
                        Submit Complaint
                    </button>
                </div>
            </form>
        </Modal>
    );
};

function YoutubeClaim() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showBanner, setShowBanner] = useState(true);

    // Modal states
    const [modals, setModals] = useState({
        uploadSong: false,
        newClaim: false,
        viewClaim: false,
        editClaim: false,
        songStatus: false,
        complaint: false
    });

    const [selectedClaim, setSelectedClaim] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Mock data for claim requests
    const [claimRequests, setClaimRequests] = useState([
        {
            id: 1,
            date: '2024-07-01',
            url: 'https://youtube.com/watch?v=abc123',
            selectedSongs: ['Song Title 1', 'Song Title 2'],
            status: 'pending',
            submittedBy: 'John Doe'
        },
        {
            id: 2,
            date: '2024-06-28',
            url: 'https://youtube.com/watch?v=def456',
            selectedSongs: ['Another Song'],
            status: 'approved',
            submittedBy: 'Jane Smith'
        },
        {
            id: 3,
            date: '2024-06-25',
            url: 'https://youtube.com/watch?v=ghi789',
            selectedSongs: ['Track Name', 'Beat Title'],
            status: 'rejected',
            submittedBy: 'Mike Johnson'
        }
    ]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => prev - 1);
    };

    const openModal = (modalName, claim = null) => {
        setModals(prev => ({ ...prev, [modalName]: true }));
        if (claim) setSelectedClaim(claim);
    };

    const closeModal = (modalName) => {
        setModals(prev => ({ ...prev, [modalName]: false }));
        setSelectedClaim(null);
    };

    const handleUploadSong = (songData) => {
        console.log('Uploading song:', songData);
        // Add success notification
        alert('Song uploaded successfully! Processing will begin shortly.');
    };

    const handleNewClaim = (claimData) => {
        const newClaim = {
            id: claimRequests.length + 1,
            date: new Date().toISOString().split('T')[0],
            url: claimData.url,
            selectedSongs: claimData.selectedSongs,
            status: 'pending',
            submittedBy: 'Current User'
        };
        setClaimRequests(prev => [newClaim, ...prev]);
        alert('Claim request submitted successfully!');
    };

    const handleUpdateClaim = (claimId, updatedData) => {
        setClaimRequests(prev =>
            prev.map(claim =>
                claim.id === claimId
                    ? { ...claim, ...updatedData }
                    : claim
            )
        );
        alert('Claim updated successfully!');
    };

    const handleComplaint = (complaintData) => {
        console.log('Complaint submitted:', complaintData);
        alert('Your complaint has been submitted. We will respond within 24 hours.');
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            alert('Data refreshed successfully!');
        }, 1000);
    };

    const handleExport = () => {
        const csvContent = claimRequests.map(claim =>
            `${claim.date},${claim.url},${claim.selectedSongs.join(';')},${claim.status},${claim.submittedBy}`
        ).join('\n');

        const blob = new Blob([`Date,URL,Songs,Status,Submitted By\n${csvContent}`], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'youtube_claims.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const stats = [
        { label: 'Total Claims', value: claimRequests.length.toString(), color: 'bg-blue-500' },
        { label: 'Pending', value: claimRequests.filter(c => c.status === 'pending').length.toString(), color: 'bg-yellow-500' },
        { label: 'Approved', value: claimRequests.filter(c => c.status === 'approved').length.toString(), color: 'bg-green-500' },
        { label: 'Rejected', value: claimRequests.filter(c => c.status === 'rejected').length.toString(), color: 'bg-red-500' }
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
            approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
            rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
        };
        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    // Filter and search functionality
    const filteredRequests = useMemo(() => {
        return claimRequests.filter(request => {
            const matchesFilter = selectedFilter === 'all' || request.status === selectedFilter;
            const matchesSearch = searchTerm === '' ||
                request.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.selectedSongs.some(song => song.toLowerCase().includes(searchTerm.toLowerCase())) ||
                request.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [claimRequests, selectedFilter, searchTerm]);

    // Pagination
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (


        < div className="min-h-screen flex bg-gray-50 relative" >
            <Sidebar
                isOpen={isSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className={`flex-1 flex flex-col min-h-screen`}>
                <div className="sticky top-0 z-50">
                    <Navbar
                        toggleSidebar={toggleSidebar}
                        sidebarOpen={isSidebarOpen}
                        notifications={notifications}
                        unreadCount={unreadCount}
                        markAsRead={markAsRead}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 space-y-6">
                    {/* Stats Cards */}

                    {/* No Songs Delivered Section */}
                    {showBanner && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">No Songs Delivered</h2>
                                        <p className="text-sm text-gray-600 mt-1">by You</p>
                                    </div>
                                    <Link to="/singleSongWithCT"

                                        className="bg-[#005f73] text-white px-4 py-2 rounded-lg hover:bg-[#007a8c] transition-colors flex items-center space-x-2"
                                    >
                                        <Upload className="w-4 h-4" />
                                        <span>Upload New Song</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-blue-800 font-medium">None of your song has been Delivered yet.</p>
                                            <p className="text-blue-700 text-sm mt-1">
                                                In case, you have uploaded the song. Click{' '}
                                                <button
                                                    onClick={() => openModal('songStatus')}
                                                    className="text-[#005f73] hover:underline font-medium"
                                                >
                                                    Check Song Status
                                                </button>
                                                . If the Song Status is Complete. Then please{' '}
                                                <button
                                                    onClick={() => openModal('complaint')}
                                                    className="text-[#005f73] hover:underline font-medium"
                                                >
                                                    Raise a Complaint
                                                </button>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setShowBanner(false)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* YouTube Claim Requests Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Recent YT Claim Release Requests</h2>
                                    <p className="text-sm text-gray-600 mt-1">Submitted by you</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                        <input
                                            type="text"
                                            placeholder="Search claims..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-transparent"
                                        />
                                    </div>
                                    <select
                                        value={selectedFilter}
                                        onChange={(e) => setSelectedFilter(e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:border-transparent"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                    <button
                                        onClick={handleRefresh}
                                        disabled={isRefreshing}
                                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <RefreshCw className={`w-4 h-4 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                                    </button>
                                    <button
                                        onClick={handleExport}
                                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                        title="Export to CSV"
                                    >
                                        <Download className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={() => openModal('newClaim')}
                                        className="bg-[#005f73] text-white px-4 py-2 rounded-lg hover:bg-[#007a8c] transition-colors flex items-center space-x-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>New Claim</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Date of Submission</th>
                                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">URL</th>
                                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Selected Songs</th>
                                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Status</th>
                                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {paginatedRequests.length > 0 ? (
                                        paginatedRequests.map((request) => (
                                            <tr key={request.id} className="hover:bg-gray-50">
                                                <td className="py-4 px-6 text-sm text-gray-900">{request.date}</td>
                                                <td className="py-4 px-6 text-sm">
                                                    <a href={request.url} target="_blank" rel="noopener noreferrer" className="text-[#005f73] hover:underline truncate block max-w-xs">
                                                        {request.url}
                                                    </a>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-900">
                                                    <div className="space-y-1">
                                                        {request.selectedSongs.map((song, index) => (
                                                            <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                                {song}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-sm">
                                                    {getStatusBadge(request.status)}
                                                </td>
                                                <td className="py-4 px-6 text-sm">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => openModal('viewClaim', request)}
                                                            className="text-[#005f73] hover:text-[#007a8c] text-sm font-medium flex items-center space-x-1"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                            <span>View</span>
                                                        </button>
                                                        {request.status === 'pending' && (
                                                            <button
                                                                onClick={() => openModal('editClaim', request)}
                                                                className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center space-x-1"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                                <span>Edit</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-12 text-center">
                                                <div className="flex flex-col items-center space-y-3">
                                                    <Clock className="w-12 h-12 text-gray-400" />
                                                    <p className="text-gray-500 font-medium">
                                                        {searchTerm || selectedFilter !== 'all'
                                                            ? 'No matching claims found'
                                                            : 'No YT Claim Release Requests found'
                                                        }
                                                    </p>
                                                    <p className="text-gray-400 text-sm">
                                                        {searchTerm || selectedFilter !== 'all'
                                                            ? 'Try adjusting your search or filter criteria'
                                                            : 'Submit your first claim request to get started'
                                                        }
                                                    </p>
                                                    {!searchTerm && selectedFilter === 'all' && (
                                                        <button
                                                            onClick={() => openModal('newClaim')}
                                                            className="bg-[#005f73] text-white px-6 py-2 rounded-lg hover:bg-[#007a8c] transition-colors mt-4"
                                                        >
                                                            Submit New Claim
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {filteredRequests.length > 0 && (
                            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-700">
                                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`px-3 py-1 rounded text-sm ${currentPage === page
                                                        ? 'bg-[#005f73] text-white'
                                                        : 'border border-gray-300 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* All Modals */}

            <NewClaimModal
                isOpen={modals.newClaim}
                onClose={() => closeModal('newClaim')}
                onSubmit={handleNewClaim}
            />

            <ViewClaimModal
                isOpen={modals.viewClaim}
                onClose={() => closeModal('viewClaim')}
                claim={selectedClaim}
            />

            <EditClaimModal
                isOpen={modals.editClaim}
                onClose={() => closeModal('editClaim')}
                claim={selectedClaim}
                onUpdate={handleUpdateClaim}
            />

            <SongStatusModal
                isOpen={modals.songStatus}
                onClose={() => closeModal('songStatus')}
            />

            <ComplaintModal
                isOpen={modals.complaint}
                onClose={() => closeModal('complaint')}
                onSubmit={handleComplaint}
            />
        </div >
    );
}

export default YoutubeClaim;