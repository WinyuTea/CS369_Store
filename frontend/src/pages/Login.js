import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="app">
      <header className="header">
        <h1>Login</h1>
        <Link to="/"><button className="nav-button">Home</button></Link>
      </header>
      <div className="main-content center-content">
        <div className="login-form">
          <form>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" className="form-control" />
            </div>
            <button type="submit" className="nav-button">Login</button>
          </form>
        </div>
      </div>
      <footer className="footer">
        <p>CS369 Group Project</p>
      </footer>
    </div>
  );
}

export default Login;
