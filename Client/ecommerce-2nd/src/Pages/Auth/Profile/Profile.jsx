import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProfileAPI, UpdateProfileAPI } from '../../../api/auth.api';
import { getUserProfileFromLS } from '../../../utils/localStorage';

const ProfilePage = () => {
  const userProfile = getUserProfileFromLS();
  const { data, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => ProfileAPI(userProfile.id)
  });

  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    date_of_birth: '',
    location: ''
  });

  const userData = data && data.data.body;

  const handleEditClick = () => {
    setFormData({
      email: userData.email,
      full_name: userData.full_name,
      date_of_birth: userData.date_of_birth,
      location: userData.location
    });
    setEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setUpdating(true);
      await UpdateProfileAPI(userProfile.id, formData);
      await refetch();
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4 ">User Profile</h1>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="text-gray-800 bg-gray-100 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="full_name" className="block text-gray-700 font-semibold mb-2">Full Name:</label>
            <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} className="text-gray-800 bg-gray-100 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="date_of_birth" className="block text-gray-700 font-semibold mb-2">Date of Birth:</label>
            <input type="date" id="date_of_birth" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="text-gray-800 bg-gray-100 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">Location:</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="text-gray-800 bg-gray-100 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer">
              {updating ? 'Updating...' : 'Update Profile'}
            </button>
            <button type="button" onClick={() => setEditing(false)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email:</label>
            <p className="text-gray-800">{userData && userData.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Full Name:</label>
            <p className="text-gray-800">{userData && userData.full_name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Date of Birth:</label>
            <p className="text-gray-800">{userData && userData.date_of_birth}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Location:</label>
            <p className="text-gray-800">{userData && userData.location}</p>
          </div>
          <div className="flex justify-center mb-4">
            <button onClick={handleEditClick} className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer">
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
