import React, { useEffect, useState } from 'react';
import blogBanner from "../assets/images/blogBanner.webp";
import { GetAllBlogs } from '../Api/api';
import { Link } from 'react-router-dom';

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await GetAllBlogs();
        setBlogPosts(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      {/* Banner Section */}
      <div
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${blogBanner})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
        <div className="relative px-4 max-w-4xl mx-auto z-10 text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Our Blog</h1>
          <p className="text-lg sm:text-xl font-medium mb-6">
            Explore the latest trends, stories, and insights in fashion and fabric design.
          </p>
        </div>
      </div>

      {/* Blog Listing */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {blogPosts.length === 0 ? (
            <p className="text-center text-gray-600">Loading blogs...</p>
          ) : (
            blogPosts.map((post, index) => (
              <div key={post._id || index} className="mb-16 last:mb-0">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Image */}
                  <div className="w-full lg:w-1/3 flex-shrink-0">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-74 lg:h-68 object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {post.badge && (
                        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.badge}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-2/3">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight hover:text-blue-600 transition-colors cursor-pointer">
                      {post.title}
                    </h2>
                    <div className="flex items-center mb-4 text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span> 
                      &nbsp;|&nbsp;  
                      <span className="text-sm">{post.author}</span>

                    </div>
                    <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-6">
                      {post.Description}
                    </p>
                    <Link to={`/singleblog/${post._id}`}>
              <button className="inline-flex items-center px-6 py-3 border-2 border-[#005f73] text-[#005f73] font-medium rounded-lg hover:bg-[#005f73] hover:text-white transition-all duration-300 group">
                      <svg className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      Continue Reading
                    </button>
                    </Link>
          </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Blog;
