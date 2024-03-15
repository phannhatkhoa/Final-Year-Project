import React from 'react';
import AuthHeader from '../components/AuthHeader/AuthHeader';
import AuthFooter from '../components/AuthFooter/AuthFooter';

export const RegisterTemplate = ({ children }) => {
  return (
    <>
      <AuthHeader />
      {children}
      <AuthFooter />
    </>
  );
}
