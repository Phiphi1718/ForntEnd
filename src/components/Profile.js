import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [cccd, setCccd] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('fullName') || '';
    const userAddress = localStorage.getItem('address') || '';
    const userCccd = localStorage.getItem('cccd') || '';
    const userDob = localStorage.getItem('dob') || '';
    const userPhone = localStorage.getItem('phone') || '';

    const formattedDob = userDob ? new Date(userDob).toISOString().split('T')[0] : '';

    setUserEmail(email || '');
    setFullName(name);
    setAddress(userAddress);
    setCccd(userCccd);
    setDob(formattedDob);
    setPhone(userPhone);
  }, []);

  // Hàm xử lý khi nhấn "Lưu thông tin"
  const handleSave = async () => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    const updateData = {
      email: userEmail, // Email không thay đổi
      fullName,
      address,
      cccd,
      dob,
      phone,
    };

    try {
      const response = await axios.put(
        'https://localhost:7095/api/Auth/update',
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const updatedUser = response.data.user;

      // Cập nhật localStorage
      localStorage.setItem('fullName', updatedUser.fullName || '');
      localStorage.setItem('address', updatedUser.address || '');
      localStorage.setItem('cccd', updatedUser.cccd || '');
      localStorage.setItem('dob', updatedUser.dob || '');
      localStorage.setItem('phone', updatedUser.phone || '');

      alert('Thông tin đã được cập nhật thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
      alert('Cập nhật thông tin thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="profile-container">
      <div className="back-to-home-button">
        <button className="back-to-home-btn" onClick={() => navigate('/')}>
          <img src="/back.png" alt="Quay lại" style={{ width: '10px', height: '10px', marginRight: '5px' }} /> Quay lại trang chủ
        </button>
      </div>

      <div>
        <h2>Thông tin cá nhân</h2>

        {/* Hiển thị Email */}
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={userEmail}
            readOnly
            style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
          />
        </div>

        {/* Các trường chỉnh sửa */}
        <div className="input-group">
          <label htmlFor="fullName">Họ và Tên:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="phone">Số điện thoại:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="address">Địa chỉ:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="cccd">CCCD:</label>
          <input
            type="text"
            id="cccd"
            value={cccd}
            onChange={(e) => setCccd(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="dob">Ngày sinh:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        {/* Nút SAVE */}
        <button onClick={handleSave} className="save-button">
          Lưu thông tin
        </button>
      </div>
    </div>
  );
}

export default Profile;
