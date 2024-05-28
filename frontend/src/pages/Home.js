import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/product');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error fetching products: {error}</div>;
  }

  return (
    <div className="product-container">
      <h2>Product List</h2>
      <h3>รายการสินค้า</h3>
      <div className="product-list">
        {data.map((product) => (
          <Link key={product.productID} to={`/product/${product.productID}`} className="product-item">
            <img src={`http://localhost:3000/images/${product.productImage}`} alt={product.productName} />
            <h3>{product.productName}</h3>
            <p>{product.productPrice} บาท</p>
            <p>{product.productDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
