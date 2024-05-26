import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(false); // Reset success state

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to sign up');
      }

      setSuccess(true);
      // Navigate to login page or home page after a short delay
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Sign Up</h1>
        <Link to="/"><button className="nav-button">Home</button></Link>
      </header>
      <div className="main-content center-content">
        <div className="login-form">
          {error && <div className="error">{error}</div>}
          {success && <div className="success">Sign up successful! Redirecting to login...</div>}
          <form onSubmit={handleSignup}>
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
            <button type="submit" className="nav-button">Sign Up</button>
          </form>
        </div>
      </div>
      <footer className="footer">
        <p>CS369 Group Project</p>
      </footer>
    </div>
  );
}

export default Signup;
