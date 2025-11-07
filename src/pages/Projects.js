import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { penproAPI } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'novel', label: 'Novels' },
    { key: 'content', label: 'Content' },
    { key: 'ghostwriting', label: 'Ghostwriting' },
    { key: 'editing', label: 'Editing' }
  ];

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => project.category === activeFilter)
      );
    }
  }, [activeFilter, projects]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await penproAPI.getProjects();
      
      if (response.success) {
        setProjects(response.data);
        setFilteredProjects(response.data);
      } else {
        setError('Failed to load projects');
      }
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Unable to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (filterKey) => {
    setActiveFilter(filterKey);
  };

  if (loading) {
    return (
      <div className="projects-page">
        <div className="container">
          <LoadingSpinner text="Loading projects..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-page">
        <div className="container">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Unable to Load Projects</h3>
            <p>{error}</p>
            <button onClick={loadProjects} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>My Projects</h1>
          <p className="page-description">
            Explore my portfolio of writing projects and published works. 
            Each project represents a unique collaboration and creative journey.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => handleFilterClick(filter.key)}
              className={`filter-tab ${activeFilter === filter.key ? 'filter-tab-active' : ''}`}
            >
              {filter.label}
              {filter.key !== 'all' && (
                <span className="filter-count">
                  {projects.filter(p => p.category === filter.key).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-content">
          {filteredProjects.length > 0 ? (
            <>
              <div className="projects-meta">
                <p>
                  Showing {filteredProjects.length} of {projects.length} projects
                  {activeFilter !== 'all' && ` in ${filters.find(f => f.key === activeFilter)?.label}`}
                </p>
              </div>
              
              <div className="projects-grid">
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          ) : (
            <div className="no-projects">
              <div className="no-projects-icon">📝</div>
              <h3>No Projects Found</h3>
              <p>
                {activeFilter === 'all' 
                  ? "There are no projects to display at the moment."
                  : `No ${filters.find(f => f.key === activeFilter)?.label} projects found.`
                }
              </p>
              {activeFilter !== 'all' && (
                <button 
                  onClick={() => setActiveFilter('all')}
                  className="btn btn-primary"
                >
                  View All Projects
                </button>
              )}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="projects-cta">
          <div className="cta-card card">
            <div className="cta-content">
              <h3>Have a Project in Mind?</h3>
              <p>
                Let's discuss how we can work together to bring your ideas to life. 
                I'm always excited to take on new creative challenges.
              </p>
              <div className="cta-actions">
                <a href="/contact" className="btn btn-primary">
                  Start a Project
                </a>
                <a href="/about" className="btn btn-secondary">
                  Learn About My Process
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;