import React, { useState, useEffect } from 'react';
import { penproAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'novel',
    image: '',
    status: 'draft',
    featured: false,
    tags: '',
    wordCount: '',
    completionDate: '',
    excerpt: ''
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await penproAPI.getProjects();
      if (response.success) {
        setProjects(response.data);
      } else {
        setError('Failed to load projects');
      }
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Unable to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        wordCount: formData.wordCount ? parseInt(formData.wordCount) : undefined
      };

      let response;
      if (editingProject) {
        response = await penproAPI.updateProject(editingProject.id, projectData);
      } else {
        response = await penproAPI.addProject(projectData);
      }

      if (response.success) {
        await loadProjects();
        resetForm();
        setShowAddForm(false);
        setEditingProject(null);
      } else {
        setError(response.error || 'Failed to save project');
      }
    } catch (err) {
      console.error('Error saving project:', err);
      setError('Unable to save project');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'novel',
      image: '',
      status: 'draft',
      featured: false,
      tags: '',
      wordCount: '',
      completionDate: '',
      excerpt: ''
    });
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image || '',
      status: project.status,
      featured: project.featured || false,
      tags: project.tags?.join(', ') || '',
      wordCount: project.wordCount || '',
      completionDate: project.completionDate || '',
      excerpt: project.excerpt || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await penproAPI.deleteProject(projectId);
      if (response.success) {
        await loadProjects();
      } else {
        setError('Failed to delete project');
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Unable to delete project');
    }
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setShowAddForm(false);
    resetForm();
  };

  const categories = [
    { value: 'novel', label: 'Novel' },
    { value: 'content', label: 'Content Writing' },
    { value: 'ghostwriting', label: 'Ghostwriting' },
    { value: 'editing', label: 'Editing' },
    { value: 'other', label: 'Other' }
  ];

  const statuses = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
  ];

  if (loading && !showAddForm) {
    return (
      <div className="admin-projects">
        <div className="container">
          <LoadingSpinner text="Loading projects..." />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-projects">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>Manage Projects</h1>
            <p>Add, edit, and manage your portfolio projects</p>
          </div>
          <div className="header-actions">
            <button
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary"
            >
              + Add Project
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>❌</span>
            {error}
            <button onClick={() => setError('')} className="alert-close">×</button>
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="project-form-section">
            <div className="form-card card">
              <div className="form-header">
                <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                <button onClick={cancelEdit} className="btn btn-ghost btn-sm">
                  Cancel
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="project-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-control"
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      {statuses.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Word Count</label>
                    <input
                      type="number"
                      name="wordCount"
                      value={formData.wordCount}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g., 50000"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Completion Date</label>
                    <input
                      type="date"
                      name="completionDate"
                      value={formData.completionDate}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Featured</label>
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="checkbox"
                      />
                      <span>Feature this project</span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="fiction, drama, romance (comma separated)"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Excerpt</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    className="form-control"
                    rows="2"
                    placeholder="A compelling excerpt from the project..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project')}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="projects-list-section">
          <div className="section-header">
            <h2>Your Projects ({projects.length})</h2>
          </div>

          {projects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3>No Projects Yet</h3>
              <p>Get started by adding your first project to the portfolio.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary"
              >
                Add Your First Project
              </button>
            </div>
          ) : (
            <div className="projects-table">
              <div className="table-header">
                <div className="table-row">
                  <div className="table-cell">Project</div>
                  <div className="table-cell">Category</div>
                  <div className="table-cell">Status</div>
                  <div className="table-cell">Featured</div>
                  <div className="table-cell">Actions</div>
                </div>
              </div>
              <div className="table-body">
                {projects.map(project => (
                  <div key={project.id} className="table-row">
                    <div className="table-cell">
                      <div className="project-info">
                        <div className="project-title">{project.title}</div>
                        <div className="project-description">
                          {project.description.substring(0, 60)}...
                        </div>
                      </div>
                    </div>
                    <div className="table-cell">
                      <span className={`category-badge category-${project.category}`}>
                        {project.category}
                      </span>
                    </div>
                    <div className="table-cell">
                      <span className={`status-badge status-${project.status}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="table-cell">
                      {project.featured ? '⭐' : '-'}
                    </div>
                    <div className="table-cell">
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEdit(project)}
                          className="btn btn-ghost btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="btn btn-ghost btn-sm text-error"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsManager;