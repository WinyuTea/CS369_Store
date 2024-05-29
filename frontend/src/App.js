import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Add from './pages/Add';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token is present in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Update state to reflect logout
    setLoggedIn(false);
    // Redirect to the home page or any other desired page
    navigate('/');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Home</h1>
        <div className="nav-icon">
          {/* Conditionally render Add Product and Logout buttons based on login status */}
          {loggedIn && <Link to="/add"><button className="nav-button">Add Product</button></Link>}
          {loggedIn && <button className="nav-button" onClick={handleLogout}>Logout</button>}
          {!loggedIn && <Link to="/login"><button className="nav-button">Login</button></Link>}
          {!loggedIn && <Link to="/signup"><button className="nav-button">Sign Up</button></Link>}
        </div>
      </header>
      <div className="main-content">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/add"
            element={loggedIn ? <Add /> : navigate('/login')}
          />
        </Routes>
      </div>
      <footer className="footer">
        <p>CS369 Group Project</p>
        <p className="name">6409610745 วิญญู รังสีเลิศ</p>
        <p className="name">6409682561 พีร์ โพชนา</p>
      </footer>
    </div>
  );
}

export default App;