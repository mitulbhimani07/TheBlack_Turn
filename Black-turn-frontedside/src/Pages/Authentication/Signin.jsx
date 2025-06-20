import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Signin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Sign in attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-[#EBF4F5] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-[#005f73] rounded-full opacity-80"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-[#005f73] rounded-full opacity-60"></div>
      <div className="absolute top-20 right-20 w-12 h-12 bg-[#005f73] rounded-full opacity-70"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#005f73] rounded-full opacity-50"></div>
      
      {/* Decorative Sun Rays */}
      <div className="absolute bottom-32 left-16">
        <div className="relative">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-[#005f73] opacity-60"
              style={{
                transformOrigin: 'bottom center',
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden flex">
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome</h1>
            <p className="text-gray-600 mb-8">Please sign in to your account with us</p>
            
            <div className="space-y-6">
              {/* Username Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gray-800 text-white py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 text-lg"
              >
                SIGN IN
              </button>
            </div>

            {/* Divider */}
            <div className="mt-8 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Login with Others</span>
                </div>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Login with Google
              </button>
              
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <svg className="w-5 h-5 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Login with Facebook
              </button>
              <span>Don't have an account? </span>
              <Link to='/SignUp' className='text-blue-500'>SignUp</Link>
            </div>
          </div>
        </div>

        {/* Right Side - Space Illustration */}
        <div className="w-1/2  bg-[#0060738e]  p-8 flex items-center justify-center relative overflow-hidden">
          {/* Space Scene */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Floating UFOs/Spaceships */}
            <div className="absolute top-16 left-16 w-12 h-6 bg-gray-600 rounded-full opacity-80 transform rotate-12"></div>
            <div className="absolute top-20 right-20 w-10 h-5 bg-gray-700 rounded-full opacity-70 transform -rotate-12"></div>
            <div className="absolute bottom-32 left-12 w-14 h-7 bg-gray-600 rounded-full opacity-60 transform rotate-45"></div>
            <div className="absolute top-32 right-32 w-8 h-4 bg-gray-500 rounded-full opacity-90"></div>

            {/* Planet/Rocks floating */}
            <div className="absolute top-12 left-32 w-8 h-8 bg-gray-800 rounded-full opacity-70"></div>
            <div className="absolute top-24 right-16 w-6 h-6 bg-gray-700 rounded-full opacity-80"></div>
            <div className="absolute bottom-16 right-24 w-10 h-10 bg-gray-600 rounded-full opacity-60"></div>

            {/* Central Astronaut Figure */}
            <div className="relative z-10">
              {/* Platform/Ground */}
              <div className="relative">
                <div className="w-80 h-40 bg-blue-400 rounded-t-full opacity-90 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-blue-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-blue-600 rounded-t-full opacity-80"></div>
                </div>
                
                {/* Astronaut */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                  {/* Body */}
                  <div className="w-16 h-24 bg-orange-500 rounded-lg relative">
                    {/* Chest details */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-600 rounded"></div>
                  </div>
                  
                  {/* Head/Helmet */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-b from-blue-200 to-blue-400 rounded-full border-4 border-orange-500">
                    <div className="absolute inset-2 bg-gradient-to-b from-white to-blue-100 rounded-full opacity-80"></div>
                  </div>
                  
                  {/* Arms */}
                  <div className="absolute top-2 -left-6 w-5 h-12 bg-orange-500 rounded-full transform -rotate-12"></div>
                  <div className="absolute top-2 -right-6 w-5 h-12 bg-orange-500 rounded-full transform rotate-12"></div>
                  
                  {/* Legs */}
                  <div className="absolute bottom-0 left-2 w-4 h-8 bg-orange-500 rounded-b-lg"></div>
                  <div className="absolute bottom-0 right-2 w-4 h-8 bg-orange-500 rounded-b-lg"></div>
                </div>

                {/* Floating crystals/rocks around platform */}
                <div className="absolute -top-8 -left-8 w-16 h-12 bg-blue-600 transform rotate-45 opacity-70" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                <div className="absolute -top-12 right-8 w-12 h-8 bg-blue-500 transform -rotate-30 opacity-80" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                <div className="absolute top-8 -right-12 w-20 h-16 bg-blue-700 transform rotate-12 opacity-60" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                <div className="absolute bottom-4 -left-16 w-24 h-18 bg-blue-600 transform -rotate-45 opacity-70" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}