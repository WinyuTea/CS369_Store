import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setTimeout(async () => {
                    // Fetch data from the backend
                    const response = await fetch('http://localhost:3000/product');
                    
                    // Check if the response is successful
                    if (!response.ok) {
                        throw new Error('Failed to fetch');
                    }
                    
                    // Parse the JSON data
                    const data = await response.json();
                    
                    // Update the state with the fetched data
                    setData(data);
                }, 1000);
            } catch (error) {
                // Handle any errors
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
                <Link key={product._id} to={`/product/${product._id}`} className="product-item">
                    <img src={product.prod_image_path} alt={product.prod_name} />
                    <h3>{product.prod_name}</h3> 
                    <p>{product.prod_price} บาท</p>
                    <p>{product.prod_desc}</p>
                </Link>
            ))}
            </div>
        </div>
    );
}

export default Home;
