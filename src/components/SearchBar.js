import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]); // Dữ liệu sản phẩm từ API
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fetch dữ liệu sản phẩm từ API
  useEffect(() => {
    axios
      .get('https://localhost:7095/api/Product/getall')
      .then(response => {
        const fetchedProducts = response.data.$values || [];
        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        } else {
          console.error('Không có sản phẩm nào trong API');
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchText(query);

    if (query) {
      const filteredSuggestions = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchText(product.name);
    setSuggestions([]);  // Ẩn gợi ý ngay sau khi chọn sản phẩm

    // Lưu sản phẩm vào localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(product));

    // Điều hướng đến trang chi tiết
    navigate('/ProductDetail');
  };

  const handleSearchBlur = () => {
    // Chỉ ẩn gợi ý khi không còn kết quả
    if (!searchText) {
      setSuggestions([]);
    }
  };

  return (
    <div className="search-container">
      <div className="search-icon">
        <img src="/search.png" alt="Search Icon" style={{ width: '20px', height: '20px' }} />
      </div>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        onBlur={handleSearchBlur}
        placeholder="Tìm sản phẩm..."
      />

      {suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((product) => (
            <div
              key={product.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(product)}
            >
              <img
                src={`https://localhost:7095/${product.imageUrl}`}
                alt={product.name}
                width="50"
                style={{ borderRadius: '50%' }}
              />
              <p>{product.name} - {product.price} VND</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
