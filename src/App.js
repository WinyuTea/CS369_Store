import React from 'react';
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Home</h1>
        <button className="login-button">Login</button>
      </header>
      <div className="main-content">
        <main className="content">
          <Home />
        </main>
      </div>
      <footer className="footer">
        <p>CS369 Group Project</p>
      </footer>
    </div>
  );
}

export default App;