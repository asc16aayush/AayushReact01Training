
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/movies" className="nav-link">
            Movie Catalog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
