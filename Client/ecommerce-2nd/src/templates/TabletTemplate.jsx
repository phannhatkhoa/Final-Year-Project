import React from 'react'
import HomeHeader from '../components/HomeHeader/HomeHeader'
import HomeFooter from '../components/HomeFooter/HomeFooter'

export const TabletTemplate = ({ children }) => {
    return (
        <>
            <HomeHeader />
            {children}
            <HomeFooter />
        </>
    )
}
