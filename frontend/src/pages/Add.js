import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../App.css';

function Add() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    prod_name: "",
    prod_price: "",
    prod_image_path: "",
    prod_desc: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      return navigate('/login');
    }
  
    try {
      const formData = new FormData();
      formData.append('prod_name', data.prod_name);
      formData.append('prod_price', data.prod_price);
      formData.append('prod_image_path', data.prod_image_path);
      formData.append('prod_desc', data.prod_desc);

      // Logging FormData content
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      const response = await Axios.post('http://localhost:3000/product', {
        prod_name: data.prod_name,
        prod_price: data.prod_price,
        prod_image_path: data.prod_image_path,
        prod_desc: data.prod_desc
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Response:', response.data);
  
      const { _id, prod_name, prod_price, prod_image_path, prod_desc } = response.data;
      console.log('Product Details:');
      console.log('ID:', _id);
      console.log('Name:', prod_name);
      console.log('Price:', prod_price);
      console.log('Image Path:', prod_image_path);
      console.log('Description:', prod_desc);
  
      navigate('/');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  };

  const handleFileChange = (e) => {
    const newdata = { ...data };
    newdata.prod_image_path = e.target.files[0];
    setData(newdata);
    console.log(newdata);
  };

  return (
    <div className="app">
      <header className="header">
        <h2>Add Product</h2>
        <div className="nav-icon">
          <Link to="/"><button className="nav-button">Home</button></Link>
        </div>
      </header>
      <form className="content" onSubmit={submit}>
        <div className="form-group">
          <label>Name:</label>
          <input className="form-control" onChange={handle} id="prod_name" value={data.prod_name} placeholder="Product's Name" type="text" />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input className="form-control" onChange={handle} id="prod_price" value={data.prod_price} placeholder="Product's Price" type="number" />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input className="form-control" onChange={handleFileChange} id="prod_image_path" type="file" />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea className="form-control" onChange={handle} id="prod_desc" value={data.prod_desc} placeholder="Product's Description" />
        </div>
        <button className="nav-button" type="submit">Add Product</button>
      </form>
      <footer className="footer">
        <p>CS369 Group Project</p>
      </footer>
    </div>
  );
}

export default Add;
