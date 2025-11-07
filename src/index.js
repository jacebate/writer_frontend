import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring
console.log(`
🎨 PenPro Frontend Loaded
⏰ ${new Date().toLocaleString()}
🌐 Environment: ${process.env.NODE_ENV}
🔗 API: ${process.env.REACT_APP_API_URL || 'Not configured'}
`);

// Error boundary for the entire app
window.addEventListener('error', (event) => {
  console.error('🚨 Global error caught:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', event.reason);
});