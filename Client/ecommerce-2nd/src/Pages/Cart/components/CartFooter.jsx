import React from 'react';

const CartFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 absolute bottom-0 w-full">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Cart App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default CartFooter;
