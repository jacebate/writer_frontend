import React, { useState, useEffect } from 'react';
import { penproAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All Inquiries' },
    { key: 'new', label: 'New' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'email', label: 'Email' }
  ];

  useEffect(() => {
    loadInquiries();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredInquiries(inquiries);
    } else if (activeFilter === 'new') {
      setFilteredInquiries(inquiries.filter(inq => inq.status === 'new'));
    } else {
      setFilteredInquiries(inquiries.filter(inq => inq.type === activeFilter));
    }
  }, [activeFilter, inquiries]);

  const loadInquiries = async () => {
    try {
      const response = await penproAPI.getInquiries();
      if (response.success) {
        setInquiries(response.data);
        setFilteredInquiries(response.data);
      } else {
        setError('Failed to load inquiries');
      }
    } catch (err) {
      console.error('Error loading inquiries:', err);
      setError('Unable to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (inquiryId, status) => {
    try {
      const response = await penproAPI.updateInquiryStatus(inquiryId, status);
      if (response.success) {
        // Update local state
        setInquiries(prev => prev.map(inq => 
          inq.id === inquiryId ? { ...inq, status } : inq
        ));
      } else {
        setError('Failed to update inquiry status');
      }
    } catch (err) {
      console.error('Error updating inquiry:', err);
      setError('Unable to update inquiry status');
    }
  };

  const handleStatusChange = (inquiryId, newStatus) => {
    updateInquiryStatus(inquiryId, newStatus);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { label: 'New', class: 'status-new', icon: '🆕' },
      contacted: { label: 'Contacted', class: 'status-contacted', icon: '💬' },
      'in-progress': { label: 'In Progress', class: 'status-progress', icon: '🔄' },
      completed: { label: 'Completed', class: 'status-completed', icon: '✅' },
      archived: { label: 'Archived', class: 'status-archived', icon: '📁' }
    };

    const config = statusConfig[status] || statusConfig.new;
    return (
      <span className={`status-badge ${config.class}`}>
        {config.icon} {config.label}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    return type === 'whatsapp' ? '💚 WhatsApp' : '📧 Email';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'archived', label: 'Archived' }
  ];

  if (loading) {
    return (
      <div className="admin-inquiries">
        <div className="container">
          <LoadingSpinner text="Loading inquiries..." />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-inquiries">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>Manage Inquiries</h1>
            <p>View and manage all client inquiries from your website</p>
          </div>
          <div className="header-stats">
            <div className="stat">
              <div className="stat-value">{inquiries.length}</div>
              <div className="stat-label">Total Inquiries</div>
            </div>
            <div className="stat">
              <div className="stat-value">
                {inquiries.filter(i => i.status === 'new').length}
              </div>
              <div className="stat-label">New</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>❌</span>
            {error}
            <button onClick={() => setError('')} className="alert-close">×</button>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`filter-tab ${activeFilter === filter.key ? 'filter-tab-active' : ''}`}
            >
              {filter.label}
              {filter.key !== 'all' && (
                <span className="filter-count">
                  {filter.key === 'new' 
                    ? inquiries.filter(i => i.status === 'new').length
                    : inquiries.filter(i => i.type === filter.key).length
                  }
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Inquiries List */}
        <div className="inquiries-list">
          {filteredInquiries.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💬</div>
              <h3>No Inquiries Found</h3>
              <p>
                {activeFilter === 'all' 
                  ? "You haven't received any inquiries yet."
                  : `No ${filters.find(f => f.key === activeFilter)?.label.toLowerCase()} inquiries found.`
                }
              </p>
            </div>
          ) : (
            <div className="inquiries-grid">
              {filteredInquiries.map(inquiry => (
                <div key={inquiry.id} className="inquiry-card card">
                  <div className="inquiry-header">
                    <div className="inquiry-meta">
                      <div className="inquiry-type">
                        {getTypeIcon(inquiry.type)}
                      </div>
                      <div className="inquiry-date">
                        {formatDate(inquiry.timestamp)}
                      </div>
                    </div>
                    <div className="inquiry-status">
                      {getStatusBadge(inquiry.status)}
                    </div>
                  </div>

                  <div className="inquiry-content">
                    <div className="inquiry-client">
                      <h3 className="client-name">{inquiry.name}</h3>
                      <div className="client-email">{inquiry.email}</div>
                    </div>

                    <div className="inquiry-details">
                      <div className="detail-item">
                        <strong>Project Type:</strong> {inquiry.projectType}
                      </div>
                      {inquiry.budget && inquiry.budget !== 'Not specified' && (
                        <div className="detail-item">
                          <strong>Budget:</strong> {inquiry.budget}
                        </div>
                      )}
                      {inquiry.timeline && inquiry.timeline !== 'Not specified' && (
                        <div className="detail-item">
                          <strong>Timeline:</strong> {inquiry.timeline}
                        </div>
                      )}
                    </div>

                    {inquiry.message && (
                      <div className="inquiry-message">
                        <strong>Message:</strong>
                        <p>{inquiry.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="inquiry-footer">
                    <div className="status-selector">
                      <label>Update Status:</label>
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                        className="status-select"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="inquiry-actions">
                      {inquiry.type === 'email' ? (
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="btn btn-primary btn-sm"
                        >
                          📧 Reply
                        </a>
                      ) : (
                        <a
                          href={`https://wa.me/${inquiry.phone || ''}`}
                          className="btn btn-success btn-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          💚 WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        {inquiries.length > 0 && (
          <div className="inquiries-stats">
            <div className="stats-card card">
              <h3>Inquiry Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{inquiries.length}</div>
                  <div className="stat-label">Total</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">
                    {inquiries.filter(i => i.type === 'whatsapp').length}
                  </div>
                  <div className="stat-label">WhatsApp</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">
                    {inquiries.filter(i => i.type === 'email').length}
                  </div>
                  <div className="stat-label">Email</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">
                    {inquiries.filter(i => i.status === 'new').length}
                  </div>
                  <div className="stat-label">Pending</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inquiries;