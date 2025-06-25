import React, { useEffect, useState } from 'react'
import { Heart, MessageCircle, Share2, Bookmark, Clock, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { GetBlogById } from '../Api/api';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

function SingleBlog() {

     const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [singleblog,setsingleblog]=useState()
  const [likes, setLikes] = useState(124);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const {id}=useParams()

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  useEffect(()=>{
    const GetSingleblog=async()=>{
        try{
            const res=await GetBlogById(id);
            setsingleblog(res.data)
            console.log("setsingleblod",res.data)
            console.log("singleblog",singleblog)
        }catch(error){
            console.error("Error in GetAllBlogs API:", error);
        }
    }

    GetSingleblog()
  },[id])

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
              src={singleblog?.image} 
              alt="Blog post featured image"
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
             
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
               {singleblog?.title}
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
                  <h3 className="font-semibold text-gray-900 text-xl">{singleblog?.author}</h3>
                  {/* <p className="text-sm text-gray-500">Senior Full Stack Developer</p> */}
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className='text-xl'>{singleblog?.publishDate.slice(0,10)}</span>
                </div>
               
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-8 py-8">
            <div className="">

              {singleblog?.Description}
                       <div
  className="mt-6 text-gray-700 space-y-6 leading-relaxed word-break"
  dangerouslySetInnerHTML={{__html: singleblog?.content }}
/>



            </div>
          </div>
        </article>
      </div>
    </div>
    
    </>
  )
}

export default SingleBlog