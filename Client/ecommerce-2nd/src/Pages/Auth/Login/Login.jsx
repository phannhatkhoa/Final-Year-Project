import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../../contexts/AuthProvider';
import { LoginAPI } from '../../../api/auth.api';
import { saveUserProfileFromLS } from '../../../utils/localStorage';

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const mutation = useMutation(
    (body) => LoginAPI(body),
    {
      onSuccess: (data) => {
        console.log('DataRes:', data);
        setIsAuthenticated(true);
        navigate('/home');
        saveUserProfileFromLS(data.data.user);
        console.log('User:', data.data.user);
      },
      onError: (error) => {
        console.log('Error occurred:', error);
        setError('email', { type: 'manual', message: 'Invalid email or password' });
      },
    }
  );

  const onSubmit = (data) => {
    mutation.mutate(data);
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
            className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${errors.email ? 'border-red-500' : ''}`}
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
            className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
          <div className="flex items-center justify-between mt-4">
            <div>
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                {...register('rememberMe')}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            disabled={mutation.isLoading} 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none relative group mt-4"
          >
            {mutation.isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p className="mt-4">
            Don't have an account?{' '}
            <Link to="/user/signup" className="text-blue-500 underline">Register here</Link>
          </p>
        </div>
      </form>
    </div>
  </div>
  );
}
