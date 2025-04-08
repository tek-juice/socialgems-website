//DASHBOARD THAT DISPLAYS USERS FROM BRAND/USERS TABLE AND INFLUENCERS FROM INFLUENCERS TABLE.
'use client';

import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SkeletonLoader from '@/app/components/skeletonLoader';
import Footer from "../../components/footer";


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

  // Handle tab change 
  /*
  const handleTabChange = (tab: "brands" | "influencers") => {
    setActiveTab(tab);
    setSearchQuery("");
    setPage(1);
    fetchData(); // Fetch data for the selected tab
  };
*/
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

  // Handle searching of users/influencers
  /*const filteredData = activeTab === "brands"
    ? users.filter(user =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : influencers.filter(influencer =>
        influencer.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        influencer.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        influencer.email.toLowerCase().includes(searchQuery.toLowerCase())
      );*/

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

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full text-gray-700 bg-white p-4 sm:p-6">
    {/* Header */}
    <header className="flex sm:flex-row justify-between items-center bg-gold text-black p-4 mb-4 rounded-lg">
      
      {/* Logo */}
      <div className="flex-shrink-0">
        <Image
          src="/social-gems-fn-200.png"
          width={100}
          height={100}
          alt="Social Gems"
          className="object-contain"
        />
      </div>

      {/* mobile view menu*/}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu Button (Mobile Only) */}
        <button 
          className="sm:hidden p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F6931B]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="h-6 w-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="sm:hidden absolute right-4 top-16 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
            {/* Table Selection */}
            <div className="px-4 py-2">
              <label htmlFor="mobile-table-select" className="block text-sm font-medium text-gray-700 mb-1">
                Select Table:
              </label>
              <select
                id="mobile-table-select"
                value={activeTab}
                onChange={(e) => {
                  setActiveTab(e.target.value as "brands" | "influencers");
                  setPage(1);
                  setSearchQuery("");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold text-sm"
              >
                <option value="brands">Brands</option>
                <option value="influencers">Influencers</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="px-4 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 pl-3 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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

            {/* Profile Dropdown Items */}
            <button
              onClick={() => {
                setIsChangePasswordOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-600"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-600"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
      {/* Right side controls for desktop view */}
      <div className="hidden sm:flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
        {/* Table Selection */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="table-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Select Table:
          </label>
          <select
            id="table-select"
            value={activeTab}
            onChange={(e) => {
              setActiveTab(e.target.value as "brands" | "influencers");
              setPage(1);
              setSearchQuery("");
            }}
            className="block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold text-sm"
          >
            <option value="brands">Brands</option>
            <option value="influencers">Influencers</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-3 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F6931B]"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              <button
                onClick={() => {
                  setIsChangePasswordOpen(true);
                  setIsProfileOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-600"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-600"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Change Password Modal */}
          {isChangePasswordOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                
                {error && (
                  <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                    {success}
                  </div>
                )}

                <form onSubmit={handleChangePassword}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="w-full px-3 py-2 border rounded-md"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="w-full px-3 py-2 border rounded-md"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsChangePasswordOpen(false)}
                      className="mr-2 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#F6931B] text-white rounded-md hover:bg-[#E07F0C]"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/*<h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">Admin Dashboard</h1>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded text-black w-full sm:w-48"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 text-sm sm:text-base"
        >
          Logout
        </button>
      </div>*/}
    </header>

    {/* Success Message */}
    {deleteSuccessMessage && (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-sm">
        <span className="block sm:inline">{deleteSuccessMessage}</span>
      </div>
    )}
    {/*Update Success Message*/}
    {updateSuccessMessage && (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-sm">
        <span className="block sm:inline">{updateSuccessMessage}</span>
      </div>
    )}

    {/* Tabs 
    <div className="flex mb-4">
      <button
        className={`px-4 py-2 text-sm sm:text-base ${
          activeTab === "brands" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => handleTabChange("brands")}
      >
        Brands
      </button>
      <button
        className={`px-4 py-2 text-sm sm:text-base ${
          activeTab === "influencers" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => handleTabChange("influencers")}
      >
        Influencers
      </button>
    </div>*/}
    <div className="felx justify-between mb-4">
      <button 
        className="bg-gold text-black px-4 py-2 rounded "
        onClick={handleDownload}
        >
          Download {activeTab === "brands" ? "Brands List ": "Influencers List"}
        </button>
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

    {/* Admin Data */}
    {adminData && (
      <div className="mb-4 text-sm sm:text-base">
        <p>Welcome back, {adminData.role}!</p>
      </div>
    )}

    {/* Loading State */}
    {loading ? (
      <div>
        Loading...
        <SkeletonLoader /> {/* Used skeleton to keep layout while fetching data and searches */}
      </div>
    ) : (
      <div className="border border-gray-300 rounded-lg overflow-auto mb-8">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base">First Name</th>
              <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base">Last Name</th>
              <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base">Email</th>
              <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base">Contact</th>
              <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base">Date Submitted</th>
              <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base">
                {activeTab === "brands" ? "Expertise" : "Influence"}
              </th>
              <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((record) => (
              <tr key={record.id} className="border-t">
                <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">{record.first_name}</td>
                <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">{record.last_name}</td>
                <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">{record.email}</td>
                <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">{record.contact || "N/A"}</td>
                <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">{new Date (record.created_at).toISOString().split('T')[0]}</td>
                <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">
                  {activeTab === "brands" ? record.expertise : record.influence}
                </td>
                <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">{renderActions(record)}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-sm sm:text-base"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page * limit >= total}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-sm sm:text-base"
            >
              Next
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

    <Footer />
  </div>
  );
};

export default Dashboard;