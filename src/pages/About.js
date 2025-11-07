import React from 'react';

const About = () => {
  const skills = [
    {
      category: 'Writing & Storytelling',
      items: ['Creative Writing', 'Technical Writing', 'Copywriting', 'Script Writing', 'Poetry']
    },
    {
      category: 'Editing & Proofreading',
      items: ['Line Editing', 'Copy Editing', 'Developmental Editing', 'Proofreading', 'Manuscript Review']
    },
    {
      category: 'Research & Analysis',
      items: ['Academic Research', 'Market Research', 'Fact-Checking', 'Content Analysis', 'Trend Analysis']
    },
    {
      category: 'Tools & Technologies',
      items: ['Google Docs', 'Microsoft Word', 'Scrivener', 'Grammarly', 'SEO Tools']
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'First Novel Published',
      description: 'Published debut novel that received critical acclaim and established writing career.'
    },
    {
      year: '2019',
      title: 'Freelance Writing Business',
      description: 'Started taking on freelance projects for various clients and publications.'
    },
    {
      year: '2020',
      title: 'Content Agency Collaboration',
      description: 'Began working with content agencies on large-scale writing projects.'
    },
    {
      year: '2022',
      title: 'Specialization Development',
      description: 'Focused on niche areas including tech writing and creative fiction.'
    },
    {
      year: '2023',
      title: 'PenPro Establishment',
      description: 'Launched PenPro to offer comprehensive writing services to clients worldwide.'
    }
  ];

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <div className="about-hero-text">
              <h1>About PenPro</h1>
              <p className="lead">
                I believe that every great project starts with a compelling story. 
                With over 5 years of professional writing experience, I've helped 
                clients transform their ideas into engaging, impactful content.
              </p>
              <p>
                My journey began with a passion for storytelling and has evolved 
                into a career dedicated to helping others share their messages 
                with the world. Whether it's a novel, business content, or 
                creative projects, I bring the same level of dedication and 
                craftsmanship to every word.
              </p>
            </div>
            <div className="about-hero-visual">
              <div className="profile-card card">
                <div className="profile-avatar">👨‍💻</div>
                <h3>Professional Writer</h3>
                <p>Specializing in creative and technical writing</p>
                <div className="profile-stats">
                  <div className="profile-stat">
                    <div className="stat-number">5+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                  <div className="profile-stat">
                    <div className="stat-number">50+</div>
                    <div className="stat-label">Projects</div>
                  </div>
                  <div className="profile-stat">
                    <div className="stat-number">25+</div>
                    <div className="stat-label">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="philosophy-section section section-light">
          <div className="container-sm">
            <div className="section-header text-center">
              <h2>My Writing Philosophy</h2>
            </div>
            <div className="philosophy-grid">
              <div className="philosophy-card">
                <div className="philosophy-icon">🎯</div>
                <h3>Purpose-Driven Writing</h3>
                <p>
                  Every piece of writing should serve a clear purpose. 
                  I focus on understanding your goals and crafting content 
                  that achieves them effectively.
                </p>
              </div>
              <div className="philosophy-card">
                <div className="philosophy-icon">💡</div>
                <h3>Creative Innovation</h3>
                <p>
                  I believe in pushing creative boundaries while maintaining 
                  clarity and coherence. Innovation meets practicality in every project.
                </p>
              </div>
              <div className="philosophy-card">
                <div className="philosophy-icon">🤝</div>
                <h3>Collaborative Approach</h3>
                <p>
                  Writing is a partnership. I work closely with clients to 
                  ensure their voice and vision are reflected in every word.
                </p>
              </div>
              <div className="philosophy-card">
                <div className="philosophy-icon">⚡</div>
                <h3>Efficiency & Quality</h3>
                <p>
                  Delivering high-quality work on time is non-negotiable. 
                  I maintain rigorous standards while respecting deadlines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section section">
          <div className="section-header">
            <h2>Skills & Expertise</h2>
            <p className="section-description">
              A comprehensive set of writing and editing skills developed through 
              years of practice and continuous learning.
            </p>
          </div>
          <div className="skills-grid">
            {skills.map((skillCategory, index) => (
              <div key={index} className="skill-category card">
                <h3 className="skill-category-title">{skillCategory.category}</h3>
                <ul className="skill-list">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <li key={skillIndex} className="skill-item">
                      <span className="skill-marker">•</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Journey Section */}
        <section className="journey-section section section-light">
          <div className="container-sm">
            <div className="section-header text-center">
              <h2>My Writing Journey</h2>
              <p className="section-description">
                From first publication to establishing PenPro, here are the key milestones 
                that have shaped my writing career.
              </p>
            </div>
            <div className="timeline">
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker">{milestone.year}</div>
                  <div className="timeline-content card">
                    <h3>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta section">
          <div className="container-sm text-center">
            <h2>Ready to Start Your Writing Project?</h2>
            <p>
              Let's collaborate to create something amazing. Whether you have a 
              clear vision or just the beginning of an idea, I'm here to help 
              bring it to life with words that resonate.
            </p>
            <div className="cta-actions">
              <a href="/contact" className="btn btn-primary btn-lg">
                Start Your Project
              </a>
              <a href="/projects" className="btn btn-secondary btn-lg">
                View My Work
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;