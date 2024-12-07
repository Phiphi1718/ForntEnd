import React, { useEffect, useState } from 'react';
import './FeaturedProducts.css';
import './ProductModal.css'; // Đảm bảo import CSS cho modal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ProductModal from './ProductModal'; // Import ProductModal

const IceBlended = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Sản phẩm được chọn để hiển thị modal
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    fetch('https://localhost:7095/api/Product/getall')
      .then((response) => response.json())
      .then((data) => {
        if (data?.$values) {
          // Lọc chỉ lấy sản phẩm nổi bật
          const featuredProducts = data.$values.filter(
            (product) =>
              product.categoryName === 'Ice Blended' &&
              [27, 26, 25, 24, 23].includes(product.id) // Lọc theo id hoặc category
          );
          setProducts(featuredProducts);
        } else {
          console.error('Invalid data format:', data);
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

  // Đóng modal
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="TraNoiBat">
      <div className="section-Tra">Ice Blended NỔI BẬT</div>
      <div className="section-subtitle">
        Ice Blended là một loại đồ uống đá xay, thường được làm từ cà phê hoặc trà, kết hợp với sữa, đường và đá.
        Hương vị đa dạng, từ sô cô la, caramel đến trái cây tươi. Thức uống này mang lại cảm giác mát lạnh,
        sảng khoái, đặc biệt phù hợp trong những ngày nắng nóng. Ice Blended được ưa chuộng bởi vị ngọt ngào, béo
        ngậy và cấu trúc đá xay mịn màng.
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
            onBuyClick={() => setSelectedProduct(product)} // Xử lý khi nhấn "Đặt mua"
          />
        ))}
      </div>

      {/* Hiển thị modal khi người dùng chọn mua sản phẩm */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeModal} // Đóng modal
        />
      )}
    </div>
  );
};

const bestSellerIds = [27, 25]; // Danh sách ID của sản phẩm nổi bật

const ProductCard = ({ product, onBuyClick }) => {
  // Tạo URL đầy đủ cho hình ảnh (nếu `imageUrl` là đường dẫn tương đối)
  const imageUrl = `https://localhost:7095/${product.imageUrl}`;

  return (
    <div className="product-card">
      {/* Hiển thị label nếu ID sản phẩm nằm trong danh sách nổi bật */}
      {bestSellerIds.includes(product.id) && <div className="product-label">BEST SELLER</div>}
      <img src={imageUrl} alt={product.name} />
      <div className="product-name">{product.name}</div>
      <div className="product-price">{product.price.toLocaleString()} đ</div>
      <button className="btn-buy" onClick={onBuyClick}>
        <FontAwesomeIcon icon={faShoppingCart} /> Đặt mua
      </button>
    </div>
  );
};

export default IceBlended;
