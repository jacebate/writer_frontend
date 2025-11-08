import React from 'react';

const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    category,
    status,
    tags = [],
    wordCount,
    completionDate,
    excerpt
  } = project;

  // Category icons
  const categoryIcons = {
    novel: '📚',
    content: '📝',
    ghostwriting: '👻',
    editing: '✏️',
    other: '📄'
  };

  // Status badges
  const statusConfig = {
    completed: { label: 'Completed', class: 'status-completed' },
    ongoing: { label: 'In Progress', class: 'status-ongoing' },
    draft: { label: 'Draft', class: 'status-draft' }
  };

  const statusInfo = statusConfig[status] || statusConfig.draft;

  // Format word count
  const formatWordCount = (count) => {
    if (!count) return '';
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k words`;
    }
    return `${count} words`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="project-card card fade-in">
      {/* Project Image */}
      <div className="project-image">
        <div className="project-image-placeholder">
          <span className="project-category-icon">
            {categoryIcons[category] || categoryIcons.other}
          </span>
        </div>
        
        {/* Status Badge */}
        <div className={`project-status ${statusInfo.class}`}>
          {statusInfo.label}
        </div>
      </div>

      {/* Project Content */}
      <div className="project-content">
        {/* Category */}
        <div className="project-category">
          <span className="category-badge">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </div>

        {/* Title */}
        <h3 className="project-title">{title}</h3>

        {/* Description */}
        <p className="project-description">{description}</p>

        {/* Excerpt */}
        {excerpt && (
          <div className="project-excerpt">
            <p>"{excerpt}"</p>
          </div>
        )}

        {/* Meta Information */}
        <div className="project-meta">
          {wordCount && (
            <div className="meta-item">
              <span className="meta-icon">📖</span>
              <span className="meta-text">{formatWordCount(wordCount)}</span>
            </div>
          )}
          
          {completionDate && (
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span className="meta-text">{formatDate(completionDate)}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="project-tags">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="project-tag">
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="project-tag-more">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="project-actions">
          <button className="btn btn-ghost btn-sm">
            <span>👁️</span>
            View Details
          </button>
          <button className="btn btn-primary btn-sm">
            <span>💬</span>
            Inquire
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;