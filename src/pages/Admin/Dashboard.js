import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { penproAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await penproAPI.getDashboardData();
      
      if (response.success) {
        setDashboardData(response.data);
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Unable to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color }) => (
    <div className={`stat-card ${color ? `stat-card-${color}` : ''}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <LoadingSpinner text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Unable to Load Dashboard</h3>
            <p>{error}</p>
            <button onClick={loadDashboardData} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Dashboard</h1>
            <p>Welcome to your PenPro admin dashboard</p>
          </div>
          <div className="header-actions">
            <Link to="/admin/projects" className="btn btn-primary">
              Manage Projects
            </Link>
            <Link to="/admin/inquiries" className="btn btn-secondary">
              View Inquiries
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <StatCard
            title="Total Projects"
            value={dashboardData?.totalProjects || 0}
            icon="📚"
            color="primary"
          />
          <StatCard
            title="Total Inquiries"
            value={dashboardData?.totalInquiries || 0}
            subtitle={`${dashboardData?.inquiryStats?.new || 0} new`}
            icon="💬"
            color="secondary"
          />
          <StatCard
            title="WhatsApp Leads"
            value={dashboardData?.inquiryStats?.whatsapp || 0}
            icon="💚"
            color="success"
          />
          <StatCard
            title="Email Leads"
            value={dashboardData?.inquiryStats?.email || 0}
            icon="📧"
            color="info"
          />
        </div>

        {/* Recent Activity */}
        <div className="dashboard-sections">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Inquiries</h2>
              <Link to="/admin/inquiries" className="btn btn-ghost btn-sm">
                View All
              </Link>
            </div>
            <div className="section-content">
              {dashboardData?.recentInquiries?.length > 0 ? (
                <div className="recent-list">
                  {dashboardData.recentInquiries.slice(0, 5).map((inquiry, index) => (
                    <div key={index} className="recent-item">
                      <div className="recent-icon">
                        {inquiry.type === 'whatsapp' ? '💚' : '📧'}
                      </div>
                      <div className="recent-details">
                        <div className="recent-title">{inquiry.name}</div>
                        <div className="recent-subtitle">
                          {inquiry.projectType} • {inquiry.type}
                        </div>
                      </div>
                      <div className="recent-time">
                        {new Date(inquiry.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">💬</div>
                  <p>No recent inquiries</p>
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Project Categories</h2>
            </div>
            <div className="section-content">
              {dashboardData?.projectCategories?.length > 0 ? (
                <div className="categories-list">
                  {dashboardData.projectCategories.map((category, index) => (
                    <div key={index} className="category-item">
                      <span className="category-name">{category}</span>
                      <span className="category-count">
                        {dashboardData.totalProjects || 0}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📚</div>
                  <p>No project categories</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/admin/projects" className="action-card card">
              <div className="action-icon">📚</div>
              <h3>Manage Projects</h3>
              <p>Add, edit, and delete portfolio projects</p>
            </Link>
            <Link to="/admin/inquiries" className="action-card card">
              <div className="action-icon">📋</div>
              <h3>Manage Inquiries</h3>
              <p>View and respond to client inquiries</p>
            </Link>
            <a href="/" className="action-card card" target="_blank" rel="noopener noreferrer">
              <div className="action-icon">👀</div>
              <h3>View Site</h3>
              <p>See how your portfolio looks to visitors</p>
            </a>
            <div className="action-card card">
              <div className="action-icon">📊</div>
              <h3>Analytics</h3>
              <p>View website traffic and engagement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;