import React, { useEffect, useState } from 'react';
import './IceBlendedPage.css'; // File CSS cho trang "Ice Blended"
import ProductModal from '../components/ProductModal'; // Import modal chi tiết sản phẩm
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import FloatingButton from '../components/FloatingButton'; // Import nút hotline
import CartButton from '../components/CartButton'; // Import nút giỏ hàng

const IceBlendedPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Sản phẩm được chọn để hiển thị modal
  const [isLoading, setIsLoading] = useState(true); // Trạng thái đang tải
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    fetch('https://localhost:7095/api/Product/getall')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu'); // Nếu fetch thất bại, throw lỗi
        }
        return response.json();
      })
      .then((data) => {
        if (data?.$values) {
          // Lọc sản phẩm theo danh mục "Ice Blended"
          const iceBlendedProducts = data.$values.filter(
            (product) => product.categoryName === 'Ice Blended'
          );
          setProducts(iceBlendedProducts);
        } else {
          console.error('Dữ liệu không hợp lệ:', data);
        }
      })
      .catch((error) => {
        setError(error.message); // Lưu thông báo lỗi vào state
      })
      .finally(() => {
        setIsLoading(false); // Kết thúc quá trình tải dữ liệu
      });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Mở modal chi tiết sản phẩm
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); // Đóng modal
  };

  return (
    <div className="ice-blended-page-container">
      {/* Tiêu đề luôn hiển thị trên đầu */}
      <div className="ice-blended-section-title">Ice Blended</div>

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
          <div className="ice-blended-section-subtitle">
            Ice Blended là sự kết hợp hoàn hảo giữa đá xay và hương vị đa dạng, mang đến trải nghiệm tươi mát, sảng khoái.
          </div>
          <div className="ice-blended-product-grid">
            {products.map((product) => (
              <IceBlendedProductCard
                key={product.id}
                product={product}
                onBuy={() => handleProductClick(product)}
              />
            ))}
          </div>

          {/* Hiển thị modal chi tiết sản phẩm */}
          {selectedProduct && (
            <ProductModal product={selectedProduct} onClose={handleCloseModal} />
          )}

          {/* Hiển thị nút giỏ hàng và hotline */}
          <CartButton />
          <FloatingButton />
        </>
      )}
    </div>
  );
};

const IceBlendedProductCard = ({ product, onBuy }) => {
  // Xử lý đường dẫn hình ảnh
  const imageUrl = `https://localhost:7095/${product.imageUrl}`;

  return (
    <div className="ice-blended-product-card">
      <img src={imageUrl} alt={product.name} />
      <div className="ice-blended-product-name">{product.name}</div>
      <div className="ice-blended-product-price">{product.price.toLocaleString()} đ</div>
      <button className="ice-blended-btn-buy" onClick={onBuy}>
        <FontAwesomeIcon icon={faShoppingCart} /> Đặt mua
      </button>
    </div>
  );
};

export default IceBlendedPage;
