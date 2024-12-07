import React from 'react';
import './StorePage.css'; // Đảm bảo bạn có style riêng cho trang này

const StorePage = () => {
  return (
    <div className="store-page">
      <h1>Thông Tin Cửa Hàng</h1>
      <p>Địa chỉ của cửa hàng:</p>
      <address>
        Song Than Industrial Area 1, Di An District, Xã Bình Thắng, Dĩ An, Bình Dương, Việt Nam
      </address>
      <p>Giờ mở cửa: 08:00 AM - 08:00 PM</p>
      
      {/* Nhúng bản đồ Google Maps */}
      <div className="store-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125397.30913925123!2d106.6645698830712!3d10.836858757916925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d9110ead5dfb%3A0x99ff92dec4f51301!2sPhi%20phi%201710!5e0!3m2!1svi!2s!4v1732111934187!5m2!1svi!2s"
          width="600"
          height="450"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default StorePage;
