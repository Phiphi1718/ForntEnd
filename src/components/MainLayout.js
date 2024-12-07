import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './Layout.css'

const Layout = () => {
  return (
    <div className="app-container"> {/* Thêm class app-container */}
      <Header />
      <main className="main-content">
        <Outlet /> {/* Nội dung của trang */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
