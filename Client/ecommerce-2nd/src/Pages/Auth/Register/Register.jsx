import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RegisterAPI } from '../../../api/auth.api';
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Create the useMutation hook
  const { mutate } = useMutation(
    // Pass the mutation function directly
    (body) => RegisterAPI(body),
    {
      onSuccess: (data) => {
        navigate('/login');
      },
      onError: (error) => {
        toast.error('lzzlzlz')
      },
    }
  );

  const onSubmit = (data) => {
    mutate(data); // This triggers the mutation and runs onSuccess/onError callbacks
  };

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-12 bg-white rounded-md shadow-md">
      {/* Left Column - Images */}
      <div className="hidden lg:block">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230704/pngtree-office-essentials-technology-and-gadgets-illustration-featuring-laptop-printer-camera-tablet-image_3748458.jpg"
          alt="Left Column Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Column - Registration Form */}
      <div className="lg:col-span-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="relative group">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="user_name" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="user_name"
              {...register('user_name', { required: 'Username is required' })}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            {errors.user_name && <span className="text-red-500">{errors.user_name.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              {...register('confirm_password', { required: 'Confirm Password is required' })}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            {errors.confirm_password && <span className="text-red-500">{errors.confirm_password.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none relative group"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
