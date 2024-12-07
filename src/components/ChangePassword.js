import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
   // Sử dụng useEffect để thêm lớp CSS
   useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);
  const [gmails, setGmails] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Sử dụng useNavigate

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const changPassData = {
      Password: password,
      NewPassword: newPassword,
      ReNewPassword: reNewPassword
    };

    try {
      const response = await axios.put(`https://localhost:7095/api/Auth/ChangePass?gmails=${encodeURIComponent(gmails)}`, changPassData);
      setMessage('Đã thay đổi mật khẩu thành công!');
      console.log(response.data);
    } catch (error) {
      setMessage(error.response?.data || 'Đã xảy ra lỗi. Vui lòng thử lại.');
      console.error(error.response?.data);
    }
  };

  return (
    <div className="form-container login-page">
      <h2>Đổi Mật Khẩu</h2>
      <form onSubmit={handleChangePassword}>
        <input
          type="email"
          placeholder="Email"
          value={gmails}
          onChange={(e) => setGmails(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu cũ"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nhập lại mật khẩu mới"
          value={reNewPassword}
          onChange={(e) => setReNewPassword(e.target.value)}
          required
        />
        <button type="submit">Đổi Mật Khẩu</button>
      </form>
      <button onClick={() => navigate('/login')} className="back-button">Back</button>
      <p>{message}</p>
    </div>
  );
}

export default ChangePassword;