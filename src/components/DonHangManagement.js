import React, { useState, useEffect } from 'react';
import './DonHangManagement.css';

const DonHangManagement = () => {
  const [donHangs, setDonHangs] = useState([]); // Danh sách đơn hàng
  const [searchTerm, setSearchTerm] = useState(''); // Giá trị tìm kiếm
  const [searchedDonHang, setSearchedDonHang] = useState(null); // Kết quả tìm kiếm
  const [error, setError] = useState(''); // Lỗi nếu có

  // Gọi API để lấy tất cả đơn hàng khi load trang
  useEffect(() => {
    fetch('https://localhost:7095/api/DonHang/GetAll')
      .then((response) => response.json())
      .then((data) => {
        if (data?.$values) {
          setDonHangs(data.$values);
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => console.error('Error fetching DonHangs:', error));
  }, []);

  // Hàm tìm kiếm đơn hàng theo mã
  const handleSearch = () => {
    setError('');
    setSearchedDonHang(null);

    fetch(`https://localhost:7095/api/DonHang/${searchTerm}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Đơn hàng không tìm thấy');
        }
      })
      .then((data) => setSearchedDonHang(data))
      .catch((error) => setError(error.message));
  };

  return (
    <div className="donhang-management-container">
      <h1>Quản Lý Đơn Hàng</h1>

      {/* Form Tìm Kiếm */}
      <div className="search-form">
        <input
          type="text"
          placeholder="Nhập mã đơn hàng để tìm kiếm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>

      {/* Kết Quả Tìm Kiếm */}
      {searchedDonHang && (
        <div className="searched-donhang">
          <h2>Kết quả tìm kiếm:</h2>
          <table>
            <thead>
              <tr>
                <th>Mã Đơn Hàng</th>
                <th>Tên Sản Phẩm</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Size</th>
                <th>Topping</th>
                <th>Phương Thức Thanh Toán</th>
                <th>Tổng Tiền</th>
              </tr>
            </thead>
            <tbody>
              {searchedDonHang.donHangChiTiets.$values.map((ct, index) => (
                <tr key={index}>
                  <td>{searchedDonHang.maDonHang}</td>
                  <td>{ct.tenProduct}</td>
                  <td>{ct.giaProduct.toLocaleString()} đ</td>
                  <td>{ct.soLuongProduct}</td>
                  <td>{ct.sizeProduct}</td>
                  <td>{ct.topping}</td>
                  <td>{searchedDonHang.phuongThucThanhToan}</td>
                  <td>{searchedDonHang.tongTien.toLocaleString()} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lỗi nếu có */}
      {error && <div className="error-message">{error}</div>}

      {/* Danh Sách Đơn Hàng */}
      <div className="donhang-list">
  {/* Tiêu đề danh sách đơn hàng */}
  <h2 className="TieuDeList">Danh sách tất cả đơn hàng:</h2>

  {/* Bảng đơn hàng */}
  <div className="table-container">
    <table>
      <thead className="TieuDeDonHang">
        <tr>
          <th>Mã Đơn Hàng</th>
          <th>Tên Sản Phẩm</th>
          <th>Giá</th>
          <th>Số Lượng</th>
          <th>Size</th>
          <th>Topping</th>
          <th>Phương Thức Thanh Toán</th>
          <th>Tổng Tiền</th>
        </tr>
      </thead>
      <tbody className="NoiDungList">
        {donHangs.map((donHang) =>
          donHang.donHangChiTiets?.$values.map((ct, index) => (
            <tr key={`${donHang.id}-${index}`}>
              <td>{donHang.maDonHang}</td>
              <td>{ct.tenProduct}</td>
              <td>{ct.giaProduct.toLocaleString()} đ</td>
              <td>{ct.soLuongProduct}</td>
              <td>{ct.sizeProduct}</td>
              <td>{ct.topping}</td>
              <td>{donHang.phuongThucThanhToan}</td>
              <td>{donHang.tongTien.toLocaleString()} đ</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default DonHangManagement;
