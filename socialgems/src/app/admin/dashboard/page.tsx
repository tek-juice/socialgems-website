//DASHBOARD THAT DISPLAYS USERS FROM BRAND/USERS TABLE AND INFLUENCERS FROM INFLUENCERS TABLE.
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

  // Modal State
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
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
        if (data.success) {
          setAdminData(data.admin);
          fetchData(); // Fetch data after successful authentication
        } else {
          setError('Invalid or expired token.');
          router.push('/login');
        }
      })
      .catch(() => {
        setError('An error occurred.');
        router.push('/login');
      });
  }, [router]);

  // Function to fetch data based on active tab
  const fetchData = () => {
    setLoading(true);
    const endpoint = activeTab === "brands" ? "/api/admin/users" : "/api/admin/influencers";
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
        } else {
          setError('Failed to fetch data.');
        }
      })
      .catch(() => setError('An error occurred while fetching data.'))
      .finally(() => setLoading(false));
  };

  // Handle tab change
  const handleTabChange = (tab: "brands" | "influencers") => {
    setActiveTab(tab);
    fetchData(); // Fetch data for the selected tab
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/login'); // Redirects to login page after log out
  };

  // Handle searching of users/influencers
  const filteredData = activeTab === "brands"
    ? users.filter(user =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : influencers.filter(influencer =>
        influencer.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        influencer.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        influencer.email.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Function to delete a user/influencer
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const endpoint = activeTab === "brands" ? "/api/admin/users" : "/api/admin/influencers";
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        if (activeTab === "brands") {
          setUsers(users.filter((user) => user.id !== id)); // Remove user from state
        } else {
          setInfluencers(influencers.filter((influencer) => influencer.id !== id)); // Remove influencer from state
        }
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
        if (activeTab === "brands") {
          setUsers(users.map((user) => (user.id === editedUser.id ? editedUser : user)));
        } else {
          setInfluencers(influencers.map((influencer) => (influencer.id === editedUser.id ? editedUser : influencer)));
        }
        setIsEditModalOpen(false);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Failed to update record");
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full text-gray-700 bg-white p-6">
      <header className="flex justify-between items-center bg-gray-800 text-white p-4 mb-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <input 
          type="text" 
          placeholder="Search..." 
          className="p-2 rounded text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          onClick={handleLogout} 
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
        >Logout</button>
      </header>

      {/* Tabs */}
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 ${activeTab === "brands" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleTabChange("brands")}
        >
          Brands
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "influencers" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleTabChange("influencers")}
        >
          Influencers
        </button>
      </div>

      {adminData && (
        <div className="mb-4">
          <p>Welcome back, {adminData.email}!</p>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-8">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">First Name</th>
                <th className="py-2 px-4 text-left">Last Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Company</th>
                <th className="py-2 px-4 text-left">Contact</th>
                <th className="py-2 px-4 text-left">Social Media</th>
                <th className="py-2 px-4 text-left">{activeTab === "brands" ? "Expertise" : "Influence"}</th>
                <th className="py-2 px-4 text-left">Message</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record) => (
                <tr key={record.id} className="border-t">
                  <td className="py-2 px-4">{record.first_name}</td>
                  <td className="py-2 px-4">{record.last_name}</td>
                  <td className="py-2 px-4">{record.email}</td>
                  <td className="py-2 px-4">{record.company_name || "N/A"}</td>
                  <td className="py-2 px-4">{record.contact || "N/A"}</td>
                  <td className="py-2 px-4">
                    {record.social_media && typeof record.social_media === "object"
                      ? Object.values(record.social_media).join(", ") // Display social media platforms as a comma-separated string
                      : "N/A"}
                  </td>
                  <td className="py-2 px-4">{activeTab === "brands" ? record.expertise : record.influence}</td>
                  <td className="py-2 px-4 truncate max-w-xs" title={record.message}>{record.message || "N/A"}</td>
                  <td className="py-2 px-4">
                    <button className="text-blue-500 mr-2" onClick={() => openViewModal(record)}>View</button>
                    <button className="text-green-500 mr-2" onClick={() => openEditModal(record)}>Edit</button>
                    <button className="text-red-500" onClick={() => handleDelete(record.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Details</h2>
            <p><strong>First Name:</strong> {selectedUser.first_name}</p>
            <p><strong>Last Name:</strong> {selectedUser.last_name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Company:</strong> {selectedUser.company_name || "N/A"}</p>
            <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsViewModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Edit {activeTab === "brands" ? "Brand" : "Influencer"}</h2>
            <label className="w-full p-2 text-black">First Name<input name="first_name" value={editedUser.first_name} onChange={handleEditChange} className="block border p-2 my-2 w-full" /></label>
            <label className="w-full p-2 text-black">Last Name<input name="last_name" value={editedUser.last_name} onChange={handleEditChange} className="block border p-2 my-2 w-full" /></label>
            <label className="w-full p-2 text-black">Email<input name="email" value={editedUser.email} onChange={handleEditChange} className="block border p-2 my-2 w-full" /></label>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>Save</button>
            <button className="ml-2 bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;