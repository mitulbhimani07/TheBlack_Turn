import React, { useEffect, useState } from 'react';
import { User, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { Googlesignin, signin } from '../../Api/api';
import toast from 'react-hot-toast';
// import { toast } from 'react-toastify'; // Optional: uncomment if using toast notifications

export default function Signin() {
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('code')) {
      console.log('Google auth success, code:', params.get('code'));
    }
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sign in attempt:', formData);
    try {
      const response = await signin(formData);
      console.log("Signup success:", response.data);
      console.log("token",response.token)
      const token=response.token
      localStorage.setItem('Token',token)
      // alert("Signup successful!");
      toast.success("SignIn Successfully!!")
      navigate('/dashboard');
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error?.response?.data?.message)
      // alert(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#EBF4F5] flex items-center justify-center p-3 sm:p-6 relative overflow-hidden">
      
      {/* Main Card */}
      <div className="bg-white rounded-xl sm:rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden flex flex-col lg:flex-row">
        {/* Left - Login Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Welcome</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Please sign in to your account with us</p>

            {/* Form */}
            <form onSubmit={handleSubmit} method='post' className="space-y-4 sm:space-y-6">
              {/* Username */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-500 text-sm sm:text-base"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-500 text-sm sm:text-base"
                />
              </div>

              {/* Sign In */}
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 text-base sm:text-lg"
              >
                SIGN IN
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 sm:mt-8 mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-3 sm:px-4 bg-white text-gray-500">Login with Others</span>
                </div>
              </div>
            </div>

            {/* Google Login */}
            <LoginSocialGoogle
              client_id="1045466982465-rspqvfgvpagf25k9uljncl7u4bg4s66i.apps.googleusercontent.com"
              redirect_uri="http://localhost:3000/Signin"
              scope="profile email"
              discoveryDocs="claims_supported"
              access_type="online"
              onResolve={async ({ provider, data }) => {
                setProvider(provider);
                setProfile(data);
                try {
                  const payload = {
                    email: data.email,
                    name: data.name,
                    country: "IN"
                  };
                  const res = await Googlesignin(payload);
                  console.log("Google Signin Response:", res.role);
                  // toast.success(res.message || "Google login success");
                } catch (err) {
                  console.error("Google signup error:", err);
                  // toast.error("Failed to save Google login");
                }
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <div className="flex items-center justify-center w-full gap-2 border border-gray-300 rounded-3xl p-3 text-xl cursor-pointer hover:bg-gray-50 mb-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Continue with Google</span>
              </div>
            </LoginSocialGoogle>

            {/* Signup link */}
            <div className="text-center text-sm sm:text-base">
              <span>Don't have an account? </span>
              <Link to='/Signup' className='text-blue-500 hover:underline'>SignUp</Link>
            </div>
          </div>
        </div>

        {/* Right - Illustration */}
        <div className="w-full lg:w-1/2 bg-[#fff] flex items-center justify-center relative overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-0">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
              alt="Signin Illustration"
              className="object-contain max-h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
