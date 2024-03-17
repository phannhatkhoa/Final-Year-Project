import React, { useState, useEffect } from 'react';
import { ProfileAPI } from '../../../api/auth.api';
import { useQuery } from '@tanstack/react-query';

const ProfilePage = () => {
    const {
        data
    } = useQuery({
        queryKey: ['profile'],
        queryFn: () => {return ProfileAPI()}
    });

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <p className="text-gray-800"></p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
        <p className="text-gray-800"></p> 
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Full Name:</label>
        <p className="text-gray-800"></p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Date of Birth:</label>
        <p className="text-gray-800"></p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Location:</label>
        <p className="text-gray-800"></p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Gender:</label>
        <p className="text-gray-800"></p>
      </div>
    </div>
  );
};

export default ProfilePage;
