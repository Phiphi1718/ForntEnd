import React from "react";
import "./Footer.css";


const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-column1">
          <h3 className="footer-heading">Giới thiệu</h3>
          <ul className="footer-list">
            <li>
              <a href="#" className="footer-link">Về Chúng Tôi</a>
            </li>
            <li>
              <a href="#" className="footer-link">Sản phẩm</a>
            </li>
            <li>
              <a href="#" className="footer-link">Khuyến mãi</a>
            </li>
            <li>
              <a href="#" className="footer-link">Chuyên cà phê</a>
            </li>
            <li>
              <a href="#" className="footer-link">Cửa Hàng</a>
            </li>
            <li>
              <a href="#" className="footer-link">Tuyển dụng</a>
            </li>
          </ul>
        </div>
        <div className="footer-column2">
          <h3 className="footer-heading">Điều khoản</h3>
          <ul className="footer-list">
            <li>
              <a href="#" className="footer-link">Điều khoản sử dụng</a>
            </li>
            <li>
              <a href="#" className="footer-link">Chính sách bảo mật thông tin</a>
            </li>
            <li>
              <a href="#" className="footer-link">Hướng dẫn xuất hóa đơn GTGT</a>
            </li>
          </ul>
        </div>


        <div className="footer-contact-info">
          <p className="footer-text">
            <i className="fas fa-phone-alt"></i> Đặt hàng: 1800 6936
          </p>
          <p className="footer-text">
            <i className="fas fa-map-marker-alt"></i> Liên hệ
          </p>
          <p className="footer-text">
            Bình An Bình Dương
          </p>
          <div className="footer-social-icons">
            <a href="#" className="footer-social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="footer-social-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>



      </div>
      <div className="footer-bottom-text">
      Công ty TNHH 4 Thành Viên Team TPQT
        <br />
        Mã số DN: 0312867172 do sở kế hoạch và đầu tư tp. HCM cấp ngày 23/07/2014
        <br />
        Người đại diện: NGUYỄN HUY QUANG
        <br />
        Điện thoại: 0348214308 Email: tangocphiphi1710@gmail.com
        <br />
        Địa chỉ: Bình An Bình Dương
        <br />
        © 2023-2024 Công ty TNHH 4 Thành Viên Team TPQT
      </div>
    </div>
  );
};

export default Footer;
