import React, { createContext, useState } from 'react';

export const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (itemId) => {
        const updatedCart = cart.filter((item) => item.id !== itemId);
        setCart(updatedCart);
    };
    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                setCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
