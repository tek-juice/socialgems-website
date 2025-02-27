//this is the page an admin comes to after successful loggin in.
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from "../../components/footer";

const Dashboard = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("")

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
          fetchUsers(); // Fetch users after successful authentication
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

  // Function to fetch users
  const fetchUsers = () => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsers(data.users);
        } else {
          setError('Failed to fetch users.');
        }
      })
      .catch(() => setError('An error occurred while fetching users.'))
      .finally(() => setLoading(false));
  };

  //Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/login'); //redirects to login page after log out
  };

  //Handle searching of users on the table when they become too many to fit on one page
  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //Function to delete a user
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
        const res = await fetch("/api/admin/users", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        const data = await res.json();
        if (data.success) {
            setUsers(users.filter((user) => user.id !== id)); //remove user from state
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert("Failed to delete user");
    }
};

// Open View Modal
const openViewModal = (user: any) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (user: any) => {
    setEditedUser({ ...user });
    setIsEditModalOpen(true);
  };

  // Handle Edit Form Change
  const handleEditChange = (e: any) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  // Update User
  const handleUpdate = async () => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedUser),
      });

      const data = await res.json();
      if (data.success) {
        setUsers(users.map((user) => (user.id === editedUser.id ? editedUser : user)));
        setIsEditModalOpen(false);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Failed to update user");
    }
  };


  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full text-gray-700 bg-white p-6">
        <header className="flex justify-between items-center bg-gray-800 text-white p-4 mb-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <input 
                type="text" 
                placeholder="Search users..." 
                className="p-2 rounded text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
            onClick={handleLogout} 
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >Logout</button>
        </header>


      {adminData && (
        <div className="mb-4">
          <p>Welcome back, {adminData.email}!</p>
        </div>
      )}

      {loading ? (
        <p>Loading users...</p>
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
                <th className="py-2 px-4 text-left">Expertise</th>
                <th className="py-2 px-4 text-left">Message</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="py-2 px-4">{user.first_name}</td>
                  <td className="py-2 px-4">{user.last_name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.company_name}</td>
                  <td className="py-2 px-4">{user.contact || "N/A"}</td>
                  <td className="py-2 px-4">{Array.isArray(user.social_media) ? user.social_media.join(", ") : "N/A"}</td>
                  <td className="py-2 px-4">{user.expertise ? `{${user.expertise}}` : "N/A"}</td>
                  <td className="py-2 px-4 truncate max-w-xs" title={user.message}>{user.message || "N/A"}</td>
                  <td className="py-2 px-4">
                    <button className="text-blue-500 mr-2" onClick={() => openViewModal(user)}>View</button>
                    <button className="text-green-500 mr-2" onClick={() => openEditModal(user)}>Edit</button>
                    <button className="text-red-500" onClick={() => handleDelete(user.id)}>Delete</button>
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
            <h2 className="text-xl font-bold">User Details</h2>
            <p><strong>First Name:</strong> {selectedUser.first_name}</p>
            <p><strong>Last Name:</strong> {selectedUser.last_name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Company:</strong> {selectedUser.company_name}</p>
            <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsViewModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Edit User</h2>
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
