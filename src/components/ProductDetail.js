import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ProductDetail.css';
import CartButton from './CartButton';  // Import CartButton
import FloatingButton from './FloatingButton';  // Import FloatingButton

const ProductDetail = ({ onClose }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();  // Khai báo useNavigate
  const [product, setProduct] = useState(null);
  const [toppings, setToppings] = useState([]); // Chỉ hiển thị topping cho món nước
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const sizePrices = {
    M: 0,
    L: 5000,
    XL: 10000,
  };

  // Fetch dữ liệu topping từ API và lấy sản phẩm từ localStorage
  useEffect(() => {
    fetch('https://localhost:7095/api/Toping/Getall')
      .then((response) => response.json())
      .then((data) => {
        if (data?.$values) {
          const formattedToppings = data.$values.map((topping) => ({
            ...topping,
            id: topping.$id,
          }));
          setToppings(formattedToppings);
        }
      })
      .catch((error) => console.error('Error fetching toppings:', error));

    const savedProduct = localStorage.getItem('selectedProduct');
    if (savedProduct) {
      try {
        const parsedProduct = JSON.parse(savedProduct);
        if (parsedProduct && parsedProduct.price) {
          setProduct(parsedProduct);
        } else {
          console.error('Dữ liệu sản phẩm không hợp lệ');
        }
      } catch (error) {
        console.error('Lỗi khi phân tích dữ liệu từ localStorage:', error);
      }
    } else {
      console.log('Không có sản phẩm trong localStorage');
    }
  }, []);

  // Tính tổng tiền khi có sự thay đổi về size, topping, hoặc quantity
  useEffect(() => {
    if (!product) return;  // Kiểm tra nếu product chưa được lấy

    const basePrice = product.price;
    const sizePrice = sizePrices[selectedSize];
    const toppingsPrice = selectedToppings.reduce(
      (sum, topping) => sum + topping.price * topping.quantity,
      0
    );
    const total = (basePrice + sizePrice + toppingsPrice) * quantity;
    setTotalPrice(total);
  }, [product, selectedSize, selectedToppings, quantity]);

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleToppingQuantityChange = (topping, type) => {
    setSelectedToppings((prev) => {
      return prev.map((t) => {
        if (t.id === topping.id) {
          const updatedQuantity =
            type === 'increment' ? t.quantity + 1 : t.quantity - 1;
          return { ...t, quantity: Math.max(updatedQuantity, 1) };
        }
        return t;
      });
    });
  };

  const handleToppingSelection = (topping) => {
    setSelectedToppings((prev) => {
      const isSelected = prev.some((t) => t.id === topping.id);
      if (isSelected) {
        return prev.filter((t) => t.id !== topping.id);
      } else {
        return [...prev, { ...topping, quantity: 1 }];
      }
    });
  };

  const handleAddToCart = () => {
    if (!product) return;  // Kiểm tra nếu sản phẩm không tồn tại

    const selectedProduct = {
      ...product,
      quantity,
      size: selectedSize,
      selectedToppings: selectedToppings.map((topping) => ({
        ...topping,
        quantity: topping.quantity || 1,  // Đảm bảo số lượng topping luôn >= 1
      })),
      totalPrice,
    };

    addToCart(selectedProduct);  // Thêm sản phẩm vào giỏ hàng

    // Chuyển hướng về trang homepage sau khi thêm vào giỏ hàng
    navigate('/');  // Điều hướng về trang chủ ("/")
    if (onClose) {
      onClose();  // Đảm bảo onClose được gọi sau khi thêm vào giỏ hàng
    }
  };
  const handleClose = () => {
    localStorage.removeItem('selectedProduct'); // Xóa sản phẩm khỏi localStorage
    setProduct(null); // Cập nhật lại trạng thái sản phẩm thành null
    if (onClose) {
      onClose(); // Gọi hàm onClose truyền vào
    }
  };

  if (!product) {
    return (
      <div className="cube-loader"> Loading...
        <div className="cube-top"></div>
        <div className="cube-wrapper">
          <span style={{ "--i": 0 }} className="cube-span"></span>
          <span style={{ "--i": 1 }} className="cube-span"></span>
          <span style={{ "--i": 2 }} className="cube-span"></span>
          <span style={{ "--i": 3 }} className="cube-span"></span>
        </div>
      </div>
    );
  }
  

  // Kiểm tra xem sản phẩm có phải là món nước hay bánh
  const isDrink = ['Trà', 'Coffee', 'Trà sữa', 'Ice Blended'].includes(product.categoryName);

  return (
    <div className="product-detail-container">
         <button className="close" onClick={handleClose}>
        &times;
      </button>

      <div className="product-info-container">
        <div className="product-image">
          <img src={`https://localhost:7095/${product.imageUrl}`} alt={product.name} />
        </div>
        <div className="product-details">
          <h3>{product.name}</h3>
          <p>{product.price.toLocaleString()} đ</p>

          <div className="quantity-selector">
            <h4>Số lượng:</h4>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange('decrement')} disabled={quantity <= 1}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange('increment')}>+</button>
            </div>
          </div>

          {/* Chỉ hiển thị phần topping nếu là món nước */}
          {isDrink && (
            <div className="topping-selector">
              <h4>Chọn topping:</h4>
              {Array.isArray(toppings) && toppings.length > 0 ? (
                <ul>
                  {toppings.map((topping) => (
                    <li key={topping.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedToppings.some((t) => t.id === topping.id)}
                          onChange={() => handleToppingSelection(topping)}
                        />
                        {topping.name} - {topping.price.toLocaleString()} đ
                      </label>
                      {selectedToppings.some((t) => t.id === topping.id) && (
                        <div>
                          <button onClick={() => handleToppingQuantityChange(topping, 'decrement')} disabled={selectedToppings.find((t) => t.id === topping.id)?.quantity <= 1}>-</button>
                          <span>{selectedToppings.find((t) => t.id === topping.id)?.quantity}</span>
                          <button onClick={() => handleToppingQuantityChange(topping, 'increment')}>+</button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Không có topping nào để hiển thị.</p>
              )}
            </div>
          )}

          {/* Chọn size chỉ dành cho các món bánh */}
          {!isDrink && (
            <div className="size-selector">
              <h4>Chọn size:</h4>
              {Object.keys(sizePrices).map((size) => (
                <label key={size}>
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                  />
                  {size === 'M' ? 'Size M' : `${size} +${sizePrices[size].toLocaleString()} đ`}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="total-price">
        <button onClick={handleAddToCart}>Thêm vào giỏ hàng: {totalPrice.toLocaleString()} đ</button>
      </div>

      <CartButton />   {/* Nút CartButton */}
      <FloatingButton /> {/* Nút FloatingButton */}
    </div>
  );
};

export default ProductDetail;
