import React, { useState } from 'react';
import { useCart } from '../CartContext'; // Giỏ hàng
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Import icon thùng rác
import './CheckoutForm.css';

const CheckoutForm = () => {
  const { cart, clearCart, removeFromCart, updateQuantity } = useCart(); // Lấy hàm clearCart, removeFromCart và updateQuantity từ context
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderCode, setOrderCode] = useState('');
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false); // State lưu trữ trạng thái checkbox

  const handleToppingDetails = (selectedToppings) => {
    if (!selectedToppings || selectedToppings.length === 0) return 'Không có topping';
    const toppingCount = selectedToppings.reduce((acc, topping) => {
      acc[topping.name] = (acc[topping.name] || 0) + (topping.quantity || 1);
      return acc;
    }, {});
    return Object.entries(toppingCount)
      .map(([name, count]) => `${name} (x${count})`)
      .join(', ');
  };

  const calculateTotalPrice = () => {
    return (cart || []).reduce((total, item) => {
      const toppingPrice = (item.selectedToppings || []).reduce(
        (sum, topping) => sum + (topping.price || 0),
        0
      );
      const sizePrice = item.size === 'L' ? 5000 : item.size === 'XL' ? 10000 : 0;
      return total + (item.quantity * (item.price + toppingPrice + sizePrice));
    }, 0);
  };

  const handlePayment = async () => {
    const generatedOrderCode = `ORDER-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    setOrderCode(generatedOrderCode);

    try {
      // Lưu giỏ hàng vào localStorage
      localStorage.setItem('order', JSON.stringify(cart));

      await saveOrder(generatedOrderCode);
      setIsOrderConfirmed(true); // Hiển thị mã đơn hàng và đếm ngược sau khi gửi thành công
    } catch (error) {
      console.error('Lỗi khi thêm đơn hàng:', error);
    }
  };

  const saveOrder = async (orderCode) => {
    if (!cart || cart.length === 0) {
      console.error('Giỏ hàng rỗng. Không thể lưu đơn hàng!');
      return;
    }

    const orderDetails = cart.map((item) => {
      const formattedToppings = handleToppingDetails(item.selectedToppings);
      return {
        tenProduct: item.name,
        giaProduct: item.price,
        soLuongProduct: item.quantity,
        sizeProduct: item.size,
        topping: formattedToppings, // Ghi rõ "Không có topping" nếu rỗng
      };
    });

    const orderPayload = {
      maDonHang: orderCode,
      phuongThucThanhToan: paymentMethod,
      tongTien: calculateTotalPrice(),
      donHangChiTiets: orderDetails,
    };

    try {
      const response = await fetch('https://localhost:7095/api/DonHang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        console.log('Đơn hàng đã được lưu thành công!');
        clearCart();
        navigate('/review'); // Chuyển hướng tới ReviewForm sau khi thanh toán thành công
      } else {
        const errorResponse = await response.json();
        console.error('Lỗi khi lưu đơn hàng:', errorResponse);
      }
    } catch (error) {
      console.error('Lỗi kết nối tới API:', error);
    }
  };

  const handleRemoveItem = (index) => {
    removeFromCart(index); // Xóa sản phẩm khỏi giỏ hàng bằng cách truyền vào chỉ mục của item
  };

  const handleIncreaseQuantity = (index) => {
    updateQuantity(index, cart[index].quantity + 1); // Tăng số lượng sản phẩm
  };

  const handleCheckboxChange = () => {
    setIsTermsAccepted(!isTermsAccepted); // Lật trạng thái của checkbox
  };

  const handleDecreaseQuantity = (index) => {
    if (cart[index].quantity > 1) {
      updateQuantity(index, cart[index].quantity - 1); // Giảm số lượng sản phẩm (không nhỏ hơn 1)
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-form__empty-cart">
        <img
          src="/NoProduct.png" // Đường dẫn đến hình ảnh khi giỏ hàng trống
          alt="Empty Cart"
          className="checkout-form__empty-cart-image"
        />
        <p className="checkout-form__empty-cart-message">Không có đơn hàng nào...</p>
      </div>
    );
  }

  return (
    <div className="checkout-form">
      <h2 className="checkout-form__title">Thông tin đơn hàng</h2>

      <ul className="checkout-form__cart-items">
        {cart.map((item, index) => (
          <li key={index} className="checkout-form__cart-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p><strong>{item.name}</strong> - {item.quantity} x {item.price} VND</p>
              <FaTrash 
                onClick={() => handleRemoveItem(index)} 
                style={{ cursor: 'pointer', color: 'red' }} 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p><strong>Kích thước:</strong> {item.size || 'Không có'}</p>
              <div className="quantity-controler">
                <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(index)}>+</button>
              </div>
            </div>
            <p><strong>Topping:</strong> {handleToppingDetails(item.selectedToppings)}</p>
          </li>
        ))}
      </ul>

      <div className="checkout-form__payment-summary1">
        <div className="TieuDe">Thông Tin Thanh Toán</div>
      </div>

      <div className="checkout-form__payment-summary">
        <div className="total-price1">Tổng tiền (Đã có VAT):</div>
        <div>{calculateTotalPrice()} VND</div>
      </div>

      <div className="checkout-form__payment-summary">
        <div className="shipping-fee">Phí vận chuyển:</div>
        <div>0Đ</div>
      </div>

      <h3 className="checkout-form__payment-method-title">Chọn phương thức thanh toán</h3>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="checkout-form__payment-method-select"
      >
        <option value="">Chọn phương thức thanh toán</option>
        <option value="credit">Thanh toán ngân hàng </option>
        <option value="Momo">Thanh toán bằng Momo</option>
        <option value="cash">Thanh toán khi nhận hàng</option>
      </select>

      <div className="checkout-form__terms">
        <input 
          type="checkbox" 
          id="terms" 
          checked={isTermsAccepted} 
          onChange={handleCheckboxChange} 
        />
        <label htmlFor="terms"> Tôi đã đọc, hiểu và đồng ý với tất cả các điều khoản, điều kiện và chính sách liên quan</label>
      </div>

      <button 
        onClick={handlePayment} 
        disabled={!paymentMethod || !isTermsAccepted}
        className="checkout-form__submit-button"
      >
        Thanh toán
      </button>
    </div>
  );
};

export default CheckoutForm;
