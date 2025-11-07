import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Projects', href: '/projects', current: location.pathname === '/projects' },
    { name: 'About', href: '/about', current: location.pathname === '/about' },
    { name: 'Contact', href: '/contact', current: location.pathname === '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <span className="logo-icon">✍️</span>
            <span className="logo-text">PenPro</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`nav-link ${item.current ? 'nav-link-active' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {/* Admin Link - Only show if logged in later */}
            {/* <li>
              <Link to="/admin" className="nav-link admin-link">
                Dashboard
              </Link>
            </li> */}
          </ul>

          {/* CTA Button */}
          <div className="nav-actions">
            <Link to="/contact" className="btn btn-primary btn-sm">
              Start Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'hamburger-open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <div className="mobile-menu-content">
            <ul className="mobile-nav-links">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`mobile-nav-link ${item.current ? 'mobile-nav-link-active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="btn btn-primary btn-sm mobile-cta"
                  onClick={closeMobileMenu}
                >
                  Start Project
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;