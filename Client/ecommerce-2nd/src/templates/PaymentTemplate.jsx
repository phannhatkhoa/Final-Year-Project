import React from 'react'
import PaymentHeader from '../Pages/Payment/components/PaymentHeader'
import PaymentFooter from '../Pages/Payment/components/PaymentFooter'

export const PaymentTemplate = ({ children }) => {
    return (
        <>
            <PaymentHeader />
            {children}
            <PaymentFooter />
        </>
    )
}
