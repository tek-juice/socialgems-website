'use client'
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Blog {
  id: number;
  title: string;
  tagline: string;
  description: string;
  attachment: string;
  created_at: string;
  approved: string;
}

export default function BlogPost() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedBlogs();
  }, []);

  const fetchApprovedBlogs = async () => {
    try {
      const response = await fetch('/api/admin/approved-blog');
      const data = await response.json();
      if (data.success) {
        // Filter blogs that are 21 days or older
        const currentDate = new Date();
        const filteredBlogs = data.blogs.filter((blog: Blog) => {
          const blogDate = new Date(blog.created_at);
          const diffTime = Math.abs(currentDate.getTime() - blogDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 21;
        });
        console.log('Filtered blogs:', filteredBlogs); // Debug log
        setBlogs(filteredBlogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center text-center bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-gold to-brown rounded-b-3xl z-0"></div>
        <div className="relative z-10 text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover insights, trends, and stories from the world of influencer marketing
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div 
                  key={blog.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => openModal(blog)}
                >
                  {blog.attachment && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={`/${blog.attachment}`}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brown mb-2">{blog.title}</h3>
                    <p className="text-gray-600 mb-3">{blog.tagline}</p>
                    <p className="text-gray-700 line-clamp-3">{blog.description}</p>
                    <div className="mt-4 text-sm text-gray-500">
                      {new Date(blog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Preview Modal */}
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-brown">{selectedBlog.title}</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              {selectedBlog.attachment && (
                <div className="relative h-96 mb-6">
                  <Image
                    src={`/${selectedBlog.attachment}`}
                    alt={selectedBlog.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <div className="space-y-4">
                <p className="text-xl text-gray-600 italic">{selectedBlog.tagline}</p>
                <p className="text-gray-700 whitespace-pre-line">{selectedBlog.description}</p>
                <div className="text-sm text-gray-500">
                  {new Date(selectedBlog.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}