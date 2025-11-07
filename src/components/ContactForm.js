import React, { useState } from 'react';
import { penproAPI } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
    budget: '',
    timeline: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});

  const projectTypes = [
    { value: '', label: 'Select Project Type' },
    { value: 'novel', label: 'Novel Writing' },
    { value: 'content', label: 'Content Writing' },
    { value: 'ghostwriting', label: 'Ghostwriting' },
    { value: 'editing', label: 'Editing & Proofreading' },
    { value: 'other', label: 'Other' }
  ];

  const budgetOptions = [
    { value: '', label: 'Select Budget Range' },
    { value: 'under-1k', label: 'Under $1,000' },
    { value: '1k-5k', label: '$1,000 - $5,000' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-plus', label: '$10,000+' },
    { value: 'discuss', label: 'Need to Discuss' }
  ];

  const timelineOptions = [
    { value: '', label: 'Select Timeline' },
    { value: 'asap', label: 'ASAP' },
    { value: '1-month', label: '1 Month' },
    { value: '1-3-months', label: '1-3 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: '6-plus-months', label: '6+ Months' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Project type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (type) => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccess('');
    
    try {
      let result;
      
      if (type === 'whatsapp') {
        result = await penproAPI.submitWhatsAppInquiry(formData);
      } else {
        result = await penproAPI.submitEmailInquiry(formData);
      }

      if (result.success) {
        setSuccess(`Opening ${type === 'whatsapp' ? 'WhatsApp' : 'email'}...`);
        
        // Open the respective app
        setTimeout(() => {
          window.open(
            type === 'whatsapp' ? result.data.whatsappUrl : result.data.mailtoUrl,
            '_blank'
          );
        }, 500);

        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            projectType: '',
            message: '',
            budget: '',
            timeline: ''
          });
          setSuccess('');
        }, 3000);
      }
    } catch (error) {
      console.error(`Error submitting ${type} inquiry:`, error);
      setErrors({ submit: `Failed to submit ${type} inquiry. Please try again.` });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppSubmit = () => handleSubmit('whatsapp');
  const handleEmailSubmit = () => handleSubmit('email');

  return (
    <div className="contact-form-container">
      <div className="contact-form-header">
        <h2>Start Your Writing Project</h2>
        <p>Tell me about your project and I'll get back to you within 24 hours.</p>
      </div>

      {success && (
        <div className="alert alert-success">
          <span>✅</span>
          {success}
        </div>
      )}

      {errors.submit && (
        <div className="alert alert-error">
          <span>❌</span>
          {errors.submit}
        </div>
      )}

      <form className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? 'error' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? 'error' : ''}`}
              placeholder="your.email@example.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="projectType" className="form-label">
            Project Type *
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={`form-control ${errors.projectType ? 'error' : ''}`}
          >
            {projectTypes.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.projectType && <span className="error-message">{errors.projectType}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="budget" className="form-label">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="form-control"
            >
              {budgetOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timeline" className="form-label">
              Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="form-control"
            >
              {timelineOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Project Details
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-control"
            rows="6"
            placeholder="Tell me about your project... What's the genre? Target audience? Specific requirements? Any references or examples you'd like to share?"
          />
        </div>

        <div className="contact-buttons">
          <button
            type="button"
            onClick={handleWhatsAppSubmit}
            disabled={loading}
            className="btn btn-whatsapp btn-lg"
          >
            {loading ? (
              <LoadingSpinner size="small" />
            ) : (
              <>
                <span>💬</span>
                Contact via WhatsApp
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleEmailSubmit}
            disabled={loading}
            className="btn btn-email btn-lg"
          >
            {loading ? (
              <LoadingSpinner size="small" />
            ) : (
              <>
                <span>📧</span>
                Contact via Email
              </>
            )}
          </button>
        </div>

        <div className="form-note">
          <p>
            <strong>Note:</strong> Both options will open your preferred app with a pre-filled message. 
            You can review and edit the message before sending.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;