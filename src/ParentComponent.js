// src/ParentComponent.js
import React, { useState } from 'react';
import ProductDetail from './ProductDetail';  // Giả sử bạn có ProductDetail trong cùng thư mục

const ParentComponent = () => {
  const [showModal, setShowModal] = useState(false);

  // Hàm mở modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Xem chi tiết sản phẩm</button>

      {/* Hiển thị modal khi showModal là true */}
      {showModal && (
        <ProductDetail
          onClose={handleCloseModal}  // Truyền hàm đóng modal từ component cha
        />
      )}
    </div>
  );
};

export default ParentComponent;
