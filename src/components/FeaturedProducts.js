import React, { useEffect, useState } from 'react';
import './FeaturedProducts.css';
import ProductModal from './ProductModal'; // Import modal component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    fetch('https://localhost:7095/api/Product/getall')
      .then((response) => response.json())
      .then((data) => {
        if (data?.$values) {
          const featuredProducts = data.$values.filter((product) =>
            product.categoryName === 'Trà' && [1, 2, 3, 4, 28].includes(product.id)
          );
          setProducts(featuredProducts);
        } else {
          console.error("Invalid data format:", data);
          setError('Dữ liệu không hợp lệ.');
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Không thể tải sản phẩm.');
      })
      .finally(() => {
        setIsLoading(false); // Kết thúc trạng thái tải
      });
  }, []);

  // Hàm xử lý khi nhấn nút "Đặt mua"
  const handleBuyClick = (product) => {
    setSelectedProduct(product); // Lưu sản phẩm được chọn
    setIsModalOpen(true);        // Mở modal
  };

  // Hàm đóng modal
  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="TraNoiBat">
      <div className="search-home">
        <SearchBar />
      </div>
      <div className="section-Tra">TRÀ NỔI BẬT</div>
      <div className="section-subtitle">
        Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải nghiệm giá trị nhất khi thưởng thức.
      </div>

      {/* Hiển thị thông báo lỗi hoặc trạng thái tải */}
      {(isLoading || error) && (
       /* From Uiverse.io by 00Kubi */ 
<div class="loader"></div>

      )}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onBuyClick={handleBuyClick} // Truyền hàm xử lý vào component con
          />
        ))}
      </div>

      {/* Hiển thị modal nếu đang mở */}
      {isModalOpen && selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          show={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

const ProductCard = ({ product, onBuyClick }) => {
  const imageUrl = `https://localhost:7095/${product.imageUrl}`;

  return (
    <div className="product-card">
      <img src={imageUrl} alt={product.name} />
      <div className="product-name">{product.name}</div>
      <div className="product-price">{product.price.toLocaleString()} đ</div>
      <button 
        className="btn-buy" 
        onClick={() => onBuyClick(product)} // Gọi hàm mở modal
      >
        <FontAwesomeIcon icon={faShoppingCart} /> Đặt mua
      </button>
    </div>
  );
};

export default FeaturedProducts;
