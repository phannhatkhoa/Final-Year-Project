import React from 'react';
import AuthHeader from '../components/AuthHeader/AuthHeader';
import AuthFooter from '../components/AuthFooter/AuthFooter';

export default function RegisterTemplate({ children }) {
  return (
    <>
      <AuthHeader />
      {children}
      <AuthFooter />
    </>
  );
}
