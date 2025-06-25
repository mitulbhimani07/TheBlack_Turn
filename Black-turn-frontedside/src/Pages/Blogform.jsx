import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Calendar, User, FileText, Image, Hash, AlignLeft } from 'lucide-react';
import { AddBlog } from '../Api/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Blogform() {

 const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    publishDate: '',
    image: '',
    Description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate=useNavigate()
  // React Quill configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
    'align',
    'link', 'image', 'video',
    'blockquote', 'code-block'
  ];

 const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      if (file) reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle React Quill content change
  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    const contentText = formData.content.replace(/<[^>]*>/g, '').trim();
    if (!contentText || contentText === '') newErrors.content = 'Content is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.publishDate) newErrors.publishDate = 'Publish date is required';
    if (!formData.Description.trim()) newErrors.Description = 'Description is required';
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await AddBlog(formData); // ✅ Call the API
      console.log('API Response:', result);
      // alert('Blog post created successfully!');
      toast.success('Blog post created successfully!')
      navigate('/blog')
      clearForm();
    } catch (error) {
      console.error('Error creating blog:', error);
      // alert('Failed to publish blog. Please try again.');
      toast.error('Failed to publish blog. Please try again.')
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      publishDate: '',
      image: '',
      description: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#EBF4F5' }}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-2 border-black rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6" style={{ backgroundColor: '#004D5F' }}>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <FileText className="h-8 w-8" />
              Create New Blog Post
            </h1>
            <p className="text-white/80 mt-2" style={{ color: '#EBF4F5' }}>Share your thoughts with the world</p>
          </div>

          {/* Form */}
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Title Field */}
              <div >
                <label className="flex items-center gap-2 text-black text-sm font-medium mb-3">
                  <Hash className="h-4 w-4" style={{ color: '#004D5F' }} />
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-opacity-100 transition-all duration-300 hover:shadow-md"
                  style={{ 
                    backgroundColor: '#EBF4F5',
                    borderColor: errors.title ? '#ef4444' : '#004D5F'
                  }}
                  placeholder="Enter an engaging blog title..."
                />
                {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
              </div>

              {/* Author Field */}
              <div>
                <label className="flex items-center gap-2 text-black text-sm font-medium mb-3">
                  <User className="h-4 w-4" style={{ color: '#004D5F' }} />
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg text-black placeholder-gray-500 focus:outline-none transition-all duration-300 hover:shadow-md"
                  style={{ 
                    backgroundColor: '#EBF4F5',
                    borderColor: errors.author ? '#ef4444' : '#004D5F'
                  }}
                  placeholder="Author name"
                />
                {errors.author && <p className="text-red-500 text-sm mt-2">{errors.author}</p>}
              </div>

              {/* Publish Date Field */}
              <div>
                <label className="flex items-center gap-2 text-black text-sm font-medium mb-3">
                  <Calendar className="h-4 w-4" style={{ color: '#004D5F' }} />
                  Publish Date
                </label>
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg text-black focus:outline-none transition-all duration-300 hover:shadow-md"
                  style={{ 
                    backgroundColor: '#EBF4F5',
                    borderColor: errors.publishDate ? '#ef4444' : '#004D5F'
                  }}
                />
                {errors.publishDate && <p className="text-red-500 text-sm mt-2">{errors.publishDate}</p>}
              </div>

              {/* Image URL Field */}
              <div className="">
                <label className="flex items-center gap-2 text-black text-sm font-medium mb-3">
                  <Image className="h-4 w-4" style={{ color: '#004D5F' }} />
                  Featured Image URL
                </label>
                <input
                  type="file"
                  name="image"
                  // value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg text-black placeholder-gray-500 focus:outline-none transition-all duration-300 hover:shadow-md"
                  style={{ 
                    backgroundColor: '#EBF4F5',
                    borderColor: '#004D5F'
                  }}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image && (
                  <div className="mt-4 rounded-lg overflow-hidden border-2 border-black">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Description Field */}
              <div className="lg:col-span-2">
                <label className="flex items-center gap-2 text-black text-sm font-medium mb-3">
                  <AlignLeft className="h-4 w-4" style={{ color: '#004D5F' }} />
                  Description
                </label>
                <textarea
                  name="Description"
                  value={formData.Description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 rounded-lg text-black placeholder-gray-500 focus:outline-none transition-all duration-300 hover:shadow-md resize-none"
                  style={{ 
                    backgroundColor: '#EBF4F5',
                    borderColor: errors.Description ? '#ef4444' : '#004D5F'
                  }}
                  placeholder="Write a compelling description for your blog post..."
                />
                {errors.Description && <p className="text-red-500 text-sm mt-2">{errors.Description}</p>}
                <p className="text-gray-600 text-xs mt-2">{formData.Description.length}/100 characters</p>
              </div>

              {/* Content Field with React Quill */}
              <div className="lg:col-span-2">
                <label className="flex items-center gap-2 text-black text-sm font-medium mb-3">
                  <FileText className="h-4 w-4" style={{ color: '#004D5F' }} />
                  Blog Content
                </label>
                <div 
                  className="border-2 rounded-lg overflow-hidden" 
                  style={{ 
                    borderColor: errors.content ? '#ef4444' : '#004D5F'
                  }}
                >
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    name='content'
                    onChange={handleContentChange}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Start writing your blog content here... Use the toolbar to format your text."
                    style={{
                      backgroundColor: '#EBF4F5',
                      minHeight: '200px'
                    }}
                  />
                </div>
                {errors.content && <p className="text-red-500 text-sm mt-2">{errors.content}</p>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-black">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 shadow-lg hover:shadow-xl border-2 border-black"
                style={{ 
                  backgroundColor: isSubmitting ? '#6b7280' : '#004D5F',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publishing...
                  </div>
                ) : (
                  'Publish Blog Post'
                )}
              </button>
              
              <button
                type="button"
                onClick={clearForm}
                className="flex-1 sm:flex-initial bg-white hover:bg-gray-50 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 border-2 border-black hover:shadow-md"
              >
                Clear Form
              </button>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  )
}

export default Blogform