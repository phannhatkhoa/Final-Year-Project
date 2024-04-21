import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProfileAPI, UpdateProfileAPI } from '../../../api/auth.api';
import { getUserProfileFromLS, saveUserProfileFromLS } from '../../../utils/localStorage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../utils/config';
import { toast } from 'react-hot-toast';

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
    location: '',
    profile_image: ''
  });

  const userData = data && data.data.body;

  const handleEditClick = () => {
    setFormData({
      email: userData.email,
      full_name: userData.full_name,
      date_of_birth: userData.date_of_birth,
      location: userData.location,
      profile_image: userData.profile_image
    });
    setEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setUpdating(true);
      await UpdateProfileAPI(userProfile.id, formData);
      toast.success('Profile updated successfully');
      await refetch();
      setEditing(false);
      saveUserProfileFromLS({
        ...userProfile,
        ...formData
      });
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
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

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading image:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        setFormData((prevData) => ({
          ...prevData,
          profile_image: downloadURL
        }));
      }
    );
  };

  return (
    <div className="mt-8"> {/* Add margin-top to create spacing */}
      <h1 className="text-2xl font-semibold mb-4 text-center">User Profile</h1>
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        {editing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col items-center">
              <label htmlFor="profile_image" className="block text-gray-700 font-semibold mb-2">Profile Image</label>
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                {selectedImage ? (
                  <img src={URL.createObjectURL(selectedImage)} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <img src={userData && userData.profile_image} alt="Profile" className="w-full h-full object-cover" />
                )}
                <input type="file" accept="image/*" onChange={onImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              {uploadProgress > 0 && <p className="mt-2">Upload Progress: {uploadProgress}%</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="text-gray-800 bg-gray-100 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="full_name" className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} className="text-gray-800 bg-gray-100 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="date_of_birth" className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
              <input type="date" id="date_of_birth" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="text-gray-800 bg-gray-100 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">Location</label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="text-gray-800 bg-gray-100 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500" />
            </div>
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md cursor-pointer hover:bg-blue-600 transition duration-300">
                {updating ? 'Updating...' : 'Update Profile'}
              </button>
              <button type="button" onClick={() => setEditing(false)} className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md cursor-pointer hover:bg-gray-400 transition duration-300">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-6 flex justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img src={userData && userData.profile_image} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <p className="text-gray-800">{userData && userData.email}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <p className="text-gray-800">{userData && userData.full_name}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
                <p className="text-gray-800">{userData && userData.date_of_birth}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Location</label>
                <p className="text-gray-800">{userData && userData.location}</p>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button onClick={handleEditClick} className="bg-blue-500 text-white py-2 px-6 rounded-md cursor-pointer hover:bg-blue-600 transition duration-300">
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
