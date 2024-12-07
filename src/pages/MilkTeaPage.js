import React, { useEffect, useState } from 'react';
import './MilkTeaPage.css'; // File CSS cho trang "Trà sữa"
import ProductModal from '../components/ProductModal'; // Import modal chi tiết sản phẩm
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import FloatingButton from '../components/FloatingButton'; // Import nút hotline
import CartButton from '../components/CartButton'; // Import nút giỏ hàng

const MilkTeaPage = () => {
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
          // Lọc sản phẩm theo danh mục "Trà sữa"
          const milkTeaProducts = data.$values.filter(
            (product) => product.categoryName === 'Trà sữa'
          );
          setProducts(milkTeaProducts);
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
    <div className="milk-tea-page-container">
      <div className="milk-tea-section-title">Trà Sữa</div>
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
      <div className="milk-tea-section-subtitle">
        Trà sữa là sự kết hợp hoàn hảo giữa trà, sữa, và các loại topping thơm ngon. Thưởng thức ngay các sản phẩm đặc sắc của chúng tôi!
      </div>
      <div className="milk-tea-product-grid">
        {products.map((product) => (
          <MilkTeaProductCard
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

const MilkTeaProductCard = ({ product, onBuy }) => {
  // Xử lý đường dẫn hình ảnh
  const imageUrl = `https://localhost:7095/${product.imageUrl}`;

  return (
    <div className="milk-tea-product-card">
      <img src={imageUrl} alt={product.name} />
      <div className="milk-tea-product-name">{product.name}</div>
      <div className="milk-tea-product-price">{product.price.toLocaleString()} đ</div>
      <button className="milk-tea-btn-buy" onClick={onBuy}>
        <FontAwesomeIcon icon={faShoppingCart} /> Đặt mua
      </button>
    </div>
  );
};

export default MilkTeaPage;
