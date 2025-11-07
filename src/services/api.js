import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('penpro_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('penpro_token');
      localStorage.removeItem('penpro_user');
      window.location.href = '/admin';
    }
    
    return Promise.reject(error.response?.data || { 
      success: false, 
      error: 'Network error occurred' 
    });
  }
);

class PenProAPI {
  // Auth endpoints
  async login(credentials) {
    return await apiClient.post('/api/auth/login', credentials);
  }

  async verifyToken(token) {
    return await apiClient.post('/api/auth/verify', { token });
  }

  async logout() {
    localStorage.removeItem('penpro_token');
    localStorage.removeItem('penpro_user');
    return await apiClient.post('/api/auth/logout');
  }

  // Public endpoints
  async getProjects() {
    try {
      return await apiClient.get('/api/projects');
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Return mock data if API is down
      return {
        success: true,
        data: [
          {
            id: 1,
            title: "The Midnight Library",
            description: "A fiction novel exploring parallel lives and the impact of our choices.",
            category: "novel",
            status: "completed",
            tags: ["fiction", "drama"],
            wordCount: 85000,
            completionDate: "2023-06-15",
            excerpt: "Between life and death there is a library..."
          }
        ],
        count: 1
      };
    }
  }

  async submitWhatsAppInquiry(formData) {
    return await apiClient.post('/api/contact/whatsapp', formData);
  }

  async submitEmailInquiry(formData) {
    return await apiClient.post('/api/contact/email', formData);
  }

  // Admin endpoints
  async getDashboardData() {
    try {
      return await apiClient.get('/api/admin/dashboard');
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Return mock data
      return {
        success: true,
        data: {
          totalProjects: 3,
          totalInquiries: 12,
          recentInquiries: [],
          projectCategories: ['novel', 'content', 'ghostwriting'],
          inquiryStats: {
            whatsapp: 8,
            email: 4,
            new: 2
          }
        }
      };
    }
  }

  async getInquiries() {
    try {
      return await apiClient.get('/api/contact/inquiries');
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      // Return mock data
      return {
        success: true,
        data: [],
        count: 0
      };
    }
  }

  async updateInquiryStatus(inquiryId, status) {
    return await apiClient.patch(`/api/admin/inquiries/${inquiryId}/status`, { status });
  }

  async addProject(projectData) {
    return await apiClient.post('/api/admin/projects', projectData);
  }

  async updateProject(projectId, projectData) {
    return await apiClient.put(`/api/admin/projects/${projectId}`, projectData);
  }

  async deleteProject(projectId) {
    return await apiClient.delete(`/api/admin/projects/${projectId}`);
  }

  // Health check
  async healthCheck() {
    return await apiClient.get('/api/health');
  }

  // Utility method to check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('penpro_token');
    const user = localStorage.getItem('penpro_user');
    return !!(token && user);
  }

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('penpro_user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

// Create singleton instance
export const penproAPI = new PenProAPI();

// Export axios instance for direct use if needed
export { apiClient };

// Utility function for API health check
export const checkAPIHealth = async () => {
  try {
    const response = await penproAPI.healthCheck();
    return response.success;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

// Utility function to handle API errors
export const handleAPIError = (error) => {
  const message = error?.error || error?.message || 'An unexpected error occurred';
  console.error('API Error:', message);
  return message;
};