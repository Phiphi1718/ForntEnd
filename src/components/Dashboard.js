import React, { useEffect, useState } from 'react'; // Import useState và useEffect
import axios from 'axios'; // Đảm bảo bạn đã cài đặt axios
import './Dashboard.css'
import { Bar } from 'react-chartjs-2'; // Import biểu đồ Bar (cột) từ react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Import các thành phần cần thiết từ Chart.js

// Register các thành phần Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [invoices, setInvoices] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);

  // Hàm gọi API để lấy số lượng đơn ứng tuyển
  const fetchApplications = () => {
    axios.get('https://localhost:7095/api/JobApplication/Getall')
      .then(response => {
        setTotalApplications(response.data.$values.length); // Số đơn ứng tuyển
      })
      .catch(error => {
        setTotalApplications(0); // Nếu có lỗi, set về 0
      });
  };

  // Hàm định dạng số với dấu chấm
  const formatNumberWithDots = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Hàm gọi API để lấy thông tin hóa đơn và tính tổng doanh thu theo tháng
  const fetchInvoices = () => {
    axios.get('https://localhost:7095/api/DonHang/GetAll')
      .then(response => {
        const invoiceData = response.data.$values;
        setInvoices(invoiceData); // Lưu danh sách hóa đơn
  
        // Tính tổng doanh thu từ danh sách hóa đơn và nhóm theo tháng
        const monthlyRevenue = {}; // Đối tượng lưu doanh thu theo tháng
  
        // Lấy thời gian hiện tại
        const currentMonth = new Date().getMonth() + 1; // Tháng hiện tại (1-12)
        const currentYear = new Date().getFullYear(); // Năm hiện tại
  
        // Gán tất cả đơn hàng vào tháng hiện tại
        const monthKey = `${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}`; // Đảm bảo tháng có 2 chữ số
  
        if (!monthlyRevenue[monthKey]) {
          monthlyRevenue[monthKey] = 0;
        }
  
        // Tính tổng doanh thu cho tháng hiện tại từ tất cả các hóa đơn
        invoiceData.forEach(invoice => {
          monthlyRevenue[monthKey] += invoice.tongTien; // Cộng thêm doanh thu vào tháng hiện tại
        });
  
        // Chuyển đối tượng monthlyRevenue thành một mảng các tháng và doanh thu
        const months = Object.keys(monthlyRevenue).sort(); // Sắp xếp các tháng theo thứ tự
        const revenues = months.map(month => monthlyRevenue[month]);
  
        // Cập nhật tổng doanh thu và số lượng hóa đơn
        setTotalRevenue(revenues.reduce((sum, rev) => sum + rev, 0)); // Cập nhật tổng doanh thu
        setTotalInvoices(invoiceData.length); // Cập nhật số lượng hóa đơn
  
        // Cập nhật dữ liệu cho biểu đồ
        setChartData({
          labels: months, // Các tháng
          datasets: [
            {
              label: 'Doanh thu', // Nhãn của biểu đồ
              data: revenues, // Dữ liệu doanh thu theo từng tháng
              backgroundColor: 'rgba(75, 192, 192, 0.6)', // Màu nền của cột
              borderColor: 'rgba(75, 192, 192, 1)', // Màu viền của cột
              borderWidth: 1, // Độ dày viền của cột
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching invoices:', error);
        setTotalRevenue(0); // Nếu có lỗi, set về 0
        setTotalInvoices(0); // Nếu có lỗi, set về 0
      });
  };
  

  // Lấy dữ liệu hóa đơn khi component được render và tiếp tục gọi API sau mỗi 30 giây
  useEffect(() => {
    fetchApplications();
    fetchInvoices();
    const intervalId = setInterval(() => {
      fetchApplications();
      fetchInvoices();
    }, 30000); // Lấy lại sau 30 giây

    return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
  }, []);

  // State để lưu dữ liệu biểu đồ
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // Các tùy chọn của biểu đồ
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Biểu đồ Doanh Thu Theo Tháng', // Tiêu đề của biểu đồ
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Doanh thu: ${formatNumberWithDots(tooltipItem.raw)} VND`; // Tùy chỉnh thông tin hiển thị khi hover
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tháng', // Tiêu đề cho trục X
        },
      },
      y: {
        title: {
          display: true,
          text: 'Doanh thu (VNĐ)', // Tiêu đề cho trục Y
        },
        ticks: {
          beginAtZero: true, // Đảm bảo trục Y bắt đầu từ 0
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h2>Bảng Điều Khiển</h2>

      {/* Thống kê Doanh thu */}
      <div className="dashboard-section">
        <div className="stat-card">
          <h3>Doanh thu</h3>
          <p className="stat-value">{`${formatNumberWithDots(totalRevenue)} VNĐ`}</p> {/* Hiển thị tổng doanh thu đã được định dạng */}
          <p className="stat-description">Tổng doanh thu tháng này</p>
        </div>

        {/* Thống kê Hóa đơn */}
        <div className="stat-card">
          <h3>Hóa đơn</h3>
          <p className="stat-value">{totalInvoices}</p> {/* Hiển thị số lượng hóa đơn từ state */}
          <p className="stat-description">Số lượng hóa đơn đã phát hành</p>
        </div>

        {/* Thống kê Đơn ứng tuyển */}
        <div className="stat-card">
          <h3>Đơn ứng tuyển</h3>
          <p className="stat-value">{totalApplications}</p> {/* Hiển thị số lượng đơn ứng tuyển */}
          <p className="stat-description">Số đơn ứng tuyển đã nộp</p>
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="chart-container">
        <h3>Biểu đồ Doanh Thu</h3>
        <div className="chart-placeholder">
          <Bar data={chartData} options={options} /> {/* Thay vì Line, dùng Bar */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
