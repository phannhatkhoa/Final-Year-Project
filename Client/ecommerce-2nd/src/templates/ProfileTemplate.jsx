import React from 'react'
import ProfileFooter from '../Pages/Auth/Profile/components/ProfileFooter'
import ProfileHeader from '../Pages/Auth/Profile/components/ProfileHeader'

export const ProfileTemplate = ({ children }) => {
  return (
    <>
    <ProfileHeader />
    {children}
    <ProfileFooter />
  </>
  )
}
