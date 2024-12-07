import React, { useState } from "react";
import axios from "axios";
import "./JobApplicationSearch.css"; // Import CSS

const JobApplication = () => {
  // State cho phần tìm kiếm theo tên
  const [name, setName] = useState(""); // Tên người dùng nhập
  const [jobApplication, setJobApplication] = useState(null); // Dữ liệu đơn ứng tuyển khi tìm kiếm theo tên

  // State cho phần lấy tất cả đơn ứng tuyển
  const [jobApplications, setJobApplications] = useState([]); // Dữ liệu tất cả đơn ứng tuyển

  const [error, setError] = useState(null); // Thông báo lỗi

  // Hàm lấy tất cả đơn ứng tuyển
  const getAllJobApplications = async () => {
    try {
      const response = await axios.get("https://localhost:7095/api/JobApplication/Getall");
      console.log(response.data); // Log dữ liệu để kiểm tra
      setJobApplications(response.data.$values); // Lấy dữ liệu từ $values
      setJobApplication(null); // Clear dữ liệu tìm kiếm khi lấy tất cả đơn ứng tuyển
      setError(null); // Clear lỗi nếu có
    } catch (err) {
      setError("Đã xảy ra lỗi khi kết nối với server!");
    }
  };
  

  // Hàm tìm kiếm theo tên
  const handleSearch = async () => {
    try {
      setError(null); // Xóa lỗi cũ
      setJobApplications([]); // Xóa dữ liệu "Lấy tất cả" khi tìm kiếm theo tên

      const response = await axios.get(
        `https://localhost:7095/api/JobApplication/ByName/${name}`
      );

      setJobApplication(response.data); // Cập nhật dữ liệu tìm được từ API
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Không tìm thấy đơn xin việc!");
      } else {
        setError("Đã xảy ra lỗi khi kết nối với server!");
      }
    }
  };

  return (
    <div className="job-search-container">
      <h2 className="job-search-title">Tìm kiếm đơn xin việc</h2>

      {/* Phần Tìm kiếm theo tên */}
      <div className="job-search-box">
        <h3 className="job-search-subtitle">Tìm kiếm theo tên</h3>
        <div className="job-search-input-container">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên ứng viên"
            className="job-search-input-field"
          />
        </div>
        <button onClick={handleSearch} className="job-search-button">
          Tìm kiếm
        </button>

        {/* Kết quả tìm kiếm theo tên */}
        {jobApplication && (
          <div className="job-search-result-card">
            <h3 className="job-search-result-title">Thông tin chi tiết</h3>
            <div className="job-search-info">
              <div className="job-search-info-left">
                <p className="job-search-info-item">
                  <strong>Tên:</strong> {jobApplication.fullName}
                </p>
                <p className="job-search-info-item">
                  <strong>Ngày sinh:</strong>{" "}
                  {new Date(jobApplication.birthDate).toLocaleDateString()}
                </p>
                <p className="job-search-info-item">
                  <strong>Số CCCD:</strong> {jobApplication.citizenId}
                </p>
                <p className="job-search-info-item">
                  <strong>Số điện thoại:</strong> {jobApplication.phone}
                </p>
                <p className="job-search-info-item">
                  <strong>Email:</strong> {jobApplication.email}
                </p>
              </div>
              <div className="job-search-info-right">
                <p className="job-search-info-item">
                  <strong>Giới tính:</strong> {jobApplication.gender}
                </p>
                <p className="job-search-info-item">
                  <strong>Trình độ học vấn:</strong>{" "}
                  {jobApplication.educationLevel}
                </p>
                <p className="job-search-info-item">
                  <strong>Địa chỉ:</strong> {jobApplication.address}
                </p>
                <p className="job-search-info-item">
                  <strong>Vị trí ứng tuyển:</strong> {jobApplication.position}
                </p>
              </div>
            </div>
            <div className="job-search-applicant-image-container">
              <strong>Ảnh:</strong>
              <br />
              <img
                src={`https://localhost:7095/${jobApplication.image}`}
                alt="Ảnh ứng viên"
                className="job-search-applicant-image"
              />
            </div>
          </div>
        )}
      </div>

      {/* Phần Lấy tất cả đơn ứng tuyển */}
      <div className="job-search-box">
        <h3 className="job-search-subtitle">Lấy tất cả đơn ứng tuyển</h3>
        <button onClick={getAllJobApplications} className="job-search-button">
          Lấy tất cả
        </button>

{/* Kết quả lấy tất cả đơn ứng tuyển */}
{jobApplications.length > 0 && (
  <div className="job-search-all-results">
    <h3>Tất cả đơn xin việc</h3>
    <ul>
      {jobApplications.map((application) => (
        <li key={application.citizenId}>
            <div className="application-info-container">
            <div className="application-info-img-container">
    {application.image ? (
      <img src={`https://localhost:7095/${application.image}`} alt="Ảnh ứng viên" />
    ) : (
      <span>Không có ảnh</span>
    )}
  </div>
          <p className="application-info"><strong>Tên:</strong> {application.fullName || "Chưa có thông tin"}</p>
<p className="application-info"><strong>Ngày sinh:</strong> {application.birthDate ? new Date(application.birthDate).toLocaleDateString() : "Chưa có thông tin"}</p>
<p className="application-info"><strong>Số CMND:</strong> {application.citizenId || "Chưa có thông tin"}</p>
<p className="application-info"><strong>Số điện thoại:</strong> {application.phone || "Chưa có thông tin"}</p>
<p className="application-info"><strong>Email:</strong> {application.email || "Chưa có thông tin"}</p>
<p className="application-info"><strong>Giới tính:</strong> {application.gender || "Chưa có thông tin"}</p>
<p className="application-info"><strong>Trình độ học vấn:</strong> {application.educationLevel || "Chưa có thông tin"}</p>
<p className="application-info"><strong>Địa chỉ:</strong> {application.address || "Chưa có thông tin"}</p>
<p className="application-info"><strong>Vị trí ứng tuyển:</strong> {application.position || "Chưa có thông tin"}</p>
</div>
          <hr />
        </li>
      ))}
    </ul>
  </div>
)}

      </div>

      {/* Hiển thị thông báo lỗi */}
      {error && <p className="job-search-error-message">{error}</p>}
    </div>
  );
};

export default JobApplication;
