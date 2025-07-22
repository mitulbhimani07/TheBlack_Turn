import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPasswordWithOtp, forgotPassword } from '../../Api/api';

export default function ForgotPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || localStorage.getItem('resetEmail');
    const otp = location.state?.otp || localStorage.getItem('resetOtp');
    localStorage.setItem('resetEmail', email);
    localStorage.setItem('resetOtp', otp);


    const validatePassword = (password) => password.length >= 8;

    const handlePasswordReset = async () => {
        try {
            if (!validatePassword(newPassword)) {
                setEmailError('Password must be at least 8 characters long');
                return;
            }
            if (newPassword !== confirmPassword) {
                setEmailError('Passwords do not match');
                return;
            }

            setIsSending(true);
            setEmailError('');

            console.log("Sending to API:", { email, otp, newPassword, confirmPassword });
            const response = await resetPasswordWithOtp({ email, otp, newPassword, confirmPassword });
            console.log("API response:", response);

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setNewPassword('');
                setConfirmPassword('');
                navigate('/Signin');
            }, 3000);
        } catch (error) {
            console.error("Error in reset password API:", error);
            setEmailError(error.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#005f73' }}>
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8 relative">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#005f73' }}>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create New Password</h1>
                        <p className="text-gray-600">Enter your new password below</p>
                    </div>

                    {/* Password Fields */}
                    <div className="space-y-4 mb-6">
                        {/* New Password */}
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                name='newPassword'
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password"
                                className={`w-full py-4 px-4 pl-12 pr-12 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 text-gray-700 ${validatePassword(newPassword) ? 'border-green-500 bg-green-50 focus:ring-green-500' : 'border-gray-300 bg-gray-50 focus:ring-blue-500'
                                    }`}
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <svg className={`w-5 h-5 ${validatePassword(newPassword) ? 'text-green-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword
                                        ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7m5.858.908a3 3 0 114.243 4.243M9.878 9.878L3 3m6.878 6.878L21 21"
                                        : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    } />
                                </svg>
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                name='confirmPassword'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                className={`w-full py-4 px-4 pl-12 pr-12 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 text-gray-700 ${confirmPassword && newPassword === confirmPassword ? 'border-green-500 bg-green-50 focus:ring-green-500' : 'border-gray-300 bg-gray-50 focus:ring-blue-500'
                                    }`}
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <svg className={`w-5 h-5 ${confirmPassword && newPassword === confirmPassword ? 'text-green-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showConfirmPassword
                                        ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7m5.858.908a3 3 0 114.243 4.243M9.878 9.878L3 3m6.878 6.878L21 21"
                                        : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    } />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {emailError && <p className="text-sm text-red-600 mb-4">{emailError}</p>}

                    {/* Submit Button */}
                    <button
                        onClick={handlePasswordReset}
                        disabled={!validatePassword(newPassword) || newPassword !== confirmPassword || isSending}
                        className={`w-full py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ${validatePassword(newPassword) && newPassword === confirmPassword && !isSending
                                ? 'bg-[#005f73] text-white hover:shadow-lg hover:scale-105'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {isSending ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Resetting...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Reset Password
                            </>
                        )}
                    </button>

                    {/* Success Message */}
                    {showSuccess && (
                        <div className="absolute inset-0 bg-white bg-opacity-95 rounded-2xl flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-green-600">Password Reset!</h2>
                                <p className="text-gray-600 mt-1">Your password has been successfully updated.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
