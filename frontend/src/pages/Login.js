import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to login');
      }

      // Save the token in local storage or context
      localStorage.setItem('token', data.token);

      // Redirect to the home page or any other page
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Login</h1>
        <Link to="/"><button className="nav-button">Home</button></Link>
      </header>
      <div className="main-content center-content">
        <div className="login-form">
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="nav-button">Login</button>
          </form>
        </div>
      </div>
      <footer className="footer">
        <p>CS369 Group Project</p>
        <p className="name">6409610745 วิญญู รังสีเลิศ</p>
        <p className="name">6409682561 พีร์ โพชนา</p>
      </footer>
    </div>
  );
}

export default Login;