// FloatingButton.js
import React, { useState } from 'react';
import './HomePage.css'

const FloatingButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCall = () => {
    window.location.href = "tel:0348214308";
    setShowModal(false);
  };

  const handleOverlayClick = (e) => {
    // Kiểm tra nếu người dùng click bên ngoài modal
    if (e.target.classList.contains("hotline-modal-overlay")) {
      handleClose();
    }
  };

  return (
    <>
      {/* Nút hotline */}
      <button className="floating-buttonn" onClick={handleButtonClick}>
        <img src="/hotline.png" alt="Hotline Icon" className="floating-icon" />
      </button>

      {/* Modal hotline */}
      {showModal && (
        <div
          className="hotline-modal-overlay"
          onClick={handleOverlayClick} // Gọi hàm khi click vào overlay
        >
          <div className="hotline">
            <div className="hotline-container">
              <p className="hotline-text">Gọi hỗ trợ: 0348214308</p>
              <div className="separator"></div>
            </div>
            <div className="allhotline">
              <button className="cancel" onClick={handleClose}>
                Cancel
              </button>
              <button className="call" onClick={handleCall}>
                Call
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButton;
