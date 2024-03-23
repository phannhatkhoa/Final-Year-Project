import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RegisterAPI } from '../../../api/auth.api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { mutate } = useMutation(
    (body) => RegisterAPI(body),
    {
      onSuccess: (data) => {
        console.log('DataRes:', data);
        navigate('/signin');
      },
      onError: (error) => {
        toast.error('Failed to register user. Please try again.');
      },
    }
  );

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-12 bg-white rounded-md shadow-md">
      <div className="hidden lg:block">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230704/pngtree-office-essentials-technology-and-gadgets-illustration-featuring-laptop-printer-camera-tablet-image_3748458.jpg"
          alt="Left Column Image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="lg:col-span-1 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Create Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="relative group">
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-2 p-4 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            {errors.email && <span className="text-red-500 mt-1">{errors.email.message}</span>}
          </div>

          <div className="mb-6">
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              {...register('full_name', { required: 'Full Name is required' })}
              className="mt-2 p-4 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            {errors.full_name && <span className="text-red-500 mt-1">{errors.full_name.message}</span>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-2 p-4 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            {errors.password && <span className="text-red-500 mt-1">{errors.password.message}</span>}
          </div>

          <div className="mb-6">
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              {...register('confirm_password', { required: 'Confirm Password is required' })}
              className="mt-2 p-4 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            {errors.confirm_password && <span className="text-red-500 mt-1">{errors.confirm_password.message}</span>}
          </div>

          <div className="mb-6">
            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              id="date_of_birth"
              {...register('date_of_birth', { required: 'Date of Birth is required' })}
              className="mt-2 p-4 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            {errors.date_of_birth && <span className="text-red-500 mt-1">{errors.date_of_birth.message}</span>}
          </div>

          <div className="mb-6">
            <label htmlFor="location" className="block text-sm font-medium text-gray-600">
              Location
            </label>
            <input
              type="text"
              id="location"
              {...register('location', { required: 'Location is required' })}
              className="mt-2 p-4 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            {errors.location && <span className="text-red-500 mt-1">{errors.location.message}</span>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none transform transition duration-300 ease-in-out hover:scale-105"
          >
            Register
          </button>
          <p className="mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
