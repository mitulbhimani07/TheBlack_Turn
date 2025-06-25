import React, { useState } from 'react'
import { Heart, MessageCircle, Share2, Bookmark, Clock, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';

function SingleBlog() {

     const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(124);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const relatedPosts = [
    { id: 1, title: "The Future of Web Development", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop", readTime: "5 min read" },
    { id: 2, title: "React Best Practices 2025", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop", readTime: "8 min read" },
    { id: 3, title: "CSS Grid vs Flexbox", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", readTime: "6 min read" }
  ];

  return (
    <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
    

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-96 ">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEteNuW_Xm77IeOYfqpHkwayXE9wDXTgKJQ&s" 
              alt="Blog post featured image"
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
             
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Building Modern Web Applications with React and Next.js
              </h1>
            </div>
          </div>

          {/* Article Meta */}
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s" 
                  alt="Author avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-xl">Alex Johnson</h3>
                  {/* <p className="text-sm text-gray-500">Senior Full Stack Developer</p> */}
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className='text-xl'>June 20, 2025</span>
                </div>
               
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-8 py-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                In today's rapidly evolving web development landscape, choosing the right tools and frameworks can make or break your project. React and Next.js have emerged as powerful allies in creating fast, scalable, and maintainable web applications.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Why React and Next.js?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                React's component-based architecture revolutionized how we think about building user interfaces. When combined with Next.js, you get server-side rendering, automatic code splitting, and optimized performance out of the box. This combination has become the go-to choice for many developers and companies worldwide.
              </p>

            

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Key Benefits</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The ecosystem around React and Next.js is incredibly rich. From state management with Redux or Zustand to styling with Tailwind CSS, you have access to battle-tested solutions for every aspect of your application. The developer experience is exceptional, with hot reloading, excellent debugging tools, and comprehensive documentation.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Getting Started</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Setting up a new Next.js project is straightforward. With just a few commands, you can have a fully configured development environment ready to go. The framework handles the complex build configuration, allowing you to focus on building features rather than wrestling with webpack configs.
              </p>

             

              <p className="text-gray-700 leading-relaxed mb-6">
                As we look towards the future, React and Next.js continue to evolve with exciting features like React Server Components, improved bundle optimization, and enhanced developer tools. The community is vibrant and constantly pushing the boundaries of what's possible with these technologies.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
    
    </>
  )
}

export default SingleBlog