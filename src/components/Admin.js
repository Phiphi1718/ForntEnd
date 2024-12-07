import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css"; // CSS cho Sidebar
import ProductManager from "./ProductManager"; // Import Products Manager
import Login from "./Login"; // Import Login Component
import ToppingManager from "./ToppingManager";
import JobApplication from "./JobApplication";
import Dashboard from "./Dashboard";
import DonHangManagement from "./DonHangManagement";

const Admin = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showLogin, setShowLogin] = useState(false); // State to control login form visibility
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Quản lý trạng thái đăng nhập
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Quản lý trạng thái mở/đóng sidebar
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Quản lý dropdown khi nhấn vào ảnh

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const token = localStorage.getItem("token");
    const loggedInStatus = localStorage.getItem("isLoggedIn");

    if (loggedInStatus !== "true" || !token) {
      setShowLogin(true); // Nếu chưa đăng nhập, hiển thị form đăng nhập
    }
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false); // Đóng sidebar khi người dùng chọn một mục
  };

  const handleLogout = () => {
    // Xóa token và trạng thái đăng nhập khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false); // Cập nhật trạng thái đăng xuất
    setShowLogin(true); // Hiển thị form đăng nhập
    setIsDropdownOpen(false); // Đóng dropdown
    navigate("/login"); // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Mở/đóng dropdown khi nhấn vào ảnh
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Mở/đóng sidebar
  };

  if (showLogin) {
    return <Login />; // Render trang đăng nhập nếu trạng thái showLogin là true
  }

  return (
    <div className="app">
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        {/* Menu Buttons */}
        <div className="menu">
          <button onClick={() => handleSectionChange("dashboard")}>Bảng điều khiển</button>
          <button onClick={() => handleSectionChange("productManagement")}>Quản lý Sản Phẩm</button>
          <button onClick={() => handleSectionChange("toppingManagement")}>Quản lý Topping</button>
          <button onClick={() => handleSectionChange("JobApplicationManagement")}>Quản Lý Tuyển dụng</button>
          <button onClick={() => handleSectionChange("orderManagement")}>Quản lý đơn hàng</button>
        </div>

        {/* Hamburger Icon (Menu icon for small screens) */}
        <div className={`hamburger-icon ${isSidebarOpen ? "open" : ""}`} onClick={toggleSidebar}>
          <img src="/menu.png" alt="Menu Icon" style={{ width: '30px', height: '30px' }} />
        </div>

        {/* Profile Section */}
        <div className="profile" onClick={toggleDropdown}>
          <img alt="Profile picture" height="100" src="nhomTPQ.jpg" width="100" />
          {isDropdownOpen && (
            <div className="dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        {activeSection === "dashboard" && <Dashboard />}
        {activeSection === "productManagement" && <ProductManager />}
        {activeSection === "toppingManagement" && <ToppingManager />}
        {activeSection === "JobApplicationManagement" && <JobApplication />}
        {activeSection === "orderManagement" && <DonHangManagement />}
      </div>
    </div>
  );
};

export default Admin;
