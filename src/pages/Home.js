import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: '📚',
      title: 'Novel Writing',
      description: 'Compelling fiction and non-fiction novels with rich character development and engaging narratives.',
      highlights: ['Character Development', 'Plot Structuring', 'World Building']
    },
    {
      icon: '📝',
      title: 'Content Writing',
      description: 'Engaging articles, blogs, and web content that captivates readers and drives engagement.',
      highlights: ['SEO Optimization', 'Content Strategy', 'Brand Voice']
    },
    {
      icon: '👻',
      title: 'Ghostwriting',
      description: 'Your ideas, professionally written. Maintain your voice while benefiting from expert writing.',
      highlights: ['Confidentiality', 'Voice Matching', 'Professional Quality']
    },
    {
      icon: '✏️',
      title: 'Editing & Proofreading',
      description: 'Polish your work to perfection with comprehensive editing and proofreading services.',
      highlights: ['Line Editing', 'Copy Editing', 'Proofreading']
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '100K+', label: 'Words Written' },
    { number: '25+', label: 'Happy Clients' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Crafting Stories That <span className="text-primary">Captivate</span> and Inspire
              </h1>
              <p className="hero-description">
                Professional writing services for novels, content, and creative projects. 
                Let's bring your ideas to life with words that resonate and stories that endure.
              </p>
              <div className="hero-actions">
                <Link to="/projects" className="btn btn-primary btn-lg">
                  <span>📚</span>
                  View My Work
                </Link>
                <Link to="/contact" className="btn btn-secondary btn-lg">
                  <span>💬</span>
                  Start Your Project
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-graphic">
                <div className="writing-desk">
                  <div className="laptop">💻</div>
                  <div className="notebook">📓</div>
                  <div className="coffee">☕</div>
                  <div className="pen">✒️</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section section section-light">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>My Writing Services</h2>
            <p className="section-description">
              Comprehensive writing solutions tailored to your unique needs and vision
            </p>
          </div>
          <div className="services-grid">
            {features.map((service, index) => (
              <div key={index} className="service-card card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-highlights">
                  {service.highlights.map((highlight, idx) => (
                    <li key={idx} className="highlight-item">
                      <span className="highlight-marker">✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn btn-ghost btn-sm">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section section-dark">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Start Your Project?</h2>
            <p className="cta-description">
              Let's discuss your ideas and create something amazing together. 
              Get in touch for a free consultation.
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                <span>🚀</span>
                Get Started Today
              </Link>
              <Link to="/projects" className="btn btn-secondary btn-lg">
                <span>👀</span>
                See My Work First
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section section section-light">
        <div className="container">
          <div className="section-header text-center">
            <h2>My Writing Process</h2>
            <p className="section-description">
              A collaborative approach to ensure your vision comes to life exactly as you imagine
            </p>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Discovery & Planning</h3>
              <p>We discuss your project goals, target audience, and vision to create a detailed project plan.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Writing & Development</h3>
              <p>I craft your content with careful attention to voice, style, and your specific requirements.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Review & Revisions</h3>
              <p>You review the work and provide feedback. We refine until it's perfect for your needs.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Final Delivery</h3>
              <p>Receive your polished final work, ready to publish or implement as needed.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;