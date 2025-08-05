import React, { useState, useEffect } from 'react';
import Sidebar from './header-sidebar/Sidebar';
import Navbar from './header-sidebar/Header';
import { getLoggedInUser, singleViewNoc, changePassword, UpdateUser } from '../../Api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageYourProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('manage-profile');
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('view');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  
  // Remove these states as we're using toastify now
  // const [updateMsg, setUpdateMsg] = useState('');
  // const [updateError, setUpdateError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [userId, setUserId] = useState('');

  const [profile, setProfile] = useState({
    fullName: '',
    fname: '',
    lname: '',
    about: '',
    label: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: '',
    email: '',
    profilePic: '',
    payment: {
      adhar: '',
      pan: '',
      bankName: '',
      accountHolder: '',
      ifsc: '',
      accountNumber: ''
    }
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You can handle file upload here
      // For now, just creating a preview URL
      setProfile({ ...profile, profilePic: URL.createObjectURL(file) });
    }
  };

  // Handle Profile Update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // Prepare payload for update
      const updatePayload = {
        name: profile.fullName,
        fname: profile.fname || profile.fullName.split(' ')[0],
        lname: profile.lname || profile.fullName.split(' ').slice(1).join(' '),
        email: profile.email,
        phone: profile.phone,
        About: profile.about,
        address: profile.street,
        city: profile.city,
        state: profile.state,
        pincode: profile.pincode,
        country: profile.country,
        // Add profilepic if you handle file upload
        // profilepic: profile.profilePic
      };

      const response = await UpdateUser(userId, updatePayload);
      toast.success(response.message || "Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || "Failed to update profile. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validation for password confirmation
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New password and confirm password do not match!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const res = await changePassword(passwords);
      toast.success(res.message || "Password changed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to change password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // ✅ 1. Fetch Logged-in user (name, email, phone, profile pic)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getLoggedInUser();
        const userData = res.data.data;

        // Store user ID for updates
        setUserId(userData._id || userData.id);

        setProfile((prev) => ({
          ...prev,
          fullName: userData.name || '',
          fname: userData.fname || '',
          lname: userData.lname || '',
          email: userData.email || '',
          phone: userData.phone || '',
          profilePic: userData.profilepic || '',
          label: userData.fname || '',
          city: userData.city || '',
          street: userData.address || '',
          about: userData.About || '',
          state: userData.state || '',
          pincode: userData.pincode || '',
          country: userData.country || '',
        }));
      } catch (err) {
        console.error('❌ Error fetching logged-in user:', err);
        toast.error("Failed to load user profile", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchNocProfile = async () => {
      try {
        const result = await singleViewNoc(); // automatically uses logged-in userId from token
        const userData = result.data;

        if (userData) {
          setProfile((prev) => ({
            ...prev,
            label: userData.labelname || prev.fname,
            phone: userData.phoneno || prev.phone,
            email: userData.email || prev.email,
            payment: {
              ...prev.payment,
              adhar: userData.AadhaarCardNo || '',
              pan: userData.PANCardNo || '',
              bankName: userData.bankName || '',
              accountHolder: userData.accountholdername || '',
              accountNumber: userData.accountNo || '',
              ifsc: userData.IFSCcode || ''
            },
            aadharFront: userData.AadharCardFront || '',
            aadharBack: userData.AadharCardBack || '',
            panPhoto: userData.PANCardphoto || '',
            cancelledPassbook: userData.cancelledPassbook || '',
            signature: userData.Signature || ''
          }));
        }

        console.log("userData---", userData)
      } catch (err) {
        console.error('❌ Error loading NOC data:', err);
        toast.warn("Some profile data could not be loaded", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    fetchNocProfile();
  }, []);

  // ✅ 2. Fetch NOC Payment Details
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="sticky top-0 z-50">
          <Navbar
            toggleSidebar={toggleSidebar}
            sidebarOpen={isSidebarOpen}
            notifications={notifications}
            unreadCount={unreadCount}
            markAsRead={markAsRead}
          />
        </div>
        <div className="p-6">
          {/* Page Header */}
          <div className="bg-white shadow mt-2">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-[#004d66]">Manage Profile</h1>
              <nav className="text-sm text-gray-500">
                Dashboard / <span className="text-[#004d66]">Profile</span>
              </nav>
            </div>
          </div>

          {/* Success message */}
          <div className="max-w-7xl mx-auto w-full mt-4">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
              Hey {profile.fullName || 'User'}, Welcome to <span className="font-bold text-[#004d66]">The BLACK TURN</span> Family
            </div>
          </div>

          {/* Progress bar (optional) */}
          <div className="max-w-7xl mx-auto w-full mt-2">
            <div className="h-2 bg-green-600 rounded" style={{ width: '80%' }} />
          </div>

          {/* Main profile content */}
          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row mt-6 gap-6">
            {/* Left: Profile Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 w-full max-w-md mx-auto lg:mx-0">
              {/* Profile Header */}
              <div className="flex flex-col items-center text-center">
                <img
                  src={
                    profile.profilePic
                      ? profile.profilePic
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || "User")}&background=004d66&color=fff`
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full mb-3"
                />
                <h2 className="text-xl font-semibold text-[#004d66] mb-1">{profile.fullName}</h2>
                <p className="text-sm text-gray-500 mb-4">
                  <span className="font-semibold text-[#004d66]">About:</span> {profile.about}
                </p>
              </div>

              {/* Profile Details */}
              <div className="mb-5">
                <h3 className="text-base font-bold text-[#004d66] mb-2">Profile Details</h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <div><span className="font-semibold">Full Name:</span> {profile.fullName}</div>
                  <div><span className="font-semibold">Label Name:</span> {profile.label}</div>
                  <div>
                    <span className="font-semibold">Address:</span><br />
                    {profile.street}, {profile.city}, {profile.state}, {profile.pincode}, {profile.country}
                  </div>
                  <div><span className="font-semibold">Phone:</span> {profile.phone}</div>
                  <div><span className="font-semibold">Email:</span> {profile.email}</div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="text-base font-bold text-[#004d66] mb-2">Payment Details</h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <div><span className="font-semibold">Adhar Number:</span> {profile.payment.adhar}</div>
                  <div><span className="font-semibold">Pan Number:</span> {profile.payment.pan}</div>
                  <div><span className="font-semibold">Bank Name:</span> {profile.payment.bankName}</div>
                  <div><span className="font-semibold">Account Holder:</span> {profile.payment.accountHolder}</div>
                  <div><span className="font-semibold">IFSC Code:</span> {profile.payment.ifsc}</div>
                  <div><span className="font-semibold">Account Number:</span> {profile.payment.accountNumber}</div>
                </div>
              </div>

              {/* Button */}
              <button className="mt-6 w-full bg-[#004d66] hover:bg-[#00394d] text-white font-semibold py-2 px-4 rounded transition duration-200">
                Update Payment Details
              </button>
            </div>

            {/* Right: Edit Profile Form */}
            <div className="bg-white rounded-lg shadow p-8 flex-1">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-4 items-center">
                <button
                  className={`px-4 py-2 font-semibold rounded transition-colors ${activeSection === 'view'
                    ? 'bg-[#004d66] text-white'
                    : 'bg-gray-100 text-[#004d66]'
                    }`}
                  onClick={() => setActiveSection('view')}
                >
                  Edit Profile
                </button>
                <button
                  className={`px-4 py-2 font-semibold rounded transition-colors ${activeSection === 'password'
                    ? 'bg-[#004d66] text-white'
                    : 'bg-gray-100 text-[#004d66]'
                    }`}
                  onClick={() => setActiveSection('password')}
                >
                  Change Password
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded transition-colors hover:bg-red-700 ml-0 lg:ml-auto"
                >
                  Close Account
                </button>
              </div>

              {/* Edit Profile Form */}
              {activeSection === 'view' && (
                <form className="space-y-4" onSubmit={handleProfileSubmit}>

                  <div>
                    <label className="block text-[#004d66] font-semibold">Profile Pic</label>
                    <input type="file" onChange={handleImageChange} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-[#004d66] font-semibold">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#004d66] font-semibold">About</label>
                    <textarea
                      name="about"
                      value={profile.about}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-[#004d66] font-semibold">Label Name</label>
                    <input
                      type="text"
                      name="label"
                      value={profile.label}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[#004d66] font-semibold">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={profile.street}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-[#004d66] font-semibold">City Name</label>
                      <input
                        type="text"
                        name="city"
                        value={profile.city}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[#004d66] font-semibold">State Name</label>
                      <input
                        type="text"
                        name="state"
                        value={profile.state}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-[#004d66] font-semibold">Pin Code</label>
                      <input
                        type="text"
                        name="pincode"
                        value={profile.pincode}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[#004d66] font-semibold">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={profile.country}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#004d66] font-semibold">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[#004d66] font-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className={`w-full py-2 rounded font-semibold mt-4 transition duration-200 ${
                      isUpdating 
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                        : 'bg-[#004d66] text-white hover:bg-[#00394d]'
                    }`}
                  >
                    {isUpdating ? 'Updating...' : 'Save Changes'}
                  </button>
                </form>
              )}

              {/* Change Password Form */}
              {activeSection === 'password' && (
                <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                  <div>
                    <label className="block text-[#004d66] font-semibold">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#004d66] font-semibold">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#004d66] font-semibold">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#004d66] text-white py-2 rounded font-semibold hover:bg-[#00394d] mt-4"
                  >
                    Change Password
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="w-full bg-[#222] text-gray-300 text-center py-3 mt-8 text-xs">
            © Copyright The Black Turn. All Rights Reserved | <span className="underline">About Us</span> | <span className="underline">Contact Us</span> | <span className="underline">Privacy Policy</span> | <span className="underline">Terms & Conditions</span> | <span className="underline">Refund & Returns</span>
          </footer>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="custom-toast"
      />
    </div>
  );
}