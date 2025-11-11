import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { penproAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await penproAPI.login(credentials);
      
      if (response.success) {
        // Store token and user info (in a real app, use secure storage)
        localStorage.setItem('penpro_token', response.token);
        localStorage.setItem('penpro_user', JSON.stringify(response.user));
        
        // Redirect to dashboard
        navigate('/admin/dashboard');
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to login. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials helper
  const fillDemoCredentials = () => {
    setCredentials({
      username: 'biggiewareku',
      password: '@Faded2002369'
    });
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card card">
          <div className="login-header">
            <div className="login-logo">
              <span className="logo-icon">✍️</span>
              <span className="logo-text">PenPro Admin</span>
            </div>
            <h1>Admin Login</h1>
            <p>Access your dashboard to manage projects and inquiries</p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>❌</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg w-100"
            >
              {loading ? (
                <LoadingSpinner size="small" text="Signing in..." />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          

          <div className="login-footer">
            <p>
              <a href="/" className="text-link">
                ← Back to Main Site
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;