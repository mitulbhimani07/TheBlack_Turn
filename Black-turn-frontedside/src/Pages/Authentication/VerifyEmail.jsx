import React, { useState } from 'react';
import { MailCheck } from 'lucide-react';
import { forgotPassword } from '../../Api/api';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate(); // ✅

  const handleResend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await forgotPassword({ email });
      setSuccessMsg(res.message);

      // ✅ OTP verification redirection
      // Assuming the OTP verification page is at '/OtpVerification'
      navigate('/OtpVerification', { state: { email } });

    } catch (error) {
      setErrorMsg(error.response?.message || 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#005f73] flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full shadow-xl rounded-xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <MailCheck className="w-14 h-14 text-[#005f73]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#005f73] mb-2">
          Verify Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          We’ve sent a verification code to your email. Enter it to continue or resend it below.
        </p>

        <form onSubmit={handleResend}>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005f73] mb-4"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#005f73] hover:bg-[#004a5b] transition duration-200 text-white font-semibold py-3 rounded-lg"
          >
            {loading ? 'Sending...' : 'Resend Verification Email'}
          </button>
        </form>

        {successMsg && <p className="text-green-600 mt-4">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 mt-4">{errorMsg}</p>}

        <p className="text-sm text-gray-500 mt-6">
          Didn’t receive the email? Check your spam folder or click the button above to resend it.
        </p>
      </div>
    </div>
  );
}
