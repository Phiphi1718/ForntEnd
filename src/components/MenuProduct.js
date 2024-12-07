import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MenuProduct.css';
import ProductModal from './ProductModal'; 
import CartButton from './CartButton';  
import FloatingButton from './FloatingButton';  

const MenuProduct = () => {
  const [products, setProducts] = useState({
    coffee: [],
    tea: [],
    milkTea: [],
    cake: [],
    iceBlended: []
  });
  const [loading, setLoading] = useState(true); 
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = () => {
    setLoading(true); 
    fetch('https://localhost:7095/api/Product/getall')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        if (data?.$values) {
          const categorizedProducts = {
            coffee: [],
            tea: [],
            milkTea: [],
            cake: [],
            iceBlended: []
          };

          data.$values.forEach((product) => {
            switch (product.categoryName?.toLowerCase()) {
              case 'coffee':
                categorizedProducts.coffee.push(product);
                break;
              case 'trà':
                categorizedProducts.tea.push(product);
                break;
              case 'trà sữa':
                categorizedProducts.milkTea.push(product);
                break;
              case 'bánh':
                categorizedProducts.cake.push(product);
                break;
              case 'ice blended':
                categorizedProducts.iceBlended.push(product);
                break;
              default:
                break;
            }
          });

          setProducts(categorizedProducts);
        }
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false); 
      });
  };

  useEffect(() => {
    fetchProducts(); 
    const intervalId = setInterval(fetchProducts, 30000); 

    return () => clearInterval(intervalId);
  }, []);

   // Điều kiện hiển thị "bàn tay"
   if (loading || Object.values(products).every((category) => category.length === 0)) {
    return (
      <div className="🤚">
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="🌴"></div>		
        <div className="👍"></div>
      </div>
    );
  }

  return (
    <div className="all-products-page1">
      <h1>Tất cả sản phẩm</h1>

      {/* Hiển thị từng danh mục nếu có sản phẩm */}
      {products.coffee.length > 0 && (
        <div className="product-category1">
          <h2>Cà phê</h2>
          <div className="product-list1">
            {products.coffee.map((product) => (
              <div key={product.id} className="product-item1">
                <Link to={`/product/${product.id}`}>
                  <img src={`https://localhost:7095/${product.imageUrl}`} alt={product.name} />
                  <div className="noidung">
                    <h3>{product.name}</h3>
                    <p>{product.price.toLocaleString()} đ</p>
                  </div> 
                </Link>
                <button
                  className="btn-buy"
                  onClick={() => setSelectedProduct(product)} 
                >
                  Đặt mua
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {products.tea.length > 0 && (
        <div className="product-category1">
          <h2>Trà</h2>
          <div className="product-list1">
            {products.tea.map((product) => (
              <div key={product.id} className="product-item1">
                <Link to={`/product/${product.id}`}>
                  <img src={`https://localhost:7095/${product.imageUrl}`} alt={product.name} />
                  <div className="noidung">
                    <h3>{product.name}</h3>
                    <p>{product.price.toLocaleString()} đ</p>
                  </div> 
                </Link>
                <button
                  className="btn-buy"
                  onClick={() => setSelectedProduct(product)} 
                >
                  Đặt mua
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lặp lại tương tự cho các danh mục khác */}
      {products.milkTea.length > 0 && (
        <div className="product-category1">
          <h2>Trà sữa</h2>
          <div className="product-list1">
            {products.milkTea.map((product) => (
              <div key={product.id} className="product-item1">
                <Link to={`/product/${product.id}`}>
                  <img src={`https://localhost:7095/${product.imageUrl}`} alt={product.name} />
                  <div className="noidung">
                    <h3>{product.name}</h3>
                    <p>{product.price.toLocaleString()} đ</p>
                  </div> 
                </Link>
                <button
                  className="btn-buy"
                  onClick={() => setSelectedProduct(product)} 
                >
                  Đặt mua
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {products.cake.length > 0 && (
        <div className="product-category1">
          <h2>Bánh</h2>
          <div className="product-list1">
            {products.cake.map((product) => (
              <div key={product.id} className="product-item1">
                <Link to={`/product/${product.id}`}>
                  <img src={`https://localhost:7095/${product.imageUrl}`} alt={product.name} />
                  <div className="noidung">
                    <h3>{product.name}</h3>
                    <p>{product.price.toLocaleString()} đ</p>
                  </div> 
                </Link>
                <button
                  className="btn-buy"
                  onClick={() => setSelectedProduct(product)} 
                >
                  Đặt mua
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {products.iceBlended.length > 0 && (
        <div className="product-category1">
          <h2>Ice Blended</h2>
          <div className="product-list1">
            {products.iceBlended.map((product) => (
              <div key={product.id} className="product-item1">
                <Link to={`/product/${product.id}`}>
                  <img src={`https://localhost:7095/${product.imageUrl}`} alt={product.name} />
                  <div className="noidung">
                    <h3>{product.name}</h3>
                    <p>{product.price.toLocaleString()} đ</p>
                  </div> 
                </Link>
                <button
                  className="btn-buy"
                  onClick={() => setSelectedProduct(product)} 
                >
                  Đặt mua
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <CartButton />   
      <FloatingButton /> 
    </div>
  );
};

export default MenuProduct;
