import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.body.classList.add('login-page');
    
    // Kiểm tra xem người dùng đã đăng nhập chưa, nếu có thì điều hướng về trang phù hợp
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      const userType = localStorage.getItem('userType');
      if (userType === 'Admin') {
        navigate('/Admin');
      } else if (userType === 'Customer') {
        navigate('/');
      }
    }

    return () => {
      document.body.classList.remove('login-page');
    };
  }, [navigate]);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
      const response = await axios.post('https://localhost:7095/api/Auth/login', loginData);
      setMessage('Đăng nhập thành công!');
      
      // Lưu token, trạng thái đăng nhập, và thông tin người dùng vào localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email); // Lưu email
      localStorage.setItem('userType', response.data.userType); // Lưu thông tin loại người dùng
      localStorage.setItem('fullName', response.data.fullName || ''); // Lưu fullName
      localStorage.setItem('phone', response.data.phone || ''); // Lưu phone
      localStorage.setItem('address', response.data.address || ''); // Lưu address
      localStorage.setItem('cccd', response.data.cccd || ''); // Lưu cccd
      localStorage.setItem('dob', response.data.dob || ''); // Lưu dob

      // Kiểm tra userType và điều hướng đến trang tương ứng
      const userType = response.data.userType;
      if (userType === 'Admin') {
        navigate('/Admin');
      } else if (userType === 'Customer') {
        navigate('/');
      } else {
        setMessage('Không xác định loại người dùng.');
      }
    } catch (error) {
      setMessage('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <div className="form-container login-page">
      {/* Nút Quay lại trang chủ */}
      <div className="back-to-home-button">
        <button className="back-to-home-btn" onClick={() => navigate('/')}>
          <img src="/back.png" alt="Quay lại" style={{ width: '10px', height: '10px', marginRight: '5px' }} /> Quay lại trang chủ
        </button>
      </div>

      {/* Form Đăng Nhập */}
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Mật khẩu" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        {/* Tùy chọn Nhớ tài khoản và Quên mật khẩu */}
        <div className="options">
          <label>
            <input type="checkbox" /> Nhớ tài khoản
          </label>
          <Link to="/forgot-password" className="forgot-password-link">
            Quên mật khẩu?
          </Link>
        </div>

        {/* Nút Đăng Nhập */}
        <button type="submit" className="login-button">Đăng Nhập</button>
      </form>

      {/* Hiển thị thông báo */}
      {message && <p className="message">{message}</p>}

      {/* Các liên kết bổ sung */}
      <div className="additional-links">
        <p>Chưa có tài khoản? <Link to="/register">Đăng Ký</Link></p>
        <p>Muốn đổi mật khẩu? <Link to="/change-password">Đổi Mật Khẩu</Link></p>
      </div>
    </div>
  );
}

export default Login;
