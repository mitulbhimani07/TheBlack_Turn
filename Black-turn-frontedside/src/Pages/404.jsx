import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft, Search, Zap } from 'lucide-react';

export default function Pagenotfound() {
  const [glitchText, setGlitchText] = useState('404');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const glitchChars = ['404', '4Ø4', '4∅4', '₄₀₄', 'ꔫ0ꔫ'];
    let glitchInterval;
    
    const startGlitch = () => {
      glitchInterval = setInterval(() => {
        setGlitchText(glitchChars[Math.floor(Math.random() * glitchChars.length)]);
        setTimeout(() => setGlitchText('404'), 150);
      }, 2000 + Math.random() * 3000);
    };

    startGlitch();
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px',
               animation: 'gridMove 20s linear infinite'
             }}>
        </div>
      </div>

      {/* Mouse follower glow */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-10 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(34 197 94) 0%, transparent 70%)',
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          transition: 'all 0.3s ease-out'
        }}
      />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">
        
        {/* Glitch 404 */}
        <div className="text-center mb-12">
          <h1 
            className="text-8xl md:text-9xl font-black mb-4 relative"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textShadow: `
                0 0 20px rgba(34, 197, 94, 0.5),
                0 0 40px rgba(34, 197, 94, 0.3),
                0 0 60px rgba(34, 197, 94, 0.1)
              `
            }}
          >
            <span className="bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 bg-clip-text text-transparent">
              {glitchText}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 bg-clip-text text-transparent opacity-30 blur-sm">
              {glitchText}
            </div>
          </h1>
          
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mb-8 animate-pulse"></div>
        </div>

        {/* Error message */}
        <div className="text-center mb-12 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-100">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, even the best explorers sometimes take a wrong turn.
          </p>
          
          {/* Animated icons */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="animate-bounce" style={{ animationDelay: '0s' }}>
              <Zap className="w-8 h-8 text-green-500" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
              <Search className="w-8 h-8 text-green-400" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
              <Zap className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button 
            onClick={() => window.history.back()}
            className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Go Back</span>
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-semibold relative z-10">Home</span>
          </button>
        </div>

        {/* Footer message */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Lost in cyberspace? Let's get you back on track.
          </p>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}