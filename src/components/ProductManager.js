import React, { useState } from "react";
import axios from "axios";
import './ProductManager.css';

const ProductManager  = () => {
  const [error, setError] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [oldProductName, setOldProductName] = useState(""); // Tên sản phẩm cũ
  const [deleteProductName, setDeleteProductName] = useState("");

  const [addProductName, setAddProductName] = useState("");
  const [addProductPrice, setAddProductPrice] = useState("");
  const [addProductDescription, setAddProductDescription] = useState("");
  const [addCategoryId, setAddCategoryId] = useState("");
  const [addImages, setAddImages] = useState([]);

  const [editProductName, setEditProductName] = useState("");
  const [editProductPrice, setEditProductPrice] = useState("");
  const [editProductDescription, setEditProductDescription] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editImages, setEditImages] = useState([]);

  const [searchProductName, setSearchProductName] = useState("");
  const [products, setProducts] = useState([]);
  const [isProductsVisible, setIsProductsVisible] = useState(false);

  const categories = [
    { id: 1, name: "Trà" },
    { id: 2, name: "Coffee" },
    { id: 3, name: "Ăn vặt" },
    { id: 4, name: "Trà sữa" },
    { id: 5, name: "Ice Blended" },
  ];

  /*------------------------------add sản phẩm ----------------------------------*/
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", addProductName);
    formData.append("Price", addProductPrice);
    formData.append("Description", addProductDescription);
    formData.append("CategoryId", addCategoryId);
    addImages.forEach((image) => formData.append("Images", image));

    try {
      await axios.post("https://localhost:7095/api/Product/addProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setError("Sản phẩm đã được thêm thành công");
    } catch {
      setError("Có lỗi xảy ra khi thêm sản phẩm");
    }
  };

  /*------------------------------kiếm sản phẩm ----------------------------------*/
  const handleSearchProduct = async (e) => {
    e.preventDefault();
    if (!searchProductName) {
      setError("Vui lòng nhập tên sản phẩm cần tìm");
      return;
    }
  
    try {
      const response = await axios.get(
        `https://localhost:7095/api/Product/find/${searchProductName}`
      );
      setEditProduct(response.data);
      setOldProductName(searchProductName);
      setError("");
    } catch {
      setError("Không tìm thấy sản phẩm");
      setEditProduct(null);
    }
  };

  /*------------------------------edit sản phẩm ----------------------------------*/
  const handleEditProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("OldName", oldProductName);
    formData.append("Name", editProductName);
    formData.append("Price", editProductPrice);
    formData.append("Description", editProductDescription);
    formData.append("CategoryId", editCategoryId);
    editImages.forEach((image) => formData.append("Images", image));

    try {
      await axios.put(`https://localhost:7095/api/Product/edit products/${oldProductName}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setError("Sản phẩm đã được chỉnh sửa thành công");
    } catch {
      setError("Có lỗi xảy ra khi chỉnh sửa sản phẩm");
    }
  };

  /*------------------------------xóa sản phẩm ----------------------------------*/
  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    if (!deleteProductName) {
      setError("Vui lòng nhập tên sản phẩm cần xóa");
      return;
    }

    try {
      await axios.delete(`https://localhost:7095/api/Product/delete/${deleteProductName}`);
      setError("Sản phẩm đã được xóa thành công");
      setDeleteProductName("");
    } catch {
      setError("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  /*------------------------------getall sản phẩm ----------------------------------*/
  const toggleProductsVisibility = () => {
    setIsProductsVisible(!isProductsVisible);
    if (!isProductsVisible) {
      fetchProducts();
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:7095/api/Product/getall");
      setProducts(response.data.$values);
      setError("");
    } catch (err) {
      setError("Không thể lấy danh sách sản phẩm.");
    }
  };

  return (
    <div className="pm-container">
     <h2 className="pm-title">Form Quản lý Sản Phẩm</h2>
      
     <div className="pm-add-form">
     <h3 className="pm-section-title">Thêm Sản Phẩm</h3>
     <form onSubmit={handleAddProduct} className="pm-form">
          <div className="pm-form-group">
          <label className="pm-label">Tên sản phẩm:</label>
          <input
              type="text"
              className="pm-input"
              value={addProductName}
              onChange={(e) => setAddProductName(e.target.value)}
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>
          <div className="pm-form-group">
          <label className="pm-label">Giá sản phẩm:</label>
          <input
              type="number"
              className="pm-input"
              value={addProductPrice}
              onChange={(e) => setAddProductPrice(e.target.value)}
              placeholder="Nhập giá sản phẩm"
              required
            />
          </div>
          <div className="pm-form-group">
          <label className="pm-label">Mô tả sản phẩm:</label>
          <textarea
              className="pm-textarea"
              value={addProductDescription}
              onChange={(e) => setAddProductDescription(e.target.value)}
              placeholder="Nhập mô tả sản phẩm"
              required
            />
          </div>
          <div className="pm-form-group">
          <label className="pm-label">Danh mục sản phẩm:</label>
          <select
              className="pm-select"
              value={addCategoryId}
              onChange={(e) => setAddCategoryId(e.target.value)}
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="pm-form-group">
          <label className="pm-label">Chọn hình ảnh sản phẩm:</label>
            <input type="file" multiple onChange={(e) => setAddImages([...e.target.files])} />
          </div>
          <button type="submit" className="pm-button">Thêm Sản Phẩm</button>
        </form>
      </div>

      <div className="pm-search-form">
      <h6 className="pm-section-title">Tìm kiếm và Chỉnh Sửa Sản Phẩm</h6>
      <form onSubmit={handleSearchProduct} className="pm-form">
      <div className="pm-form-group">
      <label className="pm-label">Tên sản phẩm cần tìm:</label>
            <input
              type="text"
              className="pm-input"
              value={searchProductName}
              onChange={(e) => setSearchProductName(e.target.value)}
              placeholder="Nhập tên sản phẩm cần tìm"
              required
            />
          </div>
          <button type="submit" className="pm-button">Tìm kiếm</button>
        </form>

        {editProduct && (
          <div className="pm-product-info">
             <h5 className="pm-info-title">Sản phẩm tìm thấy</h5>
            <p className="pm-info-item"><strong>Tên sản phẩm:</strong> {editProduct.name}</p>
            <p className="pm-info-item"><strong>Giá:</strong> {editProduct.price} VND</p>
            <p className="pm-info-item"><strong>Mô tả:</strong> {editProduct.description}</p>
            <p className="pm-info-item"><strong>Danh mục:</strong> {editProduct.categoryName}</p>
            <div className="pm-image-container">
              {editProduct.imageUrls?.$values && editProduct.imageUrls.$values.length > 0 ? (
                <img
                  src={`https://localhost:7095/${editProduct.imageUrls.$values[0]}`}
                  alt={editProduct.name}
                  className="pm-product-image"
                />
              ) : (
                <p>Không có hình ảnh</p>
              )}
            </div>
          </div>
        )}

        {editProduct && (
           <form onSubmit={handleEditProduct} className="pm-form">
             <div className="pm-form-group">
              <label className="pm-label">Tên cũ:</label>
              <input
                type="text"
                className="pm-input"
                value={oldProductName}
                onChange={(e) => setOldProductName(e.target.value)}
                placeholder="Nhập tên cũ"
                required
              />
            </div>
            <div className="pm-form-group">
            <label className="pm-label">Tên sản phẩm mới:</label>
            <input
              type="text"
              className="pm-input"
              value={editProductName}
              onChange={(e) => setEditProductName(e.target.value)}
              placeholder="Nhập tên sản phẩm mới"
              required
            />
            </div>
            <div className="pm-form-group">
            <label className="pm-label">Giá sản phẩm mới:</label>
            <input
              type="number"
              className="pm-input"
              value={editProductPrice}
              onChange={(e) => setEditProductPrice(e.target.value)}
              placeholder="Nhập giá sản phẩm mới"
              required
            />
            </div>
            <div className="pm-form-group">
            <label className="pm-label">Mô tả sản phẩm mới:</label>
              <textarea
              className="pm-textarea"
                value={editProductDescription}
                onChange={(e) => setEditProductDescription(e.target.value)}
                placeholder="Nhập mô tả mới"
                required
              />
            </div>
            <div className="pm-form-group">
            <label className="pm-label">Danh mục sản phẩm mới:</label>
            <select
              className="pm-select"
              value={editCategoryId}
              onChange={(e) => setEditCategoryId(e.target.value)}
              required
            >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="pm-form-group">
            <label className="pm-label">Chọn hình ảnh mới:</label>
              <input type="file" multiple onChange={(e) => setEditImages([...e.target.files])} />
            </div>
            <button type="submit" className="pm-button">Chỉnh sửa sản phẩm</button>
          </form>
        )}
      </div>

      <div className="pm-delete-form">
      <h6 className="pm-section-title">Xóa Sản Phẩm</h6>
      <form onSubmit={handleDeleteProduct} className="pm-form">
      <div className="pm-form-group">
      <label className="pm-label">Tên sản phẩm cần xóa:</label>
            <input
              type="text"
              className="pm-input"
              value={deleteProductName}
              onChange={(e) => setDeleteProductName(e.target.value)}
              placeholder="Nhập tên sản phẩm cần xóa"
              required
            />
          </div>
          <button type="submit" className="pm-button">Xóa sản phẩm</button>
        </form>
      </div>

      <div className="pm-view-all-products">
      <button onClick={toggleProductsVisibility} className="pm-button">
    {isProductsVisible ? "Ẩn Danh Sách Sản Phẩm" : "Hiển Thị Danh Sách Sản Phẩm"}
  </button>

  {isProductsVisible && (
    <ul className="pm-list">
       
      {products.map((product) => (
        <li key={product.id} className="pm-list-item">
          <p className="pm-info-item"><strong>Tên:</strong> {product.name}</p>
                  <p className="pm-info-item"><strong>Giá:</strong> {product.price} VND</p>
                  <p className="pm-info-item"><strong>Mô tả:</strong> {product.description}</p>
                  <p className="pm-info-item"><strong>Danh mục:</strong> {product.categoryName}</p>
                  <div className="pm-image-container">
            {product.imageUrl ? (
              <img
                src={`https://localhost:7095/${product.imageUrl}`}
                alt={product.name}
                className="pm-product-image"
              />
            ) : (
              <p>Không có hình ảnh</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )}
</div>


{error && <p className="pm-error-message">{error}</p>}
    </div>
  );
};

export default ProductManager;
