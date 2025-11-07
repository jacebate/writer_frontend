import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { penproAPI } from '../services/api';

const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = penproAPI.getCurrentUser();

  const handleLogout = async () => {
    try {
      await penproAPI.logout();
      navigate('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout anyway
      localStorage.removeItem('penpro_token');
      localStorage.removeItem('penpro_user');
      navigate('/admin');
    }
  };

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/projects', label: 'Projects', icon: '📚' },
    { path: '/admin/inquiries', label: 'Inquiries', icon: '💬' }
  ];

  return (
    <header className="admin-header">
      <div className="container">
        <div className="admin-navbar">
          {/* Logo and Brand */}
          <div className="admin-brand">
            <Link to="/admin/dashboard" className="admin-logo">
              <span className="logo-icon">✍️</span>
              <span className="logo-text">PenPro Admin</span>
            </Link>
          </div>

          {/* Admin Navigation */}
          <nav className="admin-nav">
            <ul className="admin-nav-links">
              {adminLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`admin-nav-link ${
                      location.pathname === link.path ? 'admin-nav-link-active' : ''
                    }`}
                  >
                    <span className="nav-icon">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Actions */}
          <div className="admin-actions">
            <span className="admin-user">Welcome, {currentUser?.username}</span>
            <Link to="/" className="btn btn-ghost btn-sm" target="_blank">
              👀 View Site
            </Link>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;