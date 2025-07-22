import React, { useState, useRef, useEffect } from 'react';
import { verifyOtp } from '../../Api/api'; // Add this import
import { useLocation, useNavigate } from 'react-router-dom';

export default function OTPVerification() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isComplete, setIsComplete] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const inputRefs = useRef([]);
    const location = useLocation();
    const email = location.state?.email || ''; // Safe fallback
    const navigate = useNavigate();

    useEffect(() => {
        // Focus first input on mount
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    useEffect(() => {
        // Check if OTP is complete
        const complete = otp.every(digit => digit !== '');
        setIsComplete(complete);
    }, [otp]);

    const handleInputChange = (index, value) => {
        // Only allow single digit
        if (value.length > 1) return;

        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Focus previous input on backspace
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];

        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
        }

        setOtp(newOtp);

        // Focus the next empty input or last input
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const clearOtp = () => {
        setOtp(['', '', '', '', '', '']);
        setIsComplete(false);
        setShowSuccess(false);
        inputRefs.current[0]?.focus();
    };

    const handleVerify = async () => {
        setIsVerifying(true);
        setShowSuccess(false);

        try {
            const otpCode = otp.join('');
            const response = await verifyOtp({ email, otp: otpCode });

            console.log(response.message);
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                clearOtp();
                navigate('/forgotpassword', {
                    state: { email, otp: otpCode }
                });
            }, 3000);
        } catch (err) {
            alert(err.response?.data?.message || 'OTP verification failed');
        } finally {
            setIsVerifying(false);
        }
    };


    const resendOtp = () => {
        clearOtp();
        // Simulate resend logic here
        console.log('OTP resent');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#005f73' }}>
            <div className="w-full max-w-md">
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#005f73' }}>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Account</h1>
                        <p className="text-gray-600">Enter the 6-digit code sent to your device</p>
                    </div>

                    {/* OTP Input Fields */}
                    <div className="mb-8">
                        <div className="flex justify-center gap-3 mb-6">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className={`w-12 h-12 text-center text-xl font-bold rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${digit
                                        ? 'border-green-500 bg-green-50 text-green-700'
                                        : 'border-gray-300 bg-gray-50 text-gray-700 focus:border-blue-500 focus:bg-white'
                                        }`}
                                    style={{
                                        borderColor: digit ? '#10b981' : undefined,
                                        backgroundColor: digit ? '#f0fdf4' : undefined,
                                        color: digit ? '#047857' : undefined
                                    }}
                                />
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mb-6">
                            <button
                                onClick={clearOtp}
                                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Clear
                            </button>

                            <button
                                onClick={handleVerify}
                                disabled={!isComplete || isVerifying}
                                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${isComplete && !isVerifying
                                    ? 'text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                style={{
                                    backgroundColor: isComplete && !isVerifying ? '#005f73' : undefined,
                                }}
                            >
                                {isVerifying ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Verifying...
                                    </>
                                ) : showSuccess ? (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Verified!
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Verify
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Success Animation */}
                    {showSuccess && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 rounded-2xl">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-green-600 mb-2">Success!</h2>
                                <p className="text-gray-600">Your account has been verified</p>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="text-center text-sm text-gray-500">
                        <p className="mb-2">Didn't receive the code?</p>
                        <button
                            onClick={resendOtp}
                            className="font-medium hover:underline transition-colors duration-200"
                            style={{ color: '#005f73' }}
                        >
                            Resend OTP
                        </button>
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="text-center mt-6 text-white text-sm opacity-80">
                    <p>This code will expire in 5 minutes</p>
                </div>
            </div>
        </div>
    );
}