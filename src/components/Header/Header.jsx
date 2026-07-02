import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/timeline', label: 'Timeline' },
    { path: '/auction', label: 'Auction' },
    { path: '/donar', label: 'Donors' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/prizes', label: 'Prizes' },
    { path: '/contact', label: 'Contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <nav className="nav-container">
        
        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <motion.ul
          className={`nav-links ${isOpen ? 'active' : ''}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {navLinks.map((link, index) => (
            <motion.li
              key={link.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.path}
                className={`nav-btn ${location.pathname === link.path ? 'active-btn' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </header>
  );
};

export default Header;