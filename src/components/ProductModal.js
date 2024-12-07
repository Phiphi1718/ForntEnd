import React, { useEffect, useState } from 'react';
import './ProductModal.css';
import { useCart } from '../CartContext';  // Import useCart từ CartContext

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();  // Lấy hàm addToCart từ context
  const [toppings, setToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const sizePrices = {
    M: 0,       // Giá mặc định của sản phẩm (không thay đổi)
    L: 5000,    // Chênh lệch giá cho size L
    XL: 10000,  // Chênh lệch giá cho size XL
  };

  // Fetch toppings from API
  useEffect(() => {
    fetch('https://localhost:7095/api/Toping/Getall')
      .then((response) => response.json())
      .then((data) => {
        if (data?.$values) {
          const formattedToppings = data.$values.map((topping) => ({
            ...topping,
            id: topping.$id, // Chuẩn hóa dữ liệu topping
          }));
          setToppings(formattedToppings);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error('Error fetching toppings:', error));
  }, []);

  // Tính tổng tiền khi thay đổi size, topping hoặc quantity
  useEffect(() => {
    const basePrice = product.price;
    const sizePrice = sizePrices[selectedSize];
    const toppingsPrice = selectedToppings.reduce(
      (sum, topping) => sum + topping.price * topping.quantity,
      0
    );
    const total = (basePrice + sizePrice + toppingsPrice) * quantity;
    setTotalPrice(total);
  }, [selectedSize, selectedToppings, quantity, product.price]);
  
  // Thay đổi số lượng sản phẩm
  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Chọn topping
  const handleToppingQuantityChange = (topping, type) => {
    setSelectedToppings((prev) => {
      return prev.map((t) => {
        if (t.id === topping.id) {
          const updatedQuantity =
            type === 'increment' ? t.quantity + 1 : t.quantity - 1;
          return { ...t, quantity: Math.max(updatedQuantity, 1) }; // Đảm bảo số lượng không nhỏ hơn 1
        }
        return t;
      });
    });
  };
  
  const handleToppingSelection = (topping) => {
    setSelectedToppings((prev) => {
      const isSelected = prev.some((t) => t.id === topping.id);
      if (isSelected) {
        // Nếu đã chọn thì bỏ chọn
        return prev.filter((t) => t.id !== topping.id);
      } else {
        // Nếu chưa chọn, thêm topping với quantity mặc định là 1
        return [...prev, { ...topping, quantity: 1 }];
      }
    });
  };
  

    // Thêm sản phẩm vào giỏ hàng
    const handleAddToCart = () => {
      const selectedProduct = {
        ...product,
        quantity,
        size: selectedSize,
        selectedToppings: selectedToppings.map(topping => ({
          ...topping,
          quantity: topping.quantity || 1, // Ensure quantity is always at least 1
        })),
        totalPrice,
      };
      addToCart(selectedProduct); // Add product with the correct topping quantity
      onClose();  // Close the modal after adding to cart
    };
    

  return (
    <div className="modal-overlay10">
      <div className="modalcontent2">
        <button className="close-button1" onClick={onClose}>
          &times;
        </button>

        {/* Khung 1: Hình ảnh sản phẩm */}
        <div className="product-info2">
          <div className="modal-image">
            <img
              src={`https://localhost:7095/${product.imageUrl}`}
              alt={product.name}
            />
          </div>
          <div className="product-details2">
            <h3 className="nameh3">{product.name}</h3>
            <p className="pricep">{product.price.toLocaleString()} đ</p>

            {/* Bộ chọn số lượng */}
            <div className="quantity-selector2">
              <h4 className="Soluong">Số lượng:</h4>
              <div className="quantity-controls2">
                <button
                  className="quantity23"
                  onClick={() => handleQuantityChange('decrement')}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display2">{quantity}</span>
                <button
                  className="quantity23"
                  onClick={() => handleQuantityChange('increment')}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bộ chọn size */}
        <div className="Tarta">
          <div className="size-selector">
            <h4>Chọn size:</h4>
            <div className="size-options">
              {Object.keys(sizePrices).map((size) => (
                <label key={size} className="size-option">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                  />
                  {size === 'M' ? (
                    // Không hiển thị giá cho size M
                    `Size M`
                  ) : (
                    // Hiển thị giá cho các size L và XL
                    `${size} +${sizePrices[size].toLocaleString()} đ`
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Bộ chọn topping */}
          <div className="topping-selector">
  <h4 className="choose">Chọn topping:</h4>
  {Array.isArray(toppings) && toppings.length > 0 ? (
    <ul className="toppinglist">
      {toppings.map((topping) => (
        <li key={topping.id} className="topping-item">
          <label>
            <input
              type="checkbox"
              checked={selectedToppings.some((t) => t.id === topping.id)}
              onChange={() => handleToppingSelection(topping)}
            />
            {topping.name} - {topping.price.toLocaleString()} đ
          </label>
          {selectedToppings.some((t) => t.id === topping.id) && (
            <div className="topping-quantity-controls">
              <button
                className="quantity-button1"
                onClick={() =>
                  handleToppingQuantityChange(
                    topping,
                    'decrement'
                  )
                }
                disabled={
                  selectedToppings.find((t) => t.id === topping.id)
                    ?.quantity <= 1
                }
              >
                -
              </button>
              <span className="quantity-display">
                {
                  selectedToppings.find((t) => t.id === topping.id)
                    ?.quantity
                }
              </span>
              <button
                className="quantity-button1"
                onClick={() =>
                  handleToppingQuantityChange(
                    topping,
                    'increment'
                  )
                }
              >
                +
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <p>Không có topping nào để hiển thị.</p>
  )}
</div>

        </div>

        {/* Hiển thị tổng tiền */}
        <div className="total-price">
          <button className="btn-add-to-cart" onClick={handleAddToCart}>
            Thêm vào giỏ hàng: {totalPrice.toLocaleString()} đ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
