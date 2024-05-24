import React, { useState } from 'react';
import '../App.css'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: null,
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to the server for processing
    console.log(formData);
    // You can add logic to send the form data to your backend API here
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      // If the input is for image, store the file object
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0] // Get the first file from the files array
      }));
    } else {
      // For other inputs, update the form data as usual
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  return (
    <div className="app">
    <header className="header">
      <h2>Add Product</h2>
      <div className="nav-icon">
          <Link to="/"><button className="nav-button">Home</button></Link>
    </div>
    </header>
      <form className="content" onSubmit={handleSubmit}> {}
        <div className="form-group"> {}
          <label>Name:</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} /> {}
        </div>
        <div className="form-group"> {}
          <label>Price:</label>
          <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} /> {}
        </div>
        <div className="form-group"> {}
          <label>Image:</label>
          <input type="file" className="form-control" name="image" onChange={handleChange} /> {}
        </div>
        <div className="form-group"> {}
          <label>Description:</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} /> {}
        </div>
        <button className="nav-button" type="submit">Add Product</button> {}
      </form>
      <footer className="footer">
        <p>CS369 Group Project</p>
      </footer>
    </div>
  );
}

export default AddProduct;
