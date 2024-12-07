import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-page'); // Dùng chung lớp với trang đăng nhập
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7095/api/Auth/register', {
        FullName: fullName,
        Email: email,
        Phone: phone,
        Password: password,
      });
      setMessage('Đăng ký thành công!');
      navigate('/login');
    } catch (error) {
      setMessage('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="form-container login-page">
      <div className="back-to-home-button">
        <Link to="/">
          <button className="back-to-home-btn">
            <img src="/back.png" alt="Quay lại" className="back-icon" />
            Quay lại trang chủ
          </button>
        </Link>
      </div>
      <h2 className="form-title">Đăng Ký</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Họ và Tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          required
        />
        <button type="submit" className="login-button">Đăng Ký</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="additional-links">
        <p>Đã có tài khoản? <Link to="/login" className="form-link">Đăng Nhập</Link></p>
      </div>
    </div>
  );
}

export default Register;
