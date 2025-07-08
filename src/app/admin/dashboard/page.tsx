//DASHBOARD THAT DISPLAYS USERS FROM BRAND/USERS TABLE AND INFLUENCERS FROM INFLUENCERS TABLE.
'use client';

import { useEffect, useState, useRef } from 'react';
import { saveAs } from 'file-saver';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SkeletonLoader from '@/app/components/skeletonLoader';
import { FaUsers, FaNewspaper, FaChartLine, FaBars, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"brands" | "influencers">("brands"); // Track active tab
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState<string | null>(null); //Set success delete message.
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState<string | null>(null); //set the update success message.
  const [ page, setPage ] = useState(1); //current page
  const [ limit, setLimit ] = useState(10); //10 Records per page
  const [total, setTotal] = useState(0); //Total records 
  const [filteredAllData, setFilteredData] = useState<any[]>([]); //store filtered data for display
  const [ isProfileOpen, setIsProfileOpen ] = useState(false); //state for user profile to open and signout
  const [ isChangePasswordOpen, setIsChangePasswordOpen ] = useState(false); //change password state
  const [ currentPassword, setCurrentPassword ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ success, setSuccess ] = useState('');//till here on new states for change passord.
  const [showDownloadModal, setShowDownloadModal] = useState(false); //added state for download
  const [dateRange, setDateRange] = useState({startDate: '', endDate: ''}); //added state for date range
  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false); //this is for mobile view

  // Modal State
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState<any>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('overview');

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: '',
    tagline: '',
    description: '',
    attachment: null as File | null,
  });
  const [showBlogPreview, setShowBlogPreview] = useState(false);
  const fileInputRef = useRef(null);

  const [blogs, setBlogs] = useState<any[]>([]);
  const [isEditBlogModalOpen, setIsEditBlogModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [blogSuccessMessage, setBlogSuccessMessage] = useState<string | null>(null);

  // Add these new states at the top with other state declarations
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState({ title: '', description: '' });

  // User Story States
  const [stories, setStories] = useState<any[]>([]);
  const [storyLoading, setStoryLoading] = useState(false);
  const [storySuccessMessage, setStorySuccessMessage] = useState<string | null>(null);
  const [storyErrorMessage, setStoryErrorMessage] = useState<string | null>(null);
  const [activeStoryTab, setActiveStoryTab] = useState<'text' | 'picture' | 'audio' | 'poll' | 'trivia'>('text');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [isViewStoryModalOpen, setIsViewStoryModalOpen] = useState(false);
  const [viewingStory, setViewingStory] = useState<any>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    if (!token) {
      setError('Unauthorized. Please log in.');
      router.push('/login');
      return;
    }

    // Verify admin token
    fetch('/api/admin/verify-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          sessionStorage.removeItem('adminToken');
          router.push('/login');
        } else {
          setAdminData(data.admin); //set admin data including role
          fetchData(); // Fetch data after successful authentication
        }
      })
      .catch(() => {
        setError('An error occurred.');
        router.push('/login');
      });
  }, [router]);

  //render buttons based on role
  const renderActions = (record: any) => {
    if (adminData?.role === 'admin') {
      return (
        <>
          <button className="text-blue-500 hover:text-blue-900 mr-2" onClick={() => openViewModal(record)}>View</button>
          <button className="text-green-600 hover:text-green-900 mr-2" onClick={() => openEditModal(record)}>Edit</button>
          <button className="text-red-600 hover:text-red-900 mr-2" onClick={() => handleDelete(record.email)}>Delete</button>
        </>
      );
    } else if (adminData?.role === 'manager') {
      return (
        <button className="text-blue-500 mr-2" onClick={() => openViewModal(record)}>View</button>
      );
    }
    return null;
  };
  useEffect(() => {
    fetchData();
  }, [page, limit, activeTab]); //add page and limit as dependencies.

  // Function to fetch data based on active tab
  const fetchData = () => {
    setLoading(true);
    const endpoint = activeTab === "brands" ? `/api/admin/users?page=${page}&limit=${limit}` : `/api/admin/influencers?page=${page}&limit=${limit}`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log("Fetched data:", data.users || data.influencers); // Log the fetched data
          if (activeTab === "brands") {
            setUsers(data.users || data.brands); // Set brands data
          } else {
            setInfluencers(data.influencers); // Set influencers data
          }
          setTotal(data.total); //sets total records
        } else {
          setError('Failed to fetch data.');
        }
      })
      .catch(() => setError('An error occurred while fetching data.'))
      .finally(() => setLoading(false));
  };

  //fetch all data for search within the current tab--just added
  const fetchAllDataForSearch = async() => {
    setLoading(true);
    const endpoint = `/api/admin/search?query=${searchQuery}&type=${activeTab}`;
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data.success) {
        setFilteredData(data.data); //store filtered data
        setTotal(data.data.length); //update total records
      } else {
        setError('Failed to fetch search results.');
      }
    } catch (error) {
      setError('An error occured while searching.');
    } finally {
      setLoading(false);
    }
  };

  //Handle search query change
  useEffect(() => {
    if (searchQuery) {
      fetchAllDataForSearch(); //Fetch all data for search within the current tab.
    } else {
      fetchData(); //Fetch paginated data if no search query
    }
  }, [searchQuery, activeTab]);

  //effect handle click outside of profile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (isProfileOpen && target && !target.closest('.relative')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);
  //Determine which data to display
  const displayData = searchQuery ? 
    filteredAllData.slice((page - 1) * limit, page * limit) : 
    activeTab === "brands" ? users: influencers;

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/login'); // Redirects to login page after log out
  };

  //Handle password change
  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    /*if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }*/

    try {
      // API call to change password
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        sessionStorage.removeItem('adminToken');
        router.push('/login');
        return;
      } else {
        throw new Error(data.message || 'Failed to change password');
      }
      //if password change succeeded, clear token and redirect to login again
      /*if (data.clearToken) {
        sessionStorage.removeItem('adminToken');
        router.push('/login');
      }

      setSuccess('Password changed successfully, Please login with your new password');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsChangePasswordOpen(false);*/
    } catch (error) {
      alert("Password change failed, check your password and try again!")
      //setError(error.message);
    }
  };

  //handle download of records
  const handleDownload = async () => {
    setShowDownloadModal(true);
  };

  const validateDates = () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      alert("Please select both start and end dates");
      return false;
    }
    if (new Date(dateRange.startDate) > new Date(dateRange.endDate)) {
      alert("End date must be after start date");
      return false;
    }
    return true;
  }
  const handleConfirmDownload = async () => {
    if (!validateDates()) {
      return;
    }
    const response = await fetch(`/api/admin/export?type=${activeTab}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
    if (!response.ok) {
      alert("failed to download file");
      return;
    }
    const blob = await response.blob();
    saveAs(blob, `${activeTab}_List_${dateRange.startDate}_to_${dateRange.endDate}.xlsx`);
    setShowDownloadModal(false);
  }

  // Function to delete a user/influencer
  const handleDelete = async (email: string) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const endpoint = activeTab === "brands" ? "/api/admin/users" : "/api/admin/influencers";
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        setDeleteSuccessMessage(data.message); //set success message
        if (activeTab === "brands") {
          setUsers(users.filter((user) => user.email !== email)); // Remove user from state
        } else {
          setInfluencers(influencers.filter((influencer) => influencer.email !== email)); // Remove influencer from state
        }
        //clear success message after 3 seconds
        setTimeout(() => {
          setDeleteSuccessMessage(null);
        }, 3000);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Failed to delete record");
    }
  };

  // Open View Modal
  const openViewModal = (record: any) => {
    setSelectedUser(record);
    setIsViewModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (record: any) => {
    setEditedUser({ ...record });
    setIsEditModalOpen(true);
  };

  // Handle Edit Form Change
  const handleEditChange = (e: any) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  // Update Record
  const handleUpdate = async () => {
    try {
      const endpoint = activeTab === "brands" ? "/api/admin/users" : "/api/admin/influencers";
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedUser),
      });

      const data = await res.json();
      if (data.success) {
        setUpdateSuccessMessage(data.message);
        if (activeTab === "brands") {
          setUsers(users.map((user) => (user.id === editedUser.id ? editedUser : user)));
        } else {
          setInfluencers(influencers.map((influencer) => (influencer.id === editedUser.id ? editedUser : influencer)));
        }
        setIsEditModalOpen(false);
        //set the success message
        setTimeout(() => {
          setUpdateSuccessMessage(null);
        }, 3000);
      }
       else {
        alert(data.error);
      }
    } catch (error) {
      alert("Failed to update record");
    }
  };

  const handleBlogInputChange = (e: any) => {
    const { name, value } = e.target;
    setBlogForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlogAttachment = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setBlogForm((prev) => ({ ...prev, attachment: file }));
    }
  };

  const handleOpenBlogModal = () => {
    setIsBlogModalOpen(true);
  };

  const handleCloseBlogModal = () => {
    setIsBlogModalOpen(false);
    setShowBlogPreview(false);
    // Do not clear blogForm so it does not persist
  };

  const handleBlogPreview = () => {
    setShowBlogPreview(true);
  };

  const handleBlogEdit = () => {
    setShowBlogPreview(false);
  };

  const handleBlogPost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', blogForm.title);
      formData.append('tagline', blogForm.tagline);
      formData.append('description', blogForm.description);
      if (blogForm.attachment) {
        formData.append('attachment', blogForm.attachment);
      }

      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setBlogSuccessMessage(data.message);
        setIsBlogModalOpen(false);
        setShowBlogPreview(false);
        setBlogForm({ title: '', tagline: '', description: '', attachment: null });
        // Refresh the blog list
        fetchBlogs();
      } else {
        alert(data.error || 'Failed to create blog post');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog post');
    }
  };

  const handleBlogSaveDraft = () => {
    // Implement save as draft logic here
    setIsBlogModalOpen(false);
    setShowBlogPreview(false);
    setBlogForm({ title: '', tagline: '', description: '', attachment: null });
  };

  useEffect(() => {
    if (activeMenu === 'blog') {
      fetchBlogs();
    }
  }, [activeMenu]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        setError('Failed to fetch blogs');
      }
    } catch (error) {
      setError('Error fetching blogs');
    }
  };

  const handleBlogAction = async (id: number, action: 'approve' | 'delete') => {
    try {
      const response = await fetch('/api/admin/blog', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action })
      });
      
      const data = await response.json();
      if (data.success) {
        setBlogSuccessMessage(data.message);
        fetchBlogs(); // Refresh the blog list
        setTimeout(() => setBlogSuccessMessage(null), 3000);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Failed to perform action');
    }
  };

  const handleEditBlog = (blog: any) => {
    setSelectedBlog(blog);
    setIsEditBlogModalOpen(true);
  };

  const handleUpdateBlog = async () => {
    try {
      const response = await fetch('/api/admin/blog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedBlog)
      });
      
      const data = await response.json();
      if (data.success) {
        setBlogSuccessMessage(data.message);
        //fetchBlogs(); // Refresh the blog list
        setIsEditBlogModalOpen(false);
        setTimeout(() => setBlogSuccessMessage(null), 3000);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Failed to update blog');
    }
  };

  // Add this new function with other handlers
  const handlePreviewClick = (blog: any) => {
    setPreviewContent({
      title: blog.title,
      description: blog.description
    });
    setIsPreviewModalOpen(true);
  };

  // User Story Functions
  useEffect(() => {
    if (activeMenu === 'user-story') {
      fetchStories();
    }
  }, [activeMenu, activeStoryTab]);

  const fetchStories = async () => {
    setStoryLoading(true);
    setStoryErrorMessage(null); // Clear error before fetching
    try {
      const response = await fetch('/api/stories/checkStory');
      const data = await response.json();
      
      if (data.success !== false) {
        const filteredStories = data.stories.filter((story: any) => {
          switch (activeStoryTab) {
            case 'text': return story.type === 'story';
            case 'picture': return story.type === 'picture_comic';
            case 'audio': return story.type === 'audio';
            case 'poll': return story.type === 'poll';
            case 'trivia': return story.type === 'trivia_quiz';
            default: return false;
          }
        });
        setStories(filteredStories);
        setStoryErrorMessage(null); // Clear error after successful fetch
      } else {
        setStoryErrorMessage('Failed to fetch stories');
      }
    } catch (error) {
      setStoryErrorMessage('Error fetching stories');
    } finally {
      setStoryLoading(false);
    }
  };

  const handleStoryAction = async (storyId: number, action: 'approve' | 'feedback' | 'reject') => {
    if (action === 'feedback') {
      setSelectedStory(stories.find(s => s.story_id === storyId));
      setIsFeedbackModalOpen(true);
      return;
    }

    try {
      let response;
      if (action === 'approve') {
        response = await fetch('/api/stories/approveStory', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storyId })
        });
      } else if (action === 'reject') {
        response = await fetch('/api/stories/deleteStory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: storyId })
        });
      }

      if (!response) {
        setStoryErrorMessage('Failed to perform action');
        setTimeout(() => setStoryErrorMessage(null), 3000);
        return;
      }

      const data = await response.json();
      
      if (response.ok) {
        setStorySuccessMessage(data.message);
        fetchStories();
        setTimeout(() => setStorySuccessMessage(null), 3000);
      } else {
        setStoryErrorMessage(data.error || 'Action failed');
        setTimeout(() => setStoryErrorMessage(null), 3000);
      }
    } catch (error) {
      setStoryErrorMessage('Failed to perform action');
      setTimeout(() => setStoryErrorMessage(null), 3000);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!selectedStory || !feedbackText.trim()) return;

    try {
      const response = await fetch('/api/stories/adminFeedback', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storyId: selectedStory.story_id,
          status: selectedStory.status,
          adminFeedback: feedbackText
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setStorySuccessMessage('Feedback submitted successfully');
        setIsFeedbackModalOpen(false);
        setFeedbackText('');
        setSelectedStory(null);
        fetchStories();
        setTimeout(() => setStorySuccessMessage(null), 3000);
      } else {
        setStoryErrorMessage(data.error || 'Failed to submit feedback');
        setTimeout(() => setStoryErrorMessage(null), 3000);
      }
    } catch (error) {
      setStoryErrorMessage('Failed to submit feedback');
      setTimeout(() => setStoryErrorMessage(null), 3000);
    }
  };

  const handleViewStory = (story: any) => {
    setViewingStory(story);
    setIsViewStoryModalOpen(true);
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 fixed h-full z-30`}>
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && (
            <Image
              src="/social-gems-fn-200.png"
              width={120}
              height={40}
              alt="Social Gems"
              className="object-contain"
            />
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="mt-8">
          <button 
            onClick={() => setActiveMenu('overview')}
            className={`flex items-center px-4 py-3 w-full rounded-lg transition-colors font-medium mb-2
              ${activeMenu === 'overview' ? 'bg-gold text-black' : 'bg-transparent text-brown hover:bg-brown/10'}`}
          >
            <FaChartLine className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Overview</span>}
          </button>

          <button
            onClick={() => setActiveMenu('users')}
            className={`flex items-center px-4 py-3 w-full rounded-lg transition-colors font-medium mb-2
              ${activeMenu === 'users' ? 'bg-gold text-black' : 'bg-transparent text-brown hover:bg-brown/10'}`}
          >
            <FaUsers className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Users</span>}
          </button>

          <button
            onClick={() => setActiveMenu('blog')}
            className={`flex items-center px-4 py-3 w-full rounded-lg transition-colors font-medium mb-2
              ${activeMenu === 'blog' ? 'bg-gold text-black' : 'bg-transparent text-brown hover:bg-brown/10'}`}
          >
            <FaNewspaper className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Blog</span>}
          </button>

          <button
            onClick={() => setActiveMenu('user-story')}
            className={`flex items-center px-4 py-3 w-full rounded-lg transition-colors font-medium mb-2
              ${activeMenu === 'user-story' ? 'bg-gold text-black' : 'bg-transparent text-brown hover:bg-brown/10'}`}
          >
            <FaUsers className="text-xl" />
            {isSidebarOpen && <span className="ml-4">User Stories</span>}
          </button>
        </nav>
      </div>

      {/* Main Content Wrapper */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 flex flex-col min-h-screen bg-gray-100`}>
        {/* Main Content */}
        <div className="flex-1 p-6 bg-white">
          {/* Header */}
          <header className="bg-gray-100 rounded-lg shadow-sm p-4 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
              <div className="flex items-center space-x-4">
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <svg
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>
                  
                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                      <button
                        onClick={() => {
                          setIsChangePasswordOpen(true);
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Change Password
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Users Section */}
          {activeMenu === 'users' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Controls Section */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  {/* Table Selection */}
                  <select
                    value={activeTab}
                    onChange={(e) => {
                      setActiveTab(e.target.value as "brands" | "influencers");
                      setPage(1);
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="brands">Brands</option>
                    <option value="influencers">Influencers</option>
                  </select>

                  {/* Search Input */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold w-full sm:w-64"
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="bg-gold text-black px-6 py-2 rounded-lg hover:bg-gold/90 transition-colors w-full sm:w-auto"
                >
                  Download {activeTab === "brands" ? "Brands" : "Influencers"} List
                </button>
              </div>

              {/* Success Messages */}
              {deleteSuccessMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                  {deleteSuccessMessage}
                </div>
              )}
              {updateSuccessMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                  {updateSuccessMessage}
                </div>
              )}

              {/* Table */}
              {loading ? (
                <SkeletonLoader />
              ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="bg-gray-200">
                        <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base text-gray-800">First Name</th>
                        <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base text-gray-800">Last Name</th>
                        <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base text-gray-800">Email</th>
                        <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base text-gray-800">Contact</th>
                        <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base text-gray-800">Date Submitted</th>
                        <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base text-gray-800">
                          {activeTab === "brands" ? "Expertise" : "Influence"}
                        </th>
                        <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base text-gray-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {displayData.map((record) => (
                        <tr key={record.id} className="border-t hover:bg-gray-50">
                          <td className="py-2 px-2 sm:px-4 text-sm sm:text-base text-gray-900">{record.first_name}</td>
                          <td className="py-2 px-2 sm:px-4 text-sm sm:text-base text-gray-900">{record.last_name}</td>
                          <td className="py-2 px-2 sm:px-4 text-sm sm:text-base text-gray-900">{record.email}</td>
                          <td className="py-2 px-2 sm:px-4 text-sm sm:text-base text-gray-900">{record.contact || "N/A"}</td>
                          <td className="py-2 px-2 sm:px-4 text-sm sm:text-base text-gray-900">{new Date(record.created_at).toISOString().split('T')[0]}</td>
                          <td className="py-2 px-2 sm:px-4 text-sm sm:text-base text-gray-900">
                            {activeTab === "brands" ? record.expertise : record.influence}
                          </td>
                          <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">{renderActions(record)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {!loading && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 p-2 sm:p-4">
                  <div className="mb-2 sm:mb-0">
                    <span className="text-gray-700 text-sm sm:text-base">
                      Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} records
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                      className="px-4 py-2 text-black bg-gray-200 rounded disabled:opacity-50 text-sm sm:text-base"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage((prev) => prev + 1)}
                      disabled={page * limit >= total}
                      className="px-4 py-2 text-black bg-gray-200 rounded disabled:opacity-50 text-sm sm:text-base"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Overview Section */}
          {activeMenu === 'overview' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              {/* Add overview content here */}
            </div>
          )}

          {/* Blog Section */}
          {activeMenu === 'blog' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-yellow-500 font-semibold">Blog Management</h2>
                <button
                  className="bg-gold text-black px-4 py-2 rounded-lg hover:bg-gold/90 transition-colors"
                  onClick={handleOpenBlogModal}
                >
                  Create Blog
                </button>
              </div>

              {/* Blog Success Message */}
              {blogSuccessMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                  {blogSuccessMessage}
                </div>
              )}

              {/* Blog Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tagline</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th> 
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogs.map((blog) => (
                      <tr key={blog.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{blog.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{blog.tagline}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="max-w-xs">
                            <p className="truncate">{blog.description}</p>
                            <button
                              onClick={() => handlePreviewClick(blog)}
                              className="text-blue-600 hover:text-blue-900 text-sm mt-1"
                            >
                              Preview
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(blog.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {blog.approved ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Approved
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEditBlog(blog)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </button>
                          {!blog.approved && (
                            <button
                              onClick={() => handleBlogAction(blog.id, 'approve')}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleBlogAction(blog.id, 'delete')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Edit Blog Modal */}
              {isEditBlogModalOpen && selectedBlog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative">
                    <button
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                      onClick={() => setIsEditBlogModalOpen(false)}
                    >
                      &times;
                    </button>
                    <h3 className="text-2xl text-yellow-500 font-bold mb-4">Edit Blog</h3>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={selectedBlog.title}
                        onChange={(e) => setSelectedBlog({...selectedBlog, title: e.target.value})}
                        className="w-full border text-black rounded px-3 py-2"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={selectedBlog.tagline}
                        onChange={(e) => setSelectedBlog({...selectedBlog, tagline: e.target.value})}
                        className="w-full border text-black rounded px-3 py-2"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-1">Description</label>
                      <textarea
                        value={selectedBlog.description}
                        onChange={(e) => setSelectedBlog({...selectedBlog, description: e.target.value})}
                        className="w-full border text-black rounded px-3 py-2 min-h-[120px]"
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        className="px-4 py-2 text-black bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => setIsEditBlogModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-gold text-black rounded hover:bg-gold/90"
                        onClick={handleUpdateBlog}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Existing Blog Creation Modal */}
              {isBlogModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative">
                    <button
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                      onClick={handleCloseBlogModal}
                    >
                      &times;
                    </button>
                    {!showBlogPreview ? (
                      <>
                        <h3 className="text-2xl text-yellow-500 font-bold mb-4">Create Blog</h3>
                        <div className="mb-4">
                          <label className="block text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            name="title"
                            value={blogForm.title}
                            onChange={handleBlogInputChange}
                            className="w-full border text-black rounded px-3 py-2"
                            placeholder="Blog Title"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 mb-1">Tagline</label>
                          <input
                            type="text"
                            name="tagline"
                            value={blogForm.tagline}
                            onChange={handleBlogInputChange}
                            className="w-full border text-black rounded px-3 py-2"
                            placeholder="Blog Tagline"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 mb-1">Description</label>
                          <textarea
                            name="description"
                            value={blogForm.description}
                            onChange={handleBlogInputChange}
                            className="w-full border text-black rounded px-3 py-2 min-h-[120px]"
                            placeholder="Write your blog content here..."
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 mb-1">Attachment (image, gif, or video)</label>
                          <input
                            type="file"
                            accept="image/*,video/*,image/gif"
                            ref={fileInputRef}
                            onChange={handleBlogAttachment}
                            className="w-full text-black"
                          />
                          {blogForm.attachment && (
                            <div className="mt-2 text-sm text-gray-600">
                              Selected file: {blogForm.attachment.name}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                          <button
                            className="px-4 py-2 text-black bg-gray-200 rounded hover:bg-gray-300"
                            onClick={handleCloseBlogModal}
                          >
                            Cancel
                          </button>
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleBlogPreview}
                          >
                            Preview
                          </button>
                          <button
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                            onClick={handleBlogSaveDraft}
                          >
                            Save as Draft
                          </button>
                          <button
                            className="px-4 py-2 bg-gold text-black rounded hover:bg-gold/90"
                            onClick={handleBlogPost}
                          >
                            Post Blog
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-bold mb-4">Blog Preview</h3>
                        <div className="mb-4">
                          <div className="text-lg font-semibold">{blogForm.title}</div>
                          <div className="text-md text-gray-600 mb-2">{blogForm.tagline}</div>
                          <div className="prose max-w-none text-gray-800 whitespace-pre-line border rounded p-3 bg-gray-50">
                            {blogForm.description}
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                          <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={handleBlogEdit}
                          >
                            Edit
                          </button>
                          <button
                            className="px-4 py-2 bg-gold text-black rounded hover:bg-gold/90"
                            onClick={handleBlogPost}
                          >
                            Post Blog
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Story Section */}
          {activeMenu === 'user-story' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">User Stories Management</h2>
              </div>

              {/* Story Type Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { key: 'text', label: 'Text Stories', count: stories.filter(s => s.type === 'story').length },
                  { key: 'picture', label: 'Picture/Comic', count: stories.filter(s => s.type === 'picture_comic').length },
                  { key: 'audio', label: 'Audio Stories', count: stories.filter(s => s.type === 'audio').length },
                  { key: 'poll', label: 'Polls', count: stories.filter(s => s.type === 'poll').length },
                  { key: 'trivia', label: 'Trivia Quizzes', count: stories.filter(s => s.type === 'trivia_quiz').length }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveStoryTab(tab.key as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border 
                      ${activeStoryTab === tab.key
                        ? 'bg-brown text-white border-brown'
                        : 'bg-brown/10 text-brown border-brown/30 hover:bg-brown/20'}
                    `}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Success/Error Messages */}
              {storySuccessMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                  {storySuccessMessage}
                </div>
              )}
              {storyErrorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  {storyErrorMessage}
                </div>
              )}

              {/* Loading State */}
              {storyLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  {/* Text Stories Table */}
                  {activeStoryTab === 'text' && (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Picture</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stories.filter(s => s.type === 'story').map((story) => (
                          <tr key={story.story_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{story.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {story.fname} {story.lname}<br/>
                              <span className="text-gray-500">{story.email}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {story.user_image ? (
                                <Image
                                  src={story.user_image}
                                  alt={`${story.fname} ${story.lname}`}
                                  width={40}
                                  height={40}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-gray-500 text-xs">
                                    {story.fname?.charAt(0)}{story.lname?.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <div className="max-w-xs">
                                <p className="truncate">{story.text_content}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                story.status === 'approved' ? 'bg-green-100 text-green-800' :
                                story.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {story.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(story.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleViewStory(story)}
                                className="text-purple-600 hover:text-purple-900 mr-3"
                              >
                                View
                              </button>
                              {story.status === 'draft' && (
                                <button
                                  onClick={() => handleStoryAction(story.story_id, 'approve')}
                                  className="text-green-600 hover:text-green-900 mr-3"
                                >
                                  Approve
                                </button>
                              )}
                              <button
                                onClick={() => handleStoryAction(story.story_id, 'feedback')}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                Feedback
                              </button>
                              <button
                                onClick={() => handleStoryAction(story.story_id, 'reject')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* Picture/Comic Stories Table */}
                  {activeStoryTab === 'picture' && (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Picture</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stories.filter(s => s.type === 'picture_comic').map((story) => (
                          <tr key={story.story_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{story.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {story.fname} {story.lname}<br/>
                              <span className="text-gray-500">{story.email}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {story.user_image ? (
                                <Image
                                  src={story.user_image}
                                  alt={`${story.fname} ${story.lname}`}
                                  width={40}
                                  height={40}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-gray-500 text-xs">
                                    {story.fname?.charAt(0)}{story.lname?.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {story.image_urls ? story.image_urls.length : 0} images
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <div className="max-w-xs">
                                <p className="truncate">{story.picture_description || 'No description'}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                story.status === 'approved' ? 'bg-green-100 text-green-800' :
                                story.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {story.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(story.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleViewStory(story)}
                                className="text-purple-600 hover:text-purple-900 mr-3"
                              >
                                View
                              </button>
                              {story.status === 'draft' && (
                                <button
                                  onClick={() => handleStoryAction(story.story_id, 'approve')}
                                  className="text-green-600 hover:text-green-900 mr-3"
                                >
                                  Approve
                                </button>
                              )}
                              <button
                                onClick={() => handleStoryAction(story.story_id, 'feedback')}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                Feedback
                              </button>
                              <button
                                onClick={() => handleStoryAction(story.story_id, 'reject')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* Audio Stories Table */}
                  {activeStoryTab === 'audio' && (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Picture</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audio File</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stories.filter(s => s.type === 'audio').map((story) => (
                          <tr key={story.story_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{story.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {story.fname} {story.lname}<br/>
                              <span className="text-gray-500">{story.email}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {story.user_image ? (
                                <Image
                                  src={story.user_image}
                                  alt={`${story.fname} ${story.lname}`}
                                  width={40}
                                  height={40}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-gray-500 text-xs">
                                    {story.fname?.charAt(0)}{story.lname?.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <a href={story.audio_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900">
                                Listen to Audio
                              </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                story.status === 'approved' ? 'bg-green-100 text-green-800' :
                                story.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {story.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(story.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleViewStory(story)}
                                className="text-purple-600 hover:text-purple-900 mr-3"
                              >
                                View
                              </button>
                              {story.status === 'draft' && (
                                <button
                                  onClick={() => handleStoryAction(story.story_id, 'approve')}
                                  className="text-green-600 hover:text-green-900 mr-3"
                                >
                                  Approve
                                </button>
                              )}
                              <button
                                onClick={() => handleStoryAction(story.story_id, 'feedback')}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                Feedback
                              </button>
                              <button
                                onClick={() => handleStoryAction(story.story_id, 'reject')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* Polls Table */}
                  {activeStoryTab === 'poll' && (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Picture</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stories.filter(s => s.type === 'poll').map((story) => (
                          <tr key={story.story_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{story.poll_question}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {story.fname} {story.lname}<br/>
                              <span className="text-gray-500">{story.email}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {story.user_image ? (
                                <Image
                                  src={story.user_image}
                                  alt={`${story.fname} ${story.lname}`}
                                  width={40}
                                  height={40}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-gray-500 text-xs">
                                    {story.fname?.charAt(0)}{story.lname?.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {story.poll_options ? story.poll_options.length : 0} options
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                story.status === 'approved' ? 'bg-green-100 text-green-800' :
                                story.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {story.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(story.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleViewStory(story)}
                                className="text-purple-600 hover:text-purple-900 mr-3"
                              >
                                View
                              </button>
                              {story.status === 'draft' && (
                                <button
                                  onClick={() => handleStoryAction(story.story_id, 'approve')}
                                  className="text-green-600 hover:text-green-900 mr-3"
                                >
                                  Approve
                                </button>
                              )}
                              <button
                                onClick={() => handleStoryAction(story.story_id, 'feedback')}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                Feedback
                              </button>
                              <button
                                onClick={() => handleStoryAction(story.story_id, 'reject')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* Trivia Quizzes Table */}
                  {activeStoryTab === 'trivia' && (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Picture</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correct Answer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stories.filter(s => s.type === 'trivia_quiz').map((story) => (
                          <tr key={story.story_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{story.trivia_question}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {story.fname} {story.lname}<br/>
                              <span className="text-gray-500">{story.email}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {story.user_image ? (
                                <Image
                                  src={story.user_image}
                                  alt={`${story.fname} ${story.lname}`}
                                  width={40}
                                  height={40}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-gray-500 text-xs">
                                    {story.fname?.charAt(0)}{story.lname?.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{story.correct_answer}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {story.trivia_options ? story.trivia_options.length : 0} options
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                story.status === 'approved' ? 'bg-green-100 text-green-800' :
                                story.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {story.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(story.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleViewStory(story)}
                                className="text-purple-600 hover:text-purple-900 mr-3"
                              >
                                View
                              </button>
                              {story.status === 'draft' && (
                                <button
                                  onClick={() => handleStoryAction(story.story_id, 'approve')}
                                  className="text-green-600 hover:text-green-900 mr-3"
                                >
                                  Approve
                                </button>
                              )}
                              <button
                                onClick={() => handleStoryAction(story.story_id, 'feedback')}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                Feedback
                              </button>
                              <button
                                onClick={() => handleStoryAction(story.story_id, 'reject')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* No Stories Message */}
                  {stories.filter(s => {
                    switch (activeStoryTab) {
                      case 'text': return s.type === 'story';
                      case 'picture': return s.type === 'picture_comic';
                      case 'audio': return s.type === 'audio';
                      case 'poll': return s.type === 'poll';
                      case 'trivia': return s.type === 'trivia_quiz';
                      default: return false;
                    }
                  }).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No {activeStoryTab} stories found.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Select Date Range</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                min={dateRange.startDate}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowDownloadModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gold text-black rounded"
                onClick={handleConfirmDownload}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">User Details</h2>
            <div className="space-y-3">
              <div className="bg-gray-100 p-3 rounded-lg shadow">
                <p className="text-gray-700 text-sm sm:text-base">
                  <strong>First Name:</strong> {selectedUser.first_name}
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg shadow">
                <p className="text-gray-700 text-sm sm:text-base">
                  <strong>Last Name:</strong> {selectedUser.last_name}
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg shadow">
                <p className="text-gray-700 text-sm sm:text-base">
                  <strong>Email:</strong> {selectedUser.email}
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg shadow">
                <p className="text-gray-700 text-sm sm:text-base">
                  <strong>Company:</strong> {selectedUser.company_name || "N/A"}
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg shadow">
                <p className="text-gray-700 text-sm sm:text-base">
                  <strong>Contact:</strong> {selectedUser.contact || "N/A"}
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg shadow">
                <p className="text-gray-700 text-sm sm:text-base">
                  <strong>{activeTab === "brands" ? "Expertise" : "Influence"}:</strong>{" "}
                  {activeTab === "brands" ? selectedUser.expertise : selectedUser.influence}
                </p>
              </div>
              {/* Social Media */}
              {selectedUser.social_media && (
                <div className="bg-gray-100 p-3 rounded-lg shadow">
                  <p className="text-gray-700 text-sm sm:text-base">
                    <strong>Social Media:</strong>
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {Object.values(selectedUser.social_media).join(", ")}
                  </p>
                </div>
              )}
              {/* Message Box */}
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-700 text-sm sm:text-base">
                  <strong>Message:</strong>
                </p>
                <div className="bg-white p-3 rounded-lg shadow-md max-h-32 overflow-y-auto">
                  <p className="text-gray-600 text-sm sm:text-base">
                    {selectedUser.message || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            {/* Centered Close Button */}
            <div className="flex justify-center mt-6">
              <button
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 text-sm sm:text-base"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit {activeTab === "brands" ? "Brand" : "Influencer"}</h2>
            <label className="w-full p-2 text-black text-sm sm:text-base">
              First Name
              <input
                name="first_name"
                value={editedUser.first_name}
                onChange={handleEditChange}
                className="block border p-2 my-2 w-full"
              />
            </label>
            <label className="w-full p-2 text-black text-sm sm:text-base">
              Last Name
              <input
                name="last_name"
                value={editedUser.last_name}
                onChange={handleEditChange}
                className="block border p-2 my-2 w-full"
              />
            </label>
            <label className="w-full p-2 text-black text-sm sm:text-base">
              Email
              <input
                name="email"
                value={editedUser.email}
                onChange={handleEditChange}
                className="block border p-2 my-2 w-full"
              />
            </label>
            <div className="flex justify-end gap-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded text-sm sm:text-base"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded text-sm sm:text-base"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsPreviewModalOpen(false)}
            >
              &times;
            </button>
            <h3 className="text-2xl text-yellow-500 font-bold mb-4">{previewContent.title}</h3>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line text-black text-base leading-relaxed">{previewContent.description}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                onClick={() => setIsPreviewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {isFeedbackModalOpen && selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setIsFeedbackModalOpen(false);
                setFeedbackText('');
                setSelectedStory(null);
              }}
            >
              &times;
            </button>
            <h3 className="text-xl text-black font-bold mb-4">Provide Feedback</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Story: {selectedStory.title}</label>
              <label className="block text-gray-700 mb-2">User: {selectedStory.fname} {selectedStory.lname}</label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Feedback</label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full border text-black rounded px-3 py-2 min-h-[120px]"
                placeholder="Enter your feedback for this story..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-black bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => {
                  setIsFeedbackModalOpen(false);
                  setFeedbackText('');
                  setSelectedStory(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gold text-black rounded hover:bg-gold/90"
                onClick={handleSubmitFeedback}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Story Modal */}
      {isViewStoryModalOpen && viewingStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{viewingStory.title}</h3>
                <p className="text-gray-600 mt-1">
                  By {viewingStory.fname} {viewingStory.lname} • {new Date(viewingStory.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => {
                  setIsViewStoryModalOpen(false);
                  setViewingStory(null);
                }}
              >
                &times;
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* User Info */}
              <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
                {viewingStory.user_image ? (
                  <Image
                    src={viewingStory.user_image}
                    alt={`${viewingStory.fname} ${viewingStory.lname}`}
                    width={60}
                    height={60}
                    className="rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-15 h-15 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-500 text-lg font-bold">
                      {viewingStory.fname?.charAt(0)}{viewingStory.lname?.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {viewingStory.fname} {viewingStory.lname}
                  </h4>
                  <p className="text-gray-600">{viewingStory.email}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                    viewingStory.status === 'approved' ? 'bg-green-100 text-green-800' :
                    viewingStory.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {viewingStory.status}
                  </span>
                </div>
              </div>

              {/* Story Content Based on Type */}
              {viewingStory.type === 'story' && (
                <div className="bg-white p-6 rounded-lg border">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">Story Content</h4>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                      {viewingStory.text_content}
                    </p>
                  </div>
                </div>
              )}

              {viewingStory.type === 'picture_comic' && (
                <div className="bg-white p-6 rounded-lg border">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">Picture/Comic Story</h4>
                  {viewingStory.picture_description && (
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-700 mb-2">Description:</h5>
                      <p className="text-gray-700 leading-relaxed">
                        {viewingStory.picture_description}
                      </p>
                    </div>
                  )}
                  {viewingStory.image_urls && viewingStory.image_urls.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-4">Images ({viewingStory.image_urls.length}):</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {viewingStory.image_urls.map((url: string, index: number) => (
                          <div key={index} className="relative">
                            <Image
                              src={url}
                              alt={`Story image ${index + 1}`}
                              width={400}
                              height={300}
                              className="rounded-lg object-cover w-full h-64"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {viewingStory.type === 'audio' && (
                <div className="bg-white p-6 rounded-lg border">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">Audio Story</h4>
                  {viewingStory.audio_url && (
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-700 mb-2">Audio File:</h5>
                      <audio controls className="w-full">
                        <source src={viewingStory.audio_url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      <a 
                        href={viewingStory.audio_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-blue-600 hover:text-blue-800 underline"
                      >
                        Open audio in new tab
                      </a>
                    </div>
                  )}
                </div>
              )}

              {viewingStory.type === 'poll' && (
                <div className="bg-white p-6 rounded-lg border">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">Poll</h4>
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-700 mb-2">Question:</h5>
                    <p className="text-gray-700 text-lg font-medium">
                      {viewingStory.poll_question}
                    </p>
                  </div>
                  {viewingStory.poll_options && viewingStory.poll_options.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-4">Options:</h5>
                      <div className="space-y-3">
                        {viewingStory.poll_options.map((option: string, index: number) => (
                          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <span className="w-8 h-8 bg-gold text-brown rounded-full flex items-center justify-center font-semibold mr-3">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {viewingStory.type === 'trivia_quiz' && (
                <div className="bg-white p-6 rounded-lg border">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">Trivia Quiz</h4>
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-700 mb-2">Question:</h5>
                    <p className="text-gray-700 text-lg font-medium">
                      {viewingStory.trivia_question}
                    </p>
                  </div>
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-700 mb-2">Correct Answer:</h5>
                    <p className="text-green-700 font-medium">
                      {viewingStory.correct_answer}
                    </p>
                  </div>
                  {viewingStory.trivia_options && viewingStory.trivia_options.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-4">Options:</h5>
                      <div className="space-y-3">
                        {viewingStory.trivia_options.map((option: string, index: number) => (
                          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <span className="w-8 h-8 bg-gold text-brown rounded-full flex items-center justify-center font-semibold mr-3">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-gray-700">{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;