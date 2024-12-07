import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import SearchBar from './SearchBar';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Kiểm tra trạng thái đăng nhập từ localStorage
  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoggedInStatus === 'true');
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Cập nhật lại trạng thái đăng nhập
    window.location.reload(); // Reload lại để cập nhật trạng thái
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Icon điều hướng (mở menu) */}
        <div className="icon-nav" onClick={toggleMenu}>
          <img src="/menu.png" alt="Menu Icon" style={{ width: '30px', height: '30px' }} />
        </div>

        {/* Logo */}
        <div className="logoTPQT">
          <Link to="/">
            <img src="Team.jpg" alt="TPQT Coffee Logo" style={{ width: 'auto', height: '50px' }} />
          </Link>
        </div>

        {/* Mục menu khi màn hình lớn */}
        <div className="desktop-menu">
          <nav className="desktop-nav">
            <Link to="/">Trang Chủ</Link>
            <Link to="/coffee">Cà phê</Link>
            <Link to="/TeaPage">Trà</Link>
            {/* Menu con */}
            <div className="menu-item">
              <Link to="/MenuProduct" className="menu-link">Menu</Link>
              <div className="submenu">
                <Link to="/coffee">Cà phê</Link>
                <Link to="/TeaPage">Trà</Link>
                <Link to="/CakePage">Bánh</Link>
                <Link to="/MilkTeaPage">Trà sữa</Link>
                <Link to="/IceBlendedPage">Ice Blended</Link>
              </div>
            </div>
            <Link to="/ChuyenNha">Chuyện Nhà</Link>
            <Link to="/StorePage">Cửa hàng</Link>
            <Link to="/RecruitmentForm">Tuyển dụng</Link>
            <div className="search-header">
          <SearchBar />
        </div>
          </nav>
        </div>

        

        {/* Icon user (nếu đã đăng nhập) */}
        <div className="auth">
          {isLoggedIn ? (
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="userDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="/user.png"
                  alt="User Icon"
                  style={{ width: '30px', height: '30px' }}
                />
              </button>
              <div className="dropdown-menu" aria-labelledby="userDropdown">
                <Link className="dropdown-item" to="/profile">Thông tin cá nhân</Link>
                <button className="dropdown-item" onClick={handleLogout}>Đăng xuất</button>
              </div>
            </div>
          ) : (
            <div className="login-register">
              <Link to="/login">Đăng Nhập</Link>
              <Link to="/register">Đăng Ký</Link>
            </div>
          )}
        </div>
      </div>

      {/* Menu (hiện ra khi màn hình nhỏ) */}
      <div className={`mobile-menu ${isMenuOpen ? 'show' : ''}`}>
        <nav className="mobile-nav">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Trang Chủ</Link>
          <Link to="/coffee" onClick={() => setIsMenuOpen(false)}>Cà phê</Link>
          <Link to="/TeaPage" onClick={() => setIsMenuOpen(false)}>Trà</Link>
          <Link to="/MenuProduct" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          <Link to="/ChuyenNha" onClick={() => setIsMenuOpen(false)}>Chuyện Nhà</Link>
          <Link to="/StorePage" onClick={() => setIsMenuOpen(false)}>Cửa hàng</Link>
          <Link to="/RecruitmentForm" onClick={() => setIsMenuOpen(false)}>Tuyển dụng</Link>

          {/* Nếu chưa đăng nhập thì có 2 ô Login và Register */}
          {!isLoggedIn && (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Đăng Nhập</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>Đăng Ký</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
