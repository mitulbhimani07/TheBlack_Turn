import React, { useEffect, useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LoginSocialGoogle
} from 'reactjs-social-login';

export default function SignUp() {
  const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState();
    const navigate = useNavigate();

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('code')) {
    console.log('Google auth success, code:', params.get('code'));
    // Optional: send code to backend to exchange for tokens
    // then navigate somewhere
    // navigate("/ClientDashboard");
  }
}, []);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Sign up attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-[#EBF4F5] flex items-center justify-center p-3 sm:p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-[#005f73] rounded-full opacity-80"></div>
      <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-10 h-10 sm:w-16 sm:h-16 bg-[#005f73] rounded-full opacity-60"></div>
      <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-8 h-8 sm:w-12 sm:h-12 bg-[#005f73] rounded-full opacity-70"></div>
      <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 bg-[#005f73] rounded-full opacity-50"></div>
      
      {/* Decorative Sun Rays */}
      <div className="absolute bottom-16 sm:bottom-32 left-8 sm:left-16">
        <div className="relative">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-4 sm:h-8 bg-[#005f73] opacity-60"
              style={{
                transformOrigin: 'bottom center',
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-xl sm:rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - SignUp Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Join Us</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Create your account to start exploring with us</p>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Username Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-500 text-sm sm:text-base"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-500 text-sm sm:text-base"
                />
              </div>

              {/* Password Field */}
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

              {/* Confirm Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-500 text-sm sm:text-base"
                />
              </div>

              {/* Sign Up Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gray-800 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 text-base sm:text-lg"
              >
                CREATE ACCOUNT
              </button>
            </div>

            {/* Divider */}
            <div className="mt-6 sm:mt-8 mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-3 sm:px-4 bg-white text-gray-500">Sign up with Others</span>
                </div>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-2 sm:space-y-3">
               <LoginSocialGoogle
                          client_id='1045466982465-rspqvfgvpagf25k9uljncl7u4bg4s66i.apps.googleusercontent.com'
                          // onLoginStart={onLoginStart}
                          redirect_uri="http://localhost:3000/Signin" 
                          scope=" profile email"
                          discoveryDocs="claims_supported"
                          access_type="online"
                          onResolve={async ({ provider, data }) => {
                            setProvider(provider);
                            setProfile(data);
                            // try {
                            //   const payload = {
                            //     email: data.email,
                            //     name: data.name,
                            //     country: "IN", // or dynamically detect later
                            //   };
              
                            //   const res = await GoogleSignin(payload);
                            //   console.log("Google Signin Response:", res.role);
                            //   // Call your API function
                            //   toast.success(res.message || "Google login success");
              
                            //   if (res.role === 'client') {
                            //     toast.success("Login successful as Client");
                            //     navigate("/ClientDashboard"); // Or wherever you want to send them
              
                            //   } else if (res.role === 'freelancer') {
                            //     toast.success("Login successful as Freelancer");
                            //     navigate("/FreelancerDashboard"); // Or wherever you want to send them
              
                            //   }
              
                            // } catch (err) {
                            //   console.error("Google signup error:", err);
                            //   toast.error("Failed to save Google login");
                            // }
                          }}
                          onReject={err => {
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
              
              
              <div className="text-center text-sm sm:text-base">
                <span>Already have an account? </span>
                <a href='/Signin' className='text-blue-500 hover:underline'>SignIn</a>
              </div>
            </div>

            {/* Terms and Privacy */}
            <p className="mt-4 sm:mt-6 text-xs text-gray-500 text-center">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-orange-500 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Right Side - Space Illustration (Same as SignIn) */}
        <div className="w-full lg:w-1/2 bg-[#0060738e] p-4 sm:p-6 lg:p-8 flex items-center justify-center relative overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-0">
          {/* Space Scene */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Floating UFOs/Spaceships */}
            <div className="absolute top-8 sm:top-16 left-8 sm:left-16 w-8 h-4 sm:w-12 sm:h-6 bg-gray-600 rounded-full opacity-80 transform rotate-12"></div>
            <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-6 h-3 sm:w-10 sm:h-5 bg-gray-700 rounded-full opacity-70 transform -rotate-12"></div>
            <div className="absolute bottom-16 sm:bottom-32 left-6 sm:left-12 w-8 h-4 sm:w-14 sm:h-7 bg-gray-600 rounded-full opacity-60 transform rotate-45"></div>
            <div className="absolute top-16 sm:top-32 right-16 sm:right-32 w-6 h-3 sm:w-8 sm:h-4 bg-gray-500 rounded-full opacity-90"></div>

            {/* Planet/Rocks floating */}
            <div className="absolute top-6 sm:top-12 left-16 sm:left-32 w-6 h-6 sm:w-8 sm:h-8 bg-gray-800 rounded-full opacity-70"></div>
            <div className="absolute top-12 sm:top-24 right-8 sm:right-16 w-4 h-4 sm:w-6 sm:h-6 bg-gray-700 rounded-full opacity-80"></div>
            <div className="absolute bottom-8 sm:bottom-16 right-12 sm:right-24 w-6 h-6 sm:w-10 sm:h-10 bg-gray-600 rounded-full opacity-60"></div>

            {/* Central Astronaut Figure */}
            <div className="relative z-10 scale-75 sm:scale-90 lg:scale-100">
              {/* Platform/Ground */}
              <div className="relative">
                <div className="w-60 sm:w-80 h-30 sm:h-40 bg-blue-400 rounded-t-full opacity-90 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-blue-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-12 sm:h-16 bg-blue-600 rounded-t-full opacity-80"></div>
                </div>
                
                {/* Astronaut */}
                <div className="absolute bottom-12 sm:bottom-16 left-1/2 transform -translate-x-1/2">
                  {/* Body */}
                  <div className="w-12 sm:w-16 h-18 sm:h-24 bg-orange-500 rounded-lg relative">
                    {/* Chest details */}
                    <div className="absolute top-3 sm:top-4 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8 bg-orange-600 rounded"></div>
                  </div>
                  
                  {/* Head/Helmet */}
                  <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 w-9 sm:w-12 h-9 sm:h-12 bg-gradient-to-b from-blue-200 to-blue-400 rounded-full border-3 sm:border-4 border-orange-500">
                    <div className="absolute inset-1 sm:inset-2 bg-gradient-to-b from-white to-blue-100 rounded-full opacity-80"></div>
                  </div>
                  
                  {/* Arms */}
                  <div className="absolute top-1 sm:top-2 -left-4 sm:-left-6 w-4 sm:w-5 h-9 sm:h-12 bg-orange-500 rounded-full transform -rotate-12"></div>
                  <div className="absolute top-1 sm:top-2 -right-4 sm:-right-6 w-4 sm:w-5 h-9 sm:h-12 bg-orange-500 rounded-full transform rotate-12"></div>
                  
                  {/* Legs */}
                  <div className="absolute bottom-0 left-1 sm:left-2 w-3 sm:w-4 h-6 sm:h-8 bg-orange-500 rounded-b-lg"></div>
                  <div className="absolute bottom-0 right-1 sm:right-2 w-3 sm:w-4 h-6 sm:h-8 bg-orange-500 rounded-b-lg"></div>
                </div>

                {/* Floating crystals/rocks around platform */}
                <div className="absolute -top-6 sm:-top-8 -left-6 sm:-left-8 w-12 sm:w-16 h-9 sm:h-12 bg-blue-600 transform rotate-45 opacity-70" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                <div className="absolute -top-9 sm:-top-12 right-6 sm:right-8 w-9 sm:w-12 h-6 sm:h-8 bg-blue-500 transform -rotate-30 opacity-80" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                <div className="absolute top-6 sm:top-8 -right-9 sm:-right-12 w-15 sm:w-20 h-12 sm:h-16 bg-blue-700 transform rotate-12 opacity-60" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                <div className="absolute bottom-3 sm:bottom-4 -left-12 sm:-left-16 w-18 sm:w-24 h-14 sm:h-18 bg-blue-600 transform -rotate-45 opacity-70" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-1/3 right-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
}