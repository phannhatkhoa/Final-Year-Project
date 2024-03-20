import React, { useState } from 'react';
import { FaMoneyBillAlt, FaCreditCard, FaPaypal } from 'react-icons/fa';

const PaymentPage = ({ totalAmount }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    paymentMethod: 'cash', // Default payment method
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the payment process using the formData and totalAmount
    console.log('Payment processing:', formData);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">Payment Information</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        {/* Form fields for user information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500" required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
        {/* Payment method selection */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method:</label>
          <div className="flex items-center space-x-4">
            {/* Cash */}
            <label htmlFor="cash" className="flex items-center cursor-pointer">
              <input type="radio" id="cash" name="paymentMethod" value="cash" checked={formData.paymentMethod === 'cash'} onChange={handleChange} className="form-radio h-4 w-4 text-blue-600" />
              <span className="ml-2 text-sm text-gray-700 flex items-center">
                <FaMoneyBillAlt className="mr-1" />
                Cash
              </span>
            </label>
            {/* Visa Card */}
            <label htmlFor="visa" className="flex items-center cursor-pointer">
              <input type="radio" id="visa" name="paymentMethod" value="visa" checked={formData.paymentMethod === 'visa'} onChange={handleChange} className="form-radio h-4 w-4 text-blue-600" />
              <span className="ml-2 text-sm text-gray-700 flex items-center">
                <FaCreditCard className="mr-1" />
                Visa Card
              </span>
            </label>
            {/* PayPal */}
            <label htmlFor="paypal" className="flex items-center cursor-pointer">
              <input type="radio" id="paypal" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleChange} className="form-radio h-4 w-4 text-blue-600" />
              <span className="ml-2 text-sm text-gray-700 flex items-center">
                <FaPaypal className="mr-1" />
                PayPal
              </span>
            </label>
          </div>
        </div>
        {/* Total amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Amount:</label>
          <span className="mt-1 block p-3 border border-gray-300 rounded-md">{totalAmount}</span>
        </div>
        {/* Submit button */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md w-full">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
