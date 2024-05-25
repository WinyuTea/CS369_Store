import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './pages/Login';
import Signup from './pages/Signup'; // Import the Signup component

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Home</h1>
        <div className="nav-icon">
          <Link to="/add"><button className="nav-button">Add Product</button></Link>
          <Link to="/login"><button className="nav-button">Login</button></Link>
          <Link to="/signup"><button className="nav-button">Sign Up</button></Link> {/* Add Signup link */}
        </div>
      </header>
      <div className="main-content">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> {/* Add Signup route */}
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>
      <footer className="footer">
        <p>CS369 Group Project</p>
      </footer>
    </div>
  );
}

export default App;
