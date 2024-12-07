import React, { useState } from "react";
import axios from "axios";
import './ProductManager.css';

const ToppingManager = () => {
  const [error, setError] = useState("");
  const [editTopping, setEditTopping] = useState(null);
  const [oldToppingName, setOldToppingName] = useState(""); // Tên topping cũ
  const [deleteToppingName, setDeleteToppingName] = useState("");

  const [addToppingName, setAddToppingName] = useState("");
  const [addToppingPrice, setAddToppingPrice] = useState("");
  const [addToppingDescription, setAddToppingDescription] = useState("");
  const [addImg, setAddImg] = useState([]);

  const [editToppingName, setEditToppingName] = useState("");
  const [editToppingPrice, setEditToppingPrice] = useState("");
  const [editToppingDescription, setEditToppingDescription] = useState("");
  const [editImg, setEditImages] = useState([]);

  const [searchToppingName, setSearchToppingName] = useState("");
  const [toppings, setToppings] = useState([]);
  const [isToppingsVisible, setIsToppingsVisible] = useState(false);

  /*------------------------------add topping ----------------------------------*/
  const handleAddTopping = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", addToppingName);
    formData.append("Price", addToppingPrice);
    formData.append("Description", addToppingDescription);
    addImg.forEach((img) => formData.append("Img", img));

    try {
      await axios.post("https://localhost:7030/api/Toping/AddTopping", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setError("Topping đã được thêm thành công");
    } catch {
      setError("Có lỗi xảy ra khi thêm topping");
    }
  };

  /*------------------------------kiếm topping ----------------------------------*/
  const handleSearchTopping = async (e) => {
    e.preventDefault();
    if (!searchToppingName) {
      setError("Vui lòng nhập tên topping cần tìm");
      return;
    }
  
    try {
      // Sửa lại đường dẫn API cho đúng với backend, không có dấu / giữa Find và tên topping
      const response = await axios.get(
        `https://localhost:7030/api/Toping/Find${searchToppingName}`  // Đảm bảo không có dấu / sau "Find"
      );
  
      // Kiểm tra và cập nhật topping trả về
      if (response.data) {
        setEditTopping(response.data);  // Cập nhật topping từ backend
        setOldToppingName(searchToppingName);
        setError("");  // Reset lỗi nếu tìm thấy topping
      }
    } catch (error) {
      setError("Không tìm thấy topping");
      setEditTopping(null);
      console.error(error);  // Ghi lại lỗi nếu có
    }
  };

  /*------------------------------edit topping ----------------------------------*/
  const handleEditTopping = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("OldName", oldToppingName);
    formData.append("Name", editToppingName);
    formData.append("Price", editToppingPrice);
    formData.append("Description", editToppingDescription);
    editImg.forEach((img) => formData.append("Img", img));

    try {
        await axios.put(`https://localhost:7030/api/Toping/edit/${oldToppingName}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }, 
      });
      setError("Topping đã được chỉnh sửa thành công");
    } catch {
      setError("Có lỗi xảy ra khi chỉnh sửa topping");
    }
  };

  /*------------------------------xóa topping ----------------------------------*/
  const handleDeleteTopping = async (e) => {
    e.preventDefault();
    if (!deleteToppingName) {
      setError("Vui lòng nhập tên topping cần xóa");
      return;
    }

    try {
      await axios.delete(`https://localhost:7030/api/Toping/Delete/${deleteToppingName}`);
      setError("Topping đã được xóa thành công");
      setDeleteToppingName("");
    } catch {
      setError("Có lỗi xảy ra khi xóa topping");
    }
  };

  /*------------------------------getall topping ----------------------------------*/
  const toggleToppingVisibility = () => {
    setIsToppingsVisible(!isToppingsVisible);
    if (!isToppingsVisible) {
      fetchToppings();
    }
  };

  const fetchToppings = async () => {
    try {
      const response = await axios.get("https://localhost:7095/api/Toping/Getall");
      setToppings(response.data.$values);
      setError("");
    } catch (err) {
      setError("Không thể lấy danh sách topping.");
    }
  };

  return (
    <div className="pm-container">
      <h2 className="pm-title">Form Quản lý Topping</h2>
      
      <div className="pm-add-form">
        <h3 className="pm-section-title">Thêm Topping</h3>
        <form onSubmit={handleAddTopping} className="pm-form">
          <div className="pm-form-group">
            <label className="pm-label">Tên topping:</label>
            <input
              type="text"
              className="pm-input"
              value={addToppingName}
              onChange={(e) => setAddToppingName(e.target.value)}
              placeholder="Nhập tên topping"
              required
            />
          </div>
          <div className="pm-form-group">
            <label className="pm-label">Giá topping:</label>
            <input
              type="number"
              className="pm-input"
              value={addToppingPrice}
              onChange={(e) => setAddToppingPrice(e.target.value)}
              placeholder="Nhập giá topping"
              required
            />
          </div>
          <div className="pm-form-group">
            <label className="pm-label">Mô tả topping:</label>
            <textarea
              className="pm-textarea"
              value={addToppingDescription}
              onChange={(e) => setAddToppingDescription(e.target.value)}
              placeholder="Nhập mô tả topping"
              required
            />
          </div>
          <div className="pm-form-group">
            <label className="pm-label">Chọn hình ảnh topping:</label>
            <input type="file" multiple onChange={(e) => setAddImg([...e.target.files])} />
          </div>
          <button type="submit" className="pm-button">Thêm Topping</button>
        </form>
      </div>

      <div className="pm-search-form">
        <h6 className="pm-section-title">Tìm kiếm và Chỉnh Sửa Topping</h6>
        <form onSubmit={handleSearchTopping} className="pm-form">
          <div className="pm-form-group">
            <label className="pm-label">Tên topping cần tìm:</label>
            <input
              type="text"
              className="pm-input"
              value={searchToppingName}
              onChange={(e) => setSearchToppingName(e.target.value)}
              placeholder="Nhập tên topping cần tìm"
              required
            />
          </div>
          <button type="submit" className="pm-button">Tìm kiếm</button>
        </form>

        {editTopping && (
  <div className="pm-product-info">
    <h5 className="pm-info-title">Topping tìm thấy</h5>
    <p className="pm-info-item"><strong>Tên topping:</strong> {editTopping.name}</p>
    <p className="pm-info-item"><strong>Giá:</strong> {editTopping.price} VND</p>
    <p className="pm-info-item"><strong>Mô tả:</strong> {editTopping.description}</p>
    <div className="pm-image-container">
      {editTopping.img ? (
        <img
          src={`https://localhost:7095/${editTopping.img}`}
          alt={editTopping.name}
          className="pm-product-image"
        />
      ) : (
        <p>Không có hình ảnh</p>
      )}
    </div>
  </div>
)}


        {editTopping && (
          <form onSubmit={handleEditTopping} className="pm-form">
            <div className="pm-form-group">
              <label className="pm-label">Tên cũ:</label>
              <input
                type="text"
                className="pm-input"
                value={oldToppingName}
                onChange={(e) => setOldToppingName(e.target.value)}
                placeholder="Nhập tên cũ"
                required
              />
            </div>
            <div className="pm-form-group">
              <label className="pm-label">Tên topping mới:</label>
              <input
                type="text"
                className="pm-input"
                value={editToppingName}
                onChange={(e) => setEditToppingName(e.target.value)}
                placeholder="Nhập tên topping mới"
                required
              />
            </div>
            <div className="pm-form-group">
              <label className="pm-label">Giá topping mới:</label>
              <input
                type="number"
                className="pm-input"
                value={editToppingPrice}
                onChange={(e) => setEditToppingPrice(e.target.value)}
                placeholder="Nhập giá topping mới"
                required
              />
            </div>
            <div className="pm-form-group">
              <label className="pm-label">Mô tả topping mới:</label>
              <textarea
                className="pm-textarea"
                value={editToppingDescription}
                onChange={(e) => setEditToppingDescription(e.target.value)}
                placeholder="Nhập mô tả topping mới"
                required
              />
            </div>
            <div className="pm-form-group">
              <label className="pm-label">Chọn hình ảnh mới:</label>
              <input type="file" multiple onChange={(e) => setEditImages([...e.target.files])} />
            </div>
            <button type="submit" className="pm-button">Chỉnh sửa topping</button>
          </form>
        )}
      </div>

      <div className="pm-delete-form">
        <h3 className="pm-section-title">Xóa Topping</h3>
        <form onSubmit={handleDeleteTopping} className="pm-form">
          <div className="pm-form-group">
            <label className="pm-label">Tên topping cần xóa:</label>
            <input
              type="text"
              className="pm-input"
              value={deleteToppingName}
              onChange={(e) => setDeleteToppingName(e.target.value)}
              placeholder="Nhập tên topping cần xóa"
              required
            />
          </div>
          <button type="submit" className="pm-button">Xóa Topping</button>
        </form>
      </div>

      <div className="pm-toppings">
      <button onClick={toggleToppingVisibility} className="pm-button">
    {isToppingsVisible ? "Ẩn Danh Sách Topping" : "Hiển Thị Danh Sách Topping"}
  </button>
        {isToppingsVisible && (
           <ul className="pm-list">
          {toppings.length === 0 ? (
            <p>Không có topping nào.</p>
          ) : (
            toppings.map((topping) => (
              <div key={topping.id} className="pm-list-item">
                <h4 className="pm-info-item">Tên topping :{topping.name}</h4>
                <p className="pm-info-item">Giá: {topping.price} VND</p>
                <p className="pm-info-item">Mô tả: {topping.description}</p>
                <div className="pm-image-container">
                {topping.img && (
                  <img
                    src={`https://localhost:7095/${topping.img}`}
                    alt={topping.name}
                    className="pm-product-image"
                  />
                )}
                </div>
              </div>
            ))
          )}
        </ul>
        )}
      </div>

      {error && <div className="pm-error">{error}</div>}
    </div>
  );
};

export default ToppingManager;
