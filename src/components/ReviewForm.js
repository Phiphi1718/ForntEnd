import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [order, setOrder] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [comments, setComments] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false); // State để hiển thị overlay
  const [overlayMessage, setOverlayMessage] = useState(''); // Lưu thông báo của overlay

  useEffect(() => {
    // Lấy thông tin đơn hàng từ localStorage khi trang được tải
    const storedOrder = JSON.parse(localStorage.getItem('order'));
    if (storedOrder) {
      setOrder(storedOrder);
      setRatings(storedOrder.map(() => 5)); // Mặc định đánh giá 5 sao
      setComments(storedOrder.map(() => '')); // Mặc định không có bình luận
    }
  }, []);

  const handleRatingChange = (index, value) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = value;
    setRatings(updatedRatings);
  };

  const handleCommentChange = (index, value) => {
    const updatedComments = [...comments];
    updatedComments[index] = value;
    setComments(updatedComments);
  };

  const handleReviewSubmit = async (index) => {
    const reviewData = {
      userEmail: localStorage.getItem('userEmail'), // Lấy email từ localStorage
      productName: order[index].name, // Tên sản phẩm
      rating: ratings[index], // Đánh giá sao
      comment: comments[index], // Bình luận
      reviewDate: new Date().toISOString(), // Thời gian đánh giá
    };

    try {
      const response = await fetch('https://localhost:7095/api/Review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        console.log(`Đánh giá sản phẩm ${order[index].name} thành công!`);
        setOverlayMessage(`Cảm ơn bạn đã đánh giá sản phẩm "${order[index].name}"!`);
        setShowOverlay(true); // Hiển thị overlay cảm ơn

        // Xóa sản phẩm đã được đánh giá
        const updatedOrder = [...order];
        updatedOrder.splice(index, 1); // Xóa sản phẩm ở vị trí index
        setOrder(updatedOrder);
        localStorage.setItem('order', JSON.stringify(updatedOrder)); // Cập nhật lại localStorage

      } else {
        const errorResponse = await response.json();
        console.error(`Lỗi khi gửi đánh giá cho sản phẩm ${order[index].name}:`, errorResponse);
      }
    } catch (error) {
      console.error(`Lỗi kết nối tới API khi gửi đánh giá cho sản phẩm ${order[index].name}:`, error);
    }
  };

  return (
    <div className="review-form">
      <h3>Đánh giá sản phẩm</h3>

      {/* Overlay thông báo cảm ơn */}
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h4>{overlayMessage}</h4>
            <button onClick={() => setShowOverlay(false)}>Đóng</button>
          </div>
        </div>
      )}

      {order.length === 0 ? (
        <p>Không có sản phẩm để đánh giá.</p>
      ) : (
        order.map((product, index) => (
          <div key={product.id} className="review-product">
           <img
              src={`https://localhost:7095/${product.imageUrl}`}
              alt={product.name}
            />
            <h4>{product.name}</h4>
            <p className="price12">{product.price} VND</p>
            <p>{product.description}</p>

            <div>
              <label>
               <div className="DanhGia" >Đánh giá</div>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${ratings[index] >= star ? 'filled' : ''}`}
                      onClick={() => handleRatingChange(index, star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </label>
            </div>
            <div>
              <textarea
                value={comments[index]}
                onChange={(e) => handleCommentChange(index, e.target.value)}
                placeholder="Nhập đánh giá của bạn..."
              />
            </div>
            <button className="danhgia" onClick={() => handleReviewSubmit(index)}>Gửi đánh giá</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewForm;
