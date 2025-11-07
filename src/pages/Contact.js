import React from 'react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  const contactMethods = [
    {
      icon: '💬',
      title: 'WhatsApp',
      description: 'Quick and direct messaging for immediate inquiries',
      details: 'Typically respond within 1-2 hours',
      action: 'Start Chat'
    },
    {
      icon: '📧',
      title: 'Email',
      description: 'Detailed project discussions and formal inquiries',
      details: 'Response within 24 hours',
      action: 'Send Email'
    }
  ];

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. A blog post might take 3-5 days, while a novel could take 3-6 months. We\'ll establish a clear timeline during our initial discussion.'
    },
    {
      question: 'What information do you need to start a project?',
      answer: 'I\'ll need to understand your project goals, target audience, key messages, tone of voice, and any specific requirements. The more context you can provide, the better I can tailor the writing to your needs.'
    },
    {
      question: 'Do you offer revisions?',
      answer: 'Yes! I include 2 rounds of revisions in all project packages to ensure you\'re completely satisfied with the final deliverable.'
    },
    {
      question: 'What are your rates?',
      answer: 'Rates vary based on project type, complexity, and timeline. I offer both project-based pricing and hourly rates. Contact me for a customized quote based on your specific needs.'
    }
  ];

  return (
    <div className="contact-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header text-center">
          <h1>Let's Work Together</h1>
          <p className="page-description">
            Have a project in mind? I'd love to hear about it. Choose your preferred way to connect, 
            and let's start the conversation about bringing your ideas to life.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Methods */}
          <section className="contact-methods-section">
            <h2>Get In Touch</h2>
            <div className="contact-methods-grid">
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-method-card card">
                  <div className="method-icon">{method.icon}</div>
                  <h3 className="method-title">{method.title}</h3>
                  <p className="method-description">{method.description}</p>
                  <div className="method-details">
                    <span className="details-icon">⏱️</span>
                    <span>{method.details}</span>
                  </div>
                  <div className="method-action">
                    <span className="action-text">{method.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="contact-form-section">
            <ContactForm />
          </section>

          {/* FAQ Section */}
          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item card">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Info */}
          <section className="contact-info-section section-light">
            <div className="container-sm">
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-icon">💼</div>
                  <h4>Professional Approach</h4>
                  <p>Clear communication, defined timelines, and professional deliverables for every project.</p>
                </div>
                <div className="info-item">
                  <div className="info-icon">🛡️</div>
                  <h4>Confidentiality Guaranteed</h4>
                  <p>Your ideas and projects are safe with strict confidentiality agreements.</p>
                </div>
                <div className="info-item">
                  <div className="info-icon">⭐</div>
                  <h4>Quality Assurance</h4>
                  <p>Rigorous quality checks and multiple revisions to ensure perfection.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;