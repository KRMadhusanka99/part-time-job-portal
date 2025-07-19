import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { AboutUs } from './AboutUs';
import { ContactUs } from './ContactUs';
import { BrowseJobs } from './BrowseJobs';
import { BrowseCandidates } from './BrowseCandidates';
import { CandidateForm } from './CandidateForm';
import { JobAdForm } from './JobAdForm';
import { AuthProvider } from './contexts/AuthContext';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <>
                  <Login />
                  <Footer />
                </>
              }
            />

            <Route
              path="/signup"
              element={
                <>
                  <SignUp />
                  <Footer />
                </>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <Home />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />

            <Route
              path="/aboutus"
              element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <AboutUs />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />

            <Route
              path="/contactus"
              element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <ContactUs />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />

            <Route
              path="/browsejobs"
              element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <BrowseJobs />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />

            <Route
              path="/browsecandidates"
              element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <BrowseCandidates />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />

            <Route
              path="/candidateform"
              element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <CandidateForm />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />

            <Route
              path="/jobadform"
              element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <JobAdForm />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
