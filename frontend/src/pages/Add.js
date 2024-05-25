import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../App.css';

function Add() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    prod_name: "",
    prod_price: "",
    prod_image_path: null,
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
      const dat = Object.fromEntries(formData);
      console.log(dat)
      const response = await Axios.post('http://localhost:3000/product', dat, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  };

  const handleFileChange = (e) => {
    const newdata = { ...data };
    newdata.prod_image_path = e.target.files[0];
    setData(newdata);
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
