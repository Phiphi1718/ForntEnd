import React, { useEffect, useState } from 'react';
import './CakePage.css';
import { useCart } from '../CartContext'; // Import context cho giỏ hàng
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import FloatingButton from '../components/FloatingButton';
import CartButton from '../components/CartButton';

const CakePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu
  const [selectedProduct, setSelectedProduct] = useState(null); // Quản lý sản phẩm được chọn để hiển thị modal
  const [error, setError] = useState(null); // Trạng thái lỗi
  const { addToCart } = useCart(); // Dùng context để thêm vào giỏ hàng

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    fetch('https://localhost:7095/api/Product/getall')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data?.$values) {
          // Lọc chỉ lấy sản phẩm thuộc danh mục "Bánh"
          const cakeProducts = data.$values.filter(
            (product) => product.categoryName === 'Bánh' // Lọc theo category "Bánh"
          );
          setProducts(cakeProducts);
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => {
        setError('Không thể tải dữ liệu'); // Lưu thông báo lỗi vào state
        console.error('Error fetching products:', error);
      })
      .finally(() => setIsLoading(false)); // Kết thúc tải dữ liệu
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Gán sản phẩm được chọn để mở modal
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); // Đóng modal
  };

  const handleAddToCart = (product, selectedSize, quantity) => {
    const sizePrices = {
      M: 0,
      L: 5000,
      XL: 10000,
    };

    const basePrice = product.price;
    const sizePrice = sizePrices[selectedSize];
    const totalPrice = (basePrice + sizePrice) * quantity;

    const selectedProduct = {
      ...product,
      quantity,
      size: selectedSize,
      totalPrice,
    };

    addToCart(selectedProduct); // Thêm sản phẩm vào giỏ hàng
    setSelectedProduct(null); // Đóng modal
  };

  return (
    <div className="cake-page-container">
      {/* Tiêu đề luôn hiển thị trên đầu */}
      <div className="cake-section-title">Bánh</div>

      {/* Hiển thị thông báo khi đang tải hoặc có lỗi */}
      {isLoading || error ? (
        <div className="🤚">  
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="🌴"></div>		
        <div className="👍"></div>
      </div>
      ) : (
        <>
          <div className="cake-section-subtitle">
            Bánh là sự hòa quyện của hương vị ngọt ngào và nghệ thuật ẩm thực. Từ bánh ngọt, bánh kem cho đến bánh mì, mỗi loại đều mang một sự đặc biệt riêng.
          </div>
          <div className="cake-product-grid">
            {products.map((product) => (
              <CakeProductCard
                key={product.id}
                product={product}
                onBuy={() => handleProductClick(product)} // Gọi hàm khi user ấn "Đặt mua"
              />
            ))}
          </div>

          {/* Hiển thị modal khi có sản phẩm được chọn */}
          {selectedProduct && (
            <ProductModalCake
              product={selectedProduct}
              onClose={handleCloseModal}
              onAddToCart={handleAddToCart}
            />
          )}

          {/* Hiển thị nút giỏ hàng và hotline ở cuối trang */}
          <CartButton />
          <FloatingButton />
        </>
      )}
    </div>
  );
};

// Component hiển thị từng sản phẩm trong danh mục "Bánh"
const CakeProductCard = ({ product, onBuy }) => {
  const imageUrl = `https://localhost:7095/${product.imageUrl}`;

  return (
    <div className="cake-product-card">
      <img src={imageUrl} alt={product.name} />
      <div className="cake-product-name">{product.name}</div>
      <div className="cake-product-price">{product.price.toLocaleString()} đ</div>
      <button className="cake-btn-buy" onClick={onBuy}>
        <FontAwesomeIcon icon={faShoppingCart} /> Đặt mua
      </button>
    </div>
  );
};

// Modal hiển thị chi tiết sản phẩm và cho phép chọn size, số lượng
const ProductModalCake = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [totalPrice, setTotalPrice] = useState(product.price);

  const sizePrices = {
    M: 0, // Giá mặc định của sản phẩm
    L: 5000, // Chênh lệch giá cho size L
    XL: 10000, // Chênh lệch giá cho size XL
  };

  // Tính tổng tiền khi thay đổi size hoặc số lượng
  useEffect(() => {
    const basePrice = product.price;
    const sizePrice = sizePrices[selectedSize];
    setTotalPrice((basePrice + sizePrice) * quantity);
  }, [selectedSize, quantity, product.price]);

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
  };

  return (
    <div className="modal-overlaycake">
      <div className="modalcontentcake">
        <button className="close-buttoncake" onClick={onClose}>
          &times;
        </button>

        {/* Thông tin sản phẩm */}
        <div className="product-infocake">
          <div className="modal-imagecake">
            <img
              src={`https://localhost:7095/${product.imageUrl}`}
              alt={product.name}
            />
          </div>
          <div className="product-detailscake">
            <h3>{product.name}</h3>
            <p>{product.price.toLocaleString()} đ</p>

            {/* Bộ chọn số lượng */}
            <div className="quantity-selectorcake">
              <h4>Số lượng:</h4>
              <div className="quantity-controlscake">
                <button
                  className="quantity-buttoncake"
                  onClick={() => handleQuantityChange('decrement')}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-displaycake">{quantity}</span>
                <button
                  className="quantity-buttoncake"
                  onClick={() => handleQuantityChange('increment')}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bộ chọn size */}
        <div className="size-selectorcake">
          <h4>Chọn size:</h4>
          <div className="size-optionscake">
            {Object.keys(sizePrices).map((size) => (
              <label key={size} className="size-option">
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={() => setSelectedSize(size)}
                />
                {size === 'M'
                  ? `Size M`
                  : `${size} +${sizePrices[size].toLocaleString()} đ`}
              </label>
            ))}
          </div>
        </div>

        {/* Hiển thị tổng tiền */}
        <div className="total-pricecake">
          <button className="btn-add-to-cartcake" onClick={handleAddToCart}>
            Thêm vào giỏ hàng: {totalPrice.toLocaleString()} đ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CakePage;
