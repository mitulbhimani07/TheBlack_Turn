import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Edit3, FileText, User, CreditCard, Building, Smartphone, Mail, Hash } from 'lucide-react';
import Navbar from '../Pages/header-sidebar/Header';
import Sidebar from '../Pages/header-sidebar/Sidebar';
import axios from 'axios';
import { CreateNOC } from '../../Api/api';
import toast from 'react-hot-toast';

const NOCForm = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeTab, setActiveTab] = useState('noc-form');
    const [isMobile, setIsMobile] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        labelname:'',
        email: '',
        phoneno: '',
        accountholdername: '',
        bankName: '',
        accountNo: '',
        IFSCcode: '',
        PANCardNo: '',
        AadhaarCardNo: ''
    });
    // Add these to your existing state and functions
const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  // Resize & Scale Canvas on Mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set display size
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.lineCap = 'round';
    ctx.strokeStyle = '#005f73';
    ctx.lineWidth = 2;

    ctxRef.current = ctx;
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (e.touches) {
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { offsetX, offsetY } = getCoordinates(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getCoordinates(e);
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
    const [files, setFiles] = useState({
        PANCardphoto: null,
        AadharCardFront: null,
        AadharCardBack: null,
        cancelledPassbook: null,
        Signature: null
    });

    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileUpload = (e, fileType) => {
        const file = e.target.files[0];
        if (file) {
            setFiles(prev => ({
                ...prev,
                [fileType]: file
            }));
        }
    };

    
    
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const form = new FormData();

    // Text Fields
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    // File uploads
    if (files.PANCardphoto) form.append('PANCardphoto', files.PANCardphoto);
    if (files.AadharCardFront) form.append('AadharCardFront', files.AadharCardFront);
    if (files.AadharCardBack) form.append('AadharCardBack', files.AadharCardBack);
    if (files.cancelledPassbook) form.append('cancelledPassbook', files.cancelledPassbook);

    // Convert signature canvas to Blob
    const canvas = canvasRef.current;
    canvas.toBlob(async (blob) => {
      if (blob) {
        form.append('Signature', blob, 'signature.png');

        // 🔗 Call external API function
        try {
          const res = await CreateNOC(form);
        //   alert('NOC submitted successfully!');
          toast.success('NOC submitted successfully')
          console.log(res);
        } catch (apiErr) {
        //   alert('Failed to submit NOC form.');
        toast.error('Failed to submit NOC form.')
        }
      } else {
        // alert('Signature is missing or invalid.');
        toast.error('Signature is missing or invalid.')
      }
    }, 'image/png');
  } catch (err) {
    console.error('Error preparing form:', err);
    // alert('Error while preparing form');
    toast.error('Error while preparing form.')
  }
};

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
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
                        <div className="max-w-4xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-3 bg-white px-6 py-2 rounded-xl shadow-lg  border-t-4 border-[#005f73]">
                                    <FileText className="w-8 h-8 text-[#005f73]" />
                                    <h1 className="text-xl font-bold text-[#005f73]">NOC Form</h1>
                                </div>
                            </div>

                            {/* Alert */}
                            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-lg shadow-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <X className="h-5 w-5 text-red-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700 font-medium">
                                            <strong>It's required!</strong> Without NOC, your song will not go live on the stores. Please submit the NOC first.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <form action="" onSubmit={handleSubmit}>

                            <div  className="space-y-8">
                                {/* Personal Information */}
                                <div className="bg-white rounded-xl shadow-xl p-8 border-t-4 border-[#005f73] relative overflow-hidden">
                                    <div className="flex items-center gap-3 mb-6">
                                        <User className="w-6 h-6 text-[#005f73]" />
                                        <h2 className="text-xl font-semibold text-[#005f73]">Personal Information</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                name="fullname"
                                                value={formData.fullname}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#005f73] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Label Name</label>
                                            <input
                                                type="text"
                                                name="labelname"
                                                value={formData.labelname}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#005f73] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                                                placeholder="Enter label name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#005f73] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Smartphone className="w-4 h-4" />
                                                Mobile
                                            </label>
                                            <input
                                                type="tel"
                                                name="phoneno"
                                                value={formData.phoneno}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#005f73] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                                                placeholder="Enter mobile number"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Banking Information */}
                                <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#005f73] relative overflow-hidden">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Building className="w-6 h-6 text-[#005f73]" />
                                        <h2 className="text-xl font-semibold text-[#005f73]">Banking Information</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Bank Account Holder Name</label>
                                            <input
                                                type="text"
                                                name="accountholdername"
                                                value={formData.accountholdername}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#005f73] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                                                placeholder="Account holder name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                                            <input
                                                type="text"
                                                name="bankName"
                                                value={formData.bankName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#005f73] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                                                placeholder="Enter bank name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Hash className="w-4 h-4" />
                                                Bank Account Number
                                            </label>
                                            <input
                                                type="text"
                                                name="accountNo"
                                                value={formData.accountNo}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#005f73] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                                                placeholder="Enter account number"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                                            <input
                                                type="text"
                                                name="IFSCcode"
                                                value={formData.IFSCcode}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#005f73] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                                                placeholder="Enter IFSC code"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Document Information */}
                                <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#005f73] relative overflow-hidden">
                                    <div className="flex items-center gap-3 mb-6">
                                        <CreditCard className="w-6 h-6 text-[#005f73]" />
                                        <h2 className="text-xl font-semibold text-[#005f73]">Document Information</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">PAN Card Number</label>
                                            <input
                                                type="text"
                                                name="PANCardNo"
                                                value={formData.PANCardNo}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#005f73] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                                                placeholder="Enter PAN number"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Aadhaar Card / Driving License Number</label>
                                            <input
                                                type="text"
                                                name="AadhaarCardNo"
                                                value={formData.AadhaarCardNo}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#005f73] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                                                placeholder="Enter Aadhaar/DL number"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* File Uploads */}
                                <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#005f73] relative overflow-hidden">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Upload className="w-6 h-6 text-[#005f73]" />
                                        <h2 className="text-xl font-semibold text-[#005f73]">Document Uploads</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { key: 'PANCardphoto', label: 'Upload PAN Card Photo',name:'PANCardphoto' },
                                            { key: 'AadharCardFront', label: 'Upload Aadhaar Card / Driving License Front', name:'AadharCardFront' },
                                            { key: 'AadharCardBack', label: 'Upload Aadhaar Card / Driving License Back',name:'AadharCardBack' },
                                            { key: 'cancelledPassbook', label: 'Upload Cancelled Cheque / Passbook',name:'cancelledPassbook' }
                                        ].map(({ key, label,name }) => (
                                            <div key={key} className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">{label}</label>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        onChange={(e) => handleFileUpload(e, key)}
                                                        className="hidden"
                                                        id={key}
                                                        accept="image/*,.pdf"
                                                        name={name}
                                                    />
                                                    <label
                                                        htmlFor={key}
                                                        className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-[#005f73]/30 rounded-lg cursor-pointer hover:border-[#005f73] hover:bg-[#005f73]/5 transition-colors"
                                                    >
                                                        <div className="text-center">
                                                            <Upload className="mx-auto h-8 w-8 text-[#005f73]/60 mb-2" />
                                                            <span className="text-sm text-gray-600">
                                                                {files[key] ? files[key].name : 'Choose File'}
                                                            </span>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Signature */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#005f73] relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <Edit3 className="w-6 h-6 text-[#005f73]" />
        <h2 className="text-xl font-semibold text-[#005f73]">Digital Signature</h2>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Signature (Tap or Hold Cursor to Sign)
        </label>
        <div className="border-2 border-[#005f73]/30 rounded-lg p-4 bg-gray-50">
          <div className="relative w-full h-48">
            <canvas
              ref={canvasRef}
              className="w-full h-full border-2 border-dashed border-[#005f73]/20 rounded bg-white cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
          <button
            type="button"
            onClick={clearSignature}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Clear Signature
          </button>
        </div>
      </div>
    </div>

                                {/* Submit Button */}
                                <div className="text-center">
                                    <button
                                      
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
                                    >
                                        <FileText className="w-5 h-5" />
                                        Sign Your NOC
                                    </button>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NOCForm;