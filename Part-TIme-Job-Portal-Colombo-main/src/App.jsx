import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
// import {JobCard} from './components/JobCard'


import { Login } from './Login'
import { SignUp } from './SignUp'
import { AboutUs } from './AboutUs'
import { ContactUs } from './ContactUs'
import { BrowseJobs } from './BrowseJobs'
import { BrowseCandidates } from './BrowseCandidates'
import { CandidateForm } from './CandidateForm'
import { JobAdForm } from './JobAdForm'

// import { AuthProvider } from './contexts/AuthContext'


const App = () => {
  return (
    // <AuthProvider>
    <Router>
      <div className="App">
        <Routes>
          {/* Home Page Routes */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />

          {/* Login Page Routes */}
          <Route
            path="/Login"
            element={
              <>
                <Login />
                <Footer />
              </>
            }
          />

          {/* Signup Page Route */}
          <Route
            path="/SignUp"
            element={
              <>
                <SignUp />
                <Footer />
              </>
            }
          />

          {/* ContactUs Pages */}
          <Route path="/AboutUs"
            element={
              <>
                <Header />
                <AboutUs />
                <Footer />
              </>
            }
          />

          {/* ContactUs Pages */}
          <Route path="/ContactUs"
            element={
              <>
                <Header />
                <ContactUs />
                <Footer />
              </>
            }
          />


          {/* BrowseJobs Pages */}
          <Route path="/BrowseJobs"
            element={
              <>
                <Header />
                <BrowseJobs />
                <Footer />
              </>
            }
          />

          {/* BrowseCandidates Pages */}
          <Route path="/BrowseCandidates"
            element={
              <>
                <Header />
                <BrowseCandidates />
                <Footer />
              </>
            }
          />


          {/* CandidateForm Pages */}
          <Route path="/CandidateForm"
            element={
              <>
                <Header />
                <CandidateForm />
                <Footer />
              </>
            }
          />

          {/* JobAdForm Pages */}
          <Route path='/JobAdForm'
            element={
              <>
                <Header />
                <JobAdForm />
                <Footer />
              </>
            }
          />

        </Routes>
      </div>
    </Router>
    // </AuthProvider>
  )
};

export default App
