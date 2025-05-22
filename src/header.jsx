import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Header() {
  return (
    <div className="navigation">
      <div className="logo-text">Watch Zone</div>
     <div className="logo-name" > Time is gold</div>
      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/watches">Watches</Link>
        <Link to="/catalog">Catalog</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Header;
