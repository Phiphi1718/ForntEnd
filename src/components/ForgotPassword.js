import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import './Login.css'; // Đảm bảo tệp CSS có các quy tắc cho khung mờ
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
   // Sử dụng useEffect để thêm lớp CSS
   useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Sử dụng useNavigate

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://localhost:7095/api/Auth/ForgotPassword?email=${email}`);
      setMessage('Mật khẩu mới đã được gửi đến email của bạn!');
      console.log(response.data);
    } catch (error) {
      setMessage('Yêu cầu thất bại. Vui lòng thử lại.');
      console.error(error);
    }
  };

  return (
    <div className="form-container login-page">
      <h2>Quên Mật Khẩu</h2>
      <form onSubmit={handleForgotPassword}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit" className="submit-button">Gửi Yêu Cầu</button>
      </form>
      <button onClick={() => navigate('/login')} className="back-button">Back</button>
      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;
