import React from "react";
import ProductDetailHeader from "../Pages/ProductDetail/components/ProductDetailHeader";
import ProductDetailFooter from "../Pages/ProductDetail/components/ProductDetailFooter";


export const ProductDetailTemplate = ({ children }) => {
    return (
        <>
            <ProductDetailHeader/>
            {children}
            <ProductDetailFooter />
        </>
    )
}