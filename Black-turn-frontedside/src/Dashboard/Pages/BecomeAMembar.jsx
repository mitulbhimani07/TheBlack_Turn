import React, { useState } from 'react'
import Navbar from './header-sidebar/Header';
import Sidebar from './header-sidebar/Sidebar';
import visa from '../../assets/images/payment-platform/Visa.png'
import MasterCard from '../../assets/images/payment-platform/mastercard.png'
import maestro from '../../assets/images/payment-platform/maestro.png'
import rupay from '../../assets/images/payment-platform/Rupay.png'
import netbanking from '../../assets/images/payment-platform/netbanking.png'
import emi from '../../assets/images/payment-platform/emi.png'
import upi from '../../assets/images/payment-platform/upi.png'
import gpay from '../../assets/images/payment-platform/gpay.png'
import phonepe from '../../assets/images/payment-platform/phonepe.png'

function BecomeAMember() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Changed to false for mobile-first
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('member'); // Set to member tab since we're on this page
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [price, setPrice] = useState(4999.00);

  const paymentplatform = [
    {img: visa, name: 'Visa'},
    {img: MasterCard, name: 'MasterCard'},
    {img: maestro, name: 'Maestro'},
    {img: rupay, name: 'RuPay'},
    {img: netbanking, name: 'Net Banking'},
    {img: emi, name: 'EMI'},
    {img: upi, name: 'UPI'},
    {img: gpay, name: 'Google Pay'},
    {img: phonepe, name: 'PhonePe'}
  ]

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(true);
      // Simulate coupon discount
      setPrice(3999.00);
    }
  };

  const handleProceedToPayment = () => {
    alert('Proceeding to payment gateway...');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const closeSidebar = () => setIsSidebarOpen(false);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => prev - 1);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        // onCloseSidebar={closeSideba.r}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50">
          <Navbar
            toggleSidebar={toggleSidebar}
            sidebarOpen={isSidebarOpen}
            notifications={notifications}
            unreadCount={unreadCount}
            markAsRead={markAsRead}
          />
        </div>

        {/* Page Content - with proper padding for sticky header */}
        <main className="flex-1 bg-gray-50 py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#005f73] mb-2">
                Your Last Step to Become a VIP
              </h1>
              
              {/* Coupon Section */}
              <div className="mt-6 lg:mt-8">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                  Have a Coupon Code?
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Enter Your Coupon Code Here"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005f73] focus:border-transparent text-sm sm:text-base"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
                  >
                    Apply Coupon
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-green-600 text-sm mt-2">✓ Coupon applied successfully!</p>
                )}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#005f73] mb-6">Your Order</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Unlimited Songs</h3>
                      <p className="text-xs sm:text-sm text-gray-600">(All Stores + CallerTune)</p>
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-gray-800">
                      ₹{appliedCoupon ? '3,999.00' : '4,999.00'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-4 border-t-2 border-[#005f73]">
                    <span className="text-base sm:text-lg font-bold text-[#005f73]">Total</span>
                    <span className="text-lg sm:text-xl font-bold text-[#005f73]">
                      ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-[#005f73] mb-2 text-sm sm:text-base">VIP Benefits Include:</h4>
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                    <li>• Unlimited song downloads</li>
                    <li>• Access to all music stores</li>
                    <li>• Exclusive CallerTune collection</li>
                    <li>• Ad-free experience</li>
                    <li>• Premium customer support</li>
                  </ul>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#005f73] mb-6">Payment Options</h2>
                
                {/* Payment Methods */}
                <div className="mb-6">
                  <p className="text-xs sm:text-sm font-medium text-gray-700 mb-4 text-center">WE ACCEPT</p>
                  
                  {/* Payment Icons Grid */}
                  <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-3 gap-2 sm:gap-3 mb-4">

                    {paymentplatform.map((platform, index) => (
                      <div 
                        key={index}
                        className="group w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                      >
                        <img 
                          src={platform.img}
                          alt={platform.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-contain" 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Note */}
                <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs sm:text-sm text-green-800 text-center">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={handleProceedToPayment}
                  className="w-full py-3 sm:py-4 bg-[#005f73] text-white text-base sm:text-lg font-semibold rounded-lg hover:bg-[#004a5a] transition-colors shadow-lg"
                >
                  Ready to be a VIP?
                </button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  By proceeding, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BecomeAMember;