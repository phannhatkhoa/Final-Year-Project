import React from 'react'
import HomeHeader from '../components/HomeHeader/HomeHeader'
import HomeFooter from '../components/HomeFooter/HomeFooter'

export const HomeTemplate = ({ children }) => {
  return (
    <>
    <HomeHeader />
    {children}
    <HomeFooter />
  </>
  )
}
