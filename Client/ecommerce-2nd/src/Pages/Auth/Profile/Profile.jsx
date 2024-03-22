import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ProfileAPI, UpdateProfileAPI } from '../../../api/auth.api';
import { getUserProfileFromLS } from '../../../utils/localStorage';

const ProfilePage = () => {
  const userProfile = getUserProfileFromLS();
  const { data } = useQuery({
    queryKey: 'profile',
    queryFn: () => {
      return ProfileAPI(userProfile.id)

    }
  });

  const userData = data && data.data.body;

  return (
    <div class="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 class="text-2xl font-semibold mb-4 ">User Profile</h1>
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2">Email:</label>
        <p class="text-gray-800">{userData && userData.email}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2">Full Name:</label>
        <p class="text-gray-800">{userData && userData.full_name}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2">Date of Birth:</label>
        <p class="text-gray-800">{userData && userData.date_of_birth}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2">Location:</label>
        <p class="text-gray-800">{userData && userData.location}</p>
      </div>
    </div>

  );
};

export default ProfilePage;
