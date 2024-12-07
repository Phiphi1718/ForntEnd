// CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
    // Hàm xóa sản phẩm khỏi giỏ
    const removeFromCart = (index) => {
      setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };
    // Reset giỏ hàng về 0
    const clearCart = () => {
      setCart([]); // Xóa tất cả sản phẩm trong giỏ hàng
    };


    const updateQuantity = (index, newQuantity) => {
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        updatedCart[index].quantity = newQuantity;
        return updatedCart;
      });
    };
    


  return (
    <CartContext.Provider value={{ cart, addToCart,removeFromCart ,clearCart,updateQuantity  }}>
      {children}
    </CartContext.Provider>
  );
};
