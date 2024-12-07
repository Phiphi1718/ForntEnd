import React, { useState } from 'react';
import axios from 'axios';
import './RecruitmentForm.css'; // Đảm bảo bạn đã import CSS

const RecruitmentForm = () => {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [citizenId, setCitizenId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState('');
  const [images, setImages] = useState([]); // Dùng mảng để lưu nhiều hình ảnh
  const [imagePreview, setImagePreview] = useState([]); // Lưu hình ảnh preview

  const handleFileChange = (e) => {
    const selectedImages = Array.from(e.target.files);  // Chuyển đổi fileList thành mảng
    setImages(selectedImages);
    
    // Tạo preview hình ảnh từ các tệp đã chọn
    const imagePreviews = selectedImages.map((image) =>
      URL.createObjectURL(image)  // Tạo URL tạm thời cho mỗi hình ảnh
    );
    setImagePreview(imagePreviews);  // Cập nhật mảng hình ảnh preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu tất cả các trường đã được nhập đầy đủ
    if (!fullName || !birthDate || !citizenId || !phone || !email || !gender || !educationLevel || !address || !position) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Tạo đối tượng FormData để gửi lên server
    const formData = new FormData();
    formData.append('FullName', fullName);
    formData.append('BirthDate', birthDate);
    formData.append('CitizenId', citizenId);
    formData.append('Phone', phone);
    formData.append('Email', email);
    formData.append('Gender', gender);
    formData.append('EducationLevel', educationLevel);
    formData.append('Address', address);
    formData.append('Position', position);

    // Thêm ảnh vào formData
    images.forEach(image => {
      formData.append('Images', image);
    });

    try {
      // Gửi yêu cầu POST lên API
      const response = await axios.post('https://localhost:7095/api/JobApplication/AddJobApplication', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Đảm bảo header phù hợp với FormData
        },
      });

      // Xử lý kết quả sau khi gửi thành công
      alert("Ứng tuyển thành công!");
      // Có thể thêm các hành động khác sau khi thành công, ví dụ: reset form
    } catch (error) {
      console.error('Có lỗi khi gửi đơn ứng tuyển:', error);
      alert("Đã xảy ra lỗi, vui lòng thử lại sau!");
    }
  };

  return (
    <div className="job-application-form-container">
      <div className="job-application-form-header">
        <h2>Đăng Ký Ứng Tuyển</h2>
      </div>
      <div className="job-application-form-body">
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className="input-field"
            type="date"
            placeholder="Ngày sinh"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Số CMND"
            value={citizenId}
            onChange={(e) => setCitizenId(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select className="input-field" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Chọn giới tính</option>
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
          </select>

          {/* Cập nhật danh sách trình độ học vấn */}
          <select
            className="input-field"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
          >
            <option value="">Chọn trình độ học vấn</option>
            {[...Array(12).keys()].map(i => (
              <option key={i} value={`Lớp ${i + 1}`}>Lớp {i + 1}</option>
            ))}
            <option value="Cao đẳng">Cao đẳng</option>
            <option value="Đại học">Đại học</option>
            <option value="Thạc sĩ">Thạc sĩ</option>
            <option value="Tiến sĩ">Tiến sĩ</option>
          </select>

          <input
            className="input-field"
            type="text"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Vị trí ứng tuyển"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

<div className="image-upload-container">
  <label htmlFor="file-upload" className="image-upload-label">
    <div className="image-upload-preview">
      {imagePreview.length > 0 ? (
        imagePreview.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Hình ảnh ${index + 1}`}
            className="image-preview"
          />
        ))
      ) : (
        <span>Thêm hình ảnh</span> // Văn bản hiển thị khi chưa có ảnh
      )}
    </div>
  </label>
  <input
    id="file-upload"
    className="input-file"
    type="file"
    multiple
    onChange={handleFileChange}
  />
</div>


          <button className="submit-btn" type="submit">Nộp đơn</button>
        </form>
      </div>
    </div>
  );
};

export default RecruitmentForm;
