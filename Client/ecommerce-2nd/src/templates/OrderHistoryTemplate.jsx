import React from 'react'
import CartHeader from '../Pages/Cart/components/CartHeader'
import CartFooter from '../Pages/Cart/components/CartFooter'

export const OrderHistoryTemplate = ({ children }) => {
    return (
        <>
            <CartHeader />
            {children}
            <CartFooter />
        </>
    )
}
