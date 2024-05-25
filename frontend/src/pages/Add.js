import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Add() {
  const url = "http://localhost:3000/product";
  const [data, setData] = useState({
    name: "",
    price: "",
    image: null,
    description: ""
  });

  function submit(e) {
    e.preventDefault();
    Axios.post(url, {
      name: data.name,
      price: data.price,
      image: data.image,
      description: data.description
    })
      .then(res => {
        console.log(res.data);
      })
  }

  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value;
    setData(newdata)
    console.log(newdata)
  }

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
          <input className="form-control" onChange={(e)=>handle(e)} id="name" value={data.name} placeholder="Product's Name" type="text" />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input className="form-control" onChange={(e)=>handle(e)} id="price" value={data.price} placeholder="Product's Price" type="number" />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input className="form-control" onChange={(e)=>handle(e)} id="image" placeholder="Product's Image" type="file" />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea className="form-control" onChange={(e)=>handle(e)} id="description" value={data.description} placeholder="Product's Description" />
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
