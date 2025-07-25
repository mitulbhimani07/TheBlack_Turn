import React, { useEffect, useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LoginSocialGoogle
} from 'reactjs-social-login';
import { Googlesignup, Signup } from '../../Api/api';
import toast from 'react-hot-toast';

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
    fname: '',
    lname:'',
    email: '',
    password: '',
    conPassword: ''
  });
  const validateSignUp = () => {
  const { fname,lname, email, password, conPassword } = formData;

  if (fname.trim() === '') {
    alert("First Name is required");
    return false;
  }
  if (lname.trim() === '') {
    alert("Last Name is required");
    return false;
  }
  if (email.trim() === '') {
    alert("Email is required");
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Email is invalid");
    return false;
  }
  if (password === '') {
    alert("Password is required");
    return false;
  } else if (password.length < 8) {
    alert("Password must be at least 8 characters long");
    return false;
  }
  if (conPassword === '') {
    alert("Confirm Password is required");
    return false;
  }
  if (password !== conPassword) {
    alert("Passwords do not match");
    return false;
  }

  return true;
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
  };

 const handleSubmit = async (e) => {
  e.preventDefault(); // ✅ prevent form from reloading the page

  if (!validateSignUp()) {
    return;
  }

  try {
    const response = await Signup(formData); // ✅ API call after validation
    console.log("Signup success:", response.data);
    // alert("Signup successful!");
    toast.success("Signup SuccessfullY!!!")
    navigate('/Signin'); // ✅ redirect after success
  } catch (error) {
    console.error("Signup error:", error);
    toast.error(error?.response?.data?.message)
  }
};

  return (
    <div className="min-h-screen bg-[#EBF4F5] flex items-center justify-center p-3 sm:p-6 relative overflow-hidden">
    
      {/* Main Container */}
      <div className="bg-white rounded-xl sm:rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - SignUp Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Join Us</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Create your account to start exploring with us</p>
            
            <div className="space-y-4 sm:space-y-6">
              <form action="" method='post' onSubmit={handleSubmit}>
                {/* Username Field */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-3">
  {/* First Name */}
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
      <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
    </div>
    <input
      type="text"
      name="fname"
      placeholder="First Name"
      value={formData.fname}
      onChange={handleChange}
      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-500 text-sm sm:text-base"
    />
  </div>

  {/* Last Name */}
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
      <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
    </div>
    <input
      type="text"
      name="lname"
      placeholder="Last Name"
      value={formData.lname}
      onChange={handleChange}
      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-500 text-sm sm:text-base"
    />
  </div>
</div>


              {/* Email Field */}
              <div className="relative mb-3">
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
              <div className="relative mb-3">
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
              <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="conPassword"
                  placeholder="Confirm Password"
                  value={formData.conPassword}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-500 text-sm sm:text-base"
                />
              </div>

              {/* Sign Up Button */}
              <button
                className="w-full bg-gray-800 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 text-base sm:text-lg"
              >
                CREATE ACCOUNT
              </button>
              </form>
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
                            try {
                              const payload = {
                                email: data.email,
                                name: data.name,
                                country: "IN", // or dynamically detect later
                              };
              
                              const res = await Googlesignup(payload);
                              console.log("Google Signin Response:", res.role);
                              // Call your API function
                              toast.success(res.message || "Google login success");
              
              
                            } catch (err) {
                              console.error("Google signup error:", err);
                              toast.error("Failed to save Google login");
                            }
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
                <Link to={'/Signin'} className='text-blue-500 hover:underline'>SignIn</Link>
              </div>
            </div>

            {/* Terms and Privacy */}
            <p className="mt-4 sm:mt-6 text-xs text-gray-500 text-center">
              By creating an account, you agree to our{' '}
              <Link to={'/terms&conditions'} className="text-orange-500 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link to={'/privacy'} className="text-orange-500 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>

        {/* Right Side - Space Illustration (Same as SignIn) */}
        <div className="w-full lg:w-1/2 bg-[#fff] flex items-center justify-center relative overflow-hidden   ">
          {/* Space Scene */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?semt=ais_items_boosted&w=740" alt="" />
          </div>
        </div>
      </div>      
    </div>
  );
}