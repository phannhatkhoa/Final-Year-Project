import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { LoginAPI } from '../../../api/auth.api';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useContext } from 'react';
import { saveUserProfileFromLS } from '../../../utils/localStorage';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);


  const onSubmit = (data) => {
    mutateAsync(data);
  };


  // Create the useMutation hook
  const { mutateAsync } = useMutation(
    (body) => {return LoginAPI(body)},
    {
      onSuccess: (data) => {
        console.log('Data:', data);
        setIsAuthenticated(true);
        navigate('/');
      },
      onError: (error) => {
        console.log('Error occurred:', error);
      },
    }
  );
  




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
      <div className="lg:col-span-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login to Your Account</h2>
        <form className="relative group" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
              className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${errors.email ? 'border-red-500' : ''
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register('password', { required: 'Password is required' })}
              className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${errors.password ? 'border-red-500' : ''
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none relative group mt-4"
            >
              Login
            </button>
            <p className="mt-4">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-500 underline">
                Register here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
