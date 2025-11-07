import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import ProjectsManager from './pages/Admin/ProjectsManager';
import Inquiries from './pages/Admin/Inquiries';

// Styles
import './App.css';
import './styles/components.css';
import './styles/admin.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Admin routes with AdminHeader */}
          <Route path="/admin/*" element={
            <>
              <AdminHeader />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/projects" element={
                    <ProtectedRoute>
                      <ProjectsManager />
                    </ProtectedRoute>
                  } />
                  <Route path="/inquiries" element={
                    <ProtectedRoute>
                      <Inquiries />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
            </>
          } />
          
          {/* Public routes with normal Header and Footer */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={
                    <div className="page-not-found">
                      <div className="container">
                        <h1>404 - Page Not Found</h1>
                        <p>The page you're looking for doesn't exist.</p>
                        <a href="/" className="btn btn-primary">Go Home</a>
                      </div>
                    </div>
                  } />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;