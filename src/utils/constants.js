// Application constants and configuration

export const APP_CONFIG = {
  name: 'PenPro',
  description: 'Professional Writing Services',
  version: '1.0.0',
  author: 'PenPro Team',
  contact: {
    email: 'writer@penpro.com',
    whatsapp: '+1234567890'
  }
};

export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 10000,
  endpoints: {
    projects: '/api/projects',
    contact: '/api/contact',
    admin: '/api/admin',
    auth: '/api/auth',
    health: '/api/health'
  }
};

export const PROJECT_CATEGORIES = {
  novel: {
    label: 'Novel Writing',
    icon: '📚',
    description: 'Fiction and non-fiction novels'
  },
  content: {
    label: 'Content Writing',
    icon: '📝',
    description: 'Articles, blogs, and web content'
  },
  ghostwriting: {
    label: 'Ghostwriting',
    icon: '👻',
    description: 'Your ideas, professionally written'
  },
  editing: {
    label: 'Editing & Proofreading',
    icon: '✏️',
    description: 'Professional editing services'
  },
  other: {
    label: 'Other',
    icon: '📄',
    description: 'Other writing projects'
  }
};

export const PROJECT_STATUS = {
  draft: {
    label: 'Draft',
    color: 'gray',
    icon: '📝'
  },
  published: {
    label: 'Published',
    color: 'green',
    icon: '✅'
  },
  archived: {
    label: 'Archived',
    color: 'orange',
    icon: '📁'
  }
};

export const INQUIRY_TYPES = {
  whatsapp: {
    label: 'WhatsApp',
    icon: '💚',
    color: 'green'
  },
  email: {
    label: 'Email',
    icon: '📧',
    color: 'blue'
  }
};

export const INQUIRY_STATUS = {
  new: {
    label: 'New',
    color: 'blue',
    icon: '🆕'
  },
  contacted: {
    label: 'Contacted',
    color: 'purple',
    icon: '💬'
  },
  'in-progress': {
    label: 'In Progress',
    color: 'orange',
    icon: '🔄'
  },
  completed: {
    label: 'Completed',
    color: 'green',
    icon: '✅'
  },
  archived: {
    label: 'Archived',
    color: 'gray',
    icon: '📁'
  }
};

export const CONTACT_METHODS = [
  {
    value: 'whatsapp',
    label: 'WhatsApp',
    description: 'Quick and direct messaging',
    icon: '💚',
    color: '#25D366'
  },
  {
    value: 'email',
    label: 'Email',
    description: 'Detailed project discussions',
    icon: '📧',
    color: '#EA4335'
  }
];

export const BUDGET_OPTIONS = [
  { value: '', label: 'Select Budget Range' },
  { value: 'under-1k', label: 'Under $1,000' },
  { value: '1k-5k', label: '$1,000 - $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-plus', label: '$10,000+' },
  { value: 'discuss', label: 'Need to Discuss' }
];

export const TIMELINE_OPTIONS = [
  { value: '', label: 'Select Timeline' },
  { value: 'asap', label: 'ASAP' },
  { value: '1-month', label: '1 Month' },
  { value: '1-3-months', label: '1-3 Months' },
  { value: '3-6-months', label: '3-6 Months' },
  { value: '6-plus-months', label: '6+ Months' },
  { value: 'flexible', label: 'Flexible' }
];

export const ADMIN_ROUTES = [
  {
    path: '/admin/dashboard',
    label: 'Dashboard',
    icon: '📊',
    description: 'Overview of your portfolio'
  },
  {
    path: '/admin/projects',
    label: 'Projects',
    icon: '📚',
    description: 'Manage your portfolio projects'
  },
  {
    path: '/admin/inquiries',
    label: 'Inquiries',
    icon: '💬',
    description: 'View client inquiries'
  }
];

export const SOCIAL_LINKS = [
  {
    platform: 'Twitter',
    url: 'https://twitter.com/penpro',
    icon: '🐦',
    handle: '@penpro'
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/company/penpro',
    icon: '💼',
    handle: 'PenPro'
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/penpro',
    icon: '📸',
    handle: '@penpro'
  }
];

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'penpro_token',
  USER: 'penpro_user',
  THEME: 'penpro_theme',
  LANGUAGE: 'penpro_language'
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};

// Animation durations
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500
};

// Export utility functions
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export default {
  APP_CONFIG,
  API_CONFIG,
  PROJECT_CATEGORIES,
  PROJECT_STATUS,
  INQUIRY_TYPES,
  INQUIRY_STATUS,
  CONTACT_METHODS,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  ADMIN_ROUTES,
  SOCIAL_LINKS,
  STORAGE_KEYS,
  BREAKPOINTS,
  ANIMATION_DURATIONS,
  formatDate,
  formatDateTime,
  truncateText,
  generateId
};