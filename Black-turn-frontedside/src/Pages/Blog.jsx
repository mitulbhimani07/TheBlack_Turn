import React from 'react'
import blogBanner from "../assets/images/blogBanner.webp";

function Blog() {

    const blogPosts = [
  {
    id: 1,
    title: "Want to Go Viral? Here's Why ST Digital's Music Distribution Services Are a Game-Changer",
    date: "June 20, 2025",
    description: "In today's highly competitive music industry, going viral is more than just a dream—it's the golden ticket to fame, fanbase growth, and financial success. With millions of artists uploading their tracks daily across various platforms, standing out from the crowd has become increasingly challenging. However, with the right music distribution strategy and platform, your music can reach the right audience at the right time.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    badge: "GO VIRAL"
  },
  {
    id: 2,
    title: "How ST Digital Is Revolutionizing Music Distribution for Independent Artists Worldwide",
    date: "May 27, 2025",
    description: "In the ever-evolving music industry, independent artists have found it increasingly challenging to stand out, monetize their content, and connect with global audiences without the backing of major labels. Traditional distribution channels often favor established artists, leaving emerging talent struggling to find their voice in an oversaturated market.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    badge: null
  },
  {
    id: 3,
    title: "The Future of Music: How Digital Distribution is Changing the Industry Landscape",
    date: "April 15, 2025",
    description: "The music industry has undergone a massive transformation in recent years, with digital distribution platforms becoming the primary gateway for artists to reach global audiences. From streaming services to social media platforms, the way we consume and discover music has fundamentally changed, creating new opportunities for both established and emerging artists.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    badge: "TRENDING"
  },
  {
    id: 4,
    title: "Building Your Music Brand: Essential Marketing Strategies for Independent Musicians",
    date: "March 22, 2025",
    description: "In today's digital age, having great music is just the beginning. Independent musicians need to think like entrepreneurs, building a strong brand identity that resonates with their target audience. From social media presence to live performances, every touchpoint matters in creating a lasting impression and building a loyal fanbase.",
    image: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    badge: "FEATURED"
  }
];


  return (
   <>
   

<div className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center"
     style={{ backgroundImage: `url(${blogBanner})` }}>
  
  {/* Black overlay */}
  <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

  {/* Content */}
  <div className="relative px-4 max-w-4xl mx-auto z-10 text-white">
    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Our Blog</h1>
    <p className="text-lg sm:text-xl font-medium mb-6">
      Explore the latest trends, stories, and insights in fashion and fabric design.
    </p>
    
  </div>
</div>

{/* blog */}
<div className="bg-white py-16 px-4">
  <div className="max-w-6xl mx-auto">
    {blogPosts.map((post, index) => (
      <div key={index} className="mb-16 last:mb-0">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Blog Image */}
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

          {/* Blog Content */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight hover:text-blue-600 transition-colors cursor-pointer">
              {post.title}
            </h2>
            
            <div className="flex items-center mb-4 text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{post.date}</span>
            </div>

            <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-6">
              {post.description}
            </p>

            <button className="inline-flex items-center px-6 py-3 border-2 border-[#005f73] text-[#005f73] font-medium rounded-lg hover:bg-[#005f73] hover:text-white transition-all duration-300 group">
              <svg className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Continue Reading
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


   </>
  )
}

export default Blog