// CartButton.js
import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'

const CartButton = () => {
  const { cart } = useCart(); // Lấy giỏ hàng từ context
  const navigate = useNavigate();

  const handleCartClick = () => {
    // Kiểm tra nếu giỏ hàng trống
    if (cart.length === 0) {
      return; // Dừng lại, không thực hiện điều hướng
    }

    // Kiểm tra xem người dùng đã đăng nhập chưa
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn !== 'true') {
      // Nếu chưa đăng nhập, chuyển hướng người dùng đến trang đăng nhập
      navigate('/login');
    } else {
      // Nếu đã đăng nhập, chuyển hướng người dùng đến trang giỏ hàng
      navigate('/CheckoutForm');
    }
  };

  return (
    <button className="cart-button" onClick={handleCartClick}>
      <img src="/cart.png" alt="Cart Icon" />
      {cart.length > 0 && (
        <span className="cart-count">{cart.length}</span>
      )}
    </button>
  );
};

export default CartButton;
