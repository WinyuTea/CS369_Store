import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css'; // Importing styles from App.css
import Image from '../images/side_eye_cat.jpg';

function Product() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch all products from the backend
        const response = await fetch(`http://localhost:3000/product`);
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        // Parse the JSON data
        const products = await response.json();
        
        // Find the product with the matching ID
        const selectedProduct = products.find(product => product._id === id);
        
        // Update the state with the fetched product data
        setProduct(selectedProduct);
      } catch (error) {
        // Handle any errors
        setError(error.message);
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <div>Error fetching product: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h2>{product.prod_name}</h2>
        <div className="nav-icon">
        <Link to="/"><button className="nav-button">Home</button></Link>
        </div>
      </header>
      <div className="product-detail">
        <img src={Image} alt={product.prod_name} />
        <p>Price: {product.prod_price} บาท</p>
        <div className="description-box">
          <p>{product.prod_desc}</p>
        </div>
      </div>
      <footer className="footer">
        <p>CS369 Group Project</p>
      </footer>
    </div>
  );
}

export default Product;
