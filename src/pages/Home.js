import React, { useEffect, useState } from 'react';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Mock
    const mockProducts = [
      { id: 1, name: 'Product 1', image: 'https://cdn.quaisud.com/wp-content/uploads/fontaine-a-cocktail-en-verre.png.webp', price: 10 },
      { id: 2, name: 'Product 2', image: 'https://cdn.quaisud.com/wp-content/uploads/fontaine-a-cocktail-en-verre.png.webp', price: 20 },
      { id: 3, name: 'Product 3', image: 'https://cdn.quaisud.com/wp-content/uploads/fontaine-a-cocktail-en-verre.png.webp', price: 30 },
      { id: 4, name: 'Product 4', image: 'https://cdn.quaisud.com/wp-content/uploads/fontaine-a-cocktail-en-verre.png.webp', price: 40 },
      { id: 5, name: 'Product 5', image: 'https://cdn.quaisud.com/wp-content/uploads/fontaine-a-cocktail-en-verre.png.webp', price: 50 }
    ];
    // Loading time
    setTimeout(() => {
      setProducts(mockProducts);
    }, 1000); 
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <p>รายการสินค้า</p>
      <div className="product-list">
        {products.map(product => (
          <a key={product.id} href={`/product/${product.id}`} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} บาท</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Home;
